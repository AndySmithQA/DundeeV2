package com.qa.pluto.infrastructure.security.service;

import com.qa.pluto.infrastructure.security.data.Registration;
import com.qa.pluto.infrastructure.security.data.UserInfo;
import com.qa.pluto.infrastructure.security.data.UserInfoRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtValidationException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;

@Service
public class UserService {

    private final UserInfoRepository userInfoRepository;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            final UserInfoRepository userInfoRepository,
            final TokenService tokenService,
            final PasswordEncoder passwordEncoder) {
        this.userInfoRepository = userInfoRepository;
        this.tokenService = tokenService;
        this.passwordEncoder = passwordEncoder;
    }

    public Registration register(final UserInfo userInfo) throws UserExistException {
        if (userInfoRepository.findByEmailIgnoreCase(userInfo.getEmail()) != null) {
            throw new UserExistException("Unable to register user as " + userInfo.getEmail() + " already exist");
        }

        final TokenType[] tokenTypes;
        if (userInfo.getPassword() == null) {
            tokenTypes = new TokenType[]{TokenType.RESET, TokenType.ACTIVATE};
        } else {
            userInfo.setPassword(passwordEncoder.encode(userInfo.getPassword()));
            tokenTypes = new TokenType[]{TokenType.ACTIVATE};
        }

        userInfoRepository.save(userInfo);
        final String activationToken = tokenService.generateToken(userInfo.getEmail(), userInfo.getRole(), tokenTypes);
        return new Registration(userInfo, activationToken);
    }

    public String login(final Authentication authentication) {
        final UserInfo userInfo = userInfoRepository.findByEmailIgnoreCase(authentication.getName());
        return tokenService.generateAccessToken(authentication, userInfo);
    }

    public String resetAccount(final String userEmail) {
        final UserInfo userInfo = userInfoRepository.findByEmailIgnoreCase(userEmail);
        return userInfo == null
                ? null
                : tokenService.generateToken(userInfo.getEmail(), userInfo.getRole(), new TokenType[]{TokenType.RESET});
    }

    public UserInfo activate(final String token) throws InvaidActivationException {
        try {
            final Jwt decodedToken = tokenService.decode(token);

            if (!((String) decodedToken.getClaim("scope")).contains(TokenType.ACTIVATE.toString())) {
                throw new InvaidActivationException("Token Type is not Activate.  Potential phishing issues");
            }

            final String email = decodedToken.getSubject();
            final UserInfo userInfo = userInfoRepository.findByEmailIgnoreCase(email);

            if (userInfo == null) {
                throw new InvaidActivationException(
                        "Token is valid but user is not found in the database.  Potential data corruption");
            }

            if (userInfo.getActivationDate() == null) {
                userInfo.setActivationDate(Date.from(Instant.now()));
                userInfoRepository.save(userInfo);
            }

            return userInfo;
        } catch (JwtValidationException e) {
            throw new InvaidActivationException(e.getMessage());
        }
    }

    public void changePassword(
            final String newPassword,
            final String token) throws InvaidResetException {
        final Jwt decodedToken = tokenService.decode(token);

//        if (!((String) decodedToken.getClaim("scope")).contains(TokenType.RESET.toString())) {
//            throw new InvaidResetException("Token Type is not RESET.  Potential phishing issues");
//        }

        final UserInfo userInfo = userInfoRepository.findByEmailIgnoreCase(decodedToken.getSubject());
        if (userInfo == null) {
            throw new InvaidResetException("Token is valid but user is not found in the database.  Potential data corruption");
        }
        userInfo.setPassword(passwordEncoder.encode(newPassword));
        userInfoRepository.save(userInfo);
    }
}

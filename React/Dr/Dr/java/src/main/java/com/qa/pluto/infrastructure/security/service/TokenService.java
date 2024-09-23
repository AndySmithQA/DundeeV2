package com.qa.pluto.infrastructure.security.service;

import com.qa.pluto.infrastructure.security.Role;
import com.qa.pluto.infrastructure.security.data.UserInfo;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class TokenService {
    private final JwtEncoder encoder;
    private final JwtDecoder decoder;

    public TokenService(final JwtEncoder encoder, final JwtDecoder decoder) {
        this.encoder = encoder;
        this.decoder = decoder;
    }

    public String generateAccessToken(final Authentication authentication, final UserInfo userInfo) {
        final Instant now = Instant.now();
        final String scope = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));
        final JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plus(4, ChronoUnit.HOURS))
                .subject(authentication.getName())
                .claim("scope", scope)
                .claim("userinfoid", userInfo.getId())
                .build();
        final JwtEncoderParameters encoderParameters = JwtEncoderParameters.from(
                JwsHeader.with(MacAlgorithm.HS512).build(), claims);

        return encoder.encode(encoderParameters).getTokenValue();
    }

    public String generateToken(
            final String username,
            final Role role,
            final TokenType[] tokenTypes) {

        final Instant now = Instant.now();
        final String tokens = Stream.of(tokenTypes)
                .map(String::valueOf)
                .collect(Collectors.joining(" "));
        final JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plus(1, ChronoUnit.HOURS))
                .subject(username)
                .claim("scope", tokens + " ROLE_" + role)
                .build();
        final JwtEncoderParameters encoderParameters = JwtEncoderParameters.from(
                JwsHeader.with(MacAlgorithm.HS512).build(), claims);

        return encoder.encode(encoderParameters).getTokenValue();
    }

    public Jwt decode(final String token) {
        return decoder.decode(token);
    }
}

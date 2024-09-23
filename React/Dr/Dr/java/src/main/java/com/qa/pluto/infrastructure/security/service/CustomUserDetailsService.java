package com.qa.pluto.infrastructure.security.service;

import com.qa.pluto.infrastructure.security.data.UserInfo;
import com.qa.pluto.infrastructure.security.data.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserInfoRepository userInfoRepository;

    @Autowired
    public CustomUserDetailsService(UserInfoRepository userInfoRepository) {
        this.userInfoRepository = userInfoRepository;
    }

    @Override
    public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {

        final UserInfo userInfo = userInfoRepository.findByEmailIgnoreCase(username);

        return User.withUsername(userInfo.getEmail())
                .password(userInfo.getPassword())
                .authorities("ROLE_" + userInfo.getRole()) // Spring Security needs this prefix
                .disabled(userInfo.getActivationDate() == null)
                .build();
    }
}

package com.qa.pluto.infrastructure.security.config;

import com.nimbusds.jose.jwk.source.ImmutableSecret;
import com.qa.pluto.infrastructure.security.Role;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.crypto.spec.SecretKeySpec;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${jwt.key}")
    private String jwtKey;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .headers(headers -> headers.frameOptions().disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt)
                .httpBasic(withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .cors(withDefaults())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(AntPathRequestMatcher.antMatcher("/h2/**")).permitAll()
                        .requestMatchers(AntPathRequestMatcher.antMatcher("/error")).permitAll()

                        .requestMatchers(HttpMethod.POST, "/patient/registration").permitAll()
                        .requestMatchers(HttpMethod.GET, "/patient/activation/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/patient/password-reset/**").permitAll()

                        .requestMatchers(HttpMethod.POST, "/patient/session").hasRole(String.valueOf(Role.PATIENT))
                        .requestMatchers("/patient/**").hasAuthority("SCOPE_ROLE_" + Role.PATIENT)
                        .requestMatchers(HttpMethod.PUT, "/patient/password").hasAuthority("SCOPE_RESET")

                        .requestMatchers(HttpMethod.POST, "/admin/session").hasRole(String.valueOf(Role.ADMIN))
                        .requestMatchers("/admin/**").hasAuthority("SCOPE_ROLE_" + Role.ADMIN)

                        .requestMatchers(HttpMethod.PUT, "/doctor/activation/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/doctor/session").hasRole(String.valueOf(Role.DOCTOR))
                        .requestMatchers("/doctor/**").hasAuthority("SCOPE_ROLE_" + Role.DOCTOR)

                        .anyRequest().hasAuthority("SCOPE_READ")
                )
                .build();
    }

    @Bean
    JwtEncoder jwtEncoder() {
        return new NimbusJwtEncoder(new ImmutableSecret<>(jwtKey.getBytes()));
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        final byte[] bytes = jwtKey.getBytes();
        final SecretKeySpec originalKey = new SecretKeySpec(bytes, 0, bytes.length, "RSA");
        return NimbusJwtDecoder.withSecretKey(originalKey).macAlgorithm(MacAlgorithm.HS512).build();
    }

    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }


}
package com.qa.pluto.test.repositories;

import com.qa.pluto.infrastructure.security.data.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface TestUserInfoRepository extends JpaRepository<UserInfo, Long> {

    @Transactional
    void deleteByEmail(String email);
}

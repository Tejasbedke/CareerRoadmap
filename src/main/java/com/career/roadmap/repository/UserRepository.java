package com.career.roadmap.repository;

import com.career.roadmap.Sbeans.UserDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserDetail, Long> {

    UserDetail findByUsername(String username);
}

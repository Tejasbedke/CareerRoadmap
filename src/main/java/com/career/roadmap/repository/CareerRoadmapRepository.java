package com.career.roadmap.repository;

import com.career.roadmap.Sbeans.CareerRoadmap;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CareerRoadmapRepository extends JpaRepository<CareerRoadmap, Long> {
    Optional<CareerRoadmap> findByCareerTitle(String careerTitle);
}


package com.career.roadmap.services;

import com.career.roadmap.Sbeans.CareerRoadmap;
import com.career.roadmap.repository.CareerRoadmapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class CareerRoadmapService {

    @Autowired
    private CareerRoadmapRepository careerRoadmapRepository;

    public Optional<CareerRoadmap> getCareerDetailsByTitle(String careerTitle) {
        return careerRoadmapRepository.findByCareerTitle(careerTitle);
    }
}


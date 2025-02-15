package com.career.roadmap.Sbeans;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import jakarta.persistence.*;



@Entity
@Table(name = "careerroadmap")
@Data
public class CareerRoadmap {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "career_title")
    private String careerTitle;

    @Column(name = "subtitle")
    private String subtitle;

    @Column(name = "overview", columnDefinition = "TEXT")
    private String overview;

    @Column(name = "skills", columnDefinition = "TEXT")
    private String skills;

    @Column(name = "education_path", columnDefinition = "TEXT")
    private String educationPath;

    @Column(name = "resources", columnDefinition = "TEXT")
    private String resources;

    @Column(name = "faq", columnDefinition = "TEXT")
    private String faq;

    @Column(name = "roadmap", columnDefinition = "TEXT")
    private String roadmap;

    // Getters and Setters
}


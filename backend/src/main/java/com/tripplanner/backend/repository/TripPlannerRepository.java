package com.tripplanner.backend.repository;

import com.tripplanner.backend.model.TripPlanner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TripPlannerRepository extends JpaRepository<TripPlanner, Long> {
    List<TripPlanner> findByUserUserId(Long userId);
}

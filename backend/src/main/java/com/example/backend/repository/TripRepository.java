package com.example.backend.repository;

import com.example.backend.model.Trip;
import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {
    List<Trip> findByUserUserId(Long userId);
    Optional<Trip> findByTripId(Long tripId);
}


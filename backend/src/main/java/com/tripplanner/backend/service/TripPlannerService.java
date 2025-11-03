package com.tripplanner.backend.service;

import com.tripplanner.backend.model.TripPlanner;
import com.tripplanner.backend.model.User;
import com.tripplanner.backend.repository.TripPlannerRepository;
import com.tripplanner.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TripPlannerService {

    private final TripPlannerRepository tripPlannerRepository;
    private final UserRepository userRepository;

    public TripPlannerService(TripPlannerRepository tripPlannerRepository, UserRepository userRepository) {
        this.tripPlannerRepository = tripPlannerRepository;
        this.userRepository = userRepository;
    }

    public List<TripPlanner> getAllPlanners(Long userId) {
        return tripPlannerRepository.findByUserUserId(userId);
    }

    public TripPlanner createPlanner(Long userId, String title) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found with ID: " + userId);
        }

        TripPlanner planner = new TripPlanner();
        planner.setTitle(title);
        planner.setUser(userOpt.get());

        return tripPlannerRepository.save(planner);
    }

    public void deletePlanner(Long plannerId) {
        tripPlannerRepository.deleteById(plannerId);
    }
}

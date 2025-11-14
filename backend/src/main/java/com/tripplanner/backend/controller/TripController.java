package com.tripplanner.backend.controller;

import com.tripplanner.backend.model.Trip;
import com.tripplanner.backend.model.User;
import com.tripplanner.backend.payload.CreateTripRequest;
import com.tripplanner.backend.service.TripService;
import com.tripplanner.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/trips")
@CrossOrigin(origins = "https://tripplanner-production-c097.up.railway.app")
public class TripController {

    @Autowired
    private TripService tripService;
    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Trip> createTrip(@RequestBody CreateTripRequest req) {

        User user = userService.getUserById(req.userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Trip trip = new Trip();
        trip.setTitle(req.title);
        trip.setDescription(req.description);
        trip.setDestination(req.destination);
        trip.setBudget(req.budget);
        trip.setStartDate(LocalDate.parse(req.startDate));
        trip.setEndDate(LocalDate.parse(req.endDate));
        trip.setDone(req.done != null ? req.done : false);
        trip.setUser(user);

        Trip savedTrip = tripService.addTrip(trip);
        return ResponseEntity.ok(savedTrip);
    }



    @GetMapping
    public ResponseEntity<List<Trip>> getAllTripsForUser(@RequestParam Long userId) {
        List<Trip> trips = tripService.getTripsByUser(userId);
        return ResponseEntity.ok(trips);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Trip> getTripById(@PathVariable Long id) {
        Optional<Trip> trip = tripService.getTripById(id);
        return trip.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Trip> updateTrip(@PathVariable Long id, @RequestBody Trip trip) {
        try {
            Trip updated = tripService.updateTrip(id, trip);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrip(@PathVariable Long id) {
        try {
            tripService.deleteTrip(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}


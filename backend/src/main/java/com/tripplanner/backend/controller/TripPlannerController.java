package com.tripplanner.backend.controller;

import com.tripplanner.backend.model.TripPlanner;
import com.tripplanner.backend.service.TripPlannerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/trip-planners")
@CrossOrigin(origins = "https://tripplanner-production-c097.up.railway.app")
public class TripPlannerController {

    private final TripPlannerService tripPlannerService;

    public TripPlannerController(TripPlannerService tripPlannerService) {
        this.tripPlannerService = tripPlannerService;
    }

    @GetMapping
    public List<TripPlanner> getAllPlanners(@RequestParam Long userId) {
        return tripPlannerService.getAllPlanners(userId);
    }

    @PostMapping
    public TripPlanner createPlanner(@RequestBody Map<String, Object> request) {
        Long userId = Long.parseLong(request.get("userId").toString());
        String title = request.get("title").toString();
        return tripPlannerService.createPlanner(userId, title);
    }

    @DeleteMapping("/{plannerId}")
    public void deletePlanner(@PathVariable Long plannerId) {
        tripPlannerService.deletePlanner(plannerId);
    }
}

package com.tripplanner.backend.service;

import com.tripplanner.backend.model.File;
import com.tripplanner.backend.model.Trip;
import com.tripplanner.backend.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class TripService {
    @Autowired
    private TripRepository tripRepository;
    private final RestTemplate restTemplate;

    public TripService(TripRepository tripRepository) {
        this.tripRepository = tripRepository;
        this.restTemplate = new RestTemplate();
    }

    private static class UnsplashResponse {
        private Urls urls;

        public Urls getUrls() { return urls; }
        public void setUrls(Urls urls) { this.urls = urls; }

        private static class Urls {
            private String regular;
            public String getRegular() { return regular; }
            public void setRegular(String regular) { this.regular = regular; }
        }
    }

    public List<Trip> getTripsByUser(Long userId) {
        return tripRepository.findByUserUserId(userId);
    }

    public Trip addTrip(Trip trip) {
        String accessKey = "XR7K8RRKhxXAnio0lhCsi4KKT0Zs8BuIpKpa6ksTcw0";
        String secretKey = "INhRQYkmxv1kMQ_qIQtMlsLaWd-__eC46FZmmrPfjMg";
        String url = "https://api.unsplash.com/photos/random?query="
                + trip.getTitle()
                + "&client_id=" + accessKey;
        try {
            UnsplashResponse response = restTemplate.getForObject(url, UnsplashResponse.class);
            if (response.getUrls() != null) {
                File image = new File();
                image.setUrl(response.getUrls().getRegular()); // albo small/full
                image.setTrip(trip); // przypisanie do tripa
                trip.setImage(image);
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Błąd serwera", e);
        }
        return tripRepository.save(trip);
    }

    public Optional<Trip> getTripById(Long tripId) {
        return tripRepository.findByTripId(tripId);
    }

    public void deleteTrip(Long id) {
        tripRepository.deleteById(id);
    }

    public Trip updateTrip(Long id, Trip tripDetails) {
        return tripRepository.findById(id)
                .map(trip -> {
                    trip.setTitle(tripDetails.getTitle());
                    trip.setStartDate(tripDetails.getStartDate());
                    trip.setEndDate(tripDetails.getEndDate());
                    trip.setDescription(tripDetails.getDescription());
                    trip.setBudget(tripDetails.getBudget());
                    trip.setDestination(tripDetails.getDestination());
                    trip.setImage(tripDetails.getImage());

                    return tripRepository.save(trip);
                })
                .orElseThrow(() -> new RuntimeException("Trip o ID " + id + " nie istnieje."));
    }

}


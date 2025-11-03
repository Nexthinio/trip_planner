package com.tripplanner.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class TripPlanner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long plannerId;

    private String title;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;
}

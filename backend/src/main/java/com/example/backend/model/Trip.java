package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tripId;

    private String title;
    private String description;
    private String destination;
    private LocalDate startDate;
    private LocalDate endDate;
    private Double budget;

    @OneToOne(mappedBy = "trip", cascade = CascadeType.ALL)
    @JsonManagedReference
    private File image;

    @ManyToOne
    @JoinColumn(name = "userId")
    @JsonBackReference
    private User user;
}


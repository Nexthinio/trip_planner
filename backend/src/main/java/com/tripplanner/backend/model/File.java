package com.tripplanner.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fileId;

    private String name;

    private String type;

    private String url;

    @Lob
    private byte[] data;

    @OneToOne
    @JoinColumn(name = "trip_id")
    @JsonBackReference
    private Trip trip;
}


package com.tripplanner.backend.payload;

import lombok.Data;

@Data
public class CreateTripRequest {
    public Long userId;
    public String title;
    public String description;
    public String destination;
    public String startDate;
    public String endDate;
    public Double budget;
    public Boolean done;
}

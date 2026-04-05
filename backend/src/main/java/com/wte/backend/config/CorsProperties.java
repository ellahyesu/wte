package com.wte.backend.config;

import java.util.List;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "wte")
public record CorsProperties(List<String> frontendOrigins) {
}

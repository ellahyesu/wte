package com.wte.backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "wte")
public record CorsProperties(String frontendOrigin) {
}

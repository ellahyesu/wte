package com.wte.backend.recipe;

import java.io.IOException;
import org.jsoup.Jsoup;
import org.springframework.stereotype.Component;

@Component
public class TenThousandRecipeClient {

    public String fetch(String url) throws IOException {
        return Jsoup.connect(url)
                .userAgent("Mozilla/5.0")
                .timeout(10_000)
                .get()
                .html();
    }
}

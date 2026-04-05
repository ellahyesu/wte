package com.wte.backend.recipe;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Component;

@Component
public class TenThousandRecipeParser {

    public List<RecipeCard> parseListPage(String html, int limit) {
        Document document = Jsoup.parse(html, "https://www.10000recipe.com");
        List<RecipeCard> cards = new ArrayList<>();

        for (Element anchor : document.select(".common_sp_thumb a.common_sp_link")) {
            if (cards.size() >= limit) {
                break;
            }

            String href = anchor.attr("abs:href");
            String recipeId = href.replaceAll("^.*/recipe/(\\d+).*$", "$1");
            Element item = anchor.closest(".common_sp_list_li");
            String title = item != null ? item.selectFirst(".common_sp_caption_tit") != null
                    ? item.selectFirst(".common_sp_caption_tit").text().trim()
                    : ""
                    : "";
            String imageUrl = anchor.selectFirst("img") != null ? anchor.selectFirst("img").attr("abs:src") : "";

            if (!recipeId.isBlank() && !title.isBlank() && !href.isBlank()) {
                cards.add(new RecipeCard(recipeId, href, title, imageUrl));
            }
        }

        return cards;
    }

    public Recipe parseDetailPage(RecipeCard card, String html, Function<String, String> purchaseUrlBuilder) {
        Document document = Jsoup.parse(html, "https://www.10000recipe.com");

        String title = textOrFallback(document.selectFirst(".view2_summary h3"), card.title());
        String summary = textOrFallback(document.selectFirst("#recipeIntro"), title);
        List<String> tags = document.select(".tag_cont a").stream()
                .map(Element::text)
                .map(String::trim)
                .filter(tag -> !tag.isBlank())
                .limit(4)
                .toList();

        List<Ingredient> ingredients = document.select(".ready_ingre3 li").stream()
                .map(item -> {
                    String name = textOrEmpty(item.selectFirst(".ingre_list_name"));
                    String amount = textOrEmpty(item.selectFirst(".ingre_list_ea"));
                    if (name.isBlank()) {
                        return null;
                    }
                    return new Ingredient(name, amount.isBlank() ? "-" : amount, purchaseUrlBuilder.apply(name));
                })
                .filter(ingredient -> ingredient != null)
                .collect(Collectors.toList());

        List<String> instructions = document.select(".view_step_cont .media-body").stream()
                .map(Element::html)
                .map(value -> value.replace("<br>", "\n").replace("<br />", "\n"))
                .map(Jsoup::parse)
                .map(Document::text)
                .map(String::trim)
                .filter(step -> !step.isBlank())
                .toList();

        Nutrition nutrition = parseNutrition(document);

        return new Recipe(
                card.id(),
                title,
                summary,
                card.imageUrl(),
                tags,
                ingredients,
                instructions,
                nutrition
        );
    }

    private Nutrition parseNutrition(Document document) {
        List<Element> values = document.select(".view2_summary_info span");
        int calories = extractNumber(document.selectFirst(".view2_summary_info4"));
        if (calories == 0 && values.size() > 3) {
            calories = extractNumber(values.get(3));
        }

        return new Nutrition(calories, 0, 0, 0);
    }

    private int extractNumber(Element element) {
        if (element == null) {
            return 0;
        }

        String digits = element.text().replaceAll("[^0-9]", "");
        return digits.isBlank() ? 0 : Integer.parseInt(digits);
    }

    private String textOrFallback(Element element, String fallback) {
        String value = textOrEmpty(element);
        return value.isBlank() ? fallback : value;
    }

    private String textOrEmpty(Element element) {
        return element == null ? "" : element.text().trim();
    }

    public record RecipeCard(
            String id,
            String url,
            String title,
            String imageUrl
    ) {
    }
}

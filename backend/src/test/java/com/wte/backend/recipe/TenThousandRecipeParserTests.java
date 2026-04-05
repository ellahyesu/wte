package com.wte.backend.recipe;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import org.junit.jupiter.api.Test;

class TenThousandRecipeParserTests {

    private final TenThousandRecipeParser parser = new TenThousandRecipeParser();

    @Test
    void parsesListPageCards() {
        String html = """
                <div class="common_sp_list_li">
                  <div class="common_sp_thumb">
                    <a href="/recipe/7073921" class="common_sp_link">
                      <img src="https://img.example.com/r1.jpg">
                    </a>
                  </div>
                  <div class="common_sp_caption_tit line2">First Recipe</div>
                </div>
                <div class="common_sp_list_li">
                  <div class="common_sp_thumb">
                    <a href="/recipe/7073922" class="common_sp_link">
                      <img src="https://img.example.com/r2.jpg">
                    </a>
                  </div>
                  <div class="common_sp_caption_tit line2">Second Recipe</div>
                </div>
                """;

        List<TenThousandRecipeParser.RecipeCard> cards = parser.parseListPage(html, 20);

        assertThat(cards).hasSize(2);
        assertThat(cards.get(0).id()).isEqualTo("7073921");
        assertThat(cards.get(0).title()).isEqualTo("First Recipe");
    }

    @Test
    void parsesDetailPage() {
        String html = """
                <div class="view2_summary st3">
                  <h3>Real Recipe Title</h3>
                  <div class="view2_summary_in" id="recipeIntro">This is a summary.<br>Second line.</div>
                </div>
                <div class="tag_cont">
                  <a>#tag1</a><a>#tag2</a>
                </div>
                <div class="ready_ingre3">
                  <li>
                    <div class="ingre_list_name">Kimchi</div>
                    <div class="ingre_list_ea">100g</div>
                  </li>
                  <li>
                    <div class="ingre_list_name">Egg</div>
                    <div class="ingre_list_ea">2</div>
                  </li>
                </div>
                <div id="stepDiv1" class="view_step_cont media step1">
                  <div id="stepdescr1" class="media-body">Step one<br />Do this.</div>
                </div>
                <div id="stepDiv2" class="view_step_cont media step2">
                  <div id="stepdescr2" class="media-body">Step two.</div>
                </div>
                """;

        Recipe recipe = parser.parseDetailPage(
                new TenThousandRecipeParser.RecipeCard("7073921", "https://www.10000recipe.com/recipe/7073921", "Fallback", "https://img.example.com/r1.jpg"),
                html,
                ingredientName -> "https://www.coupang.com/np/search?q=" + ingredientName
        );

        assertThat(recipe.title()).isEqualTo("Real Recipe Title");
        assertThat(recipe.summary()).contains("This is a summary.");
        assertThat(recipe.tags()).containsExactly("#tag1", "#tag2");
        assertThat(recipe.ingredients()).hasSize(2);
        assertThat(recipe.instructions()).containsExactly("Step one Do this.", "Step two.");
    }
}

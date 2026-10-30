export type { Ingredient, RecipeIngredient, Recipe, Tip, Contest } from "./types";
import type { Ingredient, Recipe, Tip, Contest } from "./types";

import { BASE_RECIPES } from "./base_recipes";
export { BASE_RECIPES };

export const BASE_INGREDIENTS: Ingredient[] = [
  {
    "id": "chicken",
    "name": "Chicken",
    "category": "Proteins"
  },
  {
    "id": "beef",
    "name": "Beef",
    "category": "Proteins"
  },
  {
    "id": "pork",
    "name": "Pork",
    "category": "Proteins"
  },
  {
    "id": "lamb",
    "name": "Lamb / Mutton",
    "category": "Proteins"
  },
  {
    "id": "turkey",
    "name": "Turkey",
    "category": "Proteins"
  },
  {
    "id": "duck",
    "name": "Duck",
    "category": "Proteins"
  },
  {
    "id": "eggs",
    "name": "Eggs",
    "category": "Proteins"
  },
  {
    "id": "salmon",
    "name": "Salmon",
    "category": "Proteins"
  },
  {
    "id": "tuna",
    "name": "Tuna (Canned/Fresh)",
    "category": "Proteins"
  },
  {
    "id": "cod",
    "name": "Cod / White Fish",
    "category": "Proteins"
  },
  {
    "id": "hilsa",
    "name": "Hilsa Fish",
    "category": "Proteins"
  },
  {
    "id": "rohu",
    "name": "Rohu Fish",
    "category": "Proteins"
  },
  {
    "id": "prawns",
    "name": "Prawns / Shrimp",
    "category": "Proteins"
  },
  {
    "id": "crab",
    "name": "Crab",
    "category": "Proteins"
  },
  {
    "id": "tofu",
    "name": "Tofu",
    "category": "Proteins"
  },
  {
    "id": "paneer",
    "name": "Paneer / Cottage Cheese",
    "category": "Proteins"
  },
  {
    "id": "lentils",
    "name": "Lentils (Red/Green/Brown)",
    "category": "Proteins"
  },
  {
    "id": "chickpeas",
    "name": "Chickpeas",
    "category": "Proteins"
  },
  {
    "id": "black_beans",
    "name": "Black Beans",
    "category": "Proteins"
  },
  {
    "id": "kidney_beans",
    "name": "Kidney Beans",
    "category": "Proteins"
  },
  {
    "id": "green_peas",
    "name": "Green Peas",
    "category": "Proteins"
  },
  {
    "id": "tempeh",
    "name": "Tempeh",
    "category": "Proteins"
  },
  {
    "id": "feta_cheese",
    "name": "Feta Cheese",
    "category": "Proteins"
  },
  {
    "id": "sardines",
    "name": "Sardines",
    "category": "Proteins"
  },
  {
    "id": "mackerel",
    "name": "Mackerel",
    "category": "Proteins"
  },
  {
    "id": "sausage_chorizo",
    "name": "Chorizo / Sausages",
    "category": "Proteins"
  },
  {
    "id": "ham_bacon",
    "name": "Ham / Bacon",
    "category": "Proteins"
  },
  {
    "id": "seitan",
    "name": "Seitan",
    "category": "Proteins"
  },
  {
    "id": "edamame",
    "name": "Edamame",
    "category": "Proteins"
  },
  {
    "id": "anchovies",
    "name": "Anchovies",
    "category": "Proteins"
  },
  {
    "id": "squid_octopus",
    "name": "Squid / Octopus",
    "category": "Proteins"
  },
  {
    "id": "halloumi",
    "name": "Halloumi Cheese",
    "category": "Proteins"
  },
  {
    "id": "kangaroo",
    "name": "Kangaroo",
    "category": "Proteins"
  },
  {
    "id": "potatoes",
    "name": "Potatoes",
    "category": "Vegetables"
  },
  {
    "id": "onions",
    "name": "Onions",
    "category": "Vegetables"
  },
  {
    "id": "garlic",
    "name": "Garlic",
    "category": "Vegetables"
  },
  {
    "id": "ginger",
    "name": "Ginger",
    "category": "Vegetables"
  },
  {
    "id": "tomatoes",
    "name": "Tomatoes",
    "category": "Vegetables"
  },
  {
    "id": "carrots",
    "name": "Carrots",
    "category": "Vegetables"
  },
  {
    "id": "broccoli",
    "name": "Broccoli",
    "category": "Vegetables"
  },
  {
    "id": "spinach",
    "name": "Spinach",
    "category": "Vegetables"
  },
  {
    "id": "eggplant",
    "name": "Eggplant",
    "category": "Vegetables"
  },
  {
    "id": "cauliflower",
    "name": "Cauliflower",
    "category": "Vegetables"
  },
  {
    "id": "okra",
    "name": "Okra",
    "category": "Vegetables"
  },
  {
    "id": "bell_peppers",
    "name": "Bell Peppers",
    "category": "Vegetables"
  },
  {
    "id": "mushrooms",
    "name": "Mushrooms",
    "category": "Vegetables"
  },
  {
    "id": "cabbage",
    "name": "Cabbage",
    "category": "Vegetables"
  },
  {
    "id": "zucchini",
    "name": "Zucchini",
    "category": "Vegetables"
  },
  {
    "id": "cucumber",
    "name": "Cucumber",
    "category": "Vegetables"
  },
  {
    "id": "lettuce",
    "name": "Lettuce",
    "category": "Vegetables"
  },
  {
    "id": "sweet_potatoes",
    "name": "Sweet Potatoes",
    "category": "Vegetables"
  },
  {
    "id": "cassava",
    "name": "Cassava / Yuca",
    "category": "Vegetables"
  },
  {
    "id": "corn",
    "name": "Corn / Maize",
    "category": "Vegetables"
  },
  {
    "id": "celery",
    "name": "Celery",
    "category": "Vegetables"
  },
  {
    "id": "avocado",
    "name": "Avocado",
    "category": "Vegetables"
  },
  {
    "id": "plantains",
    "name": "Plantains",
    "category": "Vegetables"
  },
  {
    "id": "taro_yam",
    "name": "Taro / Yam",
    "category": "Vegetables"
  },
  {
    "id": "bok_choy",
    "name": "Bok Choy / Napa Cabbage",
    "category": "Vegetables"
  },
  {
    "id": "asparagus",
    "name": "Asparagus",
    "category": "Vegetables"
  },
  {
    "id": "brussels_sprouts",
    "name": "Brussels Sprouts",
    "category": "Vegetables"
  },
  {
    "id": "daikon_radish",
    "name": "Daikon / Red Radish",
    "category": "Vegetables"
  },
  {
    "id": "pumpkin_squash",
    "name": "Pumpkin / Squash",
    "category": "Vegetables"
  },
  {
    "id": "green_beans",
    "name": "Green Beans / String Beans",
    "category": "Vegetables"
  },
  {
    "id": "leeks",
    "name": "Leeks",
    "category": "Vegetables"
  },
  {
    "id": "beets",
    "name": "Beets",
    "category": "Vegetables"
  },
  {
    "id": "bitter_melon",
    "name": "Bitter Gourd / Bitter Melon",
    "category": "Vegetables"
  },
  {
    "id": "kale",
    "name": "Kale",
    "category": "Vegetables"
  },
  {
    "id": "spring_onions",
    "name": "Spring Onions / Chives",
    "category": "Vegetables"
  },
  {
    "id": "artichokes",
    "name": "Artichokes",
    "category": "Vegetables"
  },
  {
    "id": "rice",
    "name": "Rice (Basmati/Jasmine/Brown)",
    "category": "Pantry & Grains"
  },
  {
    "id": "flour",
    "name": "Wheat / All-Purpose Flour",
    "category": "Pantry & Grains"
  },
  {
    "id": "cornmeal",
    "name": "Cornmeal / Polenta / Grits",
    "category": "Pantry & Grains"
  },
  {
    "id": "pasta",
    "name": "Pasta",
    "category": "Pantry & Grains"
  },
  {
    "id": "noodles",
    "name": "Noodles",
    "category": "Pantry & Grains"
  },
  {
    "id": "oats",
    "name": "Rolled Oats",
    "category": "Pantry & Grains"
  },
  {
    "id": "quinoa",
    "name": "Quinoa",
    "category": "Pantry & Grains"
  },
  {
    "id": "tortillas",
    "name": "Tortillas (Flour/Corn)",
    "category": "Pantry & Grains"
  },
  {
    "id": "bread",
    "name": "Bread / Baguette",
    "category": "Pantry & Grains"
  },
  {
    "id": "soy_sauce",
    "name": "Soy Sauce",
    "category": "Pantry & Grains"
  },
  {
    "id": "vinegar",
    "name": "Vinegar",
    "category": "Pantry & Grains"
  },
  {
    "id": "coconut_milk",
    "name": "Coconut Milk",
    "category": "Pantry & Grains"
  },
  {
    "id": "yogurt",
    "name": "Sour Yogurt / Greek Yogurt",
    "category": "Pantry & Grains"
  },
  {
    "id": "cheddar_cheese",
    "name": "Cheddar Cheese",
    "category": "Pantry & Grains"
  },
  {
    "id": "parmesan_cheese",
    "name": "Parmesan Cheese",
    "category": "Pantry & Grains"
  },
  {
    "id": "sugar",
    "name": "Sugar",
    "category": "Pantry & Grains"
  },
  {
    "id": "salt",
    "name": "Salt",
    "category": "Pantry & Grains"
  },
  {
    "id": "tomato_paste",
    "name": "Tomato Paste",
    "category": "Pantry & Grains"
  },
  {
    "id": "peanut_butter",
    "name": "Peanut Butter",
    "category": "Pantry & Grains"
  },
  {
    "id": "couscous",
    "name": "Couscous",
    "category": "Pantry & Grains"
  },
  {
    "id": "bulgur_wheat",
    "name": "Bulgur Wheat",
    "category": "Pantry & Grains"
  },
  {
    "id": "tapioca_starch",
    "name": "Tapioca / Cassava Flour",
    "category": "Pantry & Grains"
  },
  {
    "id": "rice_paper",
    "name": "Rice Paper",
    "category": "Pantry & Grains"
  },
  {
    "id": "fish_sauce",
    "name": "Fish Sauce",
    "category": "Pantry & Grains"
  },
  {
    "id": "oyster_sauce",
    "name": "Oyster Sauce",
    "category": "Pantry & Grains"
  },
  {
    "id": "sesame_seeds",
    "name": "Sesame Seeds",
    "category": "Pantry & Grains"
  },
  {
    "id": "honey",
    "name": "Honey / Maple Syrup",
    "category": "Pantry & Grains"
  },
  {
    "id": "mayonnaise",
    "name": "Mayonnaise",
    "category": "Pantry & Grains"
  },
  {
    "id": "hot_sauce_sriracha",
    "name": "Hot Sauce / Sriracha",
    "category": "Pantry & Grains"
  },
  {
    "id": "coconut_shreds",
    "name": "Desiccated Coconut / Shreds",
    "category": "Pantry & Grains"
  },
  {
    "id": "tahini",
    "name": "Tahini Paste",
    "category": "Pantry & Grains"
  },
  {
    "id": "miso_paste",
    "name": "Miso Paste",
    "category": "Pantry & Grains"
  },
  {
    "id": "kimchi",
    "name": "Kimchi",
    "category": "Pantry & Grains"
  },
  {
    "id": "milk",
    "name": "Milk (Dairy/Plant-based)",
    "category": "Pantry & Grains"
  },
  {
    "id": "turmeric",
    "name": "Turmeric Powder",
    "category": "Spices & Herbs"
  },
  {
    "id": "chili_powder",
    "name": "Chili Powder / Flakes / Cayenne",
    "category": "Spices & Herbs"
  },
  {
    "id": "cumin",
    "name": "Cumin Seeds/Powder",
    "category": "Spices & Herbs"
  },
  {
    "id": "mustard_paste",
    "name": "Mustard (Paste/Dijon/Yellow)",
    "category": "Spices & Herbs"
  },
  {
    "id": "green_chilies",
    "name": "Green Chilies",
    "category": "Spices & Herbs"
  },
  {
    "id": "black_pepper",
    "name": "Black Pepper",
    "category": "Spices & Herbs"
  },
  {
    "id": "paprika",
    "name": "Paprika",
    "category": "Spices & Herbs"
  },
  {
    "id": "oregano",
    "name": "Oregano",
    "category": "Spices & Herbs"
  },
  {
    "id": "basil",
    "name": "Basil",
    "category": "Spices & Herbs"
  },
  {
    "id": "cilantro",
    "name": "Cilantro / Coriander Leaves",
    "category": "Spices & Herbs"
  },
  {
    "id": "parsley",
    "name": "Parsley",
    "category": "Spices & Herbs"
  },
  {
    "id": "rosemary",
    "name": "Rosemary",
    "category": "Spices & Herbs"
  },
  {
    "id": "thyme",
    "name": "Thyme",
    "category": "Spices & Herbs"
  },
  {
    "id": "cinnamon",
    "name": "Cinnamon",
    "category": "Spices & Herbs"
  },
  {
    "id": "cardamom",
    "name": "Cardamom",
    "category": "Spices & Herbs"
  },
  {
    "id": "cloves",
    "name": "Cloves",
    "category": "Spices & Herbs"
  },
  {
    "id": "garam_masala",
    "name": "Garam Masala",
    "category": "Spices & Herbs"
  },
  {
    "id": "five_spice",
    "name": "Five-Spice Powder",
    "category": "Spices & Herbs"
  },
  {
    "id": "curry_powder",
    "name": "Curry Powder",
    "category": "Spices & Herbs"
  },
  {
    "id": "bay_leaves",
    "name": "Bay Leaves",
    "category": "Spices & Herbs"
  },
  {
    "id": "dill",
    "name": "Dill",
    "category": "Spices & Herbs"
  },
  {
    "id": "mint",
    "name": "Mint",
    "category": "Spices & Herbs"
  },
  {
    "id": "nutmeg",
    "name": "Nutmeg",
    "category": "Spices & Herbs"
  },
  {
    "id": "allspice",
    "name": "Allspice",
    "category": "Spices & Herbs"
  },
  {
    "id": "star_anise",
    "name": "Star Anise",
    "category": "Spices & Herbs"
  },
  {
    "id": "saffron",
    "name": "Saffron",
    "category": "Spices & Herbs"
  },
  {
    "id": "zaatar",
    "name": "Za'atar Spice Blend",
    "category": "Spices & Herbs"
  },
  {
    "id": "sumac",
    "name": "Sumac",
    "category": "Spices & Herbs"
  },
  {
    "id": "lemongrass",
    "name": "Lemongrass",
    "category": "Spices & Herbs"
  },
  {
    "id": "coriander_powder",
    "name": "Coriander Seeds/Powder",
    "category": "Spices & Herbs"
  },
  {
    "id": "fennel_seeds",
    "name": "Fennel Seeds",
    "category": "Spices & Herbs"
  },
  {
    "id": "sage_herb",
    "name": "Sage",
    "category": "Spices & Herbs"
  },
  {
    "id": "tarragon",
    "name": "Tarragon",
    "category": "Spices & Herbs"
  },
  {
    "id": "olive_oil",
    "name": "Olive Oil",
    "category": "Oils"
  },
  {
    "id": "mustard_oil",
    "name": "Mustard Oil",
    "category": "Oils"
  },
  {
    "id": "ghee",
    "name": "Ghee",
    "category": "Oils"
  },
  {
    "id": "coconut_oil",
    "name": "Coconut Oil",
    "category": "Oils"
  },
  {
    "id": "sesame_oil",
    "name": "Sesame Oil",
    "category": "Oils"
  },
  {
    "id": "butter",
    "name": "Butter",
    "category": "Oils"
  },
  {
    "id": "canola_oil",
    "name": "Vegetable Oil (Canola/Sunflower/Corn/Grapeseed)",
    "category": "Oils"
  },
  {
    "id": "avocado_oil",
    "name": "Avocado Oil",
    "category": "Oils"
  },
  {
    "id": "peanut_oil",
    "name": "Peanut Oil",
    "category": "Oils"
  },
  {
    "id": "lard",
    "name": "Lard / Animal Fat",
    "category": "Oils"
  },
  {
    "id": "palm_oil",
    "name": "Palm Oil",
    "category": "Oils"
  },
  {
    "id": "rice_bran_oil",
    "name": "Rice Bran Oil",
    "category": "Oils"
  },
  {
    "id": "duck_goose_fat",
    "name": "Duck / Goose Fat",
    "category": "Oils"
  },
  {
    "id": "walnut_truffle_oil",
    "name": "Gourmet Oil (Walnut/Truffle)",
    "category": "Oils"
  },
  {
    "id": "vegetable_shortening",
    "name": "Shortening / Margarine",
    "category": "Oils"
  },
  {
    "id": "pomegranate_molasses",
    "name": "Pomegranate Molasses",
    "category": "Pantry & Grains"
  },
  {
    "id": "ground_walnuts",
    "name": "Ground Walnuts",
    "category": "Pantry & Grains"
  },
  {
    "id": "banana_leaves",
    "name": "Banana Leaves",
    "category": "Vegetables"
  },
  {
    "id": "omani_spice_blend",
    "name": "Omani Spice Blend",
    "category": "Spices & Herbs"
  },
  {
    "id": "ashta_cream",
    "name": "Ashta Cream",
    "category": "Pantry & Grains"
  },
  {
    "id": "orange_blossom_water",
    "name": "Orange Blossom Water",
    "category": "Pantry & Grains"
  },
  {
    "id": "qidreh_spice_mix",
    "name": "Qidreh Spice Mix",
    "category": "Spices & Herbs"
  },
  {
    "id": "kamouneh_spice",
    "name": "Kamouneh Spice Mix",
    "category": "Spices & Herbs"
  },
  {
    "id": "fine_bulgur",
    "name": "Fine Bulgur",
    "category": "Pantry & Grains"
  },
  {
    "id": "evaporated_milk",
    "name": "Evaporated Milk",
    "category": "Pantry & Grains"
  },
  {
    "id": "aleppo_pepper_flakes",
    "name": "Aleppo Pepper Flakes",
    "category": "Spices & Herbs"
  },
  {
    "id": "green_mangoes",
    "name": "Green Mangoes",
    "category": "Vegetables"
  },
  {
    "id": "fenugreek_seeds",
    "name": "Fenugreek Seeds",
    "category": "Spices & Herbs"
  },
  {
    "id": "taro_root",
    "name": "Taro Root",
    "category": "Vegetables"
  },
  {
    "id": "cooking_banana",
    "name": "Cooking Banana",
    "category": "Vegetables"
  },
  {
    "id": "coconut_sugar",
    "name": "Coconut Sugar",
    "category": "Pantry & Grains"
  },
  {
    "id": "grated_fresh_coconut",
    "name": "Grated Fresh Coconut",
    "category": "Pantry & Grains"
  },
  {
    "id": "taro_leaves",
    "name": "Taro Leaves",
    "category": "Vegetables"
  },
  {
    "id": "fresh_clams",
    "name": "Fresh Clams",
    "category": "Proteins"
  },
  {
    "id": "watercress_puha",
    "name": "Watercress (Puha)",
    "category": "Vegetables"
  },
  {
    "id": "kumara",
    "name": "Kumara",
    "category": "Vegetables"
  },
  {
    "id": "pork_ribs",
    "name": "Pork Ribs",
    "category": "Proteins"
  },
  {
    "id": "wild_yam",
    "name": "Wild Yam",
    "category": "Vegetables"
  },
  {
    "id": "arrowroot_starch",
    "name": "Arrowroot Starch",
    "category": "Pantry & Grains"
  },
  {
    "id": "sulguni_cheese",
    "name": "Sulguni Cheese",
    "category": "Proteins"
  },
  {
    "id": "imeretian_cheese",
    "name": "Imeretian Cheese",
    "category": "Proteins"
  },
  {
    "id": "twarog_cheese",
    "name": "Twaróg Cheese",
    "category": "Proteins"
  },
  {
    "id": "potato_starch",
    "name": "Potato Starch",
    "category": "Pantry & Grains"
  },
  {
    "id": "salted_cod",
    "name": "Salted Cod",
    "category": "Proteins"
  },
  {
    "id": "swedish_sweet_mustard",
    "name": "Swedish Sweet Mustard",
    "category": "Pantry & Grains"
  },
  {
    "id": "hungarian_paprika",
    "name": "Sweet Hungarian Paprika",
    "category": "Spices & Herbs"
  },
  {
    "id": "hungarian_wax_pepper",
    "name": "Hungarian Wax Pepper",
    "category": "Vegetables"
  },
  {
    "id": "cherry_juice",
    "name": "Cherry Juice",
    "category": "Pantry & Grains"
  },
  {
    "id": "marjoram_leaves",
    "name": "Fresh Marjoram Leaves",
    "category": "Spices & Herbs"
  },
  {
    "id": "achiote_oil",
    "name": "Achiote Oil",
    "category": "Oils"
  },
  {
    "id": "queso_fresco",
    "name": "Queso Fresco",
    "category": "Proteins"
  },
  {
    "id": "papa_chola",
    "name": "Papa Chola",
    "category": "Vegetables"
  },
  {
    "id": "salsa_lizano",
    "name": "Salsa Lizano",
    "category": "Pantry & Grains"
  },
  {
    "id": "dulce_de_leche",
    "name": "Dulce de Leche",
    "category": "Pantry & Grains"
  },
  {
    "id": "cornstarch",
    "name": "Cornstarch",
    "category": "Pantry & Grains"
  },
  {
    "id": "cheese_curds",
    "name": "Cheese Curds",
    "category": "Proteins"
  },
  {
    "id": "chile_de_arbol",
    "name": "Chile de Árbol",
    "category": "Spices & Herbs"
  },
  {
    "id": "ancho_chile",
    "name": "Ancho Chile",
    "category": "Spices & Herbs"
  },
  {
    "id": "loroco_buds",
    "name": "Loroco Buds",
    "category": "Vegetables"
  },
  {
    "id": "quesillo",
    "name": "Quesillo",
    "category": "Proteins"
  },
  {
    "id": "minced_clams",
    "name": "Minced Clams",
    "category": "Proteins"
  },
  {
    "id": "salt_pork",
    "name": "Salt Pork",
    "category": "Proteins"
  },
  {
    "id": "algarrobina_syrup",
    "name": "Algarrobina Syrup",
    "category": "Pantry & Grains"
  },
  {
    "id": "ground_egusi_seeds",
    "name": "Ground Egusi Seeds",
    "category": "Pantry & Grains"
  },
  {
    "id": "ground_crayfish",
    "name": "Ground Crayfish",
    "category": "Pantry & Grains"
  },
  {
    "id": "berbere_spice",
    "name": "Berbere Spice Blend",
    "category": "Spices & Herbs"
  },
  {
    "id": "fine_semolina",
    "name": "Fine Semolina",
    "category": "Pantry & Grains"
  },
  {
    "id": "bitterleaf",
    "name": "Bitterleaf",
    "category": "Vegetables"
  },
  {
    "id": "baked_beans",
    "name": "Baked Beans",
    "category": "Pantry & Grains"
  },
  {
    "id": "bitterleaf_leaves",
    "name": "Bitterleaf Leaves",
    "category": "Vegetables"
  },
  {
    "id": "crayfish_powder",
    "name": "Crayfish Powder",
    "category": "Pantry & Grains"
  },
  {
    "id": "dried_salted_cod",
    "name": "Dried Salted Cod",
    "category": "Proteins"
  },
  {
    "id": "sweet_potato_leaves",
    "name": "Sweet Potato Leaves",
    "category": "Vegetables"
  },
  {
    "id": "red_palm_oil",
    "name": "Red Palm Oil",
    "category": "Oils"
  },
  {
    "id": "raw_cashew_nuts",
    "name": "Raw Cashew Nuts",
    "category": "Pantry & Grains"
  },
  {
    "id": "freekeh",
    "name": "Freekeh",
    "category": "Pantry & Grains"
  },
  {
    "id": "sri_lankan_raw_curry_powder",
    "name": "Sri Lankan raw curry powder",
    "category": "Spices & Herbs"
  },
  {
    "id": "pandan_leaf",
    "name": "Pandan leaf",
    "category": "Spices & Herbs"
  },
  {
    "id": "curry_leaves",
    "name": "Curry leaves",
    "category": "Spices & Herbs"
  },
  {
    "id": "toasted_sesame_powder",
    "name": "Toasted sesame powder",
    "category": "Pantry & Grains"
  },
  {
    "id": "vietnamese_coffee_grounds",
    "name": "Vietnamese robusta coffee grounds",
    "category": "Pantry & Grains"
  },
  {
    "id": "terasi",
    "name": "Terasi (shrimp paste)",
    "category": "Pantry & Grains"
  },
  {
    "id": "koshian",
    "name": "Koshian (smooth sweet red bean paste)",
    "category": "Pantry & Grains"
  },
  {
    "id": "kanten_powder",
    "name": "Kanten powder (agar-agar)",
    "category": "Pantry & Grains"
  },
  {
    "id": "buchimgaru",
    "name": "Korean pancake mix (Buchimgaru)",
    "category": "Pantry & Grains"
  },
  {
    "id": "char_siu",
    "name": "Char siu (Chinese BBQ pork)",
    "category": "Proteins"
  },
  {
    "id": "shaoxing_wine",
    "name": "Shaoxing wine",
    "category": "Pantry & Grains"
  },
  {
    "id": "loomi",
    "name": "Dried black lime",
    "category": "Spices & Herbs"
  },
  {
    "id": "iraqi_flatbread",
    "name": "Iraqi flatbread (Khubz)",
    "category": "Pantry & Grains"
  },
  {
    "id": "light_roasted_coffee_beans",
    "name": "Lightly roasted Arabic coffee beans",
    "category": "Pantry & Grains"
  },
  {
    "id": "yellow_split_peas",
    "name": "Yellow split peas",
    "category": "Pantry & Grains"
  },
  {
    "id": "biber_salcasi",
    "name": "Turkish pepper paste (Biber Salçası)",
    "category": "Pantry & Grains"
  },
  {
    "id": "kabouli_masala",
    "name": "Omani Kabouli spice mix",
    "category": "Spices & Herbs"
  },
  {
    "id": "adjuma_pepper",
    "name": "Adjuma pepper",
    "category": "Vegetables"
  },
  {
    "id": "piri_piri_peppers",
    "name": "Piri-piri peppers",
    "category": "Vegetables"
  },
  {
    "id": "finger_millet_flour",
    "name": "Finger millet flour",
    "category": "Pantry & Grains"
  },
  {
    "id": "sorghum_flour",
    "name": "Sorghum flour",
    "category": "Pantry & Grains"
  },
  {
    "id": "sweet_potato_puree",
    "name": "Sweet potato puree",
    "category": "Vegetables"
  },
  {
    "id": "rice_vermicelli_noodles",
    "name": "Rice Vermicelli Noodles",
    "category": "Pantry & Grains"
  },
  {
    "id": "kecap_manis",
    "name": "Kecap Manis (Sweet Soy Sauce)",
    "category": "Pantry & Grains"
  },
  {
    "id": "galangal",
    "name": "Galangal",
    "category": "Spices & Herbs"
  },
  {
    "id": "tamarind_paste",
    "name": "Tamarind Paste",
    "category": "Pantry & Grains"
  },
  {
    "id": "panko_breadcrumbs",
    "name": "Panko Breadcrumbs",
    "category": "Pantry & Grains"
  },
  {
    "id": "tonkatsu_sauce",
    "name": "Tonkatsu Sauce",
    "category": "Pantry & Grains"
  },
  {
    "id": "sweet_potato_glass_noodles",
    "name": "Sweet Potato Glass Noodles (Dangmyeon)",
    "category": "Pantry & Grains"
  },
  {
    "id": "glutinous_rice_flour",
    "name": "Glutinous Rice Flour",
    "category": "Pantry & Grains"
  },
  {
    "id": "black_sesame_seeds",
    "name": "Black Sesame Seeds",
    "category": "Spices & Herbs"
  },
  {
    "id": "iraqi_7_spice_blend",
    "name": "Iraqi 7-Spice Blend",
    "category": "Spices & Herbs"
  },
  {
    "id": "harees_wheat",
    "name": "Whole Wheat Grains (Harees Wheat)",
    "category": "Pantry & Grains"
  },
  {
    "id": "mandi_spice_mix",
    "name": "Mandi Spice Mix",
    "category": "Spices & Herbs"
  },
  {
    "id": "dried_limes_loomi",
    "name": "Dried Limes (Loomi)",
    "category": "Spices & Herbs"
  },
  {
    "id": "jareesh_cracked_wheat",
    "name": "Coarsely Ground Wheat (Jareesh)",
    "category": "Pantry & Grains"
  },
  {
    "id": "knafeh_pastry_kataifi_dough",
    "name": "Knafeh Pastry (Kataifi Dough)",
    "category": "Pantry & Grains"
  },
  {
    "id": "nabulsi_cheese",
    "name": "Nabulsi Cheese",
    "category": "Proteins"
  },
  {
    "id": "moghrabieh_giant_couscous",
    "name": "Moghrabieh (Giant Cousrum)",
    "category": "Pantry & Grains"
  },
  {
    "id": "red_pepper_paste_biber_salcasi",
    "name": "Red Pepper Paste (Biber Salçası)",
    "category": "Pantry & Grains"
  },
  {
    "id": "rewena_starter",
    "name": "Rewena Starter",
    "category": "Pantry & Grains"
  },
  {
    "id": "nangai_nuts",
    "name": "Nangai Nuts",
    "category": "Pantry & Grains"
  },
  {
    "id": "aibika",
    "name": "Aibika",
    "category": "Vegetables"
  },
  {
    "id": "farmers_cheese",
    "name": "Farmer's Cheese",
    "category": "Proteins"
  },
  {
    "id": "walnuts",
    "name": "Walnuts",
    "category": "Pantry & Grains"
  },
  {
    "id": "grape_juice",
    "name": "Grape Juice",
    "category": "Pantry & Grains"
  },
  {
    "id": "lamb_shoulder",
    "name": "Lamb Shoulder",
    "category": "Proteins"
  },
  {
    "id": "cocoa_powder",
    "name": "Unsweetened Cocoa Powder",
    "category": "Pantry & Grains"
  },
  {
    "id": "camembert_cheese",
    "name": "Camembert Cheese",
    "category": "Proteins"
  },
  {
    "id": "sweet_paprika_powder",
    "name": "Sweet Paprika Powder",
    "category": "Spices & Herbs"
  },
  {
    "id": "caraway_seeds",
    "name": "Caraway Seeds",
    "category": "Spices & Herbs"
  },
  {
    "id": "lager_beer",
    "name": "Lager Beer",
    "category": "Pantry & Grains"
  },
  {
    "id": "active_dry_yeast",
    "name": "Active Dry Yeast",
    "category": "Pantry & Grains"
  },
  {
    "id": "sour_cream",
    "name": "Sour Cream",
    "category": "Proteins"
  },
  {
    "id": "grated_cheese",
    "name": "Grated Cheese",
    "category": "Proteins"
  },
  {
    "id": "vanilla_ice_cream",
    "name": "Vanilla Ice Cream",
    "category": "Pantry & Grains"
  },
  {
    "id": "whipped_cream",
    "name": "Whipped Cream",
    "category": "Pantry & Grains"
  },
  {
    "id": "chocolate_shavings",
    "name": "Chocolate Shavings",
    "category": "Pantry & Grains"
  },
  {
    "id": "mulato_chile",
    "name": "Mulato Chile",
    "category": "Spices & Herbs"
  },
  {
    "id": "pasilla_chile",
    "name": "Pasilla Chile",
    "category": "Spices & Herbs"
  },
  {
    "id": "mexican_chocolate_unsweetened",
    "name": "Mexican Chocolate (unsweetened)",
    "category": "Pantry & Grains"
  },
  {
    "id": "tomatillos",
    "name": "Tomatillos",
    "category": "Vegetables"
  },
  {
    "id": "plantain",
    "name": "Plantain",
    "category": "Vegetables"
  },
  {
    "id": "pepitas_pumpkin_seeds",
    "name": "Pepitas (Pumpkin Seeds)",
    "category": "Pantry & Grains"
  },
  {
    "id": "almonds",
    "name": "Almonds",
    "category": "Pantry & Grains"
  },
  {
    "id": "raisins",
    "name": "Raisins",
    "category": "Pantry & Grains"
  },
  {
    "id": "cumin_powder",
    "name": "Cumin Powder",
    "category": "Spices & Herbs"
  },
  {
    "id": "cinnamon_stick",
    "name": "Cinnamon Stick",
    "category": "Spices & Herbs"
  },
  {
    "id": "anise_seeds",
    "name": "Anise Seeds",
    "category": "Spices & Herbs"
  },
  {
    "id": "dried_thyme",
    "name": "Dried Thyme",
    "category": "Spices & Herbs"
  },
  {
    "id": "dried_marjoram",
    "name": "Dried Marjoram",
    "category": "Spices & Herbs"
  },
  {
    "id": "dried_oregano",
    "name": "Dried Oregano",
    "category": "Spices & Herbs"
  },
  {
    "id": "quince_paste_dulce_de_membrillo",
    "name": "Quince Paste (Dulce de Membrillo)",
    "category": "Pantry & Grains"
  },
  {
    "id": "puff_pastry_sheets",
    "name": "Puff Pastry Sheets",
    "category": "Pantry & Grains"
  },
  {
    "id": "lump_crab_meat",
    "name": "Lump Crab Meat",
    "category": "Proteins"
  },
  {
    "id": "old_bay_seasoning",
    "name": "Old Bay Seasoning",
    "category": "Spices & Herbs"
  },
  {
    "id": "worcestershire_sauce",
    "name": "Worcestershire Sauce",
    "category": "Pantry & Grains"
  },
  {
    "id": "lulo_fruit_naranjilla",
    "name": "Lulo Fruit (Naranjilla)",
    "category": "Vegetables"
  },
  {
    "id": "aji_amarillo_paste",
    "name": "Aji Amarillo Paste",
    "category": "Spices & Herbs"
  },
  {
    "id": "white_bread_crusts_removed",
    "name": "White Bread (crusts removed)",
    "category": "Pantry & Grains"
  },
  {
    "id": "requeijao_brazilian_cream_cheese",
    "name": "Requeijão (Brazilian Cream Cheese)",
    "category": "Pantry & Grains"
  },
  {
    "id": "all_purpose_flour",
    "name": "All-Purpose Flour",
    "category": "Pantry & Grains"
  },
  {
    "id": "breadcrumbs",
    "name": "Breadcrumbs",
    "category": "Pantry & Grains"
  },
  {
    "id": "tree_tomato_tamarillo",
    "name": "Tree Tomato (Tamarillo)",
    "category": "Vegetables"
  },
  {
    "id": "aji_pepper",
    "name": "Ají Pepper",
    "category": "Spices & Herbs"
  },
  {
    "id": "summer_savory_dried",
    "name": "Dried Summer Savory",
    "category": "Spices & Herbs"
  },
  {
    "id": "bone_in_chicken_thighs",
    "name": "Bone-in Chicken Thighs",
    "category": "Proteins"
  },
  {
    "id": "fermented_corn_dough",
    "name": "Fermented Corn Dough",
    "category": "Pantry & Grains"
  },
  {
    "id": "fermented_cassava_dough",
    "name": "Fermented Cassava Dough",
    "category": "Pantry & Grains"
  },
  {
    "id": "smoked_mackerel",
    "name": "Smoked Mackerel",
    "category": "Proteins"
  },
  {
    "id": "desiccated_coconut",
    "name": "Desiccated Coconut",
    "category": "Pantry & Grains"
  },
  {
    "id": "pounded_cassava_leaves",
    "name": "Pounded Cassava Leaves",
    "category": "Vegetables"
  },
  {
    "id": "smoked_catfish",
    "name": "Smoked Catfish",
    "category": "Proteins"
  },
  {
    "id": "brick_pastry_sheets",
    "name": "Brick Pastry Sheets",
    "category": "Pantry & Grains"
  },
  {
    "id": "laughing_cow_cheese",
    "name": "Laughing Cow Cheese",
    "category": "Proteins"
  },
  {
    "id": "palm_oil_dende_oil",
    "name": "Palm Oil (Dendê Oil)",
    "category": "Oils"
  },
  {
    "id": "black_eyed_peas",
    "name": "Black-Eyed Peas",
    "category": "Pantry & Grains"
  },
  {
    "id": "plantain_leaves",
    "name": "Plantain Leaves",
    "category": "Vegetables"
  },
  {
    "id": "vietnamese_coffee",
    "name": "Vietnamese Robusta Coffee",
    "category": "Pantry & Grains"
  },
  {
    "id": "condensed_milk",
    "name": "Sweetened Condensed Milk",
    "category": "Pantry & Grains"
  },
  {
    "id": "heavy_cream",
    "name": "Heavy Whipping Cream",
    "category": "Pantry & Grains"
  },
  {
    "id": "sea_salt",
    "name": "Fine Sea Salt",
    "category": "Spices & Herbs"
  },
  {
    "id": "fermented_kimchi",
    "name": "Fermented Kimchi",
    "category": "Vegetables"
  },
  {
    "id": "kimchi_juice",
    "name": "Kimchi Juice",
    "category": "Pantry & Grains"
  },
  {
    "id": "beef_shank",
    "name": "Beef Shank",
    "category": "Proteins"
  },
  {
    "id": "wheat_noodles",
    "name": "Wheat Noodles",
    "category": "Pantry & Grains"
  },
  {
    "id": "rock_sugar",
    "name": "Rock Sugar",
    "category": "Pantry & Grains"
  },
  {
    "id": "sweet_soy_sauce",
    "name": "Sweet Soy Sauce (Kecap Manis)",
    "category": "Pantry & Grains"
  },
  {
    "id": "agar_agar",
    "name": "Agar Agar Powder",
    "category": "Pantry & Grains"
  },
  {
    "id": "kinako",
    "name": "Roasted Soybean Flour (Kinako)",
    "category": "Pantry & Grains"
  },
  {
    "id": "kuromitsu",
    "name": "Black Sugar Syrup (Kuromitsu)",
    "category": "Pantry & Grains"
  },
  {
    "id": "pork_belly",
    "name": "Pork Belly",
    "category": "Proteins"
  },
  {
    "id": "calamansi_juice",
    "name": "Calamansi Citrus Juice",
    "category": "Pantry & Grains"
  },
  {
    "id": "fenugreek_powder",
    "name": "Fenugreek Powder",
    "category": "Spices & Herbs"
  },
  {
    "id": "kashk",
    "name": "Fermented Whey (Kashk)",
    "category": "Pantry & Grains"
  },
  {
    "id": "dried_mint",
    "name": "Dried Mint",
    "category": "Spices & Herbs"
  },
  {
    "id": "grape_molasses",
    "name": "Grape Molasses (Pekmez)",
    "category": "Pantry & Grains"
  },
  {
    "id": "orange_blossom",
    "name": "Orange Blossom Water",
    "category": "Pantry & Grains"
  },
  {
    "id": "white_fish_fillet",
    "name": "White Fish Fillet",
    "category": "Proteins"
  },
  {
    "id": "sago_starch",
    "name": "Sago Starch",
    "category": "Pantry & Grains"
  },
  {
    "id": "macadamia_nuts",
    "name": "Macadamia Nuts",
    "category": "Pantry & Grains"
  },
  {
    "id": "lemon_myrtle",
    "name": "Lemon Myrtle Powder",
    "category": "Spices & Herbs"
  },
  {
    "id": "corned_beef",
    "name": "Corned Beef",
    "category": "Proteins"
  },
  {
    "id": "jamon_serrano",
    "name": "Jamón Serrano",
    "category": "Proteins"
  },
  {
    "id": "phyllo_pastry",
    "name": "Phyllo Pastry Sheets",
    "category": "Pantry & Grains"
  },
  {
    "id": "burgundy_wine",
    "name": "Red Burgundy Wine",
    "category": "Pantry & Grains"
  },
  {
    "id": "bacon_lardons",
    "name": "Bacon Lardons",
    "category": "Proteins"
  },
  {
    "id": "pearl_onions",
    "name": "Pearl Onions",
    "category": "Vegetables"
  },
  {
    "id": "pine_nuts",
    "name": "Italian Pine Nuts",
    "category": "Pantry & Grains"
  },
  {
    "id": "masa_harina",
    "name": "Masa Harina",
    "category": "Pantry & Grains"
  },
  {
    "id": "refried_beans",
    "name": "Refried Black Beans",
    "category": "Pantry & Grains"
  },
  {
    "id": "mozzarella",
    "name": "Shredded Mozzarella Cheese",
    "category": "Proteins"
  },
  {
    "id": "aji_amarillo",
    "name": "Aji Amarillo Paste",
    "category": "Spices & Herbs"
  },
  {
    "id": "graham_crumbs",
    "name": "Graham Cracker Crumbs",
    "category": "Pantry & Grains"
  },
  {
    "id": "key_lime",
    "name": "Key Lime Juice",
    "category": "Pantry & Grains"
  },
  {
    "id": "apricot_jam",
    "name": "Apricot Jam",
    "category": "Pantry & Grains"
  },
  {
    "id": "hibiscus_flowers",
    "name": "Dried Hibiscus Flowers",
    "category": "Pantry & Grains"
  }
,
  {
    "id": "lumpia_wrappers_new",
    "name": "Lumpia Wrappers",
    "category": "Pantry & Grains"
  },
  {
    "id": "five_spice_new",
    "name": "Five-Spice Powder",
    "category": "Spices & Herbs"
  },
  {
    "id": "sweet_potato_starch_new",
    "name": "Sweet Potato Starch",
    "category": "Pantry & Grains"
  },
  {
    "id": "thai_basil_new",
    "name": "Fresh Thai Basil",
    "category": "Vegetables"
  },
  {
    "id": "pandan_leaves_new",
    "name": "Fresh Pandan Leaves",
    "category": "Vegetables"
  },
  {
    "id": "anchovies_new",
    "name": "Dried Anchovies",
    "category": "Proteins"
  },
  {
    "id": "rice_koji_new",
    "name": "Fermented Rice Koji",
    "category": "Pantry & Grains"
  },
  {
    "id": "mung_beans_new",
    "name": "Peeled Mung Beans",
    "category": "Pantry & Grains"
  },
  {
    "id": "shaved_ice_new",
    "name": "Shaved Ice",
    "category": "Pantry & Grains"
  },
  {
    "id": "baking_soda_new",
    "name": "Baking Soda",
    "category": "Pantry & Grains"
  },
  {
    "id": "tahini_new",
    "name": "Tahini Sesame Paste",
    "category": "Pantry & Grains"
  },
  {
    "id": "pomegranate_seeds_new",
    "name": "Pomegranate Seeds",
    "category": "Vegetables"
  },
  {
    "id": "dried_limes_new",
    "name": "Dried Limes (Loomi)",
    "category": "Spices & Herbs"
  },
  {
    "id": "green_chilies_new",
    "name": "Green Chilies",
    "category": "Vegetables"
  },
  {
    "id": "salep_powder_new",
    "name": "Salep Orchid Powder",
    "category": "Pantry & Grains"
  },
  {
    "id": "banana_leaves_new",
    "name": "Banana Leaves",
    "category": "Pantry & Grains"
  },
  {
    "id": "taro_leaves_new",
    "name": "Fresh Taro Leaves",
    "category": "Vegetables"
  },
  {
    "id": "passion_fruit_new",
    "name": "Passion Fruit Puree",
    "category": "Pantry & Grains"
  },
  {
    "id": "guava_nectar_new",
    "name": "Guava Nectar",
    "category": "Pantry & Grains"
  },
  {
    "id": "yeast_new",
    "name": "Active Dry Yeast",
    "category": "Pantry & Grains"
  },
  {
    "id": "farmers_cheese_new",
    "name": "Farmer's Cheese",
    "category": "Proteins"
  },
  {
    "id": "black_olives_new",
    "name": "Black Kalamata Olives",
    "category": "Pantry & Grains"
  },
  {
    "id": "capers_new",
    "name": "Capers",
    "category": "Pantry & Grains"
  },
  {
    "id": "mussels_new",
    "name": "Fresh Mussels",
    "category": "Proteins"
  },
  {
    "id": "clams_new",
    "name": "Fresh Clams",
    "category": "Proteins"
  },
  {
    "id": "seafood_broth_new",
    "name": "Seafood Broth",
    "category": "Pantry & Grains"
  },
  {
    "id": "marzipan_new",
    "name": "Green Marzipan",
    "category": "Pantry & Grains"
  },
  {
    "id": "custard_powder_new",
    "name": "Vanilla Custard Powder",
    "category": "Pantry & Grains"
  },
  {
    "id": "masa_harina_new",
    "name": "Masa Harina",
    "category": "Pantry & Grains"
  },
  {
    "id": "aji_amarillo_new",
    "name": "Aji Amarillo Yellow Chili Paste",
    "category": "Spices & Herbs"
  },
  {
    "id": "pork_belly_new",
    "name": "Pork Belly (Chicharrón)",
    "category": "Proteins"
  },
  {
    "id": "arepa_new",
    "name": "Pre-cooked Corn Arepas",
    "category": "Pantry & Grains"
  },
  {
    "id": "red_wine_vinegar_new",
    "name": "Red Wine Vinegar",
    "category": "Pantry & Grains"
  },
  {
    "id": "clamato_juice_new",
    "name": "Clamato Tomato-Clam Juice",
    "category": "Pantry & Grains"
  },
  {
    "id": "chocolate_sprinkles_new",
    "name": "Chocolate Sprinkles",
    "category": "Pantry & Grains"
  },
  {
    "id": "nutmeg_new",
    "name": "Ground Nutmeg",
    "category": "Spices & Herbs"
  }
,
  {
    "id": "dashi",
    "name": "Dashi Broth/Powder",
    "category": "Pantry & Grains"
  },
  {
    "id": "orange_zest",
    "name": "Fresh Orange Zest",
    "category": "Spices & Herbs"
  },
  {
    "id": "raspberries",
    "name": "Fresh Raspberries",
    "category": "Vegetables"
  },
  {
    "id": "cherries",
    "name": "Fresh Sour Cherries",
    "category": "Vegetables"
  },
  {
    "id": "pineapple",
    "name": "Fresh Pineapple",
    "category": "Vegetables"
  },
  {
    "id": "teff_flour",
    "name": "Teff Flour",
    "category": "Pantry & Grains"
  }
,
  {
    "id": "chicken_thighs",
    "name": "Chicken Thighs (boneless)",
    "category": "Proteins"
  },
  {
    "id": "pork_loin",
    "name": "Pork Loin Slices",
    "category": "Proteins"
  },
  {
    "id": "pandan_leaves",
    "name": "Fresh Pandan Leaves/Extract",
    "category": "Spices & Herbs"
  },
  {
    "id": "vermicelli",
    "name": "Vermicelli Noodles",
    "category": "Pantry & Grains"
  },
  {
    "id": "piloncillo",
    "name": "Piloncillo (Mexican Raw Cane Sugar)",
    "category": "Pantry & Grains"
  },
  {
    "id": "hominy_corn",
    "name": "White Hominy Corn (Pozole)",
    "category": "Pantry & Grains"
  },
  {
    "id": "pumpkin_seeds",
    "name": "Raw Pumpkin Seeds (Pepitoria)",
    "category": "Pantry & Grains"
  },
  {
    "id": "bolillo_bread",
    "name": "Bolillo or French Bread Rolls",
    "category": "Pantry & Grains"
  }
];


export const BASE_COURSE_OVERRIDES: Record<string, string> = {
  "indian-mango-lassi": "Drinks",
  "vietnamese-nuoc-cham": "Condiments",
  "indian-masala-chai": "Drinks",
  "japanese-gyoza": "Appetizers",
  "japanese-gomaae": "Appetizers",
  "maldivian-mas-huni": "Main Courses",
  "asian-snack-japanese-dorayaki": "Desserts",
  "asian-snack-thai-khanom-krok": "Snacks",
  "asian-snack-japanese-gyoza-veggie": "Appetizers",
  "asian-snack-japanese-takoyaki": "Appetizers",
  "asian-vietnam-snack-banh-xeo": "Main Courses",
  "korean-hotteok-sweet-pancake": "Desserts",
  "asian-philippines-snack-turon": "Desserts",
  "sweet-soy-salmon": "Main Courses",
  "thai-sweet-green-papaya-pickle": "Condiments",
  "thai-mango-sticky-rice": "Desserts",
  "asian-dessert-chinese-mango-pudding": "Desserts",
  "asian-dessert-philippine-leche-flan": "Desserts",
  "asian-dessert-vietnamese-che-ba-mau": "Desserts"
};

export const TIPS: Tip[] = [
  {
    id: "spice-storage",
    category: "Storage Tips",
    title: "Perfect Spices Storage",
    description: "Keep deshi ginger-garlic paste and ground spices fresh and flavorful for months.",
    fullContent: "To store spices perfectly:\n\n1. Keep ginger-garlic paste frozen in small ice cube trays. Pop one out whenever you are preparing a quick traditional curry!\n2. Store whole and ground spices in airtight glass containers away from direct sunlight, heat, and moisture to prevent essential oils from evaporating.\n3. Label your spice jars with the date of grinding/purchase—ground spices lose their potency after 6 months."
  },
  {
    id: "mustard-paste",
    category: "Kitchen Hacks",
    title: "Preventing Bitter Mustard Paste",
    description: "Stop traditional Shorshe (mustard) paste from turning bitter when ground.",
    fullContent: "When grinding mustard seeds for deshi Shorshe-based dishes, the friction can release compounds that taste unpleasantly bitter.\n\nTo prevent this:\n\n1. Always add a pinch of salt and 1-2 green chilies to the mustard seeds before blending or grinding on a sheel-pata.\n2. Use cold water or a splash of vinegar instead of warm water.\n3. Do not over-grind; stop as soon as a smooth, uniform paste forms."
  },
  {
    id: "green-chilies",
    category: "Storage Tips",
    title: "Keeping Green Chilies Fresh",
    description: "Keep green chilies crisp, vibrant, and hot for up to three weeks.",
    fullContent: "Green chilies rot quickly if moisture collects near their stems.\n\nTo preserve them:\n\n1. Carefully pluck the green stems off the chilies—this is where decay usually starts.\n2. Wash them thoroughly and spread them on a clean towel until they are 100% bone-dry.\n3. Place them in an airtight glass container lined with a dry paper towel to absorb any condensation, and store them in the refrigerator."
  }
];

export const CONTESTS: Contest[] = [
  {
    id: "biryani-challenge",
    title: "Ultimate Biryani Challenge",
    description: "Share your family's secret recipe for Kacchi, Tehari, or Pulao. Highlight your unique spice blends and cooking methods.",
    prize: "$500 Gift Voucher",
    deadline: "July 31, 2026",
    status: "Active",
    entriesCount: 42
  },
  {
    id: "khichuri-fiesta",
    title: "Monsoon Comfort Khichuri",
    description: "Showcase the perfect rainy day meal pairing creative Bhortas (mashes) with perfectly spiced Bhuna Khichuri.",
    prize: "$300 Gift Voucher",
    deadline: "August 15, 2026",
    status: "Active",
    entriesCount: 28
  },
  {
    id: "pitha-utshob",
    title: "Winter Pitha Celebration",
    description: "Celebrate the heritage of sweet and savory rice cakes like Bhapa, Patishapta, or Chitoi Pitha.",
    prize: "$400 Gift Voucher",
    deadline: "December 20, 2026",
    status: "Voting",
    entriesCount: 95
  }
];



export function getRecipeRegion(recipe: any): string {
  const cuisine = (recipe.cuisine || "").toLowerCase();
  const id = (recipe.id || "").toLowerCase();
  if (
    cuisine.includes("nigerian") || cuisine.includes("ghanaian") || cuisine.includes("african") ||
    cuisine.includes("senegalese") || cuisine.includes("ethiopian") || cuisine.includes("moroccan") ||
    cuisine.includes("tunisian") || cuisine.includes("egyptian") || cuisine.includes("algerian") ||
    cuisine.includes("libyan") || cuisine.includes("somali") || cuisine.includes("south african") ||
    cuisine.includes("zimbabwean") || cuisine.includes("angolan") || cuisine.includes("cameroonian") ||
    cuisine.includes("congolese") || cuisine.includes("ivory coast") || cuisine.includes("mozambican") ||
    cuisine.includes("tanzanian") || cuisine.includes("mauritian") || cuisine.includes("kenyan") ||
    cuisine.includes("sudanese") || cuisine.includes("madagascan") || id.includes("jollof") ||
    id.includes("maffe") || id.includes("chakalaka") || id.includes("bobotie") || id.includes("harissa") ||
    id.includes("koshary") || id.includes("koshari") || id.startsWith("african-") || id.startsWith("africa-")
  ) {
    return "African Cuisines";
  } else if (
    cuisine.includes("middle eastern") || cuisine.includes("turkish") || cuisine.includes("lebanese") ||
    cuisine.includes("persian") || cuisine.includes("jordanian") || cuisine.includes("syrian") ||
    cuisine.includes("iraqi") || cuisine.includes("palestinian") || cuisine.includes("saudi") ||
    cuisine.includes("yemeni") || (cuisine.includes("omani") && !cuisine.includes("romanian")) || cuisine.includes("kuwaiti") ||
    cuisine.includes("iranian") || cuisine.includes("qatari") || cuisine.includes("bahraini") ||
    id.includes("falafel") || id.includes("hummus") || id.includes("shakshuka") || id.includes("mujadara") ||
    id.includes("sabzi-polo") || id.includes("saksuka") || id.includes("limonana") || id.startsWith("middleeast-") || id.startsWith("middleeastern-")
  ) {
    return "Middle Eastern Cuisines";
  } else if (
    cuisine.includes("australian") || cuisine.includes("oceanian") || cuisine.includes("fijian") ||
    cuisine.includes("maori") || cuisine.includes("tongan") || cuisine.includes("samoan") ||
    cuisine.includes("tahitian") || cuisine.includes("hawaiian") || cuisine.includes("polynesian") ||
    cuisine.includes("new zealand") || cuisine.includes("vanuatu") || cuisine.includes("cook islands") ||
    cuisine.includes("solomon islands") || cuisine.includes("kiribati") || cuisine.includes("palauan") ||
    cuisine.includes("niuean") || cuisine.includes("tuvaluan") || cuisine.includes("marshallese") ||
    cuisine.includes("nauruan") || cuisine.includes("tokelauan") || cuisine.includes("wallisian") ||
    cuisine.includes("guamanian") || id.includes("kangaroo") || id.includes("cooler") ||
    id.includes("parai") || id.includes("maori") || id.startsWith("oceanian-") || id.startsWith("oceania-")
  ) {
    return "Oceanian Cuisines";
  } else if (
    cuisine.includes("romanian") || cuisine.includes("swedish") || cuisine.includes("french") || cuisine.includes("spanish") ||
    cuisine.includes("italian") || cuisine.includes("greek") || cuisine.includes("ukrainian") ||
    cuisine.includes("british") || cuisine.includes("german") || cuisine.includes("hungarian") ||
    cuisine.includes("austrian") || cuisine.includes("polish") || cuisine.includes("irish") ||
    cuisine.includes("swiss") || cuisine.includes("belgian") || cuisine.includes("portuguese") ||
    cuisine.includes("georgian") || cuisine.includes("cypriot") || cuisine.includes("finnish") || id.includes("carbonara") ||
    id.includes("goulash") || id.includes("cacio-e-pepe") || id.includes("meatballs") ||
    id.includes("caldo-verde") || id.includes("pierogi") || id.includes("waffles") ||
    id.includes("crepes") || id.includes("borscht") || id.includes("colcannon") ||
    id.includes("rosti") || id.includes("bubble-squeak") || id.includes("halloumi") || id.startsWith("european-") || id.startsWith("europe-")
  ) {
    return "European Cuisines";
  } else if (
    cuisine.includes("mexican") || cuisine.includes("cuban") || cuisine.includes("colombian") ||
    cuisine.includes("peruvian") || cuisine.includes("brazilian") || cuisine.includes("jamaican") ||
    cuisine.includes("canadian") || cuisine.includes("argentinian") || cuisine.includes("salvadoran") ||
    cuisine.includes("ecuadorian") || cuisine.includes("costa rican") || cuisine.includes("caribbean") ||
    cuisine.includes("american") || cuisine.includes("usa") || cuisine.includes("bolivian") ||
    cuisine.includes("venezuelan") || cuisine.includes("chilean") || cuisine.includes("puerto rican") ||
    cuisine.includes("guatemalan") || id.includes("guacamole") || id.includes("pupusas") ||
    id.includes("arepas") || id.includes("ropa-vieja") || id.includes("poutine") ||
    id.includes("gallo-pinto") || id.includes("moqueca") || id.includes("chimichurri") ||
    id.includes("lomo-saltado") || id.includes("llapingachos") || id.startsWith("americas-") || id.startsWith("american-") || id.startsWith("centralamerica-") || id.startsWith("southamerica-") || id.startsWith("northamerica-")
  ) {
    return "American Cuisines";
  } else {
    return "Asian Cuisines";
  }
}

// --- BEGIN MERGED EXPORTS ---
import { ADDITIONAL_INGREDIENTS, ADDITIONAL_RECIPES, ADDITIONAL_COURSE_OVERRIDES } from "./additional_recipes";

export const COURSE_OVERRIDES: Record<string, string> = {
  ...BASE_COURSE_OVERRIDES,
  ...ADDITIONAL_COURSE_OVERRIDES
};

export function getRecipeCourse(recipe: any, overrides: Record<string, string> = COURSE_OVERRIDES): string {
  const id = recipe.id.toLowerCase();
  if (overrides && overrides[recipe.id]) {
    return overrides[recipe.id];
  }
  if (id.includes("-snack") || id.includes("snack")) {
    return "Snacks";
  }
  if (id.includes("-appetizer") || id.includes("appetizer")) {
    return "Appetizers";
  }
  if (id.includes("-main") || id.includes("main")) {
    return "Main Courses";
  }
  if (id.includes("-condiment") || id.includes("condiment") || id.includes("sauce") || id.includes("chutney")) {
    return "Condiments";
  }
  if (id.includes("-drink") || id.includes("drink") || id.includes("beverage")) {
    return "Drinks";
  }
  if (id.includes("-dessert") || id.includes("dessert") || id.includes("sweet") || (recipe.category as string) === "Dessert") {
    return "Desserts";
  }
  if ((recipe.category as string) === "Dessert") return "Desserts";
  if ((recipe.category as string) === "Snacks") return "Snacks";
  return "Main Courses";
}

export const INGREDIENTS: Ingredient[] = [
  ...BASE_INGREDIENTS,
  ...ADDITIONAL_INGREDIENTS
];

export const RECIPES: Recipe[] = [
  ...BASE_RECIPES,
  ...ADDITIONAL_RECIPES
];

export interface Ingredient {
  id: string;
  name: string;
  category: "Proteins" | "Vegetables" | "Pantry & Grains" | "Spices & Herbs" | "Oils";
  banglaName?: string;
  icon?: string;
}

export interface RecipeIngredient {
  name: string;
  baseAmount: number; // amount for base servings
  unit: string;
}

export interface Recipe {
  id: string;
  name: string;
  cuisine: string;
  category: "Curry" | "Rice & Grain" | "Dessert" | "Global" | "Snacks";
  prepTime: number; // in mins
  cookTime: number; // in mins
  baseServings: number;
  ingredients: RecipeIngredient[];
  requiredIngredients: string[]; // matching lowercase ingredient ids
  steps: string[];
  story: string;
  difficulty: "Easy" | "Medium" | "Expert";
  author: string;
}

export interface Tip {
  id: string;
  title: string;
  category: "Kitchen Hacks" | "Storage Tips" | "Spices Guide";
  description: string;
  fullContent: string;
}

export interface Contest {
  id: string;
  title: string;
  prize: string;
  deadline: string;
  description: string;
  status: "Active" | "Voting" | "Completed";
  entriesCount: number;
}

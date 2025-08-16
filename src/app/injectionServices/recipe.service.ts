import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "../models/recipe.model";
import { Ingredient } from "../models/ingredient.model";
import { ShoppingListService } from "./shoppingList.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {

  recipeChanged = new Subject<Recipe[]>();
// this service will be used to manage array of recipes
  private recipes: Recipe[] = [
      {
        name: 'Spaghetti Bolognese',
        description: 'A classic Italian pasta dish with a rich meat sauce.',
         imgPath: 'assets/pic_1.jpg',
        ingredients: [
          { name: 'Spaghetti', amount: 200 },
        { name: 'Ground Beef', amount: 300 }
        ]
      },
      {
        name: 'Chicken Curry',
        description: 'A spicy and flavorful chicken curry with aromatic spices.',
        imgPath: 'assets/pic_2.jpg',
        ingredients: [
          { name: 'Chicken', amount: 400 },
          { name: 'Curry Powder', amount: 50 }
        ]
      },
      {
        name: 'Vegetable Stir Fry',
        description: 'A quick and healthy stir fry with seasonal vegetables.',
        imgPath: 'assets/pic_3.jpg',
        ingredients: [
          { name: 'Mixed Vegetables', amount: 300 },
          { name: 'Soy Sauce', amount: 50 }
        ]
      }
  ];
  // private recipes: Recipe[] = [];
  constructor(private shoppingListService: ShoppingListService) {
    // You can initialize any properties or services here if needed
  }



  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipeById(id: number): Recipe {
    return this.recipes[id];
  }

  addRecipeToShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.addIngredientsFromRecipeService(ingredients);
  }


  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
}

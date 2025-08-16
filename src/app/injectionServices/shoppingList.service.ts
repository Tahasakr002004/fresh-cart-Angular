import { Subject } from "rxjs";
import { Ingredient } from "../models/ingredient.model";

export class ShoppingListService {


  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  // this service will be used to manage array of ingredients
 private ingredients:Ingredient[] = [
      { name: 'Apples', amount: 5 },
      { name: 'Tomatoes', amount: 10 },
      { name: 'Bananas', amount: 3 }
  ];


  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  updateIngredient(index: number, newIngredient: Ingredient): void {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number): void {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  clearIngredients(): void {
    this.ingredients = [];
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }




  addIngredientsFromRecipeService(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}

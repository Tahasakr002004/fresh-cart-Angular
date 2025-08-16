import { Component,  OnDestroy,  OnInit } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from '../injectionServices/shoppingList.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  standalone: false,
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',

})
export class ShoppingListComponent implements OnInit, OnDestroy {


  ingredients!: Ingredient[];
  private igChangeSubscription!: Subscription;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.igChangeSubscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }


  ngOnDestroy(): void {
    this.igChangeSubscription.unsubscribe();
  }
  onIngredientAdded(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);

  }

  onEditItem(ingredient: Ingredient): void {
    const index = this.ingredients.indexOf(ingredient);
    this.shoppingListService.startedEditing.next(index);
  }

}

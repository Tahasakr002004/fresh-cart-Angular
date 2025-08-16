import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../models/ingredient.model';
import { ShoppingListService } from '../../injectionServices/shoppingList.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  standalone: false,
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'] // ✅ typo: was styleUrl instead of styleUrls
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingListForm') shoppingListForm!: NgForm;
  private subscription!: Subscription;

  editMode = false;
  editedItemIndex!: number;
  editedItem!: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    //  Store the subscription so we can unsubscribe later
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);

        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });

        console.log('Editing item:', this.editedItem);
      }
    );
  }

  onSubmitItem(form: NgForm): void {
    const { name, amount } = form.value;
    const newIngredient = new Ingredient(name, amount);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
      console.log('Updated ingredient:', newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
      console.log('Added new ingredient:', newIngredient);
    }
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe(); // prevent memory leaks
    }
  }



  onDeleteItem(): void {
    // Logic to delete an item from the shopping list
    if (this.editMode) {
      this.shoppingListService.deleteIngredient(this.editedItemIndex);
      this.onClear();
    }
    console.log('Deleted ingredient at index:', this.editedItemIndex);
    this.editMode = false;

  }
  onClear(): void {
    this.shoppingListForm.reset();
    this.editMode = false;
    console.log('Form cleared');

  }




}

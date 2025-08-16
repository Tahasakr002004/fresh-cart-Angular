import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from '../../../injectionServices/recipe.service';

@Component({
  selector: 'app-recipe-item',
  standalone: false,
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe!: Recipe;
  @Input() index!: number;

  constructor(private recipeService: RecipeService) {
    // You can initialize any properties or services here if needed
  }

  ngOnInit(): void {
    // This method is called after the component is initialized
  }



}

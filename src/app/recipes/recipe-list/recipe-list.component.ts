import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../injectionServices/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipe-list',
  standalone: false,
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent  implements OnInit , OnDestroy{
  recipes!: Recipe[];
  subscription!: Subscription;


  constructor(private recipeService: RecipeService , private router: Router, private activatedRoute: ActivatedRoute) {
    // You can initialize any properties or services here if needed

  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
   this.subscription = this.recipeService.recipeChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }
  onNewRecipe() {
    // Navigate to the recipe edit page for creating a new recipe
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

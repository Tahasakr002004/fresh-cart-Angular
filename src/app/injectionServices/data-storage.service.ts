import { FormArray } from '@angular/forms';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { RecipeService } from "./recipe.service";
import { Recipe } from "../models/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs";
import { RecipesComponent } from '../recipes/recipes.component';
import { AuthService } from './auth.service';




@Injectable({ providedIn: 'root' })
export class DataStorageService {
  // Service logic here
  constructor( private http: HttpClient, private recipeService: RecipeService, private AuthService: AuthService ) {
    // Constructor logic here

  }

  // Method to store data
  storeRecipes() {
    // Logic to store data

    const recipes = this.recipeService.getRecipes();
    this.http.put('https://freshcartan-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes)
      .subscribe(response => {
        console.log('Data stored successfully:', response);
      });
  }

  // Method to fetch data
  fetchRecipes() {
    // Logic to fetch data
    this.AuthService.user.pipe(
      take(1),
      exhaustMap(user => {
          return this.http.get<Recipe[]>('https://freshcartan-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
            , {
              params: new HttpParams().set('auth', user?.token ? user.token : '')
            }
          )
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : new FormArray([])
          };
        });
      }),
      tap((recipes: any) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }


}

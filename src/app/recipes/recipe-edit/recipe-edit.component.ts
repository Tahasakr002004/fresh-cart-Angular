import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../injectionServices/recipe.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from '../../models/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  standalone: false,
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {

  id!: number;
  editMode = false;
  recipeForm!: FormGroup;
  constructor(private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService, private router:Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
        console.log('Edit Mode:', this.editMode);
        console.log('Recipe ID:', this.id);
      }
    );
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray<FormGroup>([]);


    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imgPath;
      recipeDescription = recipe.description;

      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name , Validators.required),
              'amount': new FormControl(ingredient.amount , [Validators.required, Validators.min(1)])
            })
             )
          }
       }

    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
      'imgPath': new FormControl(recipeImagePath,Validators.required),
      'description': new FormControl(recipeDescription,Validators.required),
      'ingredients': recipeIngredients
    });
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }


  OnSubmit() {
    console.log(this.recipeForm);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.recipeForm.reset();
    this.onCancel();
 }

  OnAddIngredient() {
   return  (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null ,Validators.required),
        'amount': new FormControl(null,[Validators.required, Validators.min(1)] )
      })
    )
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
  onDeleteIngredient(index:number) {
    (<FormArray> this.recipeForm.get('ingredients')).removeAt(index);
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule), pathMatch: 'full' },
    { path: 'shopping-list', loadChildren: () => import('./shopping-list/shoppingList.module').then(m => m.ShoppingListModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,{preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})


export class AppRoutingModule { }


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../authentication/auth.guard';
import { ShoppingListComponent } from './shopping-list.component';


const routes: Routes = [
   {
     path: '', component: ShoppingListComponent,
     canActivate: [AuthGuard]
   }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ShoppingListRoutingModule { }

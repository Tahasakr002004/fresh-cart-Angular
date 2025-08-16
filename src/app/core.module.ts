import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthInterceptorService } from './authentication/auth-interceptor.service';
import { AuthService } from './injectionServices/auth.service';
import { DataStorageService } from './injectionServices/data-storage.service';
import { RecipeService } from './injectionServices/recipe.service';
import { ShoppingListService } from './injectionServices/shoppingList.service';

@NgModule({
  declarations: [

  ],
  exports: [

  ],
  imports: [


  ],
  providers: [ShoppingListService, RecipeService, AuthService, DataStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule {}

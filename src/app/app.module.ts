import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {  HttpClientModule } from '@angular/common/http';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';
// import { RecipesModule } from './recipes/recipes.modules';
// import { ShoppingListModule } from './shopping-list/shoppingList.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { AuthenticationModule } from './authentication/authentication.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PlaceholderDirective,
    // RecipesModule,
    // ShoppingListModule,
    SharedModule,
    CoreModule,
    AuthenticationModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

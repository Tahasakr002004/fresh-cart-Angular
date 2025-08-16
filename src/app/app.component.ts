import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from './injectionServices/shoppingList.service';
import { AuthService } from './injectionServices/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',

})


export class AppComponent implements OnInit {


  constructor(private authService: AuthService) {
    // Constructor logic here
    console.log('AppComponent initialized');
  }


  ngOnInit() {
    this.authService.autoLogin();
  }

  title = 'fresh-cart';






}

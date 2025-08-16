import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../injectionServices/data-storage.service';
import { AuthService } from '../injectionServices/auth.service';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  private userSubscription!: Subscription;
  isAuthenticated = false;




  constructor( private dataStorageService: DataStorageService, private authService: AuthService ) {
    // Constructor logic here
  }

  ngOnInit() {
    // Initialization logic here
    this.userSubscription = this.authService.user.subscribe(
      user => {
        this.isAuthenticated = !user ? false : true; // Check if user is authenticated
        console.log('User authentication status:', this.isAuthenticated);
      }
    );
  }
  onSaveData() {
    // Logic to save data
    console.log('Data saved');
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    // Logic to fetch data
    this.dataStorageService.fetchRecipes();
    console.log('Data fetched');
  }


  onLogout() {
    // Logic to log out the user
    this.authService.logout();
  }
  ngOnDestroy() {
    // Cleanup logic here
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}

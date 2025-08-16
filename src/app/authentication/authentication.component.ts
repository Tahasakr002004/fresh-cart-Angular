import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from '../injectionServices/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';







@Component({
  selector: 'app-authentication',
  standalone: false,
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;
  @ViewChild(PlaceholderDirective, { static: false }) alertHost!: PlaceholderDirective;




  private closeSubscription!: Subscription

  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {
    // Constructor logic here
  }

  ngOnDestroy() {
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe(); // Unsubscribe to prevent memory leaks
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }


  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    let authObservable: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      // Logic for logging in
      authObservable = this.authService.login(email, password);
    } else {
      // Logic for signing up
      authObservable = this.authService.signup(email, password);
    }

    authObservable.subscribe(
      (response: AuthResponseData) => {
        this.isLoading = false;
        this.router.navigate(['/recipes']); // Navigate to the home page after successful authentication

      },
      error => {
        this.error = 'Authentication failed. Please try again.';
        this.showErrorAlert(this.error);
        this.isLoading = false; // Reset loading state
      }
    );

    form.reset();
  }

  onHandleError() {
    this.error = null; // Clear the error message
  }





  private showErrorAlert(message: string) {
    this.error = message; // Set the error message to be displayed
    // const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear(); // Clear any existing alert components
    const componentRef = hostViewContainerRef.createComponent(AlertComponent);
    componentRef.instance.message = message; // Set the message for the alert component
    this.closeSubscription = componentRef.instance.close.subscribe(() => {
      this.closeSubscription.unsubscribe();
      hostViewContainerRef.clear(); // Clear the alert component when closed
    });
  }
}

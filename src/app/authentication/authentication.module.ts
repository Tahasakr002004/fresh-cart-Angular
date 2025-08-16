import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationComponent } from './authentication.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    AuthenticationComponent
  ],
  exports: [
    AuthenticationComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule]
})
export class AuthenticationModule {}

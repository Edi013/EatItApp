import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ CommonModule,           
    ReactiveFormsModule,     
    MatFormFieldModule,     
    MatInputModule,          
    MatButtonModule,        
    MatIconModule,  
  ],
})
export class LoginComponent{
  loginForm: FormGroup;
  errorMessage: string = "";

  constructor(
     private formBuilder: FormBuilder,
     private authService: AuthService,
     private router: Router,
     private snackbarService: SnackbarService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]], 
      password: ['', [Validators.required, Validators.minLength(4)]], 
    });
  }

  async onSubmit(): Promise<void> {
    if(!this.loginForm) return;

    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in the form correctly.';
      return;
    }

    const { username, password } = this.loginForm.value;
    try {
      const response = await this.authService.login(username, password);
      if (response.hasFailed())
        {
          this.errorMessage = 'Please fill in the form correctly.';
          return;
        }

        this.router.navigate(['/home']);
        return;
    } catch (error) {
      this.errorMessage = 'Invalid username or password.';
    }
  }

  navigateToRegister(){
    this.router.navigate(["/register"]);
    // snackbar
  }
}

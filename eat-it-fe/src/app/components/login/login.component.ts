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
      this.errorMessage = 'Invalid username or password.';
      this.snackbarService.showSnackbar(this.errorMessage);
      return;
    }

    const { username, password } = this.loginForm.value;
    try {
      const response = await this.authService.login(username, password);
      if (response.hasFailed())
        {
          this.errorMessage = response.handleMessageByStatusCode();

          if(response.statusCode === '401'){
            this.errorMessage = 'Invalid username or password';
          }
          this.snackbarService.showSnackbar(this.errorMessage);
          return;
        }

        this.snackbarService.showSnackbar("To Home Page!");
        this.router.navigate(['/home']);
        return;
    } catch (error) {
      this.errorMessage =  error instanceof Error ? error.message : 'An unexpected error occurred';
      this.snackbarService.showSnackbar(this.errorMessage);
    }
  }

  navigateToRegister(){
    this.router.navigate(["/register"]);
    this.snackbarService.showSnackbar("To Register Page !");
  }
}

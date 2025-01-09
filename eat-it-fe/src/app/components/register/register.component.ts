import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SnackbarService } from '../../services/utils/snackbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
   imports: [ CommonModule,           
      ReactiveFormsModule,     
      MatFormFieldModule,     
      MatInputModule,          
      MatButtonModule,        
      MatIconModule,  
    ],
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = "";


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService
 ) {this.registerForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4)]]
  });
}
  private passwordFieldsMatch(): boolean {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;

    return password === confirmPassword;
  }

  async onSubmit() {
    if(!this.registerForm) return;

    if(this.registerForm.invalid) {
      this.errorMessage = 'Please fill in the form correctly.';
      this.snackbarService.showSnackbar(this.errorMessage);
      return;
    }

    if (!this.passwordFieldsMatch()) {
      this.errorMessage = 'Password and password confirmation must match.';
      this.snackbarService.showSnackbar(this.errorMessage);
      return;
    }
    
    const { username, password, _ } = this.registerForm.value;
    try {
      const response = await this.authService.register(username, password);
      
      if (response.hasFailed())
      {
        this.errorMessage = response.handleMessageByStatusCode();
        this.snackbarService.showSnackbar(this.errorMessage);
        return;
      }

      this.snackbarService.showSnackbar("You can login now!");
      this.router.navigate(['/login']);
      return;
    } catch (error) {
      this.errorMessage =  error instanceof Error ? error.message : 'An unexpected error occurred';
      this.snackbarService.showSnackbar(this.errorMessage);
    }
  }

  navigateToLogin(){
    this.router.navigate(["/login"]);
    this.snackbarService.showSnackbar("To Login Page !");
  }
}
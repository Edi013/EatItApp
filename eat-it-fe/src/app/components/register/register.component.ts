import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
 ) {this.registerForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4)]]
  });
}

  async onSubmit() {
    if(!this.registerForm) return;

    if(this.registerForm.invalid) {
      this.errorMessage = 'Please fill in the form correctly.';
      return;
    }
    
    const { username, password, _ } = this.registerForm.value;
    try {
      const response = await this.authService.register(username, password);
      if (response.hasFailed()) {}
      {
        this.errorMessage = 
      }

      this.router.navigate(['/login']);
      
    } catch (error) {
      this.errorMessage = 'Invalid username or password.';
    }
  }
}

// sa verific implementarea auth si register si login components + sa handle mesajele pt user folosind base-response.handle...
// sa trec de login

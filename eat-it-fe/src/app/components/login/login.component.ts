import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]], 
      password: ['', [Validators.required, Validators.minLength(4)]], 
    });
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in the form correctly.';
      return;
    }

    const { username, password } = this.loginForm.value;

    try {
      const response = await this.authService.login(username, password);
      if (response) {
        this.router.navigate(['/home']);
      }
    } catch (error) {
      this.errorMessage = 'Invalid username or password.';
    }
  }
}

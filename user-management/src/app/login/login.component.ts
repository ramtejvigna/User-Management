import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../shared/services/auth.service'
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  userType: string[] = ['User', 'Admin'];
  selectedUserType: string = this.userType[0];
  passwordVisible: boolean = false;

  constructor(private userService: UserService, private authService : AuthService, private router: Router) {}

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;  // Toggle visibility
  }

  login(): void {
    const userData = {
      email: this.email,
      password: this.password,
      userType: this.selectedUserType
    };

    this.userService.login(userData).subscribe(
      (response) => {
        console.log('Login successful', response);
        localStorage.setItem('token', response.token);
        this.authService.login(response.token)
        
        if(userData.userType === 'User') {
          this.router.navigate(['/user-home']);
        } else {
          this.router.navigate(['/admin']);
        }
      });
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  userType: string[] = ['User', 'Admin'];
  selectedUserType: string = this.userType[0];
  passwordVisible: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible; 
  }

  register(): void {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
      userType: this.selectedUserType
    };

    this.userService.register(userData).subscribe(
      (res:any) => {
        console.log('Registration successful', res);
        this.router.navigate(['/'])
      });
  }
}

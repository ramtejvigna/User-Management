import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-portal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-portal.component.html',
  styleUrls: ['./user-portal.component.css']
})
export class UserPortalComponent implements OnInit {
  user: any = {};          // Holds current user data
  formUser: any = {};      // Holds the form data

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.user = { ...user };  // Current user data for greeting
        this.formUser = { ...user };  // Clone data for form use
      },
      error: (error) => console.error('Error fetching profile', error)
    });
  }

  updateProfile(): void {
    this.userService.updateProfile(this.formUser).subscribe({
      next: () => {
        console.log('Profile updated successfully');
        this.user = { ...this.formUser };  // Update the user object after successful save
        this.router.navigate(['/user-home']);
      },
      error: (error) => console.error('Error updating profile', error)
    });
  }
}

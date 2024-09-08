import { CommonModule } from '@angular/common';
import { Component, OnInit ,NgModule } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  users: any[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      }
    );
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        console.log('User deleted successfully');
        this.fetchUsers()
      },
      error: () => {
        console.log('Error deleting user');
      }
    });
  }

}

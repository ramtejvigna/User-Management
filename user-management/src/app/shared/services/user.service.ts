import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://user-management-backend-xml9.onrender.com/users';

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, userData);
  }

  getProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token available');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/my-profile`, { headers });
  }

  updateProfile(userData: any): Observable<any> {
    console.log(userData)
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token available');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/update-profile`, userData, { headers });
  }

  getUsers(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token available');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/get-users`, { headers });
  }

  deleteUser(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token available');
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/delete-user/${userId}`, { headers });
  }
}

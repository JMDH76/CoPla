import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import {
  Community,
  Doc,
  User,
  Booking,
  Notice,
} from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public baseUrl = environment.baseUlr;


  constructor(private http: HttpClient) {}
  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post('http://localhost:3000/uploadImages', formData);
  }

  getUsers() {
    return this.http.get<User[]>(this.baseUrl + '/users');
  }

  getUser(id: string) {
    return this.http.get<User[]>(`${this.baseUrl}/users/${id}`);
  }

  getCommunities() {
    return this.http.get<Community[]>(this.baseUrl + '/communities');
  }

  getCommunity(id: string) {
    return this.http.get<Community[]>(`${this.baseUrl}/communities/${id}`);
  }

  getDocuments() {
    return this.http.get<Doc[]>(this.baseUrl + '/documents_history');
  }

  getDocument(id: string) {
    return this.http.get<Doc[]>(`${this.baseUrl}/documents_history/${id}`);
  }

  getAllBookings() {
    return this.http.get<Booking[]>(this.baseUrl + '/bookings');
  }

  getBookings(id: string) {
    return this.http.get<Booking[]>(this.baseUrl + `/bookings/${id}`);
  }

  insertBoking(booking: Booking) {
    return this.http.post<string>(`${this.baseUrl}/bookings/insert`, booking);
  }

  insertNewUser(user: User) {
    return this.http.post<string>(`${this.baseUrl}/users/insert`, user);
  }

  deleteBooking(id: string) {
    return this.http.delete<string>(`${this.baseUrl}/bookings/delete/${id}`);
  }

  getCommunityNotices(id: string) {
    return this.http.get<Notice[]>(this.baseUrl + `/notices/${id}`);
  }

  getAllNotices() {
    return this.http.get<Notice[]>(this.baseUrl + '/notices');
  }
}

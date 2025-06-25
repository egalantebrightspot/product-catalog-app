import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/cateogry.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://127.0.0.1:8000/api/categories/';
  
  constructor(private http: HttpClient) { }
  getCategories() {
    return this.http.get<Category[]>(this.apiUrl);
  }
}

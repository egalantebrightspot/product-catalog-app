import { COMPILER_OPTIONS, Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Product } from '../../models/prouct.model'; 
import { Category } from '../../models/cateogry.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: (Product & { categoryName?: string })[] = [];
  categories: Category[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    forkJoin([
      this.productService.getProducts(),
      this.categoryService.getCategories()
    ]).subscribe(([products, categories]) => {
      this.categories = categories;
      this.products = products.map(p => ({
        ...p,
        categoryName: categories.find(c => c.id === p.categoryId)?.name || ''
      }));
    });
  }
}
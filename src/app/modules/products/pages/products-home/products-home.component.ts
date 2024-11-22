import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ProductsService } from '../../../../core/services/products.service';

import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-home.component.html',
  styleUrl: './products-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsHomeComponent implements OnInit {
  private productsService: ProductsService = inject(ProductsService);

  private _fb: FormBuilder = inject(FormBuilder);
  public addProductform!: FormGroup;

  public products = signal<any>([]);
  public showUpdateProductForm = signal(false);

  constructor() {
    this.addProductform = this._fb.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: (res) => {
        this.products.set(res);
      },
    });
  }

  public deleteProduct(idProduct: any) {
    this.productsService.deleteProduct(idProduct).subscribe((res) => {
      console.log(res);
    });
  }

  public updateProduct(idProduct: any) {
    this.productsService.getProduct(idProduct).subscribe((res) => {
      if (!res) return;

      this.addProductform.setValue({
        title: res.title,
        price: res.price,
        description: res.description,
        image: res.image,
        category: res.category,
      });

      console.log(this.addProductform.value);

      this.showUpdateProductForm.set(true);
    });
  }

  
}

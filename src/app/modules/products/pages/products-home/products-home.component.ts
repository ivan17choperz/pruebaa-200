import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ProductsService } from '../../../../core/services/products.service';

import { CommonModule } from '@angular/common';

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

  public products = signal<any>([]);

  constructor() {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: (res) => {
        this.products.set(res);
      },
    });
  }
}

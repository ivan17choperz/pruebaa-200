import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppGloblalState } from '../../../../app.reducer';
import { LoaderComponent } from '../../../../shared/loader/loader.component';
import { ProductsService } from '../../../../core/services/products.service';
import { CardStoreComponent } from '../../components/card-store/card-store.component';
import { CartStoreComponent } from '../../components/cart-store/cart-store.component';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [LoaderComponent, CardStoreComponent, CartStoreComponent],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreComponent implements OnInit, OnDestroy {
  #_store = inject<Store<AppGloblalState>>(Store);
  #_productsService = inject<ProductsService>(ProductsService);

  listProducts = signal<any>([]);
  loader = signal<boolean>(false);
  showCartWindow = signal<boolean>(false);
  ngOnInit(): void {
    this.#_productsService.getProducts();

    this.#_productsService.products$.subscribe((res) => {
      this.listProducts.set(res);
    });

    this.#_store.select('ui').subscribe((res) => {
      this.loader.set(res.loading);
    });
  }

  ngOnDestroy(): void {}
}

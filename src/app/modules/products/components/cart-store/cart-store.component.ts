import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppGloblalState } from '../../../../app.reducer';
import { Subscription } from 'rxjs';
import { addDelivery, clearCart, deleteProductCart } from '../../store.actions';

@Component({
  selector: 'app-cart-store',
  standalone: true,
  imports: [],
  templateUrl: './cart-store.component.html',
  styleUrl: './cart-store.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartStoreComponent implements OnInit, OnDestroy {
  public closeCart = output<boolean>();

  #_store = inject<Store<AppGloblalState>>(Store);
  #_ctr = inject(ChangeDetectorRef);
  #_storeSubscription!: Subscription;

  public listProducts = signal<any>([]);

  ngOnInit(): void {
    this.#_storeSubscription = this.#_store
      .select('store')
      .subscribe(({ cart }) => {
        this.listProducts.set(cart);
      });
  }

  ngOnDestroy(): void {
    if (this.#_storeSubscription) this.#_storeSubscription.unsubscribe();
  }

  deleteProductCart(product: any) {
    this.#_store.dispatch(deleteProductCart({ product }));
    this.#_ctr.detectChanges();
  }

  public sendOrder() {
    const data = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      products: this.listProducts(),
      status: 'pendiente',
      total: this.listProducts().reduce((a: any, b: any) => a + b.price, 0),
    };

    this.#_store.dispatch(addDelivery({ deliverys: data }));
    setTimeout(() => {
      this.listProducts.set([]);
      this.#_store.dispatch(clearCart());
      this.closeWindow();
    }, 2500);
  }

  public closeWindow() {
    this.closeCart.emit(true);
  }
}

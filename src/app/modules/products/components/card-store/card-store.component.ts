import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnDestroy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppGloblalState } from '../../../../app.reducer';
import { addProductCart, addDelivery } from '../../store.actions';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-card-store',
  standalone: true,
  imports: [],
  templateUrl: './card-store.component.html',
  styleUrl: './card-store.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardStoreComponent implements OnDestroy {
  public infoProduct = input<any>();

  #_store = inject<Store<AppGloblalState>>(Store);
  #_storeSubscription!: Subscription;
  ngOnDestroy(): void {
    if (this.#_storeSubscription) this.#_storeSubscription.unsubscribe();
  }

  public addproductIntoCart(product: any) {
    // Usa un solo disparo al estado en lugar de suscribirte continuamente
    this.#_store
      .select('store')
      .pipe(take(1))
      .subscribe(({ cart }) => {
        const existProduct = cart.find((p: any) => p.id === product.id);
        if (!existProduct) {
          this.#_store.dispatch(addProductCart({ product }));
        }
      });
  }


}

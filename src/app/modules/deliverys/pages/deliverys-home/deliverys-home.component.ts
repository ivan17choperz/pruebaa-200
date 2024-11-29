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
import { lastValueFrom, Subscription } from 'rxjs';
import { LoaderComponent } from '../../../../shared/loader/loader.component';
import { loadActon, stopLoadActon } from '../../../../shared/ui.actions';
import { CommonModule } from '@angular/common';
import { deleteDelivery } from '../../../products/store.actions';
import { AlertUpdateStatusComponent } from '../../components/alert-update-status/alert-update-status.component';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-deliverys-home',
  standalone: true,
  imports: [CommonModule, LoaderComponent, AlertUpdateStatusComponent],
  templateUrl: './deliverys-home.component.html',
  styleUrl: './deliverys-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliverysHomeComponent implements OnInit, OnDestroy {
  #_store = inject<Store<AppGloblalState>>(Store);
  #_storeSubscription!: Subscription;

  public listDeliverys = signal<any>([]);

  public loader = signal<boolean>(false);
  public showUpdateStatusDialog = signal<boolean>(false);

  public currentSeleccionAtUpdate = signal({
    idDelivery: '',
    status: '',
  });

  ngOnInit(): void {
    this.#_store
      .select('ui')
      .subscribe(({ loading }) => this.loader.set(loading));

    this._setInitialData();
  }

  //tiempo para la simulacion de la extraccion de datos de la api :V
  private _setInitialData() {
    this.#_store.dispatch(loadActon());
    setTimeout(() => {
      this.#_storeSubscription = this.#_store
        .select('store')
        .subscribe(({ deliverys }) => {
          if (deliverys) {
            console.log(deliverys);
            this.listDeliverys.set(deliverys);
            this.#_store.dispatch(stopLoadActon());
          }
        });
    }, 1500);
  }

  ngOnDestroy(): void {
    if (this.#_storeSubscription) this.#_storeSubscription.unsubscribe();
  }

  public deleteDelivery(delivery: any) {
    if (!delivery) return;

    this.#_store.dispatch(deleteDelivery({ deliveryId: delivery.id }));
  }

  public updateStatusDelivery(idDelivery: any, status: string) {
    this.currentSeleccionAtUpdate.set({ idDelivery, status });
    this.showUpdateStatusDialog.set(true);
  }
}

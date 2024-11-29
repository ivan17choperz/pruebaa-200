import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppGloblalState } from '../../../../app.reducer';
import { updateStatusDelivery } from '../../../products/store.actions';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alert-update-status',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './alert-update-status.component.html',
  styleUrl: './alert-update-status.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertUpdateStatusComponent {
  public idDelivery = input<any>();
  public selection = input<string>('pendiente');
  public closeWindow = output<boolean>();

  #_store = inject<Store<AppGloblalState>>(Store);

  public updateStatus() {
    const parseData: { deliveryId: number; status: any } = {
      deliveryId: this.idDelivery(),
      status: this.selection,
    };

    console.log(this.idDelivery(), this.selection);

    this.#_store.dispatch(updateStatusDelivery(parseData));

    this.closeDialog();
  }

  closeDialog() {
    this.closeWindow.emit(true);
  }
}

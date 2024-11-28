import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-card-store',
  standalone: true,
  imports: [],
  templateUrl: './card-store.component.html',
  styleUrl: './card-store.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardStoreComponent {
  public infoProduct = input<any>();
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-deliverys-home',
  standalone: true,
  imports: [],
  templateUrl: './deliverys-home.component.html',
  styleUrl: './deliverys-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliverysHomeComponent { }

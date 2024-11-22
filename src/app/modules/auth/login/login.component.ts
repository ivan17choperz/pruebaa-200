import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private _fb: FormBuilder = inject(FormBuilder);
  private _router: Router = inject(Router);
  public login_form!: FormGroup;

  constructor() {
    this.login_form = this._fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public login() {
    const user = {
      username: 'root',
      password: 'root',
    };
    if (!this.login_form.valid) return;

    console.log(this.login_form.value == user);
    console.log(this.login_form.value);
    console.log(user);
    if (
      this.login_form.value.username == user.username &&
      this.login_form.value.password == user.password
    ) {
      this._router.navigateByUrl('/modules/products');
    }
  }
}

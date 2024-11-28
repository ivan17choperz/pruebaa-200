import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoaderComponent } from '../../../shared/loader/loader.component';

import { Store } from '@ngrx/store';
import { AppGloblalState } from '../../../app.reducer';
import { loadActon, stopLoadActon } from '../../../shared/ui.actions';
import { login, userAuthenticated } from '../auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, LoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  private _fb: FormBuilder = inject(FormBuilder);
  private _router: Router = inject(Router);
  public login_form!: FormGroup;

  public ui_loading = signal(false);

  private _uiSuscription!: Subscription;

  constructor(private store: Store<AppGloblalState>) {
    this.login_form = this._fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this._uiSuscription = this.store.select('ui').subscribe((res) => {
      if (res && res.loading !== undefined) {
        this.ui_loading.set(res.loading);
      }
    });
  }

  ngOnDestroy(): void {
    this._uiSuscription.unsubscribe();
  }

  public login() {
    this.store.dispatch(loadActon());
    const user = {
      username: 'root',
      password: 'root',
    };
    if (!this.login_form.valid) return;

    if (
      this.login_form.value.username == user.username &&
      this.login_form.value.password == user.password
    ) {
      console.log('acceso correcto');
      setTimeout(() => {
        this.store.dispatch(stopLoadActon());
        this.store.dispatch(userAuthenticated());
        this._router.navigateByUrl('/modules/store');
      }, 3000);
    }
  }
}

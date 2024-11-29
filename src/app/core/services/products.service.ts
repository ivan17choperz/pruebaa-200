import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, lastValueFrom, Observable, tap } from 'rxjs';
import { AppGloblalState } from '../../app.reducer';
import { loadActon, stopLoadActon } from '../../shared/ui.actions';
import { setProducts } from '../../modules/products/store.actions';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private _products: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public products$ = this._products.asObservable();

  constructor(
    private _httpClient: HttpClient,
    private store: Store<AppGloblalState>
  ) {}

  // products
  public async getProducts() {
    this.store.dispatch(loadActon());
    const products = await lastValueFrom(
      this._httpClient.get('https://fakestoreapi.com/products')
    );
    if (!products) this._products.next([]);
    this.store.dispatch(stopLoadActon());
    this.store.dispatch(setProducts({ products }));
    this._products.next(products);
  }

  // public addProduct(product: any) {
  //   this._products.next([...this._products.getValue(), product]);
  // }

  // public updateProduct(product: any) {
  //   const producto = this._products.getValue();
  //   const index = producto.findIndex((prod: any) => prod.id === product.id);
  //   producto[index] = product;
  //   this._products.next(producto);
  // }

  // public deleteProduct(idProduct: any) {
  //   const producto = this._products.getValue();
  //   const index = producto.findIndex((prod: any) => prod.id === idProduct);
  //   producto.splice(index, 1);
  //   this._products.next(producto);
  // }

  // deliverys
}

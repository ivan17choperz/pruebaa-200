import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _httpClient: HttpClient) {}

  // products
  public getProducts(): Observable<any> {
    return this._httpClient
      .get('https://fakestoreapi.com/products')
      .pipe(tap(console.log));
  }

  public getProduct(id: number): Observable<any> {
    return this._httpClient
      .get(`https://fakestoreapi.com/products/${id}`)
      .pipe(tap(console.log));
  }

  public addProduct(product: any): Observable<any> {
    return this._httpClient.post('https://fakestoreapi.com/products', product);
  }

  public updateProduct(product: any): Observable<any> {
    return this._httpClient
      .put(`https://fakestoreapi.com/products/${product.id}`, product)
      .pipe(tap(console.log));
  }

  public deleteProduct(idProduct: any): Observable<any> {
    return this._httpClient.delete(
      `https://fakestoreapi.com/products/${idProduct}`
    );
  }
  // deliverys
}

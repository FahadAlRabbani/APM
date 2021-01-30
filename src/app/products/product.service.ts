import { IProduct } from './product';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root'})

export class ProductService {

  productUrl = 'api/products/products.json';

  handleError(err: HttpErrorResponse): void {

  }

  constructor(private http: HttpClient){ }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap(_ => console.log(`fetched products: ` + JSON.stringify(_)))
    );
  }

  getProduct(id: number): Observable<IProduct | undefined> {
    return this.getProducts().pipe(
      map((products) => products.find(product => product.productId === id))
    );

  }

}


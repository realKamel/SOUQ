import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Environment } from '../environment';
import { Observable } from 'rxjs';
import { IProducts } from '../interfaces/iproducts';

@Injectable({
	providedIn: 'root',
})
export class ProductsService {
	private readonly _HttpClient = inject(HttpClient);
	getAllProducts(): Observable<IProducts[]> {
		return this._HttpClient.get<IProducts[]>(
			`${Environment.baseLink}/products`
		);
	}
	getSingleProduct(id: string): Observable<IProducts> {
		return this._HttpClient.get<IProducts>(
			`${Environment.baseLink}/products/${id}`
		);
	}
}

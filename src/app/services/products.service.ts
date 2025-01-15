import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Environment } from '../environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ProductsService {
	private readonly _HttpClient = inject(HttpClient);
	getAllProducts(): Observable<any> {
		return this._HttpClient.get(`${Environment.baseLink}/products`);
	}
	getSingleProduct(id: string): Observable<any> {
		return this._HttpClient.get(`${Environment.baseLink}/products/${id}`);
	}
}

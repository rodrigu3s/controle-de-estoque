import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "./product";
import { environment } from "src/environments/environment";
import { delay, map, take } from "rxjs";
import { Page, QueryBuilder } from "../_util/pagination";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly API = `${environment.API}products`;

  constructor(private http: HttpClient){}

  getAll(queryBuilder: QueryBuilder){
    return this.http.get<Product[]>(this.API + `?${queryBuilder.builQueryString()}`, {observe: 'response'})
    .pipe(
      map(response => <Page<Product>>Page.fromResponse(response)),
      delay(500)
    );
  }

  getById(id: number){
    return this.http.get(`${this.API}/${id}`).pipe(take(1)); // só vai no servidor 1 vez
  }

  save(request: Product){
    //return this.http.post(this.API, request).pipe(take(1)); //take 1 se desinscreve automaticamente do observable

    if(request.id){
      return this.update(request);
    }
    return this.create(request);
  }

  private create(request: Product){
    return this.http.post(this.API, request).pipe(take(1));
  }

  update(request: Product){
    return this.http.put(`${this.API}/${request.id}`, request).pipe(take(1));
  }

  remove(id: number){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "./product";
import { environment } from "src/environments/environment";
import { take } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly API = `${environment.API}products`;

  constructor(private http: HttpClient){}

  getAll(){
    return this.http.get<Product[]>(this.API);
  }

  getById(id: number){
    return this.http.get(`${this.API}/${id}`).pipe(take(1)); // só vai no servidor 1 vez
  }

  save(request: Product){
    return this.http.post(this.API, request).pipe(take(1)); //take 1 se desinscreve automaticamente do observable
  }
}

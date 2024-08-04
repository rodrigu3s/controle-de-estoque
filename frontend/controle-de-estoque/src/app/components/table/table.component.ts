import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Product } from "src/app/service/product";
import { ProductService } from "src/app/service/product.service";

@Component({
  selector:'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponet {

  // product!: Product[];

  product$!: Observable<Product[]> // dessa forma o angular fica com a reposabilidade de se inscrever e se desisnscrever

  constructor(
    private service: ProductService,
    private router: Router
  ){}

  ngOnInit(){
    // this.service.getAll().subscribe(dados => this.product = dados);

    // this.product$ = this.service.getAll();
    this.loadProducts();
  }

  loadProducts(){
    this.product$ = this.service.getAll();
  }

  onEdit(id: number){
    this.router.navigate(['editar', id]);
  }

  onDelete(id: number){
    this.service.remove(id).subscribe(()=> {
      this.loadProducts();
    });
  }
}

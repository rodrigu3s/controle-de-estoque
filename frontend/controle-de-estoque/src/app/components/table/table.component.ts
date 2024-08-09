import { Component } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { Observable, take } from "rxjs";
import { Page, PageRequest } from "src/app/_util/pagination";
import { Product } from "src/app/service/product";
import { ProductService } from "src/app/service/product.service";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";

@Component({
  selector:'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponet {

  // product!: Product[];

  //product$!: Observable<Product[]> // dessa forma o angular fica com a reposabilidade de se inscrever e se desisnscrever
  displayedColumns: string[] = ['id', 'code', 'product', 'quantity', 'price', 'options'];
  page: Page<Product> = new Page([], 0);
  pageEvent!: PageEvent;
  loading = false;

  constructor(
    private service: ProductService,
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService
  ){}

  ngOnInit(){
    // this.service.getAll().subscribe(dados => this.product = dados);

    // this.product$ = this.service.getAll();
    this.loadProducts();
  }

  // loadProducts(){
  //   this.product$ = this.service.getAll();
  // }

  loadProducts(){
    this.loading = true;
    const queryAdicional = new Map();
    this.service.getAll(
      new PageRequest(
        {
            pageNumber: this.pageEvent? this.pageEvent.pageIndex: 0,
            pageSize: this.pageEvent? this.pageEvent.pageSize: 10
        },
        queryAdicional
      )
    ).pipe(
      take(1)
    )
    .subscribe(
      page => {
        this.page = page;
        this.loading = false;
      },
      error =>{
        this.page = new Page([], 0);
        this.loading = false;
      }

    )
  }


  onEdit(id: number){
    this.router.navigate(['editar', id]);
  }



  onDelete(id: number){

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse produto?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result){
        this.service.remove(id).subscribe(()=> {
          this.toastr.success('Excuido com sucesso', 'Sucesso')
          this.loadProducts();
        });
      }
    });
  }
}

import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductService } from 'src/app/service/product.service';
import { ActivatedRoute, Router } from '@angular/router'
import { Product } from 'src/app/service/product';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit{

  formulario!: FormGroup;
  productId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private service: ProductService,
    private router: Router,
    private route: ActivatedRoute//para editar
  ) {}

  ngOnInit(){

    this.formulario = this.formBuilder.group({
      id: [null],
      code: [null , Validators.required],
      product: [null, [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ ]*$'), Validators.maxLength(255)]],
      quantity: [null, Validators.required],
      price: [null, Validators.required]
    })


    this.route.params.subscribe(
      (params: any) => {
        const id = params.id;
        console.log(id)
        const product$ = this.service.getById(id);
        product$.subscribe(product => {
          this.updateForm(product);
        })
      }
    )
  }

  onSubmit(){
    if(this.formulario.valid){
      this.service.save(this.formulario.value)
      .subscribe(
        success => {
          console.log('cadastrado com sucesso');
          this.router.navigate(['/list']) // voltando pra pagina de listagem após adicionar
      })
    }
  }

  updateForm(product: any){
    this.formulario.patchValue({
      id: product.id,
      code: product.code,
      product: product.product,
      quantity: product.quantity,
      price: product.price
    })
  }



}

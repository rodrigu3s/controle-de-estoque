import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormComponent } from "./form.component";


import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from "@angular/common/http";

import { NgxMaskModule } from "ngx-mask";

import { CurrencyMaskModule } from "ng2-currency-mask";
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    HttpClientModule,
    NgxMaskModule.forChild(),
    CurrencyMaskModule,
    ToastrModule.forRoot()
  ]
})

export class FormModule{

}

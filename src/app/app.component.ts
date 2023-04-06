import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'CodeSandbox';
  productos: any;
  form: FormGroup;
  productoAgregado: any;
  productosArr = [];
  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: [undefined, Validators.required],
      precio: [undefined, Validators.required],
      stock: [undefined, Validators.required],
    });
  }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    this.http.get<any>(`${environment.apiUrl}`).subscribe((res) => {
      this.productos = res.products;
    });
  }

  agregarProducto() {
    this.productoAgregado = {
      title: this.form.controls['nombre'].value,
      price: this.form.controls['precio'].value,
      stock: this.form.controls['stock'].value,
    };
    this.productos.unshift(this.productoAgregado);
  }

  campoValido(campo: string) {
    return (
      this.form.controls?.[campo]?.errors &&
      this.form.controls?.[campo]?.touched
    );
  }
}

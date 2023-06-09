import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  @Input() btnClass: string = 'btn-primary';
  @Input('valor') progreso: number = 0;


  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();

  constructor() { }

  cambiarValor(valor: number) {

    if (this.progreso >= 100 && valor >= 0) {
      this.progreso = 100;
      this.valorSalida.emit(100);
      return;
    }

    if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      this.valorSalida.emit(0);
      return;
    }


    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);
  }

  onChange(nuevoValor: number) {
    if (nuevoValor >= 100) {
      this.progreso = 100;
    } else if (nuevoValor <= 0) {
      this.progreso = 0;
    } else{
      this.progreso = nuevoValor;
    }

    console.log(this.progreso);
    this.valorSalida.emit(this.progreso);
  }

}

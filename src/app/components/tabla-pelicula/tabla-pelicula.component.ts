import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pelicula } from '../../models/pelicula';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabla-pelicula',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-pelicula.component.html',
  styleUrl: './tabla-pelicula.component.css'
})
export class TablaPeliculaComponent {
  @Input() peliculas ?: Array<Pelicula>;
  @Input() mostrarSeleccionar : boolean = true;
  @Output() event = new EventEmitter<Pelicula>();

  seleccionar(pelicula : Pelicula){
    this.event.emit(pelicula);
  }
}

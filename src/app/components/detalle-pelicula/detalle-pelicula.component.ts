import { Component, Input } from '@angular/core';
import { Pelicula } from '../../models/pelicula';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-pelicula',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-pelicula.component.html',
  styleUrl: './detalle-pelicula.component.css'
})
export class DetallePeliculaComponent {
  @Input() pelicula?: Pelicula;
}

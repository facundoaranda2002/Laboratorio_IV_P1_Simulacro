import { Component } from '@angular/core';
import { Pelicula } from '../../models/pelicula';
import { FirestoreService } from '../../services/firestore.service';
import { TablaPeliculaComponent } from '../../components/tabla-pelicula/tabla-pelicula.component';

@Component({
  selector: 'app-pelicula-listado',
  standalone: true,
  imports: [TablaPeliculaComponent],
  templateUrl: './pelicula-listado.component.html',
  styleUrl: './pelicula-listado.component.css'
})
export class PeliculaListadoComponent {

  peliculas : Array<Pelicula> = [];

  constructor(private firestore:FirestoreService){
    /*let jsonPeliculas = localStorage.getItem("peliculas");
    if(jsonPeliculas)
      this.peliculas = JSON.parse(jsonPeliculas);*/
    this.firestore.getPeliculas().then((respuesta)=>{
      this.peliculas = respuesta;
    })
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Pelicula } from '../../models/pelicula';
import { FirestoreService } from '../../services/firestore.service';
//import { FirestoreService } from 'src/app/services/firestore.service';
import Swal from 'sweetalert2';
import { TablaPeliculaComponent } from '../../components/tabla-pelicula/tabla-pelicula.component';
import { DetallePeliculaComponent } from '../../components/detalle-pelicula/detalle-pelicula.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [TablaPeliculaComponent, DetallePeliculaComponent, CommonModule],
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.css'
})
export class BusquedaComponent {
  //tipos : Array<string> = ["terror","comedia", "amor" ,"otros"];
  peliculas : Array<Pelicula> = [];
  mostrarOpciones : boolean = true;
  peliculaSeleccionada : Pelicula = new Pelicula();

  constructor(private firestore:FirestoreService,private router : Router){
    this.actualizarPeliculas();
    //this.crearPeliculas();
  }

  actualizarPeliculas(){
    this.firestore.getPeliculas().then((respuesta)=>{
      this.peliculas = respuesta;
    })
  }

  /*
  crearPeliculas(){
   let pelicula1 = new Pelicula();
   pelicula1.id = "1";
   pelicula1.nombre = "Duro de matar 2";
   pelicula1.tipo = this.tipos[3];
   pelicula1.cantidadPublico = 10;
   pelicula1.fechaEstreno = new Date();
   pelicula1.fotoPelicula = "assets/duroMatar.webp";

   let pelicula2 = new Pelicula();
   pelicula2.id = "2";
   pelicula2.nombre = "Terminator";
   pelicula2.tipo = this.tipos[1];
   pelicula2.cantidadPublico = 20;
   pelicula2.fechaEstreno = new Date();
   pelicula2.fotoPelicula = "assets/terminator.jpeg";

   let pelicula3 = new Pelicula();
   pelicula3.id = "3";
   pelicula3.nombre = "Rambo";
   pelicula3.tipo = this.tipos[2];
   pelicula3.cantidadPublico = 30;
   pelicula3.fechaEstreno = new Date();
   pelicula3.fotoPelicula = "assets/rambo.jpg";

   this.peliculas.push(pelicula1,pelicula2,pelicula3);
   localStorage.setItem("peliculas",JSON.stringify(this.peliculas));
  }
  */

  mostrar(event:any){
    this.peliculaSeleccionada = event;
  }

  cambiarVista(){
    this.mostrarOpciones = !this.mostrarOpciones;
  }

  
  borrarPelicula(){
    if(typeof this.peliculaSeleccionada.id === 'undefined')
      return;

    Swal.fire({
      title: 'Esta seguro que quiere eliminar la pelicula?',
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      cancelButtonText: `Cancelar`,
    }).then(async(result) => {
      if (result.isConfirmed) {
        if (await this.firestore.borrarPelicula(this.peliculaSeleccionada)){
          Swal.fire('Pelicula borrada', '', 'success')
          this.actualizarPeliculas();
          this.mostrarOpciones=!this.mostrarOpciones;
        }else{
          Swal.fire('ERROR', 'No se pudo borrar la pelicula', 'error')
        }
      }
    })
  }
  

}

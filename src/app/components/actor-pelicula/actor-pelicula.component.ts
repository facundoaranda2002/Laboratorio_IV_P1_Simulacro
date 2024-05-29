import { Component } from '@angular/core';
import { Actor } from '../../models/actor';
import { Pais } from '../../models/paises';
import { Pelicula } from '../../models/pelicula';
import { FirestoreService } from '../../services/firestore.service';
import { PaisesService } from '../../services/paises.service';
import { TablaActorComponent } from '../../components/tabla-actor/tabla-actor.component';
import { TablaPeliculaComponent } from '../../components/tabla-pelicula/tabla-pelicula.component';
import { TablaPaisesComponent } from '../../components/tabla-paises/tabla-paises.component';
import { DetalleActorComponent } from '../../components/detalle-actor/detalle-actor.component';

@Component({
  selector: 'app-actor-pelicula',
  standalone: true,
  imports: [TablaActorComponent, TablaPeliculaComponent, TablaPaisesComponent, DetalleActorComponent],
  templateUrl: './actor-pelicula.component.html',
  styleUrl: './actor-pelicula.component.css'
})
export class ActorPeliculaComponent {
  actorSeleccionado ?:Actor;
  peliculasActor : Pelicula[]=[];
  paisActor : Pais[] = []; 

  constructor(private firestore:FirestoreService,private paisesService:PaisesService){
  }

  contieneActor(actores : Actor[]){
    let retorno = false;
    actores.forEach(element => {
      if(element.nombre === this.actorSeleccionado?.nombre && element.apellido === this.actorSeleccionado?.apellido){
        retorno = true;
      }
    });
    return retorno;
  }

   async mostrar(event:any){
    this.actorSeleccionado = event;
    
    this.firestore.getPeliculas()
    .then((respuesta)=>{
      this.peliculasActor = respuesta.filter((element)=> this.contieneActor(element.actores))
    })


    this.paisActor = (await this.paisesService.TraerPaises()).filter((respuesta)=> respuesta.nombre === this.actorSeleccionado?.pais);

  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FirestoreService } from '../../services/firestore.service';
import { Pais } from '../../models/paises';
import { NgClass, NgIf } from '@angular/common';
import { TablaPaisesComponent } from '../../components/tabla-paises/tabla-paises.component';

@Component({
  selector: 'app-actor-alta',
  standalone: true,
  imports: [NgClass, FormsModule, ReactiveFormsModule, NgIf, TablaPaisesComponent],
  templateUrl: './actor-alta.component.html',
  styleUrl: './actor-alta.component.css'
})
export class ActorAltaComponent {
  pais :Pais = new Pais();

  formActor = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    nombreUsuario: ['', [Validators.required]],
    correo: ['',],
    direccionUno: ['', [Validators.required]],
    direccionDos: ['',],
    pais: ['', [Validators.required]],
    capital: ['', [Validators.required]],
  });

  constructor(private formBuilder:FormBuilder,private firestoreService : FirestoreService ){

  }

  registrarActor(){
    //console.log(this.formActor.value);
    this.firestoreService.agregarActor(this.formActor.value)
      .then((respuesta)=>{
        alert("Actor guardado de manera exitosa")
      })
      .catch((error)=>{
        alert("Error al guardar el actor")
        console.log(error);
      })
  }

  consultarFire(){
    this.firestoreService.getActores();
  }


  cargarPais(pais:Pais){
    if(pais.nombre && pais.capital){
      this.formActor.get('pais')?.setValue(pais.nombre);
      this.formActor.get('capital')?.setValue(pais.capital);
    }
    
  }
}

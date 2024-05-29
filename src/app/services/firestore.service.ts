import { Pelicula } from '../models/pelicula';
import { Actor } from '../models/actor';
import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, getDocs,doc,deleteDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL, deleteObject } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  actores : Array<Actor> = [];
  peliculas : Array<Pelicula> = [];


  constructor(private firestore: Firestore, private storage: Storage) { }

  async getActores() {
    const querySnapshot = await getDocs(collection(this.firestore, "actores"));
    this.actores = [];
    querySnapshot.forEach((doc) => {
      let actor = doc.data() as Actor;
      this.actores.push(actor)
    });
    return this.actores;
  }

  agregarActor(actor:any){
    const actoresRef = collection(this.firestore,'actores');
    return addDoc(actoresRef,actor);
  }

  async getPeliculas() {
    this.peliculas = [];
    const querySnapshot = await getDocs(collection(this.firestore, "peliculas"));
    querySnapshot.forEach((doc) => {
      let pelicula = doc.data() as Pelicula;
      pelicula.id = doc.id;
      this.peliculas.push(pelicula)
    });
    return this.peliculas;
  }

  async borrarPelicula(pelicula:Pelicula){
    let retorno = false;

    const desertRef = ref(this.storage,pelicula.fotoPelicula);

    try {
      await deleteObject(desertRef);
      const usuarioRef = collection(this.firestore, 'peliculas');
      const documento = doc(usuarioRef, pelicula.id);
      await deleteDoc(documento);
      retorno = true;
    } catch (error) {
      console.error(error);
    }

    return retorno;
  }

  async agregarPelicula (pelicula:any,foto: File,actores : Array<Actor>){//pReferencia: StorageReference
    let hora = new Date().getTime();//obtengo hora actual
    let ubicacion = `/${pelicula.nombre}${hora}`;//le digo la ubicacion de la foto en el firebaseStorage
    const imgRef = ref(this.storage,ubicacion)
    let retorno = false;
    try {
      await uploadBytes(imgRef, foto);
      const resultado = await getDownloadURL(imgRef);
      let data = {
        nombre: pelicula.nombre,
        tipo: pelicula.tipo,
        fechaEstreno: pelicula.fechaEstreno,
        cantidadPublico: pelicula.cantidadPublico,
        fotoPelicula: resultado,
        actores: actores
      };
      const usuarioRef = collection(this.firestore, 'peliculas');
      await addDoc(usuarioRef, data);
      retorno = true;
    } catch (error) {
      console.error(error);
    }
    return retorno;
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pais } from '../models/paises';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  paises : Pais[]= [];
  ruta: string = 'https://restcountries.com/v3.1/lang/spanish';//https://restcountries.com/v3.1/all

  constructor(private http: HttpClient) {}

  TraerPaises(): Promise<Pais[]> {
    return new Promise((resolve, reject) => {
      this.http.get(this.ruta).subscribe((respuesta: any) => {
        const paises: Pais[] = [];
        for (let index = 0; index < 10; index++) {
          let element = respuesta[index];
          let pais = new Pais();
          pais.bandera = element.flags.png;
          pais.nombre = element.name.common;
          pais.capital = element.capital[0];
          paises.push(pais);
        }
        resolve(paises);
      }, error => {
        reject(error);
      });
    });
  }
}

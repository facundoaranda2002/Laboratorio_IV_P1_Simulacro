import {Actor} from "./actor";

export class Pelicula{
    id ?: string;
    nombre ?: string;
    tipo  ?: string;
    fechaEstreno ?: Date;
    cantidadPublico ?: number;
    fotoPelicula ?: string;
    actores :Array<Actor> = [];
}
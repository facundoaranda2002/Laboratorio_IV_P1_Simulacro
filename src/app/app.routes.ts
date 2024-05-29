import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'bienvenido',
        redirectTo: '/busqueda'
    },
    {
        path: 'busqueda',
        loadComponent: () => import('./components/busqueda/busqueda.component').then((m) => m.BusquedaComponent)
    },
    {
        path: 'peliculas/alta',
        loadComponent: () => import('./components/pelicula-alta/pelicula-alta.component').then((m) => m.PeliculaAltaComponent)
    },
    {
        path: 'actor/alta',
        loadComponent: () => import('./components/actor-alta/actor-alta.component').then((m) => m.ActorAltaComponent)
    },
    {
        path: 'actor/listado',
        loadComponent: () => import('./components/actor-listado/actor-listado.component').then((m) => m.ActorListadoComponent)
    },
    {
        path: 'actor/actorPelicula',
        loadComponent: () => import('./components/actor-pelicula/actor-pelicula.component').then((m) => m.ActorPeliculaComponent)
    },
    {
        path: 'peliculas/listado',
        loadComponent: () => import('./components/pelicula-listado/pelicula-listado.component').then((m) => m.PeliculaListadoComponent)
    },
    {
        path: 'menu',
        loadComponent: () => import('./components/menu/menu.component').then((m) => m.MenuComponent)
    },
    {
        path: '**',
        redirectTo: '/busqueda',
    },
];

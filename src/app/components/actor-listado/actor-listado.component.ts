import { Component } from '@angular/core';
import { Actor } from '../../models/actor';
import { FirestoreService } from '../../services/firestore.service';
import { TablaActorComponent } from '../../components/tabla-actor/tabla-actor.component';

@Component({
  selector: 'app-actor-listado',
  standalone: true,
  imports: [TablaActorComponent],
  templateUrl: './actor-listado.component.html',
  styleUrl: './actor-listado.component.css'
})
export class ActorListadoComponent {

}

import { Component } from '@angular/core';
import { FilterService } from 'src/app/service/filter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {

  option:string = ''
  opcionSeleccionado: string  = '0';
  movie: string = '';

  constructor(private servicio: FilterService) {
  }

  getOptionFilter(){
    this.servicio.triggerFilter.emit(this.opcionSeleccionado);
  }

  searchMovie(){
    this.servicio.triggerSearchMovie.emit(this.movie);
  }
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environment/environment.stage';
import { ListMovie } from '../models/listmovie-i.model';

@Injectable({
  providedIn: 'root'
})
export class ApiListMovieService {

  private url: string = 'https://api.themoviedb.org/3/movie/now_playing';

  constructor(private http: HttpClient) { }

  public getMovies(): Observable<ListMovie> {

    const headers = new HttpHeaders()
      .set('Authorization', environment.authorization)
      .set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('language', 'es-ES');

    const apiKey = environment.apiKey;

    return this.http.get<ListMovie>(this.url, { headers, params});

    // Armar objeto, buscar paginación
  }
}

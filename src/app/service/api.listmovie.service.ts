import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment.stage';

@Injectable({
  providedIn: 'root'
})
export class ApiListMovieService {

  private url: string = '';

  constructor(private http: HttpClient) { }

  public getMovies(): Observable<any> {

    const headers = new HttpHeaders()
      .set('Authorization', environment.authorization)
      .set('Content-Type', 'application/json');

    const apiKey = environment.apiKey; // Reemplaza con tu clave de API de TMDb
    // this.url = `https://api.themoviedb.org/3/account/19543049/lists?page=1?api_key=${apiKey}`;
    this.url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=2`;

    return this.http.get<any>(this.url, {headers});

  // Armar objeto, buscar paginación
  }
}

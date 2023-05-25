import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment.stage';
import { ListMovie } from '../models/listmovie-i.model';
import { DetailMovie } from '../models/detailmovie-i.model';
import { Credit } from '../models/creditmovie-i.movie';
import { Images } from '../models/imagesmovie-i.movie';

@Injectable({
  providedIn: 'root'
})
export class ApiMovieService {

  private url: string = 'https://api.themoviedb.org/3/movie/';


  constructor(private http: HttpClient) {
  }

  public getMovies(): Observable<ListMovie> {

    const headers = this.getHeader()
    const params = this.getParams()
    // const apiKey = environment.apiKey;

    return this.http.get<ListMovie>(this.url + 'now_playing', { headers, params });
    // buscar paginación
  }

  public getMovieById(id: string) {

    const headers = this.getHeader()
    const params = this.getParams()

    return this.http.get<DetailMovie>(this.url + id, { headers, params });
  }

  public getCreditsMovieById(id: string) {
    const headers = this.getHeader()
    const params = this.getParams()

    return this.http.get<Credit>(this.url + id + '/credits', { headers, params });
  }

  public getImagesMovieById(id: string) {
    const headers = this.getHeader()

    return this.http.get<Images>(this.url + id + '/images', { headers });
  }

  private getHeader() {
    return new HttpHeaders()
      .set('Authorization', environment.authorization)
      .set('Content-Type', 'application/json');
  }

  private getParams() {
    return new HttpParams()
      .set('language', 'es-ES');
  }
}

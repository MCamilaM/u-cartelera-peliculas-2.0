import { Component, OnInit } from '@angular/core';
import { ListMovie } from 'src/app/models/listmovie-i.model';
import { ApiMovieService } from 'src/app/service/api.movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.sass']
})
export class MoviesComponent implements OnInit {

  movies!: ListMovie;
  fruta:string[] = ["manzana", "pera"];
  urlGetImage = 'https://image.tmdb.org/t/p/original/'

  constructor(private apiMovieService: ApiMovieService) {

  }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.apiMovieService.getMovies().subscribe(movies => {
      this.movies = movies;
    })
  }
}

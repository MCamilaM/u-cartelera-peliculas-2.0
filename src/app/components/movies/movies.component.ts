import { Component, OnInit } from '@angular/core';
import { ListMovie } from 'src/app/models/listmovie-i.model';
import { ApiListMovieService } from 'src/app/service/api.listmovie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.sass']
})
export class MoviesComponent implements OnInit {

  movies!: ListMovie;
  fruta:string[] = ["manzana", "pera"];
  urlGetImage = 'https://image.tmdb.org/t/p/original/'

  constructor(private apiListMovieService: ApiListMovieService) {

  }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.apiListMovieService.getMovies().subscribe(movies => {
      this.movies = movies;
      this.movies.results.forEach(function(movie){
        console.log(movie)
      })
    })
  }
}

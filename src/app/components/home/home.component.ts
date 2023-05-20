import { Component, OnInit } from '@angular/core';
import { ApiListMovieService } from 'src/app/service/api.listmovie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  movies: any[] = [];

  constructor(private apiListMovieService: ApiListMovieService) {

  }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.apiListMovieService.getMovies().subscribe(movies => {
      this.movies = movies;
      console.log(this.movies);
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Credit } from 'src/app/models/creditmovie-i.movie';
import { DetailMovie } from 'src/app/models/detailmovie-i.model';
import { Images } from 'src/app/models/imagesmovie-i.movie';
import { ApiMovieService } from 'src/app/service/api.movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.sass']
})
export class MovieDetailComponent implements OnInit {

  movie!: DetailMovie;
  credits!: Credit;
  images!: Images;
  comments: string[] = []
  movieId: string = ''
  urlGetImage = 'https://image.tmdb.org/t/p/original/'

  constructor(private route: ActivatedRoute, private apiMovieService: ApiMovieService) {

  }

  ngOnInit(): void {
    this.movieId = this.route.snapshot.params['id'];
    this.getMovie();
  }

  getMovie(){
    this.apiMovieService.getMovieById(this.movieId).subscribe(movie => {
      this.movie = movie;
    })
  }

  getCredits(){
    this.apiMovieService.getCreditsMovieById(this.movieId).subscribe(credits => {
      this.credits = credits;
    })
  }

  getImages(){
    this.apiMovieService.getImagesMovieById(this.movieId).subscribe(images => {
      this.images = images;
    })
  }

  //Función agregar comentario


}

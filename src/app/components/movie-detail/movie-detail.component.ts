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
  comments: string[] = ["dfdf", "sss"];
  movieId: string = '';
  urlGetImage = 'https://image.tmdb.org/t/p/original/';
  imgDefaultActor:string='./images/actor-default.png';
  inputComment:string = ''

  constructor(private route: ActivatedRoute, private apiMovieService: ApiMovieService) {

  }

  ngOnInit(): void {
    this.movieId = this.route.snapshot.params['id'];
    this.getMovie();
    this.getCredits();
    this.getImages();
  }

  getMovie(){
    this.apiMovieService.getMovieById(this.movieId).subscribe(movie => {
      this.movie = movie;
    })
  }

  getCredits(){
    this.apiMovieService.getCreditsMovieById(this.movieId).subscribe(credits => {
      this.credits = credits
      const actors = credits.cast.filter(actor => actor.known_for_department === 'Acting');
      this.credits.cast = actors
    })
  }

  getImages(){
    this.apiMovieService.getImagesMovieById(this.movieId).subscribe(images => {
      this.images = images;
    })
  }

  validateImageActor(actor:any) {
    if (actor.profile_path != null) {
        return `${this.urlGetImage}${actor.profile_path}`;
    } else {
        return './assets/img/actordefault.png';
    }
}

  addComment(comment:string){
    this.comments.push(comment);
  }

  deleteComment(index:number){
    this.comments.splice(index,1)
  }

  //Función agregar comentario


}

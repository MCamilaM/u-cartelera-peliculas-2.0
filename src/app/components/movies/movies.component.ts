import { Component, OnInit, Input } from '@angular/core';
import { ListMovie } from 'src/app/models/listmovie-i.model';
import { ApiMovieService } from 'src/app/service/api.movie.service';
import { FilterService } from 'src/app/service/filter.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.sass']
})
export class MoviesComponent implements OnInit {

  @Input() name!: string

  movies!: ListMovie;
  urlGetImage = 'https://image.tmdb.org/t/p/original/'
  currentPage: number = 1
  totalPages: number = 0

  constructor(private apiMovieService: ApiMovieService, private servicio: FilterService) {

  }

  ngOnInit(): void {
    this.loadMovies();
    this.servicio.triggerFilter.subscribe(data => {
      this.filter(data)
    })
    this.servicio.triggerSearchMovie.subscribe(data => {
      this.searchMovie(data)
    })
  }

  loadMovies() {
    this.apiMovieService.getMovies(this.currentPage).subscribe(movies => {
      this.movies = movies;
      this.totalPages = movies.total_pages
    })
  }

  filter(option: any) {
    switch (option) {
      case "recientes":
        console.log(option);
        this.mostRecentFilter()
        break;
      case "antiguas":
        console.log(option);
        this.oldestFilter()
        break;
      case "puntaje":
        console.log(option);
        this.scoreFilter()
        break;
      case "a-z":
        console.log(option);
        this.alphabeticalOrderFilter();
        break;
      default:

        break;
    }
  }

  mostRecentFilter() {

    const moviesFilter = this.movies

    moviesFilter.results.sort(function (movie1, movie2) {
      let movie11 = new Date(movie1.release_date);
      let movie22 = new Date(movie2.release_date);

      if (movie11 > movie22) { return -1; }
      if (movie11 < movie22) { return 1; }
      // movie1.year must be equal to movie2.year
      return 0;
    });

    this.movies = moviesFilter
  }

  oldestFilter() {

    const moviesFilter = this.movies

    moviesFilter.results.sort(function (movie1, movie2) {
      let movie11 = new Date(movie1.release_date);
      let movie22 = new Date(movie2.release_date);

      if (movie11 > movie22) { return 1; }
      if (movie11 < movie22) { return -1; }
      // movie1.year must be equal to movie2.year
      return 0;
    });

    this.movies = moviesFilter
  }

  scoreFilter() {

    const moviesFilter = this.movies

    moviesFilter.results.sort(function (movie1, movie2) {

      if (movie1.vote_average > movie2.vote_average) { return -1; }
      if (movie1.vote_average < movie2.vote_average) { return 1; }
      // movie1.year must be equal to movie2.year
      return 0;
    });

    this.movies = moviesFilter
  }

  alphabeticalOrderFilter() {

    const moviesFilter = this.movies

    moviesFilter.results.sort(function (movie1, movie2) {

      var movie1Name = movie1.title.toLowerCase();
      var movie2Name = movie2.title.toLowerCase();

      if (movie1Name < movie2Name) { return -1 }
      if (movie1Name > movie2Name) { return 1 }
      // movie1.score must be equal to movie2.score
      return 0;
    });

    this.movies = moviesFilter

  }

  searchMovie(movie: any) {

    if (movie === '') {
      this.loadMovies()
    }

    const allMovies = this.movies

    const textToSearch = movie.toLowerCase();

    const moviesFiltradas = this.movies.results.filter(movie => movie.title.toLowerCase().indexOf(textToSearch) > -1)

    allMovies.results = moviesFiltradas

    this.movies = allMovies

  }

  onChangeNextPage() {
    this.currentPage++;
    console.log(this.currentPage);

    this.loadMovies();
  }

  onChangePreviousPage(){
    this.currentPage--;
    console.log(this.currentPage);

    this.loadMovies();
  }


}

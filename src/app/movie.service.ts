import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import { Movie } from './Movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private selectedMovie$:Subject<Movie> = new Subject<Movie>(); 
  private apiKey:string = "6be8fb15c9560e36d200aa76acce89d2";
  constructor() { }
  get currentMovie(){
    return this.selectedMovie$;
  }
  changeSelectedMovie(movie:Movie){
    this.selectedMovie$.next(movie);
  }
}

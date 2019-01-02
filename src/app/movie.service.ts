import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import { Movie } from './Movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private selectedMovie$:Subject<Movie> = new Subject<Movie>(); 
  private apiKey:string = "6be8fb15c9560e36d200aa76acce89d2";
  private baseUrl:string = "https://api.themoviedb.org/3/search/movie";
  private baseConfigurationUrl:string = "https://api.themoviedb.org/3/configuration";
  private imageBaseUrl:string = "";
  private imageSizes: {backdrop?:string[], poster?:string[]} = {};

  constructor(private http:HttpClient) {
    this.setImageConfiguration()
   }

  get currentMovie(){
    return this.selectedMovie$;
  }

  searchMovie(query:string){
    const params = new HttpParams().set('api_key', this.apiKey).set('query',query);
    return this.http.get<any>(this.baseUrl,{params})
    .map( res => res.results.map((result:Movie)=>{
      return {
        ...result,
        backdropUrl:this.createPhotoUrl(result.backdrop_path, true),
        posterUrl:this.createPhotoUrl(result.poster_path,false)
      }
    }));
  }

  changeSelectedMovie(movie:Movie){
    this.selectedMovie$.next(movie);
  }

  setImageConfiguration(){
    const params = new HttpParams().set('api_key', this.apiKey);
    return this.http.get<any>(this.baseConfigurationUrl,{params}).map(res => res).subscribe((config)=>{
      this.imageBaseUrl = config.images.base_url,
      this.imageSizes = {
        backdrop:config.images.backdrop_sizes,
        poster:config.images.poster_sizes
      }
    });
  }
  createPhotoUrl(path:string, isBackdrop:boolean){
    if(!path){
      return "";
    }
    const imageSize = isBackdrop ? this.imageSizes.backdrop[0] : this.imageSizes.poster[this.imageSizes.poster.length - 1]
    return `${this.imageBaseUrl}${imageSize}${path}`;
  }

}

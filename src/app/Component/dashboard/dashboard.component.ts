import { Component, OnInit, ɵNgModuleTransitiveScopes } from '@angular/core';
import { Movie } from 'src/app/Model/movie';
import { DataService } from 'src/app/Service/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  latestMovie:any;
  popularMovies!:Movie;
  nowPlayingMovies!:Movie;
  topRatedMovies!:Movie;
  upComingMovies!:Movie;
  trendingMovies!:Movie;
  originals!:Movie;

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.getLatestMovie();
    this.getNowPlayingMovies();
    this.getPopularMovies();
    this.getTopRatedMovies();
    this.getUpcomingMovies();
    this.getOrignalMovies();
    }

  getLatestMovie(){
    this.dataService.getLatestMovie().subscribe(res =>{
      this.latestMovie = this.changeData(res);
     
    },err =>{console.log("not able to get the latest movie")}
      )
  }

  changeData(res:any):any{
    if(!res.backdrop_path){
      res.backdrop_path= 'https://image.tmdb.org/t/p/original'+res.poster_path+'?api_key='+environment.api_key;
    }else{
      res.backdrop_path= 'https://image.tmdb.org/t/p/original'+res.backdrop_path+'?api_key='+environment.api_key;
    }
    return res;
  }

  getNowPlayingMovies(){
    this.dataService.getPopularMovies().subscribe(res=>{
      this.nowPlayingMovies=this.modifyData(res);
      
    },err =>{console.log("not able to get the now playing movies")}
    )
  }

  getPopularMovies(){
    this.dataService.getPopularMovies().subscribe(res=>{
      this.popularMovies=this.modifyData(res);
    },err =>{console.log("not able to get the popular movies")}
    )
  }

  getTopRatedMovies(){
    this.dataService.getTopRatedMovies().subscribe(res=>{
      this.topRatedMovies=this.modifyData(res);
    },err =>{console.log("not able to get the top rated movies")}
    )
  }  
  
  getUpcomingMovies(){
    this.dataService.getUpcomingMovies().subscribe(res=>{
      this.upComingMovies=this.modifyData(res);
    },err =>{console.log("not able to get the upcoming movies")}
    )
  }

  getOrignalMovies(){
    this.dataService.getOriginals().subscribe(res=>{
      this.originals=this.modifyData(res);
    },err =>{console.log("not able to get the originals")}
    )
  }

  modifyData(movies: Movie) : Movie{
    if(movies.results){
      movies.results?.forEach(
        element => {
          element.backdrop_path='https://image.tmdb.org/t/p/original'+element.backdrop_path+'api_key?'+environment.api_key;
      })
    
    }
    return movies;
  }

}
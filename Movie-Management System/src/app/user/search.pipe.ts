import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(movieData: any[],searchTerm:string): any {
    if(!movieData || !searchTerm){
      return movieData
    }
    else{
      return movieData.filter(movieObj=>(movieObj.movieName.toLowerCase()).indexOf(searchTerm.toLowerCase())!==-1)
    }
  }

}

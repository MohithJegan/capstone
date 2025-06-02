import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchpipe'
})
export class SearchpipePipe implements PipeTransform {

  // transform(value: any[], searchTerm:string): any[] {
  //   console.log(searchTerm)
  //   if(!value || !searchTerm) return value;
  //   else return value.filter(data => {
  //     let val = data.movieName.indexOf(searchTerm.toLowerCase())!==-1
  //     console.log(val,typeof(val))
  //   })
  // }
  transform(movieData: any[],searchTerm:string): any {
     return null
  }

}



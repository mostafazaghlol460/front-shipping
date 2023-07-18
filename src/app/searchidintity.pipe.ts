import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchidintity'
})
export class SearchidintityPipe implements PipeTransform {

  transform(value: any, input: any): any {
    if (input) {
       return value.filter((val:any) => val.userName.indexOf(input) >= 0);
     } else {
       return value;
     }
    }

}

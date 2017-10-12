import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'list2History'
})
export class List2HistoryPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}

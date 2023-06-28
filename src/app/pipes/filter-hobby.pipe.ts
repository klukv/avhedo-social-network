import { Pipe, PipeTransform } from '@angular/core';
import { IHobbyInfo } from '../models/personInfo';

@Pipe({
  name: 'filterHobby'
})
export class FilterHobbyPipe implements PipeTransform {

  transform(hobbyList: IHobbyInfo[], hobbyName: string): IHobbyInfo[] {
    if(hobbyName.length == 0) return hobbyList;
    return hobbyList.filter(hobby => hobby.information.toLowerCase().includes(hobbyName.toLowerCase()));
  }

}

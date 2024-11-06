import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mayus',
  standalone: true
})
export class MayusPipe implements PipeTransform {
  transform(value: string): string {
    return value.toUpperCase();
  }
}
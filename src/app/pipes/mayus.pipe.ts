import { Pipe, PipeTransform } from '@angular/core';
/**
 * Pipe utilizada para pasar el nombre del usuario que se muestra a mayúscula
 */
@Pipe({
  name: 'mayus',
  standalone: true
})
export class MayusPipe implements PipeTransform {
  transform(value: string): string {
    return value.toUpperCase();
  }
}
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'onlyNumeric' })
export class OnlyNumericPipe implements PipeTransform {
  constructor() {}

  transform(input: string): string {
    if (input) {
      return input.replace(/[^0-9.]/g, '');
    }

    return input;
  }
}

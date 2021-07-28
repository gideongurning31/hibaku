import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'noWhitespace' })
export class NoWhitespacePipe implements PipeTransform {
  constructor() {}

  transform(input: string): string {
    if (input) return input.trim().replace(/ /g, '');
    return '';
  }
}

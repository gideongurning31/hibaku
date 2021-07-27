import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fullAddress' })
export class FullAddressPipe implements PipeTransform {
  constructor() {}

  transform(data: AddressObject): string {
    return data.address.concat(', ').concat(data.city).concat(' ').concat(data.zipCode);
  }
}

interface AddressObject {
  city: string;
  address: string;
  zipCode: string;
}

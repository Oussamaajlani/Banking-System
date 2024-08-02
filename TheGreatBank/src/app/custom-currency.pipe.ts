import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency',
})
export class CustomCurrencyPipe implements PipeTransform {
  transform(
    value: number,
    currency: string = 'TND',
    symbolDisplay: boolean = true,
    digitsInfo: string = '1.2-2'
  ): string | null {
    if (value == null) return null;

    const formattedValue = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

    return symbolDisplay ? `${formattedValue} ${currency}` : formattedValue;
  }
}

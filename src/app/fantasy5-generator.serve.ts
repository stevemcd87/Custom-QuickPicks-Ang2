import { Injectable } from '@angular/core';
import { LottoNumber } from './lottery';

@Injectable()

export class Fantasy5GeneratorService {

    createLL(customArray: LottoNumber[]) { // Create LottoList
        const lottoList: number[][] = [];
        const lastIndex: number = customArray.length - 1;

        function lottoGenerator(value, index, array) {
            console.log(value);
            console.log(index);
            console.log(array);
        }

        customArray.forEach(lottoGenerator);

        console.log(customArray);
        console.log(lastIndex);
        console.log(lottoList);
    }
}// -- End of Service------------------

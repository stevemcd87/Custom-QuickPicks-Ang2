
import { Injectable } from '@angular/core';
import { LOTTOGAMES, FANTASYOPTION, FLORIDAOPTION } from './mock-lottery';
import { LottoGame, LottoNumber } from './lottery';

@Injectable()
export class LotteryService {

  stepPlusOne(step): number {
    return step += 1;
  }

  getLottoGames(): Promise<LottoGame[]> {
    return Promise.resolve(LOTTOGAMES);
  }

  getPickOptions(valueName: string, value: string): Promise<LottoNumber[]> {
    let vn: LottoNumber[];
    switch (valueName) {
      case 'FANTASYOPTION': vn = FANTASYOPTION[value];
        break;
      case 'FLORIDAOPTION': vn = FLORIDAOPTION[value];
        break;
    }
    return Promise.resolve(vn);

  }

  onSelect(value: string): LottoGame {
    Number(value);
    return LOTTOGAMES[value];
  }
}// End of Class

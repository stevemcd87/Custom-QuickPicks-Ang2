
import { Injectable } from '@angular/core';
import { LOTTOGAMES } from './mock-lottery';
import { LottoGame } from './lottery';

@Injectable()
export class LotteryService {

  stepPlusOne(step): number {
    return step += 1;
  }

  getLottoGames(): Promise<LottoGame[]> {
    return Promise.resolve(LOTTOGAMES);
  }

  onSelect(value: string): LottoGame {
    Number(value);
    return LOTTOGAMES[value];
  }
}// End of Class

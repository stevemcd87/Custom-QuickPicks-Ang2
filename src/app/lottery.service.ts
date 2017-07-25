
import { Injectable } from '@angular/core';

@Injectable()
export class LotteryService {

  constructor() { }
  stepPlusOne(step): number {
    return step += 1;
  }
}

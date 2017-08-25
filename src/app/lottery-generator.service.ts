import { Injectable } from '@angular/core';
import { LottoNumber } from './lottery';

@Injectable()

export class LotteryGeneratorService {
  genLottoArgs(lottoNumberArr: LottoNumber[]): number[][] {
    const startLottery: number[] = [];
    const increments: number[] = [];
    const endLottery: number[] = [];
    lottoNumberArr.forEach(function (item) {
      startLottery.push(item.startNumber);
      increments.push(item.increment);
      endLottery.push(item.endNumber);
    });
    return this.generateLotto(startLottery, increments, endLottery);
  } // End of genLottoArgs()

  generateLotto(firstLotto: number[], increments: number[], lastLotto: number[]): number[][] {

    const lotteryList: number[][] = [];
    const currentLotto: number[] = firstLotto.slice();
    const Index: number = currentLotto.length - 1;

    function indexInc(index: number) {
      let newArray: number[];

      function indexReset() {
        function loop(current: number[], original: number[]): any {
          return spliceOrig(current, original);
        }

        function spliceOrig(current: number[], original: number[]): number[] {
          const range: number = current.length - index;
          const values: number[] = [];
          let nextIndex: number;
          for (let i = 0; i < range; i += 1) {
            const value: number = original[index + i];
            values.push(value);
          }
          nextIndex = (current.length - 1) - values.length;
          current[nextIndex] += increments[nextIndex];
          if (current[nextIndex] >= values[0]) {
            values[0] = current[nextIndex] + 1;
          }
          for (let i1 = 1; i1 <= values.length; i1 += 1) {
            if (values[i1 - 1] >= values[i1]) {
              values[i1] = values[i1 - 1] + 1;
            }
          }
          current.splice.apply(current, [index, range].concat(values)); // ES6 (...)
          if (currentLotto[index - 1] > lastLotto[index - 1]) {
            index -= 1;
            return loop(current, original);
          }
          return current;
        }// End of spliceOrig ()-----------------------------

        if (currentLotto[index] > lastLotto[index]) {
          spliceOrig(currentLotto, firstLotto);
        }
        if (currentLotto[index - 1] >= currentLotto[index]) {
          currentLotto[index] = currentLotto[index - 1] + 1;
        }
        lotteryList.push(newArray);
        return newArray;
      } // End of indexReset ()--------------------------------

      newArray = currentLotto.slice();
      currentLotto[index] += increments[index];
      indexReset();
    } // --End of indexInc()----------------------------------

    while (currentLotto[0] < lastLotto[0]) {
      indexInc(Index);
    }
    indexInc(Index);
    return lotteryList;
  }// --End of generateLotto()----------------------
}// -- End of Service------------------

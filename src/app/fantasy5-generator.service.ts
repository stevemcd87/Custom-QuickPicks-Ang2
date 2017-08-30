import { Injectable } from '@angular/core';
import { LottoNumber, LottoList } from './lottery';

@Injectable()

export class Fantasy5GeneratorService {

    genLottoArgs(lottoNumberArr: LottoNumber[]): LottoList[] {
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

    generateLotto(firstLotto: number[], increments: number[], lastLotto: number[]): LottoList[] {
        const lotteryList: LottoList[] = [];
        let idn = 0;
        const currentLotto: number[] = firstLotto.slice();
        const Index: number = currentLotto.length - 1;
        currentLotto.forEach(function (val, ind, arr) {
            while (arr[ind] < lastLotto[ind]) {
                indexInc(Index);
            }
        });
        indexInc(Index);
        return lotteryList;

        function indexInc(index: number) {
            const newArray: number[] = currentLotto.slice();
            if (increments[index] === 0) {
                index -= 1;
                return indexInc(index);
            }
            currentLotto[index] += increments[index];
            indexReset();

            function indexReset() {
                function loop(current: number[], original: number[]): any {
                    return spliceOrig(current, original);
                }

                if (currentLotto[index] > lastLotto[index]) {
                    spliceOrig(currentLotto, firstLotto);
                }
                while (currentLotto[index - 1] >= currentLotto[index]) {
                    currentLotto[index] += increments[index];
                    if (currentLotto[index] > lastLotto[index]) {
                        spliceOrig(currentLotto, firstLotto);
                    }
                }
                idn += 1;
                lotteryList.push({
                    id: idn,
                    lotto: newArray
                });
                return newArray;

                function spliceOrig(current: number[], original: number[]): number[] {
                    const range: number = current.length - index;
                    const values: number[] = [];
                    const nextIndex: number = index - 1;
                    if (increments[nextIndex] === 0) {
                        index -= 1;
                        return spliceOrig(current, original);
                    }
                    if (current[nextIndex] + increments[nextIndex] >= lastLotto[index]) {
                        index -= 1;
                        return spliceOrig(current, original);
                    }
                    current[nextIndex] += increments[nextIndex];
                    original.forEach(function (val, ind) {
                        if (ind >= index) {
                            values.push(val);
                        }
                    });
                    values.forEach(function (val, ind, arr) {
                        const incIndex = (current.length - arr.length) + ind;
                        if (ind === 0) {
                            while (current[nextIndex] >= arr[ind]) {
                                arr[ind] += increments[incIndex];
                                if (arr[ind] > lastLotto[incIndex]) {
                                    index -= 1;
                                    arr[ind] -= increments[incIndex];
                                    return spliceOrig(current, original);
                                }
                            }
                        }
                        if (ind > 0) {
                            while (arr[ind - 1] >= arr[ind]) {
                                arr[ind] += increments[incIndex];
                                if (arr[ind] > lastLotto[incIndex]) {
                                    index -= 1;
                                    arr[ind] -= increments[incIndex];
                                    return spliceOrig(current, original);
                                }
                            }
                        }
                    });
                    current.splice(index, range, ...values);
                    return current;
                }// End of spliceOrig ()-----------------------------
            } // End of indexReset ()--------------------------------
        } // --End of indexInc()----------------------------------
    }// --End of generateLotto()----------------------
}// -- End of Service------------------

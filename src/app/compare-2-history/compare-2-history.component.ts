import { Component, OnInit, Input } from '@angular/core';
import { LottoGame, LottoNumber, LottoOption, LottoList, WinningHistory, ComparedList } from '../lottery';

@Component({
  selector: 'app-compare-2-history',
  templateUrl: './compare-2-history.component.html',
  styleUrls: ['./compare-2-history.component.css']
})
export class Compare2HistoryComponent implements OnInit {
  @Input() lG: LottoGame;
  @Input() lottoList: LottoList[];
  winningHistory: WinningHistory[];
  comparedList: ComparedList[];
  constructor() { }

  ngOnInit() {
    this.winningHistory = this.lG.winningHistory;
  }

  compareLists() {
    const comparedList: ComparedList[] = [];
    const matchedLottos: LottoList[] = [];
    this.winningHistory.forEach((val1, ind1, arr1) => {
      matchedLottos.length = 0;
      const mL = matchedLottos.slice();
      const winningNumbers = val1.winningNumber;
      this.lottoList.forEach((val2, ind2, arr2) => {
        const userNumbers = val2.lotto;
        const id = val2.id;
        const matchedNumbers = this.compareArrays(winningNumbers, userNumbers);
        mL.push({ id: id, lotto: userNumbers, matchedNumbers: matchedNumbers });
      });
      comparedList.push({
        date: val1.date, winningNumber: val1.winningNumber,
        matchedLottos: mL
      });
    });
    console.log(comparedList);
    return this.comparedList = comparedList;
  }

  compareArrays(arr1: number[], arr2: number[]) {
    let matchedNumbers = 0;
    arr1.forEach((val, ind, arr) => {
      for (let i = 0; i < arr.length; i += 1) {
        if (val === arr2[i]) {
          matchedNumbers += 1;
          i += arr.length;
        }
      }
    });
    return matchedNumbers;
  }


}

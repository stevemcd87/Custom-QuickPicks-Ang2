import { LottoGame, LottoNumber } from './lottery';

export const LOTTOGAMES: LottoGame[] = [
  {
    id: 0,
    name: 'Fantasy 5',
    valueName: 'FANTASYOPTION',
    lotteryLength: 5,
    maxNumber: 36
  },
  {
    id: 1,
    name: 'Florida Lotto',
    valueName: 'FLORIDAOPTION',
    lotteryLength: 6,
    maxNumber: 40
  }
];

export const FANTASYOPTION: LottoNumber[][] = [
  [{
    startNumber: 1,
    increment: 1,
    endNumber: 10
  },
  {
    startNumber: 2,
    increment: 1,
    endNumber: 11
  },
  {
    startNumber: 3,
    increment: 1,
    endNumber: 13
  },
  {
    startNumber: 4,
    increment: 1,
    endNumber: 14
  },
  {
    startNumber: 5,
    increment: 1,
    endNumber: 15
  }],

  [{
    startNumber: 1,
    increment: 1,
    endNumber: 10
  },
  {
    startNumber: 2,
    increment: 1,
    endNumber: 11
  },
  {
    startNumber: 3,
    increment: 1,
    endNumber: 13
  },
  {
    startNumber: 4,
    increment: 1,
    endNumber: 14
  },
  {
    startNumber: 5,
    increment: 1,
    endNumber: 35
  }]
];
export const FLORIDAOPTION: LottoNumber[][] = [
  [{
    startNumber: 1,
    increment: 1,
    endNumber: 20
  },
  {
    startNumber: 2,
    increment: 1,
    endNumber: 21
  },
  {
    startNumber: 3,
    increment: 1,
    endNumber: 22
  },
  {
    startNumber: 4,
    increment: 1,
    endNumber: 23
  },
  {
    startNumber: 5,
    increment: 1,
    endNumber: 24
  },
  {
    startNumber: 6,
    increment: 1,
    endNumber: 25
  }],
  [{
    startNumber: 1,
    increment: 1,
    endNumber: 20
  },
  {
    startNumber: 2,
    increment: 1,
    endNumber: 21
  },
  {
    startNumber: 3,
    increment: 1,
    endNumber: 22
  },
  {
    startNumber: 4,
    increment: 1,
    endNumber: 23
  },
  {
    startNumber: 5,
    increment: 1,
    endNumber: 24
  },
  {
    startNumber: 6,
    increment: 1,
    endNumber: 45
  }]
];

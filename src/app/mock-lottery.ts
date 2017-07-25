import { LottoGame, LottoNumber, LottoOption } from './lottery';

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

export const FANTASYOPTION: LottoOption[] = [
  {
    name: 'Option 1',
    option: [
      { startNumber: 1, increment: 1, endNumber: 11 },
      { startNumber: 2, increment: 1, endNumber: 12 },
      { startNumber: 3, increment: 1, endNumber: 13 },
      { startNumber: 4, increment: 1, endNumber: 14 },
      { startNumber: 5, increment: 1, endNumber: 15 }]
  },
  {
    name: 'Option 2',
    option: [
      { startNumber: 1, increment: 1, endNumber: 31 },
      { startNumber: 2, increment: 1, endNumber: 32 },
      { startNumber: 3, increment: 1, endNumber: 33 },
      { startNumber: 4, increment: 1, endNumber: 34 },
      { startNumber: 5, increment: 1, endNumber: 35 }]
  }
];
export const FLORIDAOPTION: LottoOption[] = [
  {
    name: 'Option 1',
    option: [
      { startNumber: 1, increment: 1, endNumber: 11 },
      { startNumber: 2, increment: 1, endNumber: 12 },
      { startNumber: 3, increment: 1, endNumber: 13 },
      { startNumber: 4, increment: 1, endNumber: 14 },
      { startNumber: 5, increment: 1, endNumber: 15 },
      { startNumber: 6, increment: 1, endNumber: 16 }]
  },
  {
    name: 'Option 2',
    option: [
      { startNumber: 1, increment: 1, endNumber: 31 },
      { startNumber: 2, increment: 1, endNumber: 32 },
      { startNumber: 3, increment: 1, endNumber: 33 },
      { startNumber: 4, increment: 1, endNumber: 34 },
      { startNumber: 5, increment: 1, endNumber: 35 },
      { startNumber: 6, increment: 1, endNumber: 36 }]
  }
];

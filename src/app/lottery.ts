export class LottoGame {
    id: number;
    name: string;
    valueName: string;
    lotteryLength: number;
    maxNumber: number;
    winningHistory: WinningHistory[];
}

export class WinningHistory {
    date: string;
    winningNumber: number[];
    x?: number;
}

export class LottoOption {
    name: string;
    option: LottoNumber[];
}

export class LottoNumber {
    startNumber: number;
    increment: number;
    endNumber: number;
}
export class LottoList {
    id: number;
    lotto: number[];
    matchedNumbers?: number;
}

export class ComparedList {
    date?: string;
    winningNumber: number[];
    x?: number;
    matchedLottos: LottoList[];
}

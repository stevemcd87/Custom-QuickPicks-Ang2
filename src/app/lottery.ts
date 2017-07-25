export class LottoGame {
    id: number;
    name: string;
    valueName: string;
    lotteryLength: number;
    maxNumber: number;
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

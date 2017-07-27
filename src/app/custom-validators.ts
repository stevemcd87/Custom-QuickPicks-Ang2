import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
export class CustomValidators {
    static checkTP(controlName) {
        return (control) => {
            const controlValue = control.get(controlName).value;
            return (controlValue) && (controlValue !== 'custom') ? null : { checkTP: true };
        };
    }
    static checkLN(arrayName, lottoGame) {
        return (control) => {
            console.log(lottoGame);
            const arrayControl = control.get(arrayName).controls;
            const arrayLength = arrayControl.length;
            const currentLN = arrayControl[arrayLength - 1].value;
            const currentSN = currentLN.startNumber;
            const currentInc = currentLN.increment;
            const currentEN = currentLN.endNumber;
            let startMin = 1;
            const startMax = currentEN;
            let incMin: number;
            (currentSN === currentEN) ? incMin = 0 : incMin = 1;
            const incMax = currentEN - currentSN;
            const endMin = currentSN;
            const endMax = lottoGame.maxNumber - (lottoGame.lotteryLength - arrayLength);
            if (arrayLength > 1) {
                const lastLN = arrayControl[arrayLength - 2].value;
                const lastSN = lastLN.startNumber;
                const lastInc = lastLN.increment;
                const lastEN = lastLN.endNumber;
                startMin = lastSN + 1;
            }
            console.log(control);
            console.log('startMin -' + ' ' + startMin);
            console.log('startMax -' + ' ' + startMax);
            console.log('currentSN -' + ' ' + currentSN);
            console.log('incMin -' + ' ' + incMin);
            console.log('incMax -' + ' ' + incMax);
            console.log('currentInc -' + ' ' + currentInc);
            console.log('endMin -' + ' ' + endMin);
            console.log('endMax -' + ' ' + endMax);
            console.log('currentEN -' + ' ' + currentEN);
            return (currentSN === null) || (currentSN > startMax) || (currentSN < startMin) ||
                (currentInc === null) || (currentInc > incMax) || (currentInc < incMin) ||
                (currentSN === null) || (currentEN > endMax) || (currentEN < endMin)
                ? { checkLN: true } : null;
        };
    }
}

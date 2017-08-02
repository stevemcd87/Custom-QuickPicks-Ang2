
export class CustomValidators {

    static checkTP(controlName) {
        return (control) => {
            const controlValue = control.get(controlName).value;
            return (controlValue) && (controlValue !== 'custom') ? null : { checkTP: true };
        };
    }

    static checkLN(lottoGame, objectKey) {
        return (control) => {
            let valid = false;
            const parentControl = control.root.get('customLNs');
            if (parentControl !== null) {
                const arrayLength = parentControl.length;
                const currentLN = parentControl.get([arrayLength - 1]);
                const currentvalue = currentLN.get(objectKey).value;
                const currentSN = currentLN.value.startNumber;
                const currentInc = currentLN.value.increment;
                const currentEN = currentLN.value.endNumber;
                let min: number;
                let max: number;
                switch (true) {
                    case objectKey === 'startNumber':
                        if (arrayLength === 1) {
                            min = 1;
                        } else {
                            const lastLN = parentControl.get([arrayLength - 2]);
                            const lastSN = lastLN.value.startNumber;
                            min = lastSN + 1;
                        }
                        max = currentEN;
                        break;
                    case objectKey === 'increment':
                        (currentSN === currentEN) ? min = 0 : min = 1;
                        max = currentEN - currentSN;
                        break;
                    case objectKey === 'endNumber':
                        min = currentSN;
                        max = lottoGame.maxNumber - (lottoGame.lotteryLength - arrayLength);
                        break;
                }
                (currentvalue === null) || (currentvalue < min) || (currentvalue > max) ? valid = false : valid = true;
                // return (currentvalue !== null) || (currentvalue > min) || (currentvalue < max) ? null : { invalid: true };
            }

            return (valid) ? null : {

                checkLN: true
            };
        };
    }

    static checkLNgroup(arrayName, lottoGame) {
        return (control) => {
            // console.log(lottoGame);
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
            return (currentSN === null) || (currentSN > startMax) || (currentSN < startMin) ||
                (currentInc === null) || (currentInc > incMax) || (currentInc < incMin) ||
                (currentEN === null) || (currentEN > endMax) || (currentEN < endMin)
                ? { checkLN: true } : null;
        };
    }
}
            // console.log(control);
            // console.log('startMin -' + ' ' + startMin);
            // console.log('startMax -' + ' ' + startMax);
            // console.log('currentSN -' + ' ' + currentSN);
            // console.log('incMin -' + ' ' + incMin);
            // console.log('incMax -' + ' ' + incMax);
            // console.log('currentInc -' + ' ' + currentInc);
            // console.log('endMin -' + ' ' + endMin);
            // console.log('endMax -' + ' ' + endMax);
            // console.log('currentEN -' + ' ' + currentEN);

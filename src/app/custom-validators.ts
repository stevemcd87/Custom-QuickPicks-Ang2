export class CValidators {
    static checkTP(controlName) {
        return (control) => {
            const controlValue = control.get(controlName).value;
            return (controlValue) && (controlValue !== 'custom') ? null : { checkTP: true };
        };
    }
    static LNmin(lottoGame, objectKey) {
        return (control) => {
            let valid = false;
            const parentControl = control.root.get('customLNs');
            if (parentControl !== null) {
                const arrayLength = parentControl.length;
                const currentLN = parentControl.get([arrayLength - 1]);
                const SNvalid = currentLN.controls.startNumber.valid;
                const currentvalue = currentLN.get(objectKey).value;
                const SNvalue = currentLN.value.startNumber;
                const currentEN = currentLN.value.endNumber;
                let min: number;
                switch (true) {
                    case objectKey === 'startNumber':
                        if (arrayLength === 1) {
                            min = 1;
                        } else {
                            const lastLN = parentControl.get([arrayLength - 2]);
                            const lastSN = lastLN.value.startNumber;
                            min = lastSN + 1;
                        }
                        break;
                    case objectKey === 'increment':
                        if (currentLN.controls.startNumber.invalid || currentLN.controls.endNumber.invalid) {
                            min = null;
                        } else {
                            (SNvalue === currentEN) ? min = 0 : min = 1;
                        }
                        break;
                    case objectKey === 'endNumber':
                        if (arrayLength > 1) {
                            const lastLN = parentControl.get([arrayLength - 2]);
                            const lastSN = lastLN.value.startNumber;
                            (SNvalid === true) ? min = SNvalue : min = lastSN + 1;
                        } else {
                            (SNvalid === true) ? min = SNvalue : min = 1;
                        }
                        break;
                }
                (currentvalue === null) || (currentvalue < min) || (min === null) ? valid = false : valid = true;
                console.log(objectKey + ' min = ' + min); // For debugging purposes
            }
            return (valid) ? null : { LNmin: true };
        };
    }
    static LNmax(lottoGame, objectKey) {
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
                let max: number;
                switch (true) {
                    case objectKey === 'startNumber':
                        if (currentEN === null) {
                            max = lottoGame.maxNumber - (lottoGame.lotteryLength - arrayLength);
                        } else {
                            max = currentEN;
                        }

                        break;
                    case objectKey === 'increment':
                        if (currentLN.controls.startNumber.invalid || currentLN.controls.endNumber.invalid) {
                            max = null;
                        } else {
                            (currentSN === currentEN) ? max = 0 : max = currentEN - currentSN;
                        }
                        break;
                    case objectKey === 'endNumber':
                        max = lottoGame.maxNumber - (lottoGame.lotteryLength - arrayLength);
                        break;
                }
                (currentvalue > max) ? valid = false : valid = true;
                console.log(objectKey + ' max = ' + max); // For debugging purposes
            }
            return (valid) ? null : { LNmax: true };
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

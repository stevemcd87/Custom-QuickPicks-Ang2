export class CustomValidators {
    static checkTP(controlName) {
        return (control) => {
            const controlValue = control.get(controlName).value;
            return (controlValue) && (controlValue !== 'custom') ? null : { checkTP: true };
        };
    }
}

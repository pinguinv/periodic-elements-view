import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function integerOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const notInteger = control.value % 1 !== 0;
    return notInteger ? { notInteger: { value: control.value } } : null;
  };
}

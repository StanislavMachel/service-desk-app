import { AbstractControl, ValidatorFn } from '@angular/forms';

export function notBlank(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const value = control.value != null ? control.value.trim() : null;
      return !value ? {blank: {value: control.value}} : null;
    };
}

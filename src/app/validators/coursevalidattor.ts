import { AbstractControl, AsyncValidator, AsyncValidatorFn } from "@angular/forms";
import { map } from "rxjs/operators";
import { ProductService } from "../_services/product.service";

export function courseTitleValidation(product : ProductService) : AsyncValidatorFn {

  return (control: AbstractControl) => {
        return  product.readListProduct().pipe(
           map(courses => {
                   const course = courses.find(courses.nameProduct.toLowerCase() === control.value.toLowerCase());
                   return course ?{titleExistes: true} : null;
           })
         )
  }
}
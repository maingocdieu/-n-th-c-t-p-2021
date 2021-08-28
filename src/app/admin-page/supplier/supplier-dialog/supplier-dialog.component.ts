import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SupplierService } from 'src/app/_services/supplier.service';

@Component({
  selector: 'app-supplier-dialog',
  templateUrl: './supplier-dialog.component.html',
  styleUrls: ['./supplier-dialog.component.css']
})
export class SupplierDialogComponent implements OnInit {

  supplierForm: FormGroup;
  supplier = {
    id: -1,
    nameSupplier: '',

  };

  buttonName = '';
  constructor(public supplierService: SupplierService, @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<SupplierDialogComponent>, private formBuilder: FormBuilder) { 
    if (data.data == null) {
      this.supplier.nameSupplier = '';
      this.buttonName = 'Thêm thương hiệu';
    } else {
      this.supplier.id = data.data.id;
      this.supplier.nameSupplier = data.data.nameSupplier;
      this.buttonName = 'Update';
    }
  }

  ngOnInit(): void {

    if (this.data.data == null) {
      this.supplierForm = this.formBuilder.group({
        nameSupplier: ['', {
          validators: [Validators.required],
          asyncValidators: [this.customAsyncValidator()],
          updateOn: 'blur'
        }],
      });
    } else {
      this.supplierForm = this.formBuilder.group({
        nameSupplier: ['', {
          validators: [Validators.required],
          updateOn: 'blur'
        }],
      });
    }

  }


  get f() { return this.supplierForm.controls; }

  customAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this.supplierService.readAllSupplier().pipe(map(res => {
        const name = res.find(res => res?.nameSupplier.toLowerCase() === this.f.nameSupplier.value.toLowerCase());
        return name ? { courseExist: true } : null;
      })
      );
    }
  }
}

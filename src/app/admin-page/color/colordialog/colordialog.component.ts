import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ColorService } from 'src/app/_services/color.service';

@Component({
  selector: 'app-colordialog',
  templateUrl: './colordialog.component.html',
  styleUrls: ['./colordialog.component.css']
})
export class ColordialogComponent implements OnInit {

  colorForm: FormGroup;
  color = {
    id: -1,
    colorName: '',

  };

  buttonName = '';
  constructor(public colorService: ColorService, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ColordialogComponent>, private formBuilder: FormBuilder) {

    if (data.data == null) {
      this.color.colorName = '';
      this.buttonName = 'Thêm màu sắc';
    } else {
      this.color.id = data.data.id;
      this.color.colorName = data.data.nameColor;
      this.buttonName = 'Update';
    }
  }



  ngOnInit(): void {

    if (this.data.data == null) {
      this.colorForm = this.formBuilder.group({
        colorName: ['', {
          validators: [Validators.required],
          asyncValidators: [this.customAsyncValidator()],
          updateOn: 'blur'
        }],
      });
    } else {
      this.colorForm = this.formBuilder.group({
        colorName: ['', {
          validators: [Validators.required],
          updateOn: 'blur'
        }],
      });
    }
  }

  get f() { return this.colorForm.controls; }

  customAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this.colorService.readAllColor().pipe(map(res => {
        console.log(this.f.colorName.value);
        console.log(res);

        const name = res.find(res => res?.nameColor.toLowerCase() === this.f.colorName.value.toLowerCase());
        console.log(name);
        return name ? { courseExist: true } : null;
      })
      );
    }
  }

}

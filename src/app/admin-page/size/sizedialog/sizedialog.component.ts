import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SizeService } from 'src/app/_services/size.service';

@Component({
  selector: 'app-sizedialog',
  templateUrl: './sizedialog.component.html',
  styleUrls: ['./sizedialog.component.css']
})
export class SizedialogComponent implements OnInit {

  sizeForm: FormGroup;
  size = {
    id: -1,
    nameSize: '',

  };

  buttonName = '';
  constructor(public sizeService: SizeService, @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<SizedialogComponent>, private formBuilder: FormBuilder) {

    if (data.data == null) {
      this.size.nameSize = '';
      this.buttonName = 'Thêm kích thước';
    } else {
      this.size.id = data.data.id;
      this.size.nameSize = data.data.namesize;
      this.buttonName = 'Update';
    }
   }

  ngOnInit(): void {

    if (this.data.data == null) {
      this.sizeForm = this.formBuilder.group({
        nameSize: ['', {
          validators: [Validators.required],
          asyncValidators: [this.customAsyncValidator()],
          updateOn: 'blur'
        }],
      });
    } else {
      this.sizeForm = this.formBuilder.group({
        nameSize: ['', {
          validators: [Validators.required],
          updateOn: 'blur'
        }],
      });
    }

    
  }

  get f() { return this.sizeForm.controls; }

  customAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this.sizeService.readAllSize().pipe(map(res => {
        console.log(this.f.nameSize.value);
        console.log(res);

        const name = res.find(res => res?.namesize.toLowerCase() === this.f.nameSize.value.toLowerCase());
        return name ? { courseExist: true } : null;
      })
      );
    }
  }
}

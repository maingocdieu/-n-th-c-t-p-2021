import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder, AsyncValidator, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms'
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/_services/category.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css']
})
export class CategoryDialogComponent implements OnInit {

  category = {
    id: -1,
    name: '',
    code: '',
  };
  buttonName = '';
  categoryForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<CategoryDialogComponent>, private formBuilder: FormBuilder,public categoryService: CategoryService) {

    if (data.data == null) {
      this.category.name = '';
      this.category.code='';
      this.buttonName = 'Register';
    } else {
      this.category.id = data.data.id;
      this.category.name = data.data.name;
      this.category.code = data.data.code;
      this.buttonName = 'Update';
  }
}
  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      nameCategory: ['',{validators : [Validators.required],
        asyncValidators: [this.customAsyncValidator()],
        updateOn: 'blur'

      }],
      codeCategory: ['',Validators.required]
    });
  }

  get f() { return this.categoryForm.controls; }
  closeDialog()
  {
    this.dialogRef.close(false);
  }

  customAsyncValidator(): AsyncValidatorFn {
     return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> =>{
       return this.categoryService.readAllCategory().pipe(map(res => {
        const name = res.find(res => res.name.toLowerCase() === this.f.nameCategory.value.toLowerCase());
        return name? {courseExist: true}: null;
       })

       );
     }
  }
}

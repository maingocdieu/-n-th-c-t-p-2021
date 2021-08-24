import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';



  userForm: FormGroup;
  formErrors = {
    userName: '',
    passWord: '',
    confirmPassword: '',
    passwordGroup: '',
    email: '',
  };


  validationMessages = {
    userName: {
      required: 'Tên đăng nhập phải có',
      minlength: 'Tên đăng nhập phải hơn hai kí tự',
      maxlength: 'Tên Đăng nhập phải ít hơn 10 kí tự.',
    },
    passWord: {
      required: 'Mật khẩu bắt buộc phải có',
    },
    confirmPassword: {
      required: 'Nhập lại mật khẩu  bắt buộc phải có',
    },
    passwordGroup: {
      passwordMissMatch: 'Mật khậu nhập lại không khớp',
    },
    email: {
      required: 'Email phải có',
    },
   
  };
signUprequest = {
    username: '',
    email: '',
    password: '',
    role:["user"]
  }

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      userName: ['',[Validators.required]],
      email: ['',Validators.required],
      passwordGroup: this.formBuilder.group(
        {
          passWord: ['', [Validators.required]],
          confirmPassword: ['', [Validators.required]],
        },
        { validators: matchPassWord }
      ),
    });
  }

  onSubmit(): void {

    if(this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      this.logKeyValuePairs(this.userForm);
      
     }

     else {
       this.signUprequest.username = this.userForm.get('userName').value;
       this.signUprequest.email = this.userForm.get('email').value;
       this.signUprequest.password = this.userForm
         .get('passwordGroup')
         .get('passWord').value;
      this.authService.register(this.signUprequest).subscribe(
        data => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
     }
  }
  get f() { return this.userForm.controls; }

  logKeyValuePairs(group: FormGroup = this.userForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      if (
        abstractControl &&
        !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty)
      ) {
        const messages = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }
      if (abstractControl instanceof FormGroup) {
        this.logKeyValuePairs(abstractControl);
      }
    });
  }
}
function matchPassWord(group: AbstractControl): { [key: string]: any } | null {
  const passWordControl = group.get('passWord');
  const comfirmPassWordControl = group.get('confirmPassword');
  if (
    passWordControl.value === comfirmPassWordControl.value ||
    comfirmPassWordControl.pristine
  ) {
    return null;
  } else {
    return { passwordMissMatch: true };
  }
}
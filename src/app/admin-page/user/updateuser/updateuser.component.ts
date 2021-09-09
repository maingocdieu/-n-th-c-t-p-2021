import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/_services/auth.service';
import { RoleService } from 'src/app/_services/role.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  listRole: any;
  userForm: FormGroup;
  user: any;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private roleService: RoleService, private suserService: UserService,
    
    @Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<UpdateuserComponent>) { }

  async ngOnInit(): Promise<void> {
    await  this.getRole();
   await this.getUserById();
    this.userForm = this.formBuilder.group({
      role: [this.user.roles[0].name, ],
      userName: [this.user.username],
      email: [this.user.email,],
      fullName: [this.user.fullName,],
      address: [this.user.address,],
      phone: [this.user.phone,],
    });
    
  }

  async getRole() {
    this.listRole =  await this.roleService.readAll().toPromise();
  }

 async getUserById() {
  this. user =await  this.suserService.getUserById(this.data.id).toPromise();
   
  }
}
function electionValidate(control: AbstractControl): { [key: string]: any } | null {
  const product: string = control.value;
  if (product !== '-1') {
    return null;
  } else {
    return { 'producterrow': true };
  } 
}
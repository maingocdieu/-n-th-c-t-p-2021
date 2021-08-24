import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-update-acount',
  templateUrl: './update-acount.component.html',
  styleUrls: ['./update-acount.component.css']
})
export class UpdateAcountComponent implements OnInit {

  userForm: FormGroup;
  user: any;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private tokenStorage: TokenStorageService) { }

 async ngOnInit() {
   await this.getUserById();
    this.userForm = this.formBuilder.group({
      id: [''],
      fullName: [''],
      email: [''],
      phone: [''],
      address: [''],
    });
   this.userForm.get('fullName').setValue(this.user.fullName);
   this.userForm.get('email').setValue(this.user.email);
   this.userForm.get('phone').setValue(this.user.phone);
   this.userForm.get('address').setValue(this.user.address);
   this.userForm.get('id').setValue(this.user.id);
  }

  async getUserById() {
      this.user = await this.userService.getUserById(this.tokenStorage.getUser().id).toPromise();
  }

  updateAcount() {
    this.userService.updateUser(this.userForm.value).subscribe(res => {
    })
  }
}
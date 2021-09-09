import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/_services/user.service';
import { CreateUserComponent } from '../create-user/create-user.component';
import { UpdateuserComponent } from '../updateuser/updateuser.component';

@Component({
  selector: 'app-uer-admin',
  templateUrl: './uer-admin.component.html',
  styleUrls: ['./uer-admin.component.css']
})
export class UerAdminComponent implements OnInit {
  listUser: any;
  currentSelectedPage: number = 0;
  valueRole = '-1';
  totalPages: number = 0;
  pageIndexes: Array<number> = [];
  user = {
    pageSize: 0,
    page: 0,
  };
  constructor(private userService: UserService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.getPage();
  }

  getPaginationWithIndex(index) {
    this.user.page = index;
    this.userService.getAllUser(this.user).subscribe((res) => {
      if (res === null) {
        this.listUser = null;
      } else {
        this.listUser = res.content;
        this.totalPages = res.totalPages;
        this.pageIndexes = Array(this.totalPages)
          .fill(0)
          .map((x, i) => i);
        this.currentSelectedPage = res.pageable.pageNumber;
      }
    });
  }

  active(index: number) {
    if (this.currentSelectedPage == index) {
      return {
        active: true,
      };
    } else {
      return { active: false };
    }
  }

  nextClick() {
    if (this.currentSelectedPage < this.totalPages - 1) {
      this.user.page = this.user.page + 1;
      this.getPage();
    }
  }

  previousClick() {
    if (this.currentSelectedPage > 0) {
      this.user.page = this.user.page - 1;
      this.getPage();
    }
  }
  getPage() {
    var id = parseInt(this.valueRole);
    this.userService.getAllUser(this.user).subscribe((res) => {
      console.log(res);
      if (res === null) {
        this.listUser = null;
      } else {
        this.listUser = res.content;
        this.totalPages = res.totalPages;
        this.pageIndexes = Array(this.totalPages)
          .fill(0)
          .map((x, i) => i);
        this.currentSelectedPage = res.pageable.pageNumber;
      }
    });
  }
  
  openDialogCategory() {
    return this.dialog.open(CreateUserComponent, {
      panelClass: 'custom-modalbox',
      autoFocus: false,
      data: {
        data: 1,
      },
    });
  }


  openDialogUpdate(id) {
    return this.dialog.open(UpdateuserComponent, {
      panelClass: 'custom-modalbox',
      autoFocus: false,
      data: {
        id: id,
      },
    });
  }

  updateUser(id) {
    this.openDialogUpdate(id).afterClosed().subscribe(res => {
       if(res !==undefined)
       {
        this.userService.updateUserAdmin(id, res).subscribe(res => {
          this.getPaginationWithIndex(this.user.page);
         });
       }
    })

  }

  delete(id) {
    this.userService.deleteuser(id).subscribe (res => 
      {
        if(res == false ) {
          alert("Bạn không thể xóa");
        } else {
          this.getPaginationWithIndex(this.user.page)
        }
      });

  }

}

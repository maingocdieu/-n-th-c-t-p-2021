import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/common/alert/alert.component';
import { MyDialogComponent } from 'src/app/common/my-dialog/my-dialog.component';
import { CategoryService } from 'src/app/_services/category.service';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';



@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  @ViewChild('confirmDeleteDialog', { static: false })
  confirmDeleteDialog: MyDialogComponent;
  @ViewChild('alertDeleteDialog', { static: false })
  alertDeleteDialog: AlertComponent;
  categorys: any;
  buttonName='cap nhat';
  masterSelected=false;
  selectedItemsList: number[] = [];
  constructor(public dialog: MatDialog,public categoryService: CategoryService) {}
  ngOnInit(): void {
    this.readCategory();
  }

  openDialogCategory(category) {
    return this.dialog.open(CategoryDialogComponent, {
      width: '30%',
      panelClass: 'custom-modalbox',
      autoFocus: false,
      data: {
        data: category,
      },
    });
  }

  readCategory(): void {
    this.categoryService.readAllCategory().subscribe(
      (res) => {
        this.categorys = res;
        for (let i = 0; i < this.categorys.length; i++) {
          this.categorys[i]['isSelected'] = false;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }


  addandUpdateCategory(category):void{
    
    this.openDialogCategory(category).afterClosed().subscribe((res)=>{
      if(res!=undefined)
      {
        if(res.id===-1){
          delete res['id'];
          this.categoryService.createCategory(res).subscribe(()=>{
            this.readCategory();
          });
        }
        else
        {
            this.categoryService.updateCategory(res.id,res).subscribe(res=>{
            this.readCategory();
          })
        }
      }
    })
  }

  checkUncheckAll() {
    for (var i = 0; i < this.categorys.length; i++) {
      this.categorys[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }
  isAllSelected() {
    this.masterSelected = this.categorys.every(function (item: any) {
      return item.isSelected == true;
    });
    this.getCheckedItemList();
  }
  getCheckedItemList() {
    this.selectedItemsList.length = 0;
    for (var i = 0; i < this.categorys.length; i++) {
      if (this.categorys[i].isSelected)
        this.selectedItemsList.push(this.categorys[i].id);
    }
  }

  deleteCategory(): void {
    this.categoryService.deleteById(this.selectedItemsList).subscribe(
      () => {
        this.selectedItemsList.splice(0, this.selectedItemsList.length);
        this.readCategory();
      },
      (error) => {
        console.log(error);
      }
    );
    this.confirmDeleteDialog.close();
  }

  showConfirmDeleteDialog() {
    if (this.selectedItemsList.length == 0) {
      this.alertDeleteDialog.show();
    } else {
      this.confirmDeleteDialog.show();
    }
  }


  closeConfirmDeleteDialog() {
    this.confirmDeleteDialog.close();
  }

}

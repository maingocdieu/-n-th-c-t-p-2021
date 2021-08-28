import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/common/alert/alert.component';
import { MyDialogComponent } from 'src/app/common/my-dialog/my-dialog.component';
import { SupplierService } from 'src/app/_services/supplier.service';
import { SupplierDialogComponent } from '../supplier-dialog/supplier-dialog.component';

@Component({
  selector: 'app-list-supplier',
  templateUrl: './list-supplier.component.html',
  styleUrls: ['./list-supplier.component.css']
})
export class ListSupplierComponent implements OnInit {


  @ViewChild('confirmDeleteDialog', { static: false })
  confirmDeleteDialog: MyDialogComponent;
  @ViewChild('alertDeleteDialog', { static: false })
  alertDeleteDialog: AlertComponent;
  suppliers: any;
  buttonName = 'cap nhat';
  masterSelected = false;
  selectedItemsList: number[] = [];
  currentItem = " ";
  id: any;
  constructor(public dialog: MatDialog, public suplierService: SupplierService) { }

  ngOnInit(): void {
    this.readSupplier();
  }


  openDialogColor(supplier) {
    return this.dialog.open(SupplierDialogComponent, {
      width: '30%',
      panelClass: 'custom-modalbox',
      autoFocus: false,
      data: {
        data: supplier,
      },
    });
  }

  readSupplier(): void {
    this.suplierService.readAllSupplier().subscribe(
      (res) => {
        this.suppliers = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addandUpdateSupplier(supplier): void {
    this.openDialogColor(supplier).afterClosed().subscribe((res) => {
      if (res != undefined) {
        if (res.id === -1) {
          delete res['id'];
          this.suplierService.createSupplier(res).subscribe((res) => {
            console.log(res);
            this.readSupplier();
          });
        }
        else {
          this.suplierService.updateSupplier(res.id, res).subscribe(res => {

            if (res === null) {
              alert("Đã tồn tại kích thước này");
              return;
            }
            this.readSupplier();
          })
        }
      }
    })
  }

  XoaSupplier(id) {
    this.confirmDeleteDialog.show();
    this.id = id;
  }

  deleteSupplier(): void {
    this.suplierService.deleteSupplier(this.id).subscribe(res => {
      if (res == true) {
        this.readSupplier();
      } else {
        this.currentItem = "Bạn không thể xóa"
        this.alertDeleteDialog.show();
      }
    })
    this.confirmDeleteDialog.close();
  }
}

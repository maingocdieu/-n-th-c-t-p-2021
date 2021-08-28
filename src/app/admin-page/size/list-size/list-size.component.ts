import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/common/alert/alert.component';
import { MyDialogComponent } from 'src/app/common/my-dialog/my-dialog.component';
import { SizeService } from 'src/app/_services/size.service';
import { SizedialogComponent } from '../sizedialog/sizedialog.component';

@Component({
  selector: 'app-list-size',
  templateUrl: './list-size.component.html',
  styleUrls: ['./list-size.component.css']
})
export class ListSizeComponent implements OnInit {

  @ViewChild('confirmDeleteDialog', { static: false })
  confirmDeleteDialog: MyDialogComponent;
  @ViewChild('alertDeleteDialog', { static: false })
  alertDeleteDialog: AlertComponent;
  sizes: any;
  buttonName='cap nhat';
  masterSelected=false;
  selectedItemsList: number[] = [];
  currentItem = " ";
  id : any;
  constructor(public dialog: MatDialog,public sizeService: SizeService) { 
    
  }

  ngOnInit(): void {
    this.readSize();
  }


  openDialogColor(color) {
    return this.dialog.open(SizedialogComponent, {
      width: '30%',
      panelClass: 'custom-modalbox',
      autoFocus: false,
      data: {
        data: color,
      },
    });
  }

  readSize(): void {
    this.sizeService.readAllSize().subscribe(
      (res) => {
        this.sizes = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addandUpdateSize(color):void{
    this.openDialogColor(color).afterClosed().subscribe((res)=>{
      if(res!=undefined)
      {
        if(res.id===-1){
          delete res['id'];
          this.sizeService.createSize(res).subscribe((res)=>{
            console.log(res);
            this.readSize();
          });
        }
        else
        {
            this.sizeService.updateSize(res.id,res).subscribe(res=>{
             
            if(res === null) {
              alert("Đã tồn tại kích thước này");
              return;
            }
            this.readSize();
          })
        }
      }
    })
  }

  XoaSize(id) {
    this.confirmDeleteDialog.show();
    this.id = id;
  }

  deleteSize(): void {
    this.sizeService.deleteSize(this.id).subscribe(res => {
      if(res == true) {
          this.readSize();
      } else {
        this.currentItem = "Bạn không thể xóa"
        this.alertDeleteDialog.show();
      }
    })
    this.confirmDeleteDialog.close();
  }
}

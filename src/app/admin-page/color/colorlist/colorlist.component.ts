import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/common/alert/alert.component';
import { MyDialogComponent } from 'src/app/common/my-dialog/my-dialog.component';
import { ColorService } from 'src/app/_services/color.service';
import { ColordialogComponent } from '../colordialog/colordialog.component';

@Component({
  selector: 'app-colorlist',
  templateUrl: './colorlist.component.html',
  styleUrls: ['./colorlist.component.css']
})
export class ColorlistComponent implements OnInit {


  @ViewChild('confirmDeleteDialog', { static: false })
  confirmDeleteDialog: MyDialogComponent;
  @ViewChild('alertDeleteDialog', { static: false })
  alertDeleteDialog: AlertComponent;
  colors: any;
  buttonName='cap nhat';
  masterSelected=false;
  selectedItemsList: number[] = [];
  currentItem = " ";
  id : any;
  constructor(public dialog: MatDialog,public colorService: ColorService) { 
    
  }

  ngOnInit(): void {

    this.readColor();
  }


  openDialogColor(color) {
    return this.dialog.open(ColordialogComponent, {
      width: '30%',
      panelClass: 'custom-modalbox',
      autoFocus: false,
      data: {
        data: color,
      },
    });
  }

  readColor(): void {
    this.colorService.readAllColor().subscribe(
      (res) => {
        this.colors = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addandUpdateColor(color):void{
    this.openDialogColor(color).afterClosed().subscribe((res)=>{
      if(res!=undefined)
      {
        if(res.id===-1){
          delete res['id'];
          this.colorService.createColor(res).subscribe(()=>{
            this.readColor();
          });
        }
        else
        {
            this.colorService.updateColor(res.id,res).subscribe(res=>{
              console.log(res);
            if(res === null) {
              alert("Đã tồn tại màu này");
              return;
            }
            this.readColor();
          })
        }
      }
    })
  }



  XoaColor(id) {
    this.confirmDeleteDialog.show();
    this.id = id;
  }

  deleteColor(): void {
    this.colorService.deleteColor(this.id).subscribe(res => {
      if(res == true) {
          this.readColor();
      } else {
        this.currentItem = "Bạn không thể xóa"
        this.alertDeleteDialog.show();
      }
    })
    this.confirmDeleteDialog.close();
  }
}

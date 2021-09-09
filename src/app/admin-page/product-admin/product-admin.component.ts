import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/common/alert/alert.component';
import { MyDialogComponent } from 'src/app/common/my-dialog/my-dialog.component';
import { ProductService } from 'src/app/_services/product.service';
import { AddProductComponent } from '../product/add-product/add-product.component';
import { ProductdetailComponent } from '../product/productdetail/productdetail.component';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})
export class ProductAdminComponent implements OnInit {


  @ViewChild('confirmDeleteDialog', { static: false })
  confirmDeleteDialog: MyDialogComponent;
  @ViewChild('alertDeleteDialog', { static: false })
  alertDeleteDialog: AlertComponent;
  currentItem = ' Bạn không được phép xóa';
  constructor(private productService: ProductService, public dialog: MatDialog) {

  }

  products: any;

  product = {
    nameProduct: '',
    categoryId: null,
    price : null,
    pageSize: 0,
    page: 0,
  }
  listProduct: any;
  currentSelectedPage: number = 0;
  valueRole = '-1';
  totalPages: number = 0;
  pageIndexes: Array<number> = [];

  id: number;

  ngOnInit(): void {
    this.getPage();
    
  }


  readProduct() {
    this.productService.readListProduct().subscribe((res) => {
      this.products = res;
    })
  }

 


  openDialogCategory() {
    return this.dialog.open(AddProductComponent, {
      width: '100%',
      panelClass: 'custom-modalbox',
      autoFocus: false,
      data: {
        data: this.products,
      },
    });
  }


  getPaginationWithIndex(index) {
    this.product.page = index;
    this.productService.getProductPagingList(this.product).subscribe((res) => {
      if (res === null) {
        this.listProduct = null;
      } else {
        this.listProduct = res.content;
        this.totalPages = res.totalPages;44

        console.log(Array(this.totalPages).fill(0).map((x, i) => i));
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
      this.product.page = this.product.page + 1;
      this.getPage();
    }
  }

  previousClick() {
    if (this.currentSelectedPage > 0) {
      this.product.page = this.product.page - 1;
      this.getPage();
    }
  }
  getPage() {
   
    this.productService.getProductPagingList(this.product).subscribe((res) => {
      if (res === null) {
        this.listProduct = null;
      } else {
        this.listProduct = res.content;
        console.log(this.listProduct)
        this.totalPages = res.totalPages;
        this.pageIndexes = Array(this.totalPages)
          .fill(0)
          .map((x, i) => i);
        this.currentSelectedPage = res.pageable.pageNumber;
      }
    });
  }

  updateStatus(id) {
      this.productService.updateStatusProduct(id).subscribe (res => {
            console.log(res);
      })
  }

  showConfirmDialog(id) {
    this.confirmDeleteDialog.show();
    this.id = id;
  }


  async checkXoa() {
   
   this.productService.deleteById(this.id).subscribe(res => {
     if(res == true) {
      this.getPage();
      this.alertDeleteDialog.show();
      this.currentItem = "Xoa thành  công";
      this.confirmDeleteDialog.close();
     } else {
      this.alertDeleteDialog.show();
      this.currentItem = "Bạn không thể xóa vì nó có chi tiết sản phẩm";
      this.confirmDeleteDialog.close();
     }
   });
  
  }


  openDialogDetailProduct(item) {
    return this.dialog.open(ProductdetailComponent, {
      width: '70%',
      height: '70%',
      panelClass: 'custom-modalbox',
      autoFocus: false,
      data: {
        data: item,
      },
    });
  }

}

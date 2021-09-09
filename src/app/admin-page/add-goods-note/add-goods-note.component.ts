import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AlertComponent } from 'src/app/common/alert/alert.component';
import { ProductService } from 'src/app/_services/product.service';
import { ProductDetailService } from 'src/app/_services/productdetail.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-add-goods-note',
  templateUrl: './add-goods-note.component.html',
  styleUrls: ['./add-goods-note.component.css'],
  
})
export class AddGoodsNoteComponent implements OnInit {

  @ViewChild('alertDeleteDialog', { static: false })
  alertDeleteDialog: AlertComponent;
  currentItem = '';
  chitietphieunhap = false;
  phieuNhap = {
    listPhieuNhap: [],
    userId: '',
    ngayTao: ''
  };
  items = [];
  title = 'form';
  teamForm: FormGroup;
  isValidFormSubmitted = null;
  allSkills: Observable<any[]>;
  messageSucess = false;
  listProduct: any;

  tongTien = 1;
  gia = 0;


  constructor(private formBuilder: FormBuilder, private tokenStorage: TokenStorageService, private productService: ProductService
  , private productDetailService: ProductDetailService) { }



  async ngOnInit() {
    this.teamForm = this.formBuilder.group({
      ngayTao: ['', Validators.required],
      employees: this.formBuilder.array(
        [this.createEmpFormGroup()],
        [Validators.required])
    });
    await this.getAllProduct();

    console.log(this.listProduct);

  }

  async getAllProduct() {
    this.listProduct = await this.productDetailService.getProductDetail().toPromise();
  }

  createEmpFormGroup() {
    return this.formBuilder.group({
      amount: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      productDetailId: ['-1', [electionValidate],
      ]
    })
  }
  dateChanged($event) {
    let date = ($event.target.value.getDate()).toString() + '-' + ($event.target.value.getMonth() + 1).toString() + '-' + ($event.target.value.getFullYear()).toString();
  }

  addItem() {
    this.items.length++;
  }

  get employees(): FormArray {
    return this.teamForm.get('employees') as FormArray;
  }
  get ngayTao() {
    return this.teamForm.get('ngayTao');
  }

  addEmployee() {
    this.isValidFormSubmitted = true;
    let fg = this.createEmpFormGroup();
    this.employees.push(fg);
  }

  deletePhieuNhap(idx: number) {
    if (this.employees.length > 1) {
      this.employees.removeAt(idx);
    }

  }
  addPhieuNhap() {
    this.chitietphieunhap = true;
  }
  onFormSubmit() {
    this.isValidFormSubmitted = false;
    if (this.teamForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.phieuNhap.listPhieuNhap = this.teamForm.value.employees;
    this.phieuNhap.userId = this.tokenStorage.getUser().id;
    let date = this.teamForm.value.ngayTao.getDate();
    let month = this.teamForm.value.ngayTao.getMonth() + 1;
    if (month < 10) {
      month = '0' + (this.teamForm.value.ngayTao.getMonth() + 1);
    }
    if (date < 10) {
      date = '0' + (this.teamForm.value.ngayTao.getDate())
    }
    this.phieuNhap.ngayTao = (this.teamForm.value.ngayTao.getFullYear()).toString() + '-' + month + '-' + date;

    console.log(this.phieuNhap.listPhieuNhap);
    this.productService.insertPhieuNhap(JSON.stringify(this.phieuNhap)).subscribe((data) => {
      if (data != null) {
        this.currentItem = "Thêm thành công";
        this.alertDeleteDialog.show();
        this.teamForm.reset();
      }
    },
      (error) => {
       this.currentItem = "Sản phẩm trùng nhau";
       this.alertDeleteDialog.show();
        return;
      });
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
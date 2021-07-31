import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/_services/product.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-add-goods-note',
  templateUrl: './add-goods-note.component.html',
  styleUrls: ['./add-goods-note.component.css']
})
export class AddGoodsNoteComponent implements OnInit {

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
  ) { }



  async ngOnInit() {
    this.teamForm = this.formBuilder.group({
      ngayTao: ['', Validators.required],
      employees: this.formBuilder.array(
        [this.createEmpFormGroup()],
        [Validators.required])
    });
    await this.getAllProduct();

  }

  async getAllProduct() {
    this.listProduct = await this.productService.readListProduct().toPromise();
  }

  createEmpFormGroup() {
    return this.formBuilder.group({
      amount: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(21)]],
      productId: ['-1', [electionValidate],

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
    this.employees.removeAt(idx);
  }

  onFormSubmit() {
    console.log('dada');
    this.isValidFormSubmitted = false;
    if (this.teamForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.phieuNhap.listPhieuNhap = this.teamForm.value.employees;
    this.phieuNhap.userId = this.tokenStorage.getUser().id;
    let month = this.teamForm.value.ngayTao.getDate();
    let date = this.teamForm.value.ngayTao.getMonth() + 1;
    console.log(date);
    if (month < 10) {
      month = '0' + (this.teamForm.value.ngayTao.getMonth() + 1);
    }
    if (date < 10) {
      date = '0' + (this.teamForm.value.ngayTao.getDate())
    }
    this.phieuNhap.ngayTao = (this.teamForm.value.ngayTao.getFullYear()).toString() + '-' + month + '-' + date;
    this.productService.insertPhieuNhap(JSON.stringify(this.phieuNhap)).subscribe((data) => {
      if (data != null) {
        this.messageSucess = true;
        this.teamForm.reset();
      }
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
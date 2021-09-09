import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-thongke',
  templateUrl: './thongke.component.html',
  styleUrls: ['./thongke.component.css'],
  
})


export class ThongkeComponent implements OnInit {

  thongKeForm: FormGroup;
  isValidFormSubmitted = null;
  listThongKe: any;
  name: any;
  listThongKecu: any;
  p: number = 1;
  tongdoanhthu : number =0;

  ngay = {
    ngayBatDau: '',
    ngayKetThuc: '',

  }
  constructor(private formBuilder: FormBuilder , private productService: ProductService) { }

  ngOnInit(): void {

    this.thongKeForm = this.formBuilder.group({
      ngayBatDau: ['', Validators.required],
      ngayKetThuc: ['',Validators.required]
      
    });
  }

  get ngayBatDau() {
    return this.thongKeForm.get('ngayBatDau');
  }

  get ngayKetThuc() {
    return this.thongKeForm.get('ngayKetThuc');
  }

  onFormSubmit() {
    this.isValidFormSubmitted = false;
    if (this.thongKeForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    let date = this.thongKeForm.value.ngayBatDau.getDate();
    let month = this.thongKeForm.value.ngayBatDau.getMonth() + 1;
    if (month < 10) {
      month = '0' + (this.thongKeForm.value.ngayBatDau.getMonth() + 1);
    }
    if (date < 10) {
      date = '0' + (this.thongKeForm.value.ngayBatDau.getDate())
    }
    this.ngay.ngayBatDau = (this.thongKeForm.value.ngayBatDau.getFullYear()).toString() + '-' + month + '-' + date;
    let dateEnd = this.thongKeForm.value.ngayKetThuc.getDate();
    let monthEnd = this.thongKeForm.value.ngayKetThuc.getMonth() + 1;
    if (monthEnd < 10) {
      monthEnd = '0' + (this.thongKeForm.value.ngayKetThuc.getMonth() + 1);
    }
    if (dateEnd < 10) {
      dateEnd = '0' + (this.thongKeForm.value.ngayKetThuc.getDate())
    }
    this.ngay.ngayKetThuc = (this.thongKeForm.value.ngayKetThuc.getFullYear()).toString() + '-' + monthEnd + '-' + dateEnd;

    this.productService.getThongKe(this.ngay).subscribe(res => 
     {
      this.listThongKe = res;
      this.listThongKecu = res;

      for(let i =0; i< this.listThongKe.length; i++) {
        this.tongdoanhthu = this.tongdoanhthu+ this.listThongKe[i].price * this.listThongKe[i].tongSoLuong 
      }
     } );
    
  }

  
  search() {
    if(this.name == "") {
        this.listThongKe = this.listThongKecu;
    } else {
        this.listThongKe = this.listThongKe.filter(res => {
          return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
        })
    }
  }

  key:string = 'name';
  reverse: boolean =false;
  sort(key) {
  
    this.key = key;
    this.reverse = !this.reverse;
  }


  
}

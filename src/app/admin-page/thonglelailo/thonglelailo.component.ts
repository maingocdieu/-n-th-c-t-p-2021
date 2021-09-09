import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-thonglelailo',
  templateUrl: './thonglelailo.component.html',
  styleUrls: ['./thonglelailo.component.css']
})
export class ThonglelailoComponent implements OnInit {

  listLaiLo: any;
  listThongKecu: any;
  name: any;
  p: number = 1;
  tongTongNhap: number = 0;
  tongTongBan: number = 0;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getLaiLo();
    this.listLaiLo = this.listThongKecu;
  }

  getLaiLo() {
    this.listLaiLo = this.productService.getThongKeLaiLo().subscribe(res => {
      this.listLaiLo = res;
      this.listThongKecu = res;

      for(let i =0; i<this.listLaiLo.length;i++){
        this.tongTongNhap = this.listLaiLo[i].soLuongNhap* this.listLaiLo[i].gianhap;
       
        if(this.listLaiLo[i].tongSoLuongBan === null) {
         
          this.listLaiLo[i].tongSoLuongBan =0;
        }
        this.tongTongBan = this.listLaiLo[i].tongSoLuongBan* this.listLaiLo[i].giaBanRa 
      }
    })
  }

  search() {
    if (this.name == "") {
      this.listLaiLo = this.listThongKecu;
    } else {
      this.listLaiLo = this.listLaiLo.filter(res => {
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      })
    }
  }

  key: string = 'name';
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }



}

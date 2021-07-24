import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/_services/category.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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

  
  constructor(
    public productService: ProductService,
    public categoryService: CategoryService,
    public router: Router) { 
  }

  ngOnInit(): void {
    this.getPage();
    
  }

  // getCategorys() {
  //  this.categoryService.readAllCategory().subscribe((res) => {
  //       this.categorys = res;
  //  })
  // }

  getPaginationWithIndex(index) {
    this.product.page = index;
    this.productService.getProductPagingList(this.product).subscribe((res) => {
      if (res === null) {
        this.listProduct = null;
      } else {
        this.listProduct = res.content;
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
    var id = parseInt(this.valueRole);
    this.productService.getProductPagingList(this.product).subscribe((res) => {
      if (res === null) {
        this.listProduct = null;
      } else {
        this.listProduct = res.content;
        this.totalPages = res.totalPages;
        this.pageIndexes = Array(this.totalPages)
          .fill(0)
          .map((x, i) => i);
        this.currentSelectedPage = res.pageable.pageNumber;
      }
    });
  }

  getDetailProduct(id) {
    this.router.navigateByUrl("product/"+ id)
  }
}

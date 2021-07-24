import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categorys: any;
  constructor(public categoryService: CategoryService,private router: Router) { }
  ngOnInit(): void {
    this.getCategorys();
  }

  getCategorys() {
    this.categoryService.readAllCategory().subscribe((res) => {
         this.categorys = res;
    })
   }

   getProduct(id) {
        this.router.navigateByUrl("category/" +id);
   }
   
}

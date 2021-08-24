import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/_services/category.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  categorys: any;
  constructor(public categoryService: CategoryService, private router: Router, public tokenStorage: TokenStorageService) { }

  isLogin = false;
  ngOnInit(): void {
    this.getCategorys();
    if(this.tokenStorage.getUser()?.id!=null) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }
  getCategorys() {
    this.categoryService.readAllCategory().subscribe((res) => {
         this.categorys = res;
    })
   }

  
  getProduct(id) {
    this.router.navigateByUrl("category/" +id);
}

logout(): void {
  this.tokenStorage.signOut();
  this.router.navigateByUrl("login");
}
}

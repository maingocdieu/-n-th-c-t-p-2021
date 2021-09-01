import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router, 
    ) { }

  ngOnInit(): void {
  }
  doSearch(value: string) {
   this.router.navigateByUrl(`/search/${value}`);
  }

  
}

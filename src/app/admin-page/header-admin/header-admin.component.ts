import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService, private router: Router,private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {

    console.log(this.tokenStorage.getUser());
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigateByUrl("login");
  }

}

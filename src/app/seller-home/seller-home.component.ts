import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  SellerData;

  constructor(private newService:ServiceService,private router:Router) { }

  ngOnInit() {

    this.newService.GetSeller().subscribe(data=>{this.SellerData = data
      console.log(data);
    });

  }

  /********Logout********/

  Logout(){
    localStorage.removeItem("seller-data");
    this.router.navigate(['home']); 
  }


}

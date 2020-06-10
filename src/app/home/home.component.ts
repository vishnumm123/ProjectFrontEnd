import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  buyerLogin;
  SellerLogin;
  buyerdata;
  SellerData;
  constructor(private newService:ServiceService) { }

  ngOnInit() {
    // this.newService.GetBuyer().subscribe(data=>{this.buyerdata = data
    //   console.log(data);
    // });

    // this.newService.GetSeller().subscribe(data=>{this.SellerData = data
    //   console.log(data);
    // },(error)=>{
    //   throw error
    // });
    
    this.buyerLogin=localStorage.getItem('userdata');
    this.SellerLogin=localStorage.getItem('seller-data');
     
    if(this.buyerLogin){
      this.newService.GetBuyer().subscribe(data=>{this.buyerdata = data
      
    });
    }

    if(this.SellerLogin){
        this.newService.GetSeller().subscribe(data=>{this.SellerData = data
      
    },(error)=>{
      throw error
    });
    }
    
  }

}

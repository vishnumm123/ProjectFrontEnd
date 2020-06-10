import { Component, OnInit } from '@angular/core';
import { ServiceService } from '.././service.service';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private newService:ServiceService, private router:Router) { }

 test=[];
 currentUser;
 UserLogin;
 SellerLogin;
 user='buyer';
 log_type='login';

 reg_res; 

  ngOnInit() {
  }

  LoginReg(log_type){
    this.log_type=log_type;
  }



  /****************Login Submit****************/

  Login(event){
    event.preventDefault();
    const target=event.target;
    const username = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;
    this.newService.LoginUser(username,password).subscribe((suc:any) => { this.UserLogin = suc
      var decoded = jwt_decode(this.UserLogin.accessToken);

      this.newService.getUser(decoded.sub).subscribe(data=>{
        this.currentUser=data
        console.log("curr_user",this.currentUser)

        if(this.currentUser){
          if(this.currentUser[0].role == 'buyer'){
            localStorage.setItem("userdata",this.UserLogin.accessToken);  // storing buyer details into local storage
            this.router.navigate(['/buyer-home']); //navigate to buyer home
          }
          if(this.currentUser[0].role== 'seller'){
            localStorage.setItem('seller-data',this.UserLogin.accessToken); // storing seller details into local storage
            this.router.navigate(['/seller-home']); //navigate to seller home
          }
        }
        })

    },(error)=>{
      alert(error.error)
    })
  }




  /**************Registration Submit***************/


  Register(event,role){
    event.preventDefault();
    const target=event.target;
    if(role == 'buyer'){

      const fname = target.querySelector('#fname').value;
      const lname = target.querySelector('#lname').value;
      const age = target.querySelector('#age').value;
      const phone = target.querySelector('#phone').value;
      const email = target.querySelector('#email').value;
      const password = target.querySelector('#passwordreg').value;
      this.newService.RegisterUser(fname,lname,age,phone,email,password,"buyer").subscribe(res=>{this.reg_res=res
       
        if(this.reg_res){
          alert("Registration Success");
          this.log_type='login';
         
        }
       
      },(error)=>{
        console.log("error");
        alert("Registration fail try again later")
    
      })
    }

    if(role == 'seller'){
      const fname = target.querySelector('#fname_s').value;
      const lname = target.querySelector('#lname_s').value;
      const age = target.querySelector('#age_s').value;
      const phone = target.querySelector('#phone_s').value;
      const email = target.querySelector('#email_s').value;
      const password = target.querySelector('#passwordreg_s').value;
      
      this.newService.RegisterSeller(fname,lname,age,phone,email,password,"seller").subscribe((res)=>{
        this.reg_res=res

        if(this.reg_res){
          alert("Registration Success");
          this.log_type='login';
          
        }
       
      },(error)=>{
       // console.log(error.error,"error")
        alert(error.error)
    })
    }
  }
  

  /*********Logout**********/



  // Logout(type){
  //   localStorage.removeItem('userdata')
  // }
}

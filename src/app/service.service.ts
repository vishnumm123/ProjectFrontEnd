import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { map, catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { patchComponentDefWithScope } from '@angular/core/src/render3/jit/module';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  token;
  tokenseller;
  logdata;

  tokenget;
  current_user;

  service_ip='http://localhost:3000/';

  constructor(private http: HttpClient) { }


  /***********Login service************/
 
  LoginUser(username,password){
     this.tokenget=this.http.post(this.service_ip+'login',{"email":username,"password":password})
    return this.tokenget;
  }

  /******Get user details*******/

  getUser(id){
    return this.http.get(this.service_ip+'users?id='+id).pipe(catchError((error: any) => {return throwError(error || "error");}))
  }


  /*********Register User******/

  RegisterUser(fname,lname,age,phone,email,password,role){
   return this.http.post(this.service_ip+'users',{
      "email": email,
      "password": password,
      "firstname": fname,
      "lastname": lname,
      "age": age,
      "phone":phone,
      "role":role
     }).pipe(catchError((error: any) => {return throwError(error || "error");}))
  }

  /*********Register Seller*********/

  RegisterSeller(fname,lname,age,phone,email,password,role){
   return this.http.post(this.service_ip+'users',{
      "email": email,
      "password": password,
      "firstname": fname,
      "lastname": lname,
      "age": age,
      "phone":phone,
      "role":role
     }).pipe(catchError((error: any) => {return throwError(error || "error");}))
 
  }


  /*********Get Buyer Details********/

  GetBuyer(){
    this.token=localStorage.getItem('userdata');
   
      var decoded = jwt_decode(this.token);
    return this.http.get(this.service_ip+'users?id='+decoded.sub).pipe(catchError((error: any) => {return throwError(error || "error");}))
    
}


  /*********Get seller*******/

  GetSeller(){
    this.tokenseller=localStorage.getItem('seller-data');


      var decoded_sell=jwt_decode(this.tokenseller);
      return this.http.get(this.service_ip+'users?id='+decoded_sell.sub).pipe(catchError((error: any) => {return throwError(error || "error");}))
  
   
  }

}

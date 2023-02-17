import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private auth:AuthService,
              private router:Router,
              private toast:NgToastService
               ){}
              
  canActivate():boolean{
    if(this.auth.isLoggedIn()){
      return true
    }
    else{
      this.router.navigate(["login"])
      this.toast.error({detail:"ERROR",summary:"Please login first!!!",duration:5000})
      return false
    }
  }
  
}

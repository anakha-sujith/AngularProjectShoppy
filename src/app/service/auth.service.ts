import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedin = new BehaviorSubject<boolean>(false)
  userInfo: Subject<any> = new Subject()
  userInfo$ = this.userInfo.asObservable()

  baseApiUrl: string = environment.baseApiUrl
  jwtHelperservice = new JwtHelperService()


  constructor(private http: HttpClient, private router: Router) { }

  register(userObj: any): Observable<any> {
    return this.http.post<any>(this.baseApiUrl + '/api/User/register', userObj)
  }

  login(loginObj: any): Observable<any> {
    return this.http.post<any>(this.baseApiUrl + '/api/User/authenticate', loginObj)
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  isLoggedIn() {
    return !!localStorage.getItem('token')
  }

  signOut() {
    localStorage.clear()
    localStorage.removeItem('user')
    this.router.navigate(['login'])
  }

  getLoggin() {
    return this.isLoggedin.asObservable()
  }
  
  setLoggin(status: boolean) {
    this.isLoggedin.next(status)
  }

  getuserfromToken() {

    const token = localStorage.getItem('token')
    const userinfo = token != null ? this.jwtHelperservice.decodeToken(token) : null

    const userprofile = userinfo ? {
      unique_name: userinfo.unique_name
    } : null

    localStorage.setItem('user', userinfo.unique_name)

    this.userInfo.next(userprofile)
  }

  getUserIdfromToken() {
    const token = localStorage.getItem('token') || ''
    const idFromToken = token?.split('.')[1]
    if (idFromToken) {

      var adob_id = window.atob(idFromToken)
      var idData = JSON.parse(adob_id)
      var id = idData.id
      return id
    }
    else {
      return ''
    }
  }
}

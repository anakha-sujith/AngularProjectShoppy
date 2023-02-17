import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {

  loginForm !: FormGroup
  visible: boolean = true;
  changetype: boolean = true;

  constructor(private formbuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toaster: NgToastService
  ) { }


  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      userName: ['', [Validators.required, Validators.minLength(6),
      Validators.maxLength(10)]],
      passsword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]]
    })
  }
  get userName() {
    return this.loginForm.get('userName')
  }

  get passsword() {
    return this.loginForm.get('passsword')
  }

  onLogin() {
    this.auth.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.auth.storeToken(res.token)
        this.auth.setLoggin(true)
        this.router.navigate(['products']);
      },
      error: (err) => {
        this.toaster.error({ detail: "ERROR", summary: "invalid username or password", duration: 1000 })
      }
    })
  }

  showPassword() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
}


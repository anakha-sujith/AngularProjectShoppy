import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.css']
})
export class RegisterformComponent implements OnInit, OnDestroy {

  registerForm!: FormGroup
  sub1!: Subscription
  visible: boolean = true;
  changetype: boolean = true;

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toaster: NgToastService

  ) { }


  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      userName: ['', [Validators.required, Validators.minLength(6),
      Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      passsword: ['', Validators.required]
    })
  }

  get firstName() {
    return this.registerForm.get('firstName')
  }

  get lastName() {
    return this.registerForm.get('lastName')
  }

  get userName() {
    return this.registerForm.get('userName')
  }

  get email() {
    return this.registerForm.get('email')
  }

  get passsword() {
    return this.registerForm.get('passsword')
  }

  onRegister() {
    this.sub1 = this.auth.register(this.registerForm.value).subscribe({
      next: (res) => {
        this.toaster.success({ detail: "SUCCESS", summary: res.message, duration: 1000 });
        this.registerForm.reset();
        this.router.navigate(['/login'])
      },
      error: (err) => {
        this.toaster.error({ detail: "ERROR", summary: err.error.message, duration: 1000 })
      }
    })
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe()
    }
  }
  showPassword() {

    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
}


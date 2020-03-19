import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { ApiService } from 'src/app/shared/api.service';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { first } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'vex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUp400ms
  ]
})
export class LoginComponent implements OnInit {

  errorMsg: string = '';
  loggedIn = false;
  form: FormGroup;

  inputType = 'password';
  visible = false;
  returnUrl: string;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;

  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private apiService: ApiService,
    private authService: AuthenticationService
  ) {

    // zaten login olduysa panele yonlendir
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }

  }

  ngOnInit() {

    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';

  }

  // form ogelerine kolay erisim
  get f() {
    return this.form.controls;
  }

  send() {


    if (this.form.invalid) {
      this._bar('Kullanıcı adı ve şifre yazınız!');
      return;
    }

    this.authService.login(this.form.value).pipe(first()).subscribe(data => {


      // Üyelik aktif değilse
      if(data.user.status === 0) {
        this._bar('Görünüşe göre henüz üyeliğiniz aktif edilmedi. Lütfen daha sonra tekrar deneyin!');
        return;
      }

      // Üyelik banlı durumdaysa
      if(data.user.status === -1) {
        this._bar('Maalesef hesabınız kalıcı olarak kapatılmıştır!\nSistem yöneticisiyle bağlantı kurunuz.');
        return;
      }

      // İşler yolunda
      this.router.navigate([this.returnUrl]);

    }, err => {

      // Giriş esnasında hata oluştu
      this._bar(err.error.error);

    });

  }

  handleError(error) {
    this.errorMsg = error.error;

    this._bar(this.errorMsg);

  }

  _bar(msg: string): void {
    this.snackbar.open(msg, 'OK!', {
      duration: 10000
    });
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}

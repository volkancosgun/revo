import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { ApiService } from 'src/app/shared/api.service';
import { ErrorStateMatcher, MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/shared/authentication.service';

export const EmailValidation = [Validators.required, Validators.email];
export const PasswordValidation = [
  Validators.required,
  Validators.minLength(6),
];
export class RepeatPasswordEStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control && control.parent.get('password').value !== control.parent.get('password_confirmation').value && control.dirty)
  }
}
export function RepeatPasswordValidator(group: FormGroup) {
  const password = group.controls.password.value;
  const passwordConfirmation = group.controls.password_confirmation.value;

  return password === passwordConfirmation ? null : { passwordsNotEqual: true }
}


@Component({
  selector: 'vex-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    fadeInUp400ms
  ]
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  passwordsMatcher = new RepeatPasswordEStateMatcher;

  inputType = 'password';
  visible = false;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;

  public error: any = [];


  userName:string = '';
  isRegister = true;

  constructor(private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private apiService: ApiService,
    private authService:AuthenticationService,
    private snackbar: MatSnackBar
  ) { 
    // zaten login olduysa panele yonlendir
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      unumber: [this.createUserNumber(), [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', EmailValidation],
      password: ['', PasswordValidation],
      password_confirmation: [''],
      acceptTerms: ['', [Validators.requiredTrue]]
    }, { validator: RepeatPasswordValidator });

  }

  _bar(msg: string): void {
    this.snackbar.open(msg, 'Tamam', {
      duration: 10000
    });
  }



  send() {

    if (this.form.invalid) {
      this._bar('Lütfen gerekli alanları doldurunuz!');
      return;
    }

    this.form.disable();

    this.apiService.registerUser(this.form.value).subscribe((res:any) => {
      this.form.enable();
      if (res) {

        this.userName = res.user.name;
        this._bar('Kayıt başarılı!');
        this.isRegister = false;

      }
    }, err => {
      this.form.enable();
      if (err instanceof HttpErrorResponse) {
        if (err.status === 422) {
          this.handleError(err);
        }
      }

    });
  }

  handleError(error) {
    this.error = error.error.errors;
    const msg = this.error[Object.keys(this.error)[0]];
    this._bar(msg);
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

  createUserNumber() {
    return '99'+Math.floor((Math.random() * 999) + 1);
  }

}

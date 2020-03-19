import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import icMail from '@iconify/icons-ic/twotone-mail';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'vex-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [fadeInUp400ms]
})
export class ForgotPasswordComponent implements OnInit {

  form = this.fb.group({
    email: [null, Validators.required]
  });

  icMail = icMail;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  send() {
    this.snackbar.open('Bu özellik şu an kullanılmıyor.', 'Kapat', {
      duration: 10000,
    });

    //this.router.navigate(['/']);
  }
}

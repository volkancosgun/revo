import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/_models/user';

export const EmailValidation = [Validators.required, Validators.email];

// ICONS
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icClose from '@iconify/icons-ic/twotone-close';
import icPrint from '@iconify/icons-ic/twotone-print';
import icDownload from '@iconify/icons-ic/twotone-cloud-download';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icPerson from '@iconify/icons-ic/twotone-person';
import icMyLocation from '@iconify/icons-ic/twotone-my-location';
import icLocationCity from '@iconify/icons-ic/twotone-location-city';
import icEditLocation from '@iconify/icons-ic/twotone-edit-location';
import icEmail from '@iconify/icons-ic/twotone-alternate-email';
import icRole from '@iconify/icons-fa-brands/teamspeak';
import { AdminService } from '../../_services/admin.service';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from 'src/app/shared/authentication.service';
/* import icStatus from '@iconify/icons-fa-brands/status */

@Component({
  selector: 'vex-user-create-update',
  templateUrl: './user-create-update.component.html',
  styleUrls: ['./user-create-update.component.scss']
})
export class UserCreateUpdateComponent implements OnInit {

  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  roles: any[] = [
    { value: 'user', text: 'Kullanıcı' },
    { value: 'admin', text: 'Admin' }
  ];

  // ICONS
  icMoreVert = icMoreVert;
  icClose = icClose;
  icPrint = icPrint;
  icDownload = icDownload;
  icDelete = icDelete;
  icPerson = icPerson;
  icEmail = icEmail;
  icRole = icRole;
  icMyLocation = icMyLocation;
  icLocationCity = icLocationCity;
  icEditLocation = icEditLocation;
  icPhone = icPhone;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: User,
    private dialogRef: MatDialogRef<UserCreateUpdateComponent>,
    private fb: FormBuilder,
    private adminService: AdminService,
    private authService: AuthenticationService,
    private bar: MatSnackBar
  ) { }

  ngOnInit() {

    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as User;
    }

    this.formCreate();

  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

  formCreate(): void {

    this.form = this.fb.group({
      id: [this.defaults.id, [Validators.required]],
      name: [this.defaults.name, [Validators.required]],
      email: [this.defaults.email, EmailValidation],
      password: this.defaults.password,
      role: [this.defaults.role, [Validators.required]],
      status: [this.defaults.status, [Validators.required]],
      unote: this.defaults.unote
    });

  }

  save() {
    if (this.mode === 'create') {
      //this.createUser();
    } else if (this.mode === 'update') {
      this.updateUser();
    }
  }


  updateUser() {

    // Düzenlenen bilgiler
    const user = this.form.value;

    // Senin user bilgilerin
    const me = this.authService.currentUserValue.user;


    // sistem yöneticisi düzenlenemez
    if(user.id == 1) {
      if(user.id != me.id) {
        this.bar.open('Sistem yöneticisinin bilgilerini değiştiremezsiniz!', 'Tamam', {
          duration: 10000
        });
        return;
      }
    }

    // eğer bir kişi adminse rolünü değiştiremez
    if(user.id == me.id) {

      if(me.role == 'admin') {

        if(user.role == 'user') {
          this.bar.open('Kendi rolünüzü değiştiremezsiniz!', 'Tamam', {
            duration: 10000
          });
          return;
        }

        if(user.status != 1) {
          this.bar.open('Kendi durumunuzu değiştiremezsiniz!', 'Tamam', {
            duration: 10000
          });
          return;
        }

      }

    }



    if(this.form.invalid) {
      this.bar.open('Lütfen gerekli alanları doldurunuz!', 'Tamam', {
        duration: 10000
      });
      return;
    }
  


    this.adminService.editUser(user).subscribe(data => {
      this.dialogRef.close(data);
    }, err => {
      this.bar.open('İşlem başarısız!', 'Tamam', {
        duration: 10000
      });
    });

  }

}

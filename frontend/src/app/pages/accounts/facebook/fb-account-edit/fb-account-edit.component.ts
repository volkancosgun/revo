import { Component, OnInit, Inject } from '@angular/core';
import icStar from '@iconify/icons-ic/twotone-star';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icClose from '@iconify/icons-ic/twotone-close';
import icPrint from '@iconify/icons-ic/twotone-print';
import icDownload from '@iconify/icons-ic/twotone-cloud-download';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icBusiness from '@iconify/icons-ic/twotone-business';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icEmail from '@iconify/icons-ic/twotone-mail';
import icPassword from '@iconify/icons-bx/bx-key';
import icPerson from '@iconify/icons-ic/twotone-person';
import icStarBorder from '@iconify/icons-ic/twotone-star-border';
import icCategory from '@iconify/icons-ic/twotone-category';
import icLanguage from '@iconify/icons-ic/baseline-translate';
import icCountry from '@iconify/icons-ic/twotone-language';
import { FbTableMenu } from 'src/app/pages/accounts/_models/fb-table-menu';
import { AccCats } from 'src/environments/acc-cats';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AccountsService } from 'src/app/pages/accounts/_services/accounts.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from 'src/app/_models/user';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { FbAccount } from 'src/app/pages/accounts/_models/fb-account';


@Component({
  selector: 'vex-fb-account-edit',
  templateUrl: './fb-account-edit.component.html',
  styleUrls: ['./fb-account-edit.component.scss']
})
export class FbAccountEditComponent implements OnInit {

  toggleStar: boolean = true || false;

  form: FormGroup;
  menuCats: FbTableMenu[] = AccCats;
  account: FbAccount;
  isUpdate: boolean = false;

  me: User = this.authService.currentUserValue.user;

  icStar = icStar;
  icStarBorder = icStarBorder;
  icMoreVert = icMoreVert;
  icClose = icClose;

  icPrint = icPrint;
  icDownload = icDownload;
  icDelete = icDelete;

  icBusiness = icBusiness;
  icLanguage = icLanguage;
  icCountry = icCountry;
  icPerson = icPerson;
  icEmail = icEmail;
  icPhone = icPhone;
  icCategory = icCategory;
  icPassword = icPassword;

  constructor(
    @Inject(MAT_DIALOG_DATA) private mData: any,
    private dialogRef: MatDialogRef<FbAccountEditComponent>,
    private fb: FormBuilder,
    private accService: AccountsService,
    private bar: MatSnackBar,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {

    this.formCreate();
    this.form.patchValue({ category: this.mData.account_category, _ref: this.mData.account_user.unumber });


    if (this.mData.account_id) {
      this.isUpdate = true;
      this.account = this.mData.account_data;
      this.form.patchValue(this.account);

      if (!this.account.read) {

        this.accService.changeReadAccount(this.mData.account_id, true).subscribe(res => {

          this.account.read = true;

        });

      }

    }


  }

  formCreate(): void {

    this.form = this.fb.group({
      id: [null],
      category: [null, [Validators.required]],
      uname: [null, [Validators.required]],
      upass: [null, [Validators.required]],
      country: [null],
      lang: [null],
      unote: [null],
      _ref: [null]
    });


  }

  createUpdateAccount() {

    const form = this.form.value;

    this.accService.createUpdateAccount(this.form.value, this.isUpdate).subscribe((res: any) => {
      if (res.error) {
        this.bar.open(res.msg, 'OK!', { duration: 5000 });
        return;
      }

      res['isUpdate'] = this.isUpdate;

      if (this.account) {
        this.account.category = form.category;
        this.account.uname = form.uname;
        this.account.upass = form.upass;
        this.account.country = form.country;
        this.account.lang = form.lang;
        this.account.unote = form.unote;
      }

      this.dialogRef.close(res);

    }, err => {
      this.bar.open('Beklenmedik bir hata oluştu!', 'OK!', { duration: 5000 });
      console.log(err);
    });
  }



  onSubmit() {

    if (this.form.invalid) {
      this.bar.open('Lütfen gerekli alanları doldurun!', 'OK!', { duration: 5000 });
      return;
    }

    this.createUpdateAccount();

  }

}

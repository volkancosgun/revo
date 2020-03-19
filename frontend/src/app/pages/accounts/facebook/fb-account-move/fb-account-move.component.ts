import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AccountsService } from 'src/app/pages/accounts/_services/accounts.service';
import { AccCats } from 'src/environments/acc-cats';
import { FbTableMenu } from 'src/app/pages/accounts/_models/fb-table-menu';
import { FbAccount } from 'src/app/pages/accounts/_models/fb-account';

@Component({
  selector: 'vex-fb-account-move',
  templateUrl: './fb-account-move.component.html',
  styleUrls: ['./fb-account-move.component.scss']
})
export class FbAccountMoveComponent implements OnInit {
  menuCats: FbTableMenu[] = AccCats;
  accounts: FbAccount[];
  selectedCat: number;
  isLoading: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FbAccountMoveComponent>,
    private accountService: AccountsService
  ) { }

  ngOnInit() {

    this.accounts = this.data.moveAcc;
    this.menuCats = this.menuCats.filter((key, value) => {
      return key.id != this.data.account_category;
    });

  }

  moveCats() {

    this.isLoading = true;
    let _movIds = [];
    this.accounts.forEach(acc => {
      acc.category = this.selectedCat;
      _movIds.push(acc.id);
    });

    setTimeout(() => {

      this.accountService.movingAccounts(_movIds, this.selectedCat, this.data.account_user.unumber).subscribe((res: any) => {
        if (!res.error) {
          this.isLoading = false;
          this.dialogRef.close(res);
        }
      }, err => {
        this.isLoading = false;
      });

    }, 1000);
  }

}

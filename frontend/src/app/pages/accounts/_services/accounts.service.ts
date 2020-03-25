import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { FbAccount } from '../_models/fb-account';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AccountsService {

    constructor(
        private _http: HttpClient,
        private handler: HttpBackend
    ) {

    }

    getListingAccounts(cat?: number, ref?: string): Observable<FbAccount[]> {
        let ek = '';
        if (cat != null) {
            ek += '&cat=' + cat;
        }
        if (ref != null) {
            ek += '&ref=' + ref;
        }
        return this._http.get<FbAccount[]>(`${environment.apiUrl}/accounts/listing?${ek}`);
    }

    changeStarredAccount(account_id: number, starred: boolean) {

        return this._http.get(`${environment.apiUrl}/accounts/changeStarred?account_id=${account_id}&starred=${starred}`);
    }

    changeReadAccount(account_id: number, read: boolean) {

        return this._http.get(`${environment.apiUrl}/accounts/changeRead?account_id=${account_id}&read=${read}`);
    }

    getAllFbAccounts(): Observable<FbAccount[]> {
        return this._http.get<FbAccount[]>(`${environment.apiUrl}/api/accounts/allfb}`);
    }

    createUpdateAccount(account: FbAccount, update: boolean) {
        let ek = '';
        if (update) {
            ek += '?update=1&account_id=' + account.id;
        }
        return this._http.post(`${environment.apiUrl}/accounts/store${ek}`, account);
    }

    deletingAccounts(ids: any[]) {
        const _ids = JSON.stringify(ids);
        return this._http.post(`${environment.apiUrl}/accounts/deleting`, { delIds: ids });
    }

    movingAccounts(ids: any[], category:number, ref:string) {
        const _ids = JSON.stringify(ids);
        return this._http.post(`${environment.apiUrl}/accounts/moving`, { movIds: ids, movCat:category, _ref:ref });
    }

    getAccountCountry(ip) {
        this._http = new HttpClient(this.handler);
        return this._http.get(`https://ip.nf/${ip}.json`);
    }

    getAllBot() {
        return this._http.get(`http://localhost/php_bot/read.php`);
    }

}
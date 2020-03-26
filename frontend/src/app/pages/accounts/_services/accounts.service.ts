import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend, HttpParams } from '@angular/common/http';
import { FbAccount } from '../_models/fb-account';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TableParamsModel } from 'src/app/_models/table/models/table-params.model';
import { TableResultsModel } from 'src/app/_models/table/models/table-results.model';
import { Observable, forkJoin, of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { AccountModel } from 'src/app/pages/accounts/_models/account.model';

@Injectable()
export class AccountsService {
    lastFilter$: BehaviorSubject<TableParamsModel> = new BehaviorSubject(new TableParamsModel({}, 'desc', '', 0, 10));
    constructor(
        private _http: HttpClient,
        private handler: HttpBackend
    ) {

    }

    getAccounts(tableParams: TableParamsModel, cat:string, ref:string): Observable<TableResultsModel> {

        let _params = new HttpParams()
            .set('filter', JSON.stringify(tableParams.filter))
            .set('category', cat)
            .set('ref', ref)
            .set('sortOrder', tableParams.sortOrder)
            .set('sortField', tableParams.sortField)
            .set('pageNumber', tableParams.pageNumber.toString())
            .set('pageSize', tableParams.pageSize.toString());

            return this._http.get<TableResultsModel>(`${environment.apiUrl}/accounts/customListing`, { params: _params });

        /* return this._http.get(`${environment.apiUrl}/accounts/customListing`, { params: _params }).pipe(
            map(res => res["items"])
        ); */

		/* return this._http.get<AccountModel[]>(`${environment.apiUrl}/accounts/customListing`, { params: _params }).pipe(
			mergeMap(res => of(new TableResultsModel(res)))
		); */
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
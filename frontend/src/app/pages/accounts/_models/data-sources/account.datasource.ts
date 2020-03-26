import { BaseDataSource } from 'src/app/_models/table/data-sources/_base.datasource';
import { AccountsService } from 'src/app/pages/accounts/_services/accounts.service';
import { TableParamsModel } from 'src/app/_models/table/models/table-params.model';
import { tap, catchError, finalize } from 'rxjs/operators';
import { TableResultsModel } from 'src/app/_models/table/models/table-results.model';
import { of } from 'rxjs';

export class AccountDataSource extends BaseDataSource {

    constructor(
        private accService: AccountsService
    ) {
        super();
    }

    loadAccounts(tableParams: TableParamsModel, cat:string, ref:string) {

        // Filtre
        this.accService.lastFilter$.next(tableParams);

        // Loading
        this.loadingSubject.next(true);
        this.accService.getAccounts(tableParams, cat, ref)
            .pipe(
                tap(res => {
                    this.entitySubject.next(res.items);
                    this.paginatorTotalSubject.next(res.totalCount);
                    /* const result = this.baseFilter(res.items, tableParams, ['status']);
                    this.entitySubject.next(result.items); */

                    //this.paginatorTotalSubject.next(result.totalCount);
                }),
                catchError(err => of(new TableResultsModel([], err))),
                finalize(() => this.loadingSubject.next(false))
            ).subscribe();

    }

}
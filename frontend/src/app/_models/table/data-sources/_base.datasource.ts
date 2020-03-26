import { BaseModel } from 'src/app/_models/table/models/_base.model';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { TableParamsModel } from 'src/app/_models/table/models/table-params.model';
import { TableResultsModel } from 'src/app/_models/table/models/table-results.model';
import * as _ from 'lodash';

export class BaseDataSource implements DataSource<BaseModel> {

    entitySubject = new BehaviorSubject<any[]>([]);
    hasItems: boolean = false;  // mesajın gosterilmesi gerekiyor: "kayıt bulunamadı"

    // Loading | Progress bar (Yükleniyor tetikleyicisi)
    loadingSubject = new BehaviorSubject<boolean>(false);
    loading$: Observable<boolean>;

    // Paginator | Paginators count (Sayfalama)
    paginatorTotalSubject = new BehaviorSubject<number>(0);
    paginatorTotal$: Observable<number>;

    constructor() {

        this.loading$ = this.loadingSubject.asObservable();
        this.paginatorTotal$ = this.paginatorTotalSubject.asObservable();
        this.paginatorTotal$.subscribe(res => this.hasItems = res > 0);

    }


    connect(): Observable<any[]> {
        // Veri kaynağına bağla
        return this.entitySubject.asObservable();
    }

    disconnect() {
        // Veri kaynağının bağlantısının kesilmesi
        this.entitySubject.complete();
        this.loadingSubject.complete();
        this.paginatorTotalSubject.complete();
    }

    baseFilter(_entities: any[], _tableParams: TableParamsModel, _filtrationFields: string[] = []): TableResultsModel {
        // Süz
        let entitiesResult = this.searchInArray(_entities, _tableParams.filter, _filtrationFields);

        // Sıralama
        if (_tableParams.sortField) {
            entitiesResult = this.sortArray(entitiesResult, _tableParams.sortField, _tableParams.sortOrder);
        }

        // Sayfalama
        const totalCount = entitiesResult.length;
        const initialPos = _tableParams.pageNumber * _tableParams.pageSize;
        entitiesResult = entitiesResult.slice(initialPos, initialPos + _tableParams.pageSize);

        const tableResults = new TableResultsModel();
        tableResults.items = entitiesResult;
        tableResults.totalCount = totalCount;
        return tableResults;
    }


    sortArray(_incomingArray: any[], _sortField: string = '', _sortOrder: string = 'asc'): any[] {
        if (!_sortField) {
            return _incomingArray;
        }

        let result: any[] = [];
        result = _incomingArray.sort((a, b) => {
            if (a[_sortField] < b[_sortField]) {
                return _sortOrder === 'asc' ? -1 : 1;
            }

            if (a[_sortField] > b[_sortField]) {
                return _sortOrder === 'asc' ? 1 : -1;
            }

            return 0;
        });
        return result;
    }

    searchInArray(_incomingArray: any[], _queryObj: any, _filtrationFields: string[] = []): any[] {
        const result: any[] = [];
        let resultBuffer: any[] = [];
        const indexes: number[] = [];
        let firstIndexes: number[] = [];
        let doSearch: boolean = false;

        _filtrationFields.forEach(item => {
            if (item in _queryObj) {
                _incomingArray.forEach((element, index) => {
                    if (element[item] === _queryObj[item]) {
                        firstIndexes.push(index);
                    }
                });
                firstIndexes.forEach(element => {
                    resultBuffer.push(_incomingArray[element]);
                });
                _incomingArray = resultBuffer.slice(0);
                resultBuffer = [].slice(0);
                firstIndexes = [].slice(0);
            }
        });

        Object.keys(_queryObj).forEach(key => {
            const searchText = _queryObj[key].toString().trim().toLowerCase();
            if (key && !_.includes(_filtrationFields, key) && searchText) {
                doSearch = true;
                try {
                    _incomingArray.forEach((element, index) => {
                        if (!element[key]) { return; }
                        const _val = element[key].toString().trim().toLowerCase();
                        if (_val.indexOf(searchText) > -1 && indexes.indexOf(index) === -1) {
                            indexes.push(index);
                        }
                    });
                } catch (ex) {
                    console.log(ex, key, searchText);
                }
            }
        });

        if (!doSearch) {
            return _incomingArray;
        }

        indexes.forEach(re => {
            result.push(_incomingArray[re]);
        });

        return result;
    }

}
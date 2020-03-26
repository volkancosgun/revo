export class TableResultsModel {
    items: any[];
	totalCount: number;
	errorMessage: string;

	constructor(_items: any[] = [], _totalCount:number = 0, _errorMessage: string = '') {
		this.items = _items;
        this.totalCount = _items.length;
        //this.totalCount = _totalCount;
	}

}
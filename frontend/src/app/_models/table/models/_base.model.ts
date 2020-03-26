import { TableFilter } from 'src/app/_models/table/interfaces/table-filter.interface';

export class BaseModel implements TableFilter {
    _defaultFieldName: string = '';
}
import { FilterOperation, QueryObjectDTO } from "../domain";
import { action, makeObservable, observable } from "mobx";

export class QueryBuilderViewModel {
    public queryObject: QueryObjectDTO;

    constructor(queryObject: QueryObjectDTO) {
        this.queryObject = queryObject;

        makeObservable(this, {
            queryObject: observable.deep,
            addNewFilterToGroup: action,
            deleteFilterFromGroup: action,
            addGroup: action,
            deleteGroup: action,
            setQueryObject: action
        });
    }

    addNewFilterToGroup(groupIndex: number) {
        this.queryObject.groups[groupIndex].filters.push({ field: "", value: "", condition: "" });
    }

    deleteFilterFromGroup(groupIndex: number, filterIndex: number) {
        const filters = this.queryObject.groups[groupIndex].filters;
        this.queryObject.groups[groupIndex].filters = filters.filter(
            (_, index) => index !== filterIndex
        );
    }

    addGroup() {
        this.queryObject.groups.push({
            operation: FilterOperation.AND,
            filters: [{ field: "", value: "", condition: "" }]
        });
    }

    deleteGroup(groupIndex: number) {
        this.queryObject.groups = this.queryObject.groups.filter(
            (_, index) => index !== groupIndex
        );

        // Make sure we always have at least 1 group!
        if (this.queryObject.groups.length === 0) {
            this.queryObject.groups.push({
                operation: FilterOperation.AND,
                filters: [{ field: "", value: "", condition: "" }]
            });
        }

        // @ts-ignore
        this.queryObject.__nesto = Date.now();
    }

    setQueryObject(queryObject: QueryObjectDTO) {
        this.queryObject = queryObject;
    }
}

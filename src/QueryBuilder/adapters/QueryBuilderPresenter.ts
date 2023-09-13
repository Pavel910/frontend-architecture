import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { FilterOperation, QueryObject, QueryObjectDTO, QueryObjectMapper } from "../domain";

// interface QueryBuilderViewModel {
//     queryObject: QueryObjectDTO;
// }

export class QueryBuilderPresenter {
    public queryObject: QueryObjectDTO;
    // public viewModel: QueryBuilderViewModel;

    constructor() {
        this.queryObject = QueryObjectMapper.toDTO(QueryObject.createEmpty());
        // this.viewModel = this.createViewModel();

        makeAutoObservable(this);
    }

    addNewFilterToGroup(groupIndex: number) {
        this.queryObject.groups[groupIndex].filters.push({
            field: "",
            value: "",
            condition: ""
        });
    }

    deleteFilterFromGroup(groupIndex: number, filterIndex: number) {
        console.log("deleteFilterFromGroup", groupIndex, filterIndex);
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
    }

    setQueryObject(queryObject: QueryObjectDTO) {
        this.queryObject = queryObject;
    }
}

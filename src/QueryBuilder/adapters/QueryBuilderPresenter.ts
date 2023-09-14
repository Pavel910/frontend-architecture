import { makeAutoObservable } from "mobx";
import { QueryObject, QueryObjectMapper } from "../domain";
import { QueryBuilderViewModel } from "./QueryBuilderViewModel";

export class QueryBuilderPresenter {
    private viewModel: QueryBuilderViewModel;

    constructor() {
        makeAutoObservable(this);
        this.viewModel = new QueryBuilderViewModel(
            QueryObjectMapper.toDTO(QueryObject.createEmpty())
        );
    }

    getViewModel() {
        return this.viewModel;
    }
}

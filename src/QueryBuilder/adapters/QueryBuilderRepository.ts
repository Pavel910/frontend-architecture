import { makeAutoObservable } from "mobx";
import { QueryObject } from "../domain";

export interface IBuilderRepository {
    getSearchConfiguration(): QueryObject;
    setSearchConfiguration(configuration: QueryObject): void;
}

class QueryBuilderRepository implements IBuilderRepository {
    private searchConfiguration: QueryObject;

    constructor() {
        this.searchConfiguration = QueryObject.createEmpty();
        makeAutoObservable(this);
    }

    getSearchConfiguration() {
        return this.searchConfiguration;
    }

    setSearchConfiguration(configuration: QueryObject) {
        this.searchConfiguration = configuration;
    }
}

export const queryBuilderRepository = new QueryBuilderRepository();

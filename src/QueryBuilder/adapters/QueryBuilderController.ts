import { makeAutoObservable } from "mobx";
import { IBuilderRepository } from "./QueryBuilderRepository";
import {
    Filter,
    Group,
    QueryObject,
    QueryObjectDTO,
    FilterOperation
} from "../domain";

export class QueryBuilderController {
    private readonly repository: IBuilderRepository;

    constructor(repository: IBuilderRepository) {
        this.repository = repository;
        makeAutoObservable(this);
    }

    updateConfiguration(configuration: QueryObjectDTO) {
        const config = QueryObject.createFrom(configuration);

        this.repository.setSearchConfiguration(config);
    }
}

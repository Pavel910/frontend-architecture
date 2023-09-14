import zod from "zod";
import { FilterOperation } from "./FilterOperation";
import { generateId } from "./generateId";

export interface FilterDTO {
    field: string;
    condition: string;
    value: string;
}

export interface GroupDTO {
    operation: FilterOperation;
    filters: FilterDTO[];
}

export interface QueryObjectDTO {
    id: string;
    name: string;
    operation: FilterOperation;
    groups: GroupDTO[];
}

const operationValidator = zod.enum(["AND", "OR"]);

const filterValidationSchema = zod.object({
    field: zod.string().trim().min(1),
    condition: zod.string().trim().min(1),
    value: zod.string().trim().min(1)
});

const groupValidationSchema = zod.object({
    operation: operationValidator,
    filters: zod.array(filterValidationSchema).min(1)
});

const validationSchema = zod.object({
    id: zod.string().trim().optional().nullish(),
    name: zod.string().trim(),
    operation: operationValidator,
    groups: zod.array(groupValidationSchema).min(1)
});

export class QueryObject {
    public readonly operations = FilterOperation;
    public readonly id;
    public name = "Untitled";
    public operation: FilterOperation;
    public groups: Group[];

    static createFrom(rawData: QueryObjectDTO) {
        return new QueryObject(
            rawData.operation,
            rawData.groups.map(groupDTO => {
                return new Group(
                    groupDTO.operation,
                    groupDTO.filters.map(filterDTO => {
                        return new Filter(filterDTO.field, filterDTO.condition, filterDTO.value);
                    })
                );
            })
        );
    }

    static createEmpty() {
        return new QueryObject(FilterOperation.AND, [
            new Group(FilterOperation.AND, [new Filter()])
        ]);
    }

    static validate(data: QueryObjectDTO) {
        return validationSchema.safeParse(data);
    }

    private constructor(operation: FilterOperation, groups: Group[], id?: string) {
        this.id = id ?? generateId();
        this.operation = operation;
        this.groups = groups;
    }
}

export class Group {
    public readonly operation: FilterOperation;
    public readonly filters: Filter[];

    constructor(operation: FilterOperation, filters: Filter[]) {
        this.operation = operation;
        this.filters = filters;
    }
}

export class Filter {
    public readonly field?: string;
    public readonly condition?: string;
    public readonly value?: string;

    constructor(field?: string, condition?: string, value?: string) {
        this.field = field;
        this.condition = condition;
        this.value = value;
    }
}

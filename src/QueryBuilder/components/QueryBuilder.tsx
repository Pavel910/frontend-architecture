import React from "react";
import { Observer, observer } from "mobx-react-lite";
import { Form } from "@webiny/form";
import Row from "react-bootstrap/Row";
import { QueryBuilderPresenter } from "../adapters/QueryBuilderPresenter";
import { QueryObjectDTO } from "../domain";
import { FilterGroupControls } from "./FilterGroupControls";
import { FilterGroup } from "./FilterGroup";
import { Filter } from "./Filter";

interface QueryBuilderProps {
    presenter: QueryBuilderPresenter;
}

export const QueryBuilder = observer(({ presenter }: QueryBuilderProps) => {
    const { queryObject } = presenter;

    const onChange = (data: QueryObjectDTO) => {
        /**
         * With this, we're updating the Query Object with actual values from the form inputs.
         */
        presenter.setQueryObject(data);
    };

    return (
        <div className={"query-builder"}>
            <h3>Query Builder</h3>
            <Form data={queryObject} onChange={onChange}>
                {() => (
                    <Observer>
                        {() => (
                            <>
                                <FilterGroupControls
                                    name={"operation"}
                                    onAddGroup={() => presenter.addGroup()}
                                />
                                {queryObject.groups.map((group, groupIndex) => (
                                    <Row style={{ paddingLeft: 40 }} key={groupIndex}>
                                        <FilterGroup
                                            name={`groups.${groupIndex}`}
                                            onAddFilter={() =>
                                                presenter.addNewFilterToGroup(groupIndex)
                                            }
                                            onDelete={() => presenter.deleteGroup(groupIndex)}
                                        >
                                            {group.filters.map((filter, filterIndex) => (
                                                <Filter
                                                    key={filterIndex}
                                                    name={`groups.${groupIndex}.filters.${filterIndex}`}
                                                    filter={filter}
                                                    onDelete={() => {
                                                        presenter.deleteFilterFromGroup(
                                                            groupIndex,
                                                            filterIndex
                                                        );
                                                    }}
                                                />
                                            ))}
                                        </FilterGroup>
                                    </Row>
                                ))}
                            </>
                        )}
                    </Observer>
                )}
            </Form>
        </div>
    );
});

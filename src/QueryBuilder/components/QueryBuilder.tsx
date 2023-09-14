import React from "react";
import { Observer, observer } from "mobx-react-lite";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { Form, FormOnSubmit } from "@webiny/form";
import { QueryBuilderPresenter } from "../adapters/QueryBuilderPresenter";
import { QueryObjectDTO } from "../domain";
import { FilterGroupControls } from "./FilterGroupControls";
import { FilterGroup } from "./FilterGroup";
import { Filter } from "./Filter";

interface QueryBuilderProps {
    presenter: QueryBuilderPresenter;
}

export const QueryBuilder = observer(({ presenter }: QueryBuilderProps) => {
    const viewModel = presenter.getViewModel();

    const onChange = (data: QueryObjectDTO) => {
        /**
         * With this, we're updating the Query Object with actual values from the form inputs.
         */
        viewModel.setQueryObject(data);
    };

    const onSubmit: FormOnSubmit<QueryObjectDTO> = data => {
        viewModel.onSubmit(
            data,
            () => {
                console.log("Success!");
                // Call Controller, or whatever...
            },
            () => {
                console.log("Error!");
            }
        );
    };

    return (
        <div className={"query-builder"}>
            <h3>Query Builder</h3>
            <Form
                data={viewModel.queryObject}
                onChange={onChange}
                onSubmit={onSubmit}
                invalidFields={viewModel.invalidFields}
            >
                {({ form }) => (
                    <Observer>
                        {() => (
                            <div>
                                <FilterGroupControls
                                    name={"operation"}
                                    onAddGroup={() => viewModel.addGroup()}
                                />
                                {viewModel.queryObject.groups.map((group, groupIndex) => (
                                    <Row style={{ paddingLeft: 40 }} key={groupIndex}>
                                        <FilterGroup
                                            name={`groups.${groupIndex}`}
                                            onAddFilter={() =>
                                                viewModel.addNewFilterToGroup(groupIndex)
                                            }
                                            onDelete={() => viewModel.deleteGroup(groupIndex)}
                                        >
                                            {group.filters.map((filter, filterIndex) => (
                                                <Filter
                                                    key={filterIndex}
                                                    name={`groups.${groupIndex}.filters.${filterIndex}`}
                                                    filter={filter}
                                                    onDelete={() => {
                                                        viewModel.deleteFilterFromGroup(
                                                            groupIndex,
                                                            filterIndex
                                                        );
                                                    }}
                                                />
                                            ))}
                                        </FilterGroup>
                                    </Row>
                                ))}
                                <Row>
                                    <Col xs={"auto"}>
                                        <Button onClick={form.submit}>Apply</Button>
                                    </Col>
                                </Row>
                            </div>
                        )}
                    </Observer>
                )}
            </Form>
        </div>
    );
});

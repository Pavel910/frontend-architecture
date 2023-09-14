import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Bind } from "@webiny/form";
import { FilterDTO } from "../domain";

interface FilterProps {
    name: string;
    filter: FilterDTO;
    onDelete?: () => void;
}

const ValidationMessage = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={"invalid-feedback"} style={{ display: "block" }}>
            {children}
        </div>
    );
};

export const Filter = ({ name, onDelete }: FilterProps) => {
    return (
        <Row>
            <Bind name={`${name}.field`}>
                {({ value, onChange, validation }) => (
                    <Form.Group as={Col} md={3}>
                        <Form.Control
                            type="field"
                            placeholder="Field name"
                            value={value || ""}
                            onChange={e => onChange(e.target.value)}
                        />
                        {validation.isValid === false ? (
                            <ValidationMessage>{validation.message}</ValidationMessage>
                        ) : null}
                    </Form.Group>
                )}
            </Bind>
            <Bind name={`${name}.condition`}>
                {({ value, onChange, validation }) => (
                    <Form.Group as={Col} md={3}>
                        <Form.Control
                            type="field"
                            placeholder="Condition"
                            value={value || ""}
                            onChange={e => onChange(e.target.value)}
                        />
                        {validation.isValid === false ? (
                            <ValidationMessage>{validation.message}</ValidationMessage>
                        ) : null}
                    </Form.Group>
                )}
            </Bind>
            <Bind name={`${name}.value`}>
                {({ value, onChange, validation }) => (
                    <Form.Group as={Col} md={3}>
                        <Form.Control
                            type="field"
                            placeholder="Value"
                            value={value || ""}
                            onChange={e => onChange(e.target.value)}
                        />
                        {validation.isValid === false ? (
                            <ValidationMessage>{validation.message}</ValidationMessage>
                        ) : null}
                    </Form.Group>
                )}
            </Bind>
            {onDelete ? (
                <Col md={3}>
                    <Button onClick={onDelete}>x</Button>
                </Col>
            ) : null}
        </Row>
    );
};

import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const FluidLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Container fluid="md">
            <Row>
                <Col>{children}</Col>
            </Row>
        </Container>
    );
};

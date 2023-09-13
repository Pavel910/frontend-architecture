import React from "react";
import ReactDOM from "react-dom/client";
import QueryBuilder from "./QueryBuilder/App";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <QueryBuilder />
    </React.StrictMode>
);

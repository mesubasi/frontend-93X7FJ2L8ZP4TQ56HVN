import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TablePage from "./components/table/TablePage";

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TablePage />} />
      </Routes>
    </BrowserRouter>
  </>
);

export default App;

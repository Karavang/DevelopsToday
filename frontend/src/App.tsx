import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RecipeListPage from "./pages/RecipeListPage";
import RecipeInfoPage from "./pages/RecipeInfoPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to="/recipes"
              replace
            />
          }
        />
        <Route
          path="/recipes"
          element={<RecipeListPage />}
        />
        <Route
          path="/recipes/:id"
          element={<RecipeInfoPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

// frontend/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Events from "./components/EventsPage";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/event"
          element={
            <PrivateRoute>
              <Events />
            </PrivateRoute>
          }
        />
      </Routes>
    </LocalizationProvider>
  );
}

export default App;

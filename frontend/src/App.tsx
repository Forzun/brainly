import React from "react";
import { Button } from "./components/ui/button";
import Dashboard from "./page/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router";
import Signup from "./page/SIgnup";
import { ThemeProvider } from "./components/theme-provider";
import Signin from "./page/Signin";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

import AuthProvider from "./contexts/AuthContext";
import { Routes, Route } from "react-router-dom";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings/Settings";
import Transactions from "./pages/Transactions";
import Navigation from "./components/Navigation/Navigation";
import Header from "./components/Header/Header"

function App() {
  return (
    <div className="app-container">
      <AuthProvider>
        <Navigation />
        <div className="page-container">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route />
          </Routes>
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;

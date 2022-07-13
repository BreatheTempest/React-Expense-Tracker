import AuthProvider from "./contexts/AuthContext";
import { Routes, Route } from "react-router-dom";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Transactions from "./pages/Transactions";
import Navigation from "./components/Navigation/Navigation";

function App() {
  return (
    <div className="app-container">
      <AuthProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;

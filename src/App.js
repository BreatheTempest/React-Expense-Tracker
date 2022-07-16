import AuthProvider from './contexts/AuthContext';
import { Routes, Route } from 'react-router-dom';

import RequireAuth from './components/RequireAuth';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Transactions from './pages/Transactions';
import Navigation from './components/Navigation/Navigation';
import Header from "./components/Header/Header"

function App() {
	return (
		<div className="app-container">
			<AuthProvider>
				<Navigation />
        <div className="page-container">
         <Header />
				<Routes>
					<Route
						path="/"
						element={
							<RequireAuth>
								<Dashboard />
							</RequireAuth>
						}
					/>
					<Route
						path="settings"
						element={
							<RequireAuth>
								<Settings />
							</RequireAuth>
						}
					/>
					<Route
						path="transactions"
						element={
							<RequireAuth>
								<Transactions />
							</RequireAuth>
						}
					/>

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

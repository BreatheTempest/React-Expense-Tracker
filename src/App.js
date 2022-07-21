import { Routes, Route } from 'react-router-dom';

import RequireAuth from './components/RequireAuth';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import Settings from './pages/Settings/Settings';
import Transactions from './pages/Transactions/Transactions';
import Navigation from './components/Navigation/Navigation';
import Header from './components/Header/Header';

import { useDarkMode } from './contexts/DarkModeContext';

function App() {
	const { darkMode, changeMode } = useDarkMode();

	return (
		<div className={`app-container ${darkMode ? 'dark' : ''}`}>
			<Navigation />
			<div className="page-container">
				<button className="dark-mode" onClick={changeMode}>
					Dark Mode
				</button>
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
		</div>
	);
}

export default App;

import React from 'react';
import App from './App';
import './style.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import DarkModeProvider from './contexts/DarkModeContext';
import ExpensesProvider from './contexts/ExpensesContext';
import AuthProvider from './contexts/AuthContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<AuthProvider>
			<ExpensesProvider>
				<DarkModeProvider>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</DarkModeProvider>
			</ExpensesProvider>
		</AuthProvider>
	</React.StrictMode>
);

import React from 'react';
import App from './App';
import './style.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import DarkModeProvider from './contexts/DarkModeContext';
import TransactionsContext from './contexts/TransactionsContext';
import AuthProvider from './contexts/AuthContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<AuthProvider>
			<TransactionsContext>
				<DarkModeProvider>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</DarkModeProvider>
			</TransactionsContext>
		</AuthProvider>
	</React.StrictMode>
);

import React from 'react';
import App from './App';
import './style.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import DarkModeProvider from './contexts/DarkModeContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<DarkModeProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</DarkModeProvider>
	</React.StrictMode>
);

import { createContext, useContext, useState } from 'react';

const DarkMode = createContext();

export function useDarkMode() {
	return useContext(DarkMode);
}

export default function DarkModeProvider({ children }) {
	const [darkMode, setDarkMode] = useState(true);

	function changeMode() {
		setDarkMode((prevMode) => !prevMode);
	}

	const value = { darkMode, changeMode };

	return <DarkMode.Provider value={value}>{children}</DarkMode.Provider>;
}

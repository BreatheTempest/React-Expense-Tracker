import LogoImg from './icons/Logo';
import { useNavigate } from 'react-router-dom';

export default function Logo() {
	const navigate = useNavigate();
	return (
		<button className="logo" onClick={() => navigate('/')}>
			<LogoImg fill="#1B212D" /> <h2>Maglo.</h2>
		</button>
	);
}

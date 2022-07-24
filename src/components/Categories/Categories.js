import { useTransactions } from '../../contexts/TransactionsContext';
import './Categories.css';
export default function Categories(props) {
	const { setSort } = useTransactions();

	function handleClick(e) {
		e.stopPropagation();
		const { name } = e.target;
		setSort((prevSort) => {
			return prevSort[0] !== name
				? [name, 'asc']
				: prevSort[1] === 'asc'
				? [name, 'desc']
				: [name, 'asc'];
		});
	}

	return (
		<div
			className={`categories ${props.full ? 'categories-transactions' : ''}`}
		>
			<button name="title" onClick={handleClick}>
				NAME/BUSINESS
			</button>
			<button name="type" onClick={handleClick}>
				TYPE
			</button>
			<button name="amount" onClick={handleClick}>
				AMOUNT
			</button>
			<button name="date" onClick={handleClick}>
				DATE
			</button>
			{props.full && (
				<button name="invoice" onClick={handleClick}>
					INVOICE ID
				</button>
			)}
			{props.full && <p>ACTION</p>}
		</div>
	);
}

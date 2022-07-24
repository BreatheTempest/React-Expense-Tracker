import { useTransactions } from '../../contexts/TransactionsContext';
import './Categories.css';
import arrow from '../../assets/icons/arrow.svg';
import Button from '../../components/Button';
export default function Categories(props) {
	const { sort, setSort } = useTransactions();
	console.log(sort[1]);

	function handleClick(e) {
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
			<Button
				value="NAME/BUSINESS"
				name="title"
				onClick={handleClick}
				icon={sort[0] === 'title' ? arrow : null}
				iconClass={sort[1]}
			/>
			<Button
				value="TYPE"
				name="type"
				onClick={handleClick}
				icon={sort[0] === 'type' ? arrow : null}
				iconClass={sort[1]}
			/>
			<Button
				value="AMOUNT"
				name="amount"
				onClick={handleClick}
				icon={sort[0] === 'amount' ? arrow : null}
				iconClass={sort[1]}
			/>
			<Button
				value="DATE"
				name="date"
				onClick={handleClick}
				icon={sort[0] === 'date' ? arrow : null}
				iconClass={sort[1]}
			/>
			{props.full && (
				<Button
					value="INVOICE ID"
					name="invoice"
					onClick={handleClick}
					icon={sort[0] === 'invoice' ? arrow : null}
					iconClass={sort[1]}
				/>
			)}
			{props.full && <p>ACTION</p>}
		</div>
	);
}

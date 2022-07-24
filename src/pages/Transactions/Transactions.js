import './Transactions.css';
import { nanoid } from 'nanoid';
import wallet from '../../components/icons/wallet.js';
import Transaction from '../../components/Transaction/Transaction';
import { useTransactions } from '../../contexts/TransactionsContext';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ManageTransaction from '../../components/ManageTransaction/ManageTransaction';
import { useEffect, useState } from 'react';
import Categories from '../../components/Categories/Categories';

export default function Transactions() {
	const {
		transactions,
		createTransaction,
		updateTransaction,
		deleteTransaction,
		setSort,
	} = useTransactions();
	const [search, setSearch] = useState();
	const [isOpen, setIsOpen] = useState(false);
	const [currentTransactionId, setCurrentTransactionId] = useState('');
	const [filteredTransactions, setFilteredTransactions] = useState([]);
	const [currentTransaction, setCurrentTransaction] = useState('');

	function handleInput(e) {
		const { value } = e.target;
		setSearch(value);
		if (value) {
			setFilteredTransactions(
				transactions.filter((item) => item.title.includes(value))
			);
		} else setFilteredTransactions(transactions);
	}

	useEffect(() => {
		setFilteredTransactions(transactions);
	}, [transactions]);

	const transactionsArr = filteredTransactions.map((transaction) => (
		<Transaction
			img={wallet}
			mode={transaction.transaction}
			key={transaction.invoice}
			title={transaction.title}
			type={transaction.type}
			amount={transaction.amount}
			date={transaction.date}
			invoice={transaction.invoice}
			edit={edit}
			class="transaction-transactions"
		/>
	));

	async function edit(e, id) {
		e.stopPropagation();
		setCurrentTransactionId(id);
		setCurrentTransaction(
			transactions.find((transaction) => transaction.invoice === id)
		);
		setIsOpen(true);
		setSort(['date', 'asc']);
	}

	async function handleSubmit(data) {
		setIsOpen(false);
		const id = nanoid();
		const invoice = {
			invoice: id,
		};
		const transactionData = {
			transaction: data.transaction,
			title: data.title,
			type: data.type,
			amount: +data.amount,
			date: data.date,
			recurring: data.recurring,
		};
		if (!currentTransactionId) {
			await createTransaction(id, { ...transactionData, ...invoice });
		} else {
			await updateTransaction(currentTransactionId, transactionData);
			setCurrentTransaction('');
			setCurrentTransactionId('');
			setSort(['date', 'asc']);
		}
	}

	async function handleDelete() {
		setIsOpen(false);
		await deleteTransaction(currentTransactionId);
		setCurrentTransaction('');
		setCurrentTransactionId('');
		setSort(['date', 'asc']);
	}

	return (
		<section className="transactions">
			{isOpen && (
				<ManageTransaction
					handleClick={handleSubmit}
					close={(e) => {
						e.preventDefault();
						setIsOpen(false);
						setCurrentTransaction('');
						setCurrentTransactionId('');
					}}
					currentTransaction={currentTransaction}
					setCurrentTransaction={setCurrentTransaction}
					handleDelete={handleDelete}
				/>
			)}
			<div className="transactions-top-bar">
				<Input
					placeholder="Search by name"
					handleInput={handleInput}
					value={search}
				/>
				<Button value="Create Transaction" onClick={() => setIsOpen(true)} />
			</div>
			<Categories full />
			{transactionsArr}
		</section>
	);
}

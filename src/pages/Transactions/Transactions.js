import './Transactions.css';
import { nanoid } from 'nanoid';
import wallet from '../../components/icons/wallet.svg';
import Transaction from '../../components/Transaction/Transaction';
import { useTransactions } from '../../contexts/TransactionsContext';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ManageTransaction from '../../components/ManageTransaction/ManageTransaction';
import { useState } from 'react';

export default function Transactions() {
	const {
		transactions,
		createTransaction,
		updateTransaction,
		deleteTransaction,
	} = useTransactions();
	const [isOpen, setIsOpen] = useState(false);
	const [currentTransactionId, setCurrentTransactionId] = useState('');
	const [currentTransaction, setCurrentTransaction] = useState('');

	const transactionsArr = transactions.map((transaction) => (
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
		};
		if (!currentTransactionId) {
			await createTransaction(id, { ...transactionData, ...invoice });
		} else {
			await updateTransaction(currentTransactionId, transactionData);
			setCurrentTransaction('');
			setCurrentTransactionId('');
		}
	}

	async function handleDelete() {
		setIsOpen(false);
		await deleteTransaction(currentTransactionId);
		setCurrentTransaction('');
		setCurrentTransactionId('');
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
				<Input />
				<Button value="Create Transaction" onClick={() => setIsOpen(true)} />
				<Button value="Filters" />
			</div>
			<div className="transactions-categories">
				<p>NAME/BUSINESS</p>
				<p>TYPE</p>
				<p>AMOUNT</p>
				<p>DATE</p>
				<p>INVOICE ID</p>
				<p>ACTION</p>
			</div>
			{transactionsArr}
		</section>
	);
}

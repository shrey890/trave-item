import { useState } from "react";

export default function Form({ onAddItems }) {
	const [description, setDescription] = useState("");
	const [quantity, setQuantity] = useState(1);
	const [error, setError] = useState("");

	function handleSubmit(e) {
		e.preventDefault();

		const trimmedDescription = description.trim(); // Trim the input

		if (!trimmedDescription) {
			setError("Please enter a valid item description.");
			return;
		}
		if (!description) return;

		const newItem = { description, quantity, packed: false, id: Date.now() };
		onAddItems(newItem);
		setDescription("");
		setQuantity(1);
		setError("");
	}

	return (
		<form className="add-form" onSubmit={handleSubmit}>
			<h3>What do you need for your trip?</h3>
			<select
				onChange={(e) => setQuantity(Number(e.target.value))}
				name=""
				id=""
				value={quantity}
			>
				{Array.from({ length: 20 }, (_, i) => (
					<option value={i + 1} key={i}>
						{i + 1}
					</option>
				))}
			</select>
			<input
				type="text"
				placeholder="Item..."
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<button>Add</button>
			{error && (
				<p className="error-message" style={{ color: "blue" }}>
					{error}
				</p>
			)}
		</form>
	);
}

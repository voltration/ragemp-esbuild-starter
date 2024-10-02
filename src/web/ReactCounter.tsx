import React, { useState } from "react";

const Counter = () => {
	const [count, setCount] = useState(0);
	const increment = () => setCount(count + 1);

	return (
		<>
			<button
				type="button"
				onClick={increment}
				style={{ backgroundColor: "wheat" }}
			>
				{count}
			</button>
		</>
	);
};

export default Counter;

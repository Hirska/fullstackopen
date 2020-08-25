import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
	<button onClick={props.handleClick}>{props.text}</button>
)
const Header = ({ text }) => (
	<h1>{text}</h1>
)
const StatisticLine = ({ text, number }) => {
	if (text === 'positive') {
		return <tr><td>{text}</td><td>{number} %</td></tr>
	}
	return (<tr><td>{text}</td><td>{number}</td></tr>)

}
const Statistics = ({ good, neutral, bad }) => {
	let total = good + bad + neutral;

	if (total === 0) {
		return <p>No feedback given</p>
	}

	return (
		<table>
			<tbody>
				<StatisticLine text="good" number={good} />
				<StatisticLine text="neutral" number={neutral} />
				<StatisticLine text="bad" number={bad} />
				<StatisticLine text="average" number={(good - bad) / total} />
				<StatisticLine text="positive" number={(good / total) * 100} />
			</tbody>
		</table>

	)
}

const App = () => {
	// tallenna napit omaan tilaansa
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const handleGoodClick = () => {
		setGood(good + 1);
	}
	const handleBadClick = () => {
		setBad(bad + 1);
	}
	const handleNeutralClick = () => {
		setNeutral(neutral + 1);
	}
	return (
		<div >
			<Header text="give feedback" />
			<Button handleClick={handleGoodClick} text="good" />
			<Button handleClick={handleNeutralClick} text="neutral" />
			<Button handleClick={handleBadClick} text="bad" />
			<Header text="statistics" />
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	)
}

ReactDOM.render(<App />,
	document.getElementById('root')
)

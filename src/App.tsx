import React, { useState } from 'react';
import { createBlankData, SIMcreateAndAddNewItem } from 'fp-autofocus';
import './App.css';

function App() {
	const [myApp, setMyApp] = useState(createBlankData());
	const [text, setText] = useState('');

	function handleTextChange(e: any) {
		setText(e.target.value);
	}

	const clearText =  () => {
		setText('');
	}

	function handleSubmit(e: any) {
		e.preventDefault();
		setMyApp(SIMcreateAndAddNewItem(myApp)(text));
		clearText();
	}

	const listItems =
		<ul>{myApp.myList.map(x => <li key={x.id}>{x.textName}</li>)}</ul>;

  return (
    <section className="debug">
      <section>{listItems}</section>
			<section>Last done is {myApp.lastDone}</section>
			<form onSubmit={handleSubmit}>
				<label>Enter To-Do Text:</label>
				<input onChange={handleTextChange} value={text} />
				<button type="submit">Submit</button>
			</form>
    </section>
  );
}

export default App;

import React from 'react';
import { IAppData, createBlankData } from 'fp-autofocus';
import './App.css';

function App() {
	const myApp: IAppData = createBlankData();

	const listItems =
		<ul>{myApp.myList.map(x => <li>{x.textName}</li>)}</ul>;

  return (
    <section className="debug">
      <section>{listItems}</section>
			<section>Last done is {myApp.lastDone}</section>
    </section>
  );
}

export default App;

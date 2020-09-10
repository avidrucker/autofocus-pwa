import React, { useState } from 'react';
import { createBlankData, SIMcreateAndAddNewItem, isNegOne, 
	isReviewableList, isFocusableList, markFirstMarkableIfPossible, 
	IAppData, IItem, SIMenterFocusState } from 'fp-autofocus';
import './index.css';
import TachyonsHelperMol from './components2/TachyonsHelperMol';
import AppHeaderMol from './components2/AppHeaderMol';

function App() {
	const [myApp, setMyApp] = useState(createBlankData());
	const [text, setText] = useState('');

	// a version of markFirstMarkableIfPossible which takes in
	// app object & returns app object
	const autoMark = (myApp: IAppData): IAppData =>
		updateJustAppList
			(myApp)
			(markFirstMarkableIfPossible(myApp.myList)(myApp.lastDone));

	function handleTextChange(e: any) {
		setText(e.target.value);
	}

	const clearText =  () => {
		setText('');
	}

	const conductFocus = (myApp: IAppData) =>
		SIMenterFocusState(myApp);

	const handleFocusButtonPress = (e: any) => {
		e.preventDefault();
		setMyApp(autoMark(conductFocus(myApp)));
	}

	// TEMP FUNC
	const updateJustAppList = (myApp: IAppData) => (newList: IItem[]) =>
		({ currentState: myApp.currentState,
			lastDone: myApp.lastDone,
			myList: newList,
			myArchive: myApp.myArchive
		});

	function handleSubmit(e: any) {
		e.preventDefault();
		// TEMP FUNC CALL
		setMyApp(autoMark(SIMcreateAndAddNewItem(myApp)(text)));
		clearText();
	}

	// TODO: move to fp-autofocus library
	// TODO: use app object as param instead of destructured num / sub-property
	const sayLastDone = (lastDone: number) => isNegOne(lastDone)
		? `Last done is unset.`
		: `Last done is ${lastDone}`;

	const welcomeMessageJSX = <span className="tl db">
		Welcome to AutoFocus. Add new to-do's with the input box below.
	</span>;

	const listItems =
		<ul className="tl">
			{/*TODO: confirm that className={x.status works as desired}*/}
			{myApp.myList.map(x =>
				<li
				className={x.status}
			 	key={x.id}>
					 {x.textName}</li>)}
		</ul>;

  return (
    <main className="debug">
			<TachyonsHelperMol />
			
			<section className="measure-narrow center tc">

				<AppHeaderMol />

				<section>{myApp.myList.length !== 0
					? listItems
					: welcomeMessageJSX}</section>

				<section>
					<p className="tl">{sayLastDone(myApp.lastDone)}</p>
				</section>
				
				<form onSubmit={handleSubmit}>
					<label>Enter To-Do Text:</label>
					<input onChange={handleTextChange} value={text} />
					<button type="submit">Submit</button>
				</form>

				{isReviewableList(myApp.myList)(myApp.lastDone)
					? <button>Review</button>
					: <p>List not reviewable.</p>}

				{isFocusableList(myApp)
					? <button onClick={handleFocusButtonPress}>Focus</button>
					: <p>List not focusable.</p>
				}

			</section>
    </main>
  );
}

export default App;

import React, { useState } from 'react';
import { createBlankData, SIMcreateAndAddNewItem, // isNegOne, 
	isReviewableList, isFocusableList, markFirstMarkableIfPossible, 
	IAppData, IItem, SIMenterFocusState, getCMWTDstring, getFirstReviewableIndex, getTextByIndex, dotIndex, doNothing, getCMWTDindex } from 'fp-autofocus';
import './index.css';
// import TachyonsHelperMol from './components2/TachyonsHelperMol';
import AppHeaderMol from './components2/AppHeaderMol';
import EmojiAtom from './components2/EmojiAtom';
// import LastDoneAtom from './components2/LastDoneAtom';

function App() {
	const [myApp, setMyApp] = useState(createBlankData());
	const [text, setText] = useState('');
	const [inReview, setInReview] = useState(false);
	const [inFocus, setInFocus] = useState(false);
	const [reviewCursor, setReviewCursor] = useState(-1);

	// a version of markFirstMarkableIfPossible which takes in
	// app object & returns app object
	const autoMark = (myApp: IAppData): IAppData =>
		updateJustAppList
			(myApp)
			(markFirstMarkableIfPossible(myApp.myList)(myApp.lastDone));

	const handleTextChange = (e: any) => {
		setText(e.target.value);
	}

	const clearText =  () => {
		setText('');
	}

	const conductFocus = (myApp: IAppData) =>
		SIMenterFocusState(myApp);

	const handleFocusButtonClick = (e: any) => {
		// e.preventDefault();
		setMyApp(autoMark(conductFocus(myApp)));
		setInFocus(true);
	};

	const sanitizeInputString = (inputString: string) =>
		inputString.trim();

	const isValidInput = (inputString: string) =>
		sanitizeInputString(inputString) !== "";

	const handleReviewButtonClick = (e: any) => {
		// e.preventDefault();
		setInReview(!inReview); // toggleReviewFormDisplay
		setReviewCursor(getFirstReviewableIndex(myApp.myList)(myApp.lastDone))
		// console.log(`Review cursor is now set to ${reviewCursor}!`);
	};

	const endReview = () => {
		setReviewCursor(-1);
		setInReview(false);
		// console.log(`Ending review...`);
	}

	const updateReviewState = (reviewUpdate: string) => {
		if(reviewUpdate === "yes" || reviewUpdate === "no") {
			setReviewCursor(reviewCursor + 1);
		}
		else if (reviewUpdate === "quit") {
			endReview();
		}
		else {
			console.log(`There seems to have been an error with reviewing...`);
		}
		// console.log(isReviewableList(myApp.myList)(myApp.lastDone)
		// 	? `IS reviewable list` : `NOT reviewable list`);
		// console.log(`Review cursor is now ${reviewCursor}`);
		// console.log(`My app's list length is ${myApp.myList.length}`);

		!isReviewableList(myApp.myList)(myApp.lastDone) ||
		reviewCursor >= myApp.myList.length - 1
			? endReview()
			: doNothing(); // console.log("Hiya!")
	};

	const handleLeftClick = (e: any) => {
		// console.log("You clicked left!");
		updateReviewState("no");
	}

	// app level state update wrapper for dotIndex
	// TODO: move this to fp-autofocus library
	const dotIndexInApp = (appData: IAppData) => (i: number): IAppData =>
		updateJustAppList(appData)(dotIndex(appData.myList)(i))

	const handleRightClick = (e: any) => {
		// console.log("You clicked right!");
		setMyApp(dotIndexInApp(myApp)(reviewCursor))
		updateReviewState("yes");
	}

	const handleQuitClick = (e: any) => {
		// console.log("Quitting review...");
		updateReviewState("quit");
	}

	// TEMP FUNC
	// TODO: move this to fp-autofocus library
	const updateJustAppList = (appData: IAppData) => (newList: IItem[]) =>
		({ currentState: appData.currentState,
			lastDone: appData.lastDone,
			myList: newList,
			myArchive: appData.myArchive
		});

	// TODO: refactor functions to use 'appData' parameter identifier
	// rather than 'myApp' to increase readability
	// const getFirstReviewableText = (myApp: IAppData): string =>
	// 	getTextByIndex
	// 		(myApp.myList)
	// 		(getFirstReviewableIndex
	// 			(myApp.myList)(myApp.lastDone));

	const handleModalClick = (e: any) => {
		setInFocus(false);
	}

	const displayFocusModal = (currentlyFocused: string) =>
		<section
		onClick={handleModalClick}
			className="center tc absolute bg-white vw-100 vh-100 border-box">
			<AppHeaderMol />
			<section
				className="w-100 ph3 relative h-75 flex flex-column flex-grow-1 justify-center items-center">
				<p className="lh-copy">
					{`You are now focusing on '${currentlyFocused}'.`}
				</p>
				<p className="lh-copy">
					{`Tap anywhere on the screen to stop focusing.`}
				</p>
			</section>
		</section>;

	const handleNewSubmit = (e: any) => {
		e.preventDefault();
		// TEMP FUNC CALL
		setMyApp(autoMark(SIMcreateAndAddNewItem(myApp)(text)));
		clearText();
	}

	// TODO: move to fp-autofocus library
	// TODO: use app object as param instead of destructured num / sub-property
	// const sayLastDone = (lastDone: number) => isNegOne(lastDone)
	// 	? `Last done is unset.`
	// 	: `Last done is '${getTextByIndex(myApp.myList)(lastDone)}' @ index ${lastDone}`;

	const welcomeMessageJSX = <span className="tl db lh-copy">
		Welcome to AutoFocus. Type new to-do's into the input box below.
	</span>;

	const listItems =
		<section>
			{/* TODO: enable toggle to hide/show completed items */}
			{/*<section>
				<input type="checkbox" id="showToggle" name="showToggle" value="Bike" />
				<label htmlFor="showToggle"> Toggle show completed</label>
			</section>*/}
			<ul className="tl pv0 mv0">
				{myApp.myList.map((x, i) =>
					<li
					className={x.status + ` pb1`}
					key={x.id}>
						{getCMWTDindex(myApp.myList) === i
							? <strong>{x.textName}</strong>
							: x.textName
						}
					</li>)}
			</ul>
		</section>;

  return (
    <main className="bg-light-gray vh-100 pv4-ns vw-100 lato f4 border-box">
			{/* bg-black */}
			{/*<TachyonsHelperMol />*/}
			<section className="center tc measure-narrow-ns ph4-ns h-100">
				{inFocus &&
					displayFocusModal(getTextByIndex(myApp.myList)(myApp.lastDone))
				}
				<section className="measure-narrow-ns bg-white h-100 flex flex-column flex-grow-1">
					<AppHeaderMol />
					<section className="flex flex-column flex-grow-1 justify-between">
						<section className="ph3 pt3 pb2">{myApp.myList.length !== 0
							? listItems
							: welcomeMessageJSX}
						</section>

						{/*<LastDoneAtom lastDoneText={sayLastDone(myApp.lastDone)} />*/}
						
						{!inReview &&
							<section className="pa3">
								<section className="">
									<form className="pa0" onSubmit={handleNewSubmit}>
										{/*<label>Enter To-Do Text:</label>*/}
										<input className="pa2 w-100 border-box" onChange={handleTextChange} value={text} placeholder={"Type new to-do's here"} />
										<button
											className="w-100 pa2"
											type="submit"
											disabled={!isValidInput(text)}>
												Add To-Do <EmojiAtom symbol="✎" />
										</button>
									</form>
								</section>

								<section className="pt3">
									<button
										disabled={!isReviewableList(myApp.myList)(myApp.lastDone)}
										className="w-100 pa2"
										onClick={handleReviewButtonClick}>
											Review <EmojiAtom symbol="⚖️" />
									</button>
								</section>

								<section className="pt3">
									<button
										disabled={!isFocusableList(myApp)}
										className="w-100 pa2"
										onClick={handleFocusButtonClick}>
											Focus <EmojiAtom symbol="🔎" />
									</button>
								</section>
								</section>
							}

						{/* OLD UX: I will use this first to transition more quickly */}
						{(inReview &&
							// TODO: rewrite getFirstReviewableIndex to simply only take in app state object
							getFirstReviewableIndex(myApp.myList)(myApp.lastDone) !== -1) &&
							<section className="pa3">{/* getFirstReviewableText(myApp) */}
								<label className="lh-copy">{`Do you want to do '${
										getTextByIndex(myApp.myList)(reviewCursor)
									}' more than '${getCMWTDstring(myApp.myList)}'?`}</label>
								<section className="flex flex-grow-1 w-100 mt2">
									<button className="pa2 dib w-100" onClick={handleLeftClick}>No</button>
									<button className="pa2 dib mh2 w-100" onClick={handleQuitClick}>Quit</button>
									<button className="pa2 dib w-100" onClick={handleRightClick}>Yes</button>
								</section>
							</section>}

						{/* NEW UX: I intend to use something like this second, to create a better UX */}
						{/*inReview &&
							<form onSubmit={handleReviewSubmit}>
								<label>Which do you want to do more?</label>
								<section>
									<button onClick={handleLeftClick}>{getCMWTDstring(myApp.myList)}</button>
									<button onClick={handleRightClick}>{getFirstReviewableText(myApp)}</button>
									<button onClick={handleQuitClick}>Stop reviewing early</button>
								</section>
							</form>*/}

					</section>
				</section>
			</section>
    </main>
  );
}

export default App;

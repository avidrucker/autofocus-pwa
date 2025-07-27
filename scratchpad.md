# PWA Core MVP

Notes
> As my (Avi's) understanding of the AutoFocus FVP
> algorithm has advanced, I realize I can now reduce
> the complexity and implementation details of the
> AutoFocus app. For now, I am implementing a single
> screen, where buttons dynamically appear as needed.
> Since "auto-marking" is to happen after each state
> change (addition of a new item and completion of
> a marked item), there is now no need to make extra
> calls to "review" a list simply to mark it. Marking
> the first markable item was a manual step before,
> and extra unneccessary manual steps is (I believe)
> the antithesis (opposite) of AutoFocus.

Project Setup ('s' for setup)
- [x] s001 Import core native API functions (fp-autofocus)
- [x] s002 Resolve bug: "Module not found: Can't resolve 'fp-autofocus' in '.../autofocus-pwa/src'"
- [x] s003 Update project to use core native API (fp-autofocus functions)

Functionality ('c' for code)
- [x] c001 Update project to enable input of new items
- [x] c002 Mark first markable after each item addition (ALGO UPDATE)
- [x] c003 Enable user to focus on CMWTD item when it exists
- [x] (EPIC) Enable user to review items when list is reviewable (EPIC)
	- [x] c004 Enable user to quit reviewing early
	- [x] c005 Enable user to mark an item during review when they answer 'yes'
	- [x] c006 Eanble user to move to the next item for review after answering 'yes' or 'no'
	- [x] c007 Enable user to be returned to correctly rendered main/home once no reviewable items remain
- [ ] (EPIC) Disable buttons when they are redundant (unusable) (EPIC)
	- [x] c008 Disable 'Add To-Do' button when input field has invalid input
	- [x] c009 Disable 'Review List' button when list is not reviewable
	- [x] c010 Disable 'Focus on To-Do' button when list is not focusable
- [x] c011 Santitize user input to not allow blank entries after sanitizing
- [x] c012 Enable user to click anywhere on screen (or hit enter) to exit "focus mode"
- [ ] c013 Display options such "show/hide completed", "export to CSV", from menu drop down button
- [ ] c014 Add checkbox which toggles the hiding of completed items items
- [ ] c015 Add indicator (a la Svelte 3 intro video) that says how many of how many items are being displayed (after hide completed is toggled)
- [x] c016 Display "about screen" as a tap-dismissable modal on clicking "i" info icon with credits to AF algorithm author, link to author website, and dev/designer website
- [ ] c017 Update components to be functional state-free components

Design (ui)
- [x] ui001 Enable Tachyons
- [x] ui002 Enable visual representation of unmarked, marked, completed
- [x] ui003 Update project to display "review list" form controls when list is "reviewable"
- [x] ui004 Update project to hide "add new item" form controls when in "review mode"
- [x] ui005 Update design to display as full height when on mobile, and an almost full-height padded mobile-like display when not on mobile
- [x] ui006 Make "not small" responsive breakpoint "app screen" width to be more narrow and like that of the mobile design (see iPhone5 as rough reference)
- [x] ui007 Update project to display "focus mode" "modal" upon clicking the focus button which shows the user what they would typically see in focus mode (the current focused item, and instructions to click or hit the enter key, for example)
- [x] ui008 Make the CMWTD item display in bold text
- [x] ui009 Add the "about" info icon and "hamburger" menu icon to the header
- [ ] (EPIC) Get the project to look according to the visual design spec using Tachyons (dynamic or static import)* (EPIC)
	- [x] ui010 Make the main 'add', 'review', 'focus' buttons full width & padded
	- [x] ui011 Increase the font size as per the spec
	- [x] ui012 Increase the line height for copy text
	- [x] ui013 Make the review buttons combined into a single row of "display: inline-block" w/ padding between
- [ ] ui014 Add menu drop down button
\* Note: Visual design spec is now out of date with current functionality. There is now only one screen which is a dynamic hybrid of all the others.

# YAGNI (y)
- [ ] y003 Update the project to leverage i18n & localization

## Bug Fixes
- [ ] b001 Resolve bug where, if the list gets too long (a certain number of characters), the app will crash because of the URL encoding length limit - instead, determine this limit and prevent the user from adding items that would exceed this limit w/ a warning message such as "This list cannot be longer than X characters. Please export or copy the items you want to save or create a blank new list."
- [ ] b002 Resolve bug where the app appears to not work offline on mobile, but it appears to work offline on desktop. This may be a bug with the service worker, or it may be a bug with the way the app is being served on mobile. The bug appears to persist on mobile whether or not the app is run in the DuckDuckGo mobile browser or in the Chrome mobile browser. My best guess at the moment is that the service worker is not being registered correctly on mobile, and/or that the manifest.json is not up to date with the current standards
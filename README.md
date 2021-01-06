# Trumps  
[site published here](https://cldwlkn13.github.io/trumps/)

## UX

Trumps is a interactive card game based upon [Top Trumps](https://en.wikipedia.org/wiki/Top_Trumps). 
The game is intended to be a tribute, and to avoid copyright infringement will not be monetized. 
The cards are traditionally based upon a theme (The first theme will be Soccer Players), and each card has a series of "categories" (Trumps will have 4).
The player will play against an AI algorithm in the code. 
The game is designed to be game theme agnostic. New themes can be easily added by adding a .json file to the assets/json & registering the theme at startup.  

### Rules of the Game
- The game is for 2 "players", the user (PLAYER 1) and the computer (PLAYER 2). 
- Both players are dealt an equal amount of cards. (This game will have a total of 24 cards, but could be any even amount)
- The starting player will be always be PLAYER 1. 

- Scenario 1 - It is the user's turn: 
User can see their full card.
User can see the name of the computer's card. 
User selects category on their card (e.g. Height - 186cm) that they think will "Trump" the value on their opponent's card. 
Once selected the values of the opponents card are revealed. 
If the value is higher, then they take the card from the opponent, if not then the card goes to the opponent.
 
- Scenario 2 - It is the computer's turn:
The computer will automatically take their turns until they lose a showdown, or the match is won.
The algorithm knows the best category to select for the card they have. (It will know nothing of what the user holds)
The user is shown the selection and whether that beats their equivalent category. 
If their value is higher, then they take the card from the opponent, if not then the card goes to the opponent.

- The winner of the showdown takes the next turn. 
- Game is continued until one player has all the cards. 
- Scoring is fairly arbitary, in that P1 gets point for the difference in value from their showdown value to P2 showdown value, times by 2.

### User Stories 
##### #US001 As the site owner, I want to entice players to play a game of Trumps

    - Given a user has landed upon the page
    - When the page loads, and the user does not have their name stored in the cache
    - Then the user is presented with the 'landing-card' feature
    - And the 'landing-card' feature offers them the challenge to play
    
##### #US002 As the site owner, I want the design to appeal to an audience of 5+ years & adults alike

    - The colour palette/icons/images used are fun, but not too garish as to be unappealing to adults
    
##### #US003 As the site owner, I want to personalize the experience for a player where possible

    - Given the 'landing-card' feature is visible
    - When the user is encouraged to enter their name to play
    - Then the name-input & submit-button are enabled and visible
    
    - Given the name-input & submit-button are enabled and visible
    - When the user enters their name and clicks "submit"
    - Then the name is recorded in the session cache
    
    - And the game-start card is loaded
    - Given the name-input & submit-button are enabled and visible
    - When the user does not enter their name and clicks "submit"
    - Then a warning/prompt to enter their name is shown
    - And the game-start card is not loaded
    
    - Given the game-start card is loaded
    - When the user reads the instructions
    - Then they are referred to by the name they entered previously
    
    - Given the user is playing the game
    - When they are prompted or presented with information
    - They are referred to where appropriate by the name they entered
    
##### #US004 As the site owner, I want users to have the option to suggest new ideas for card themes

    - Given the user has navigated to the site
    - When the user browses to the footer
    - Then an input-box is enabled and visible where they can provide ideas for new card themes
    
    - Given the user has entered their idea into the input-box
    - When the user clicks "submit"
    - Then the site owner is emailed the contents
    
##### #US005 As the site owner, I want users to be clear on the rules and gameflow of Trumps with intuitive design/prompts

    - Given the user is active on the site
    - When the user is unsure of the rules 
    - Then the user can click on a link that pops up a dialog to explain the rules
    
    - Given the user has clicked on the rules link and the dialog is showing
    - When the user wishes to continue
    - Then there is a button to close the dialog
    
    - Given the user wishes to continue
    - When the "close" button is clicked
    - Then the rules dialog closes.
    
##### #US006 As the site owner, I want to provide links to the social media accounts associated with Trumps

    - Given the user has navigated to the site
    - When the user browses to the footer
    - Then links to social media accounts are visible and enabled
    - And it is clear which accounts they link to
    
    - Given the user has clicked on a social media link
    - When that link loads
    - Then it is a new window
    - And the link is correct
    
##### #US007 As the site owner, I want gameplay to be effective on all devices

    - Given the user is using a Desktop device
    - When the user is active on the site
    - Then all features are available and work correctly
    
    - Given the user is using a Tablet device
    - When the user is active on the site
    - Then all features are available and work correctly
    
    - Given the user is using a Mobile device
    - When the user is active on the site
    - Then all features are available and work correctly
    
##### #US008 As a user, I want to know my best score recorded

    - Given the user is playing a game of Trumps
    - When the user searches for their best score
    - Then the best score is shown to them
    
##### #US009 As a user, I want to know the game state while playing

    - Given the user has started a game of Trumps
    - When the user views the page
    - Then the latest game state (player cards remaining, score, etc) is clear to them 
    
##### #US010 As a user, I want to be able to start a new game at any point

    - Given the user has navigated beyond the landing-card
    - When a user wishes to start a new game
    - Then the user has a clickable element to do so
    
    - Given the user has wishes to start a new game
    - When the user clicks the element 
    - Then the game-start card is shown


### Wireframes

Wireframes were designed using JustInMind and images of the slides can be viewed in the following table:

|    Wireframes   |   
|      :----:     |    
|[Landing](wireframes/landing.PNG)|
|[Game Start](wireframes/gamestart.PNG)|
|[Gameplay](wireframes/gameplay.PNG)|

---

## Features 
- All setup and gameplay is conducted on one html page.

**Header** contains
- Title of the game.
- Dismissable popover detailing the rules of the game.
- Restart button.  

*The header is fixed at the top of the page, always visible. 

**Footer** contains
- Input where users can email in their suggestions for new themes. 
- Links to social media accounts for the game.  

*The footer is available at the bottom of the page

**Landing Card** (This is shown to the user when they are on the page and there is no name property in the session storage of the browser)
- Input to enter name.

**GameStart Card** (This is shown when inputted name is validated or when user restarts game)
- Option to change the cached name. 
- Options to select the theme of the game.

**Gameplay** (This is shown when the user selects the theme to play)
- Two playing cards are shown. 
- Player names shown above cards, with details on how many of the cards they hold.
- "Alert" windows pop up to detail the game narrative. 
- "Console" divides the 2 cards, where user can view game score, high score and option to restart. 

### Feature Roadmap
- Add new game themes as suggestions surface from users. 
- Develop features that allow users to choose color themes for gameplay. 
  
## Technologies

#### Development:
- [GitHub](https://github.com/) - site host.
- [Gitpod](https://gitpod.io/) - dev IDE.

#### Key content, styling & logic:
- [HTML5](https://en.wikipedia.org/wiki/HTML5) - site content
- [CSS3](https://en.wikipedia.org/wiki/Cascading_Style_Sheets) - site styling
- [Bootstrap](https://getbootstrap.com/) - project layout & additional styling
- [Javascript](https://en.wikipedia.org/wiki/JavaScript) - functional logic & gameplay

#### Supplementary technologies
- [JustInMind](https://www.justinmind.com/) - wireframes and site prototype
- [Jasmine](https://jasmine.github.io/) - javascript testing framework
- [FontAwesome](https://fontawesome.com/) - inline icons
- [GoogleFonts](https://fonts.google.com/) - font faces
- [EmailJS](https://www.emailjs.com/) - email automation library

## Testing

#### Code Validation
- [HTML Validation](https://validator.w3.org/nu/?doc=https%3A%2F%2Fcldwlkn13.github.io%2Ftrumps%2F) 
    3 [Errors](readme-files/html-validation.JPG) identified. All empty headers, that are included as placeholders.

- CSS Validation
    0 [Errors](readme-files/css-validation.JPG).

- [Javascript Validation - JSHint](https://jshint.com/)  
    [index.js](readme-files/index-js-validation.JPG)     
    [alerts.js](readme-files/alerts-js-validation.JPG)  
    [card-rendering.js](readme-files/card-rendering-js-validation.JPG)  
    [function-helpers.js](readme-files/function-helpers-js-validation.JPG)  
    [gameplay-engine.js](readme-files/gameplay-engine-js-validation.JPG)  
    [name-repository.js](readme-files/name-repository-js-validation.JPG)  
    [registrations.js](readme-files/registrations-js-validation.JPG)  
    [scoring.js](readme-files/scoring-js-validation.JPG)  
    [setup-engine.js](readme-files/setup-engine-js-validation.JPG)

#### Browser Compatibility

- **Google Chrome** No issues identified; Game perfroms well throughout. All specs pass.
 
 - **Microsoft Edge** No issues identified; Game perfroms well throughout. All specs pass.
   
 - **Mozilla Firefox** No issues identified; Game perfroms well throughout. All specs pass.
    
 - **Opera** No issues identified; Game perfroms well throughout. All specs pass.

  - **Microsoft Internet Explorer**
    - [IE Issue](readme-files/ie-issue.JPG) Page loads but Game will not play. This is due to the JS used in the application. 

#### Responsiveness Quality Testing  
    Testing conducted on [Responsive Design Checker](https://responsivedesignchecker.com/)

-   [Mobile](readme-files/mobile-testing.JPG) - 0 issues
-   [Tablet](readme-files/tablet-testing.JPG) - 0 issues
-   [Desktop](readme-files/desktop-testing.JPG) - 1 issue: 10" Notebook where Footer is not fixed to bottom of page.

#### Automated Testing - Jasmine  
    Jasmine Test Specs are available in the index.html file. They are commented out by default. Please pull repo, uncomment and run them if required. 
    [Jasmine Specs 1](readme-files/jasmine-1.JPG)
    [Jasmine Specs 2](readme-files/jasmine-2.JPG)
    [Jasmine Specs 3](readme-files/jasmine-3.JPG)

#### User Story Testing  
##### #US001 As the site owner, I want to entice players to play a game of Trumps &check;

    - Given a user has landed upon the page 
    - When the page loads, and the user does not have their name stored in the cache
    - Then the user is presented with the 'landing-card' feature 
    - And the 'landing-card' feature offers them the challenge to play 

* When user navigates to page, if the name property in the sessionStorage is empty then the "landing-card" is shown.
* The challenge to play is clearly seen [here](readme-files/us001.JPG).  
* Can be verifed by starting new browser session.

##### #US002 As the site owner, I want the design to appeal to an audience of 5+ years & adults alike &check;

    - The colour palette/icons/images used are fun, but not too garish as to be unappealing to adults

* The palette of colors used are bold and largely primary.

##### #US003 As the site owner, I want to personalize the experience for a player where possible (5 tests) &check;

    - Given the 'landing-card' feature is visible
    - When the user is encouraged to enter their name to play
    - Then the name-input & submit-button are enabled and visible   
    
    - Given the name-input & submit-button are enabled and visible
    - When the user enters their name and clicks "submit"
    - Then the name is recorded in the session cache 
    
    - And the game-start card is loaded
    - Given the name-input & submit-button are enabled and visible
    - When the user does not enter their name and clicks "submit"
    - Then a warning/prompt to enter their name is shown 
    - And the game-start card is not loaded 
    
    - Given the game-start card is loaded
    - When the user reads the instructions
    - Then they are referred to by the name they entered previously 
    
    - Given the user is playing the game
    - When they are prompted or presented with information
    - They are referred to where appropriate by the name they entered 

* On the "landing-card" the user can clearly [see](readme-files/us003-1.JPG) they need to enter their name, and where to do it.  
* The name is persisted to the cache on submit.  
* If they do not enter a valid name, then a [warning dialog](readme-files/us003-2.JPG) appears informing them.  
* The name submitted is then used in other parts of the game, and that name is correct, e.g. [here](readme-files/us003-3.JPG).   

##### #US004 As the site owner, I want users to have the option to suggest new ideas for card themes (2 tests) &check;

    - Given the user has navigated to the site
    - When the user browses to the footer
    - Then an input-box is enabled and visible where they can provide ideas for new card themes 
    
    - Given the user has entered their idea into the input-box
    - When the user clicks "submit"
    - Then the site owner is emailed the contents 

* In the footer there is an [input box](readme-files/us004-1.JPG) to enter suggestions for new themes.  
* On enter/tab the suggestion is emailed to the site proprietor, [see here](readme-files/email.JPG)  
  
##### #US005 As the site owner, I want users to be clear on the rules and gameflow of Trumps with intuitive design/prompts (3 tests) &check;

    - Given the user is active on the site
    - When the user is unsure of the rules 
    - Then the user can click on a link that pops up a dialog to explain the rules 
    
    - Given the user has clicked on the rules link and the dialog is showing
    - When the user wishes to continue
    - Then there is a button to close the dialog 
    
    - Given the user wishes to continue
    - When the "close" button is clicked
    - Then the rules dialog closes. 
    
* Game rules are available at all times from the header bar in the form of a popover by selecting the [info icon](readme-files/us005-1.JPG).   
* The popover is dismissable with a click.  

##### #US006 As the site owner, I want to provide links to the social media accounts associated with Trumps (2 tests) &check;

    - Given the user has navigated to the site
    - When the user browses to the footer
    - Then links to social media accounts are visible and enabled 
    - And it is clear which accounts they link to 
    
    - Given the user has clicked on a social media link
    - When that link loads
    - Then it is a new window 
    - And the link is correct 

* Social media [links](readme-files/us006-1.JPG) are available in the footer.

##### #US007 As the site owner, I want gameplay to be effective on all devices (3 tests) &check;

    - Given the user is using a Desktop device
    - When the user is active on the site
    - Then all features are available and work correctly 
    
    - Given the user is using a Tablet device
    - When the user is active on the site
    - Then all features are available and work correctly 
    
    - Given the user is using a Mobile device
    - When the user is active on the site
    - Then all features are available and work correctly 

* Responsiveness testing can be seen above.
* [Mobile](readme-files/us007-1.JPG)
* [Tablet](readme-files/us007-2.JPG)
* [Desktop](readme-files/us007-3.JPG)

    
##### #US008 As a user, I want to know my best score recorded &check;

    - Given the user is playing a game of Trumps
    - When the user searches for their best score
    - Then the best score is shown to them

* During gameplay the highest score is [visible](readme-files/us008-1.JPG) to the user in the central "console".
* Ideally this could be shown in the header to be viewed at all times. 
    
##### #US009 As a user, I want to know the game state while playing &check;

    - Given the user has started a game of Trumps
    - When the user views the page
    - Then the latest game state (player cards remaining, score, etc) is clear to them 

* The state of the game is clearly [visible](readme-files/us009-1.JPG) on the gameplay page but also in the "Winner Alert" 
    
##### #US010 As a user, I want to be able to start a new game at any point (2 tests) &check;

    - Given the user has navigated beyond the landing-card
    - When a user wishes to start a new game
    - Then the user has a clickable element to do so 
    
    - Given the user has wishes to start a new game
    - When the user clicks the element 
    - Then the game-start card is shown 

* Restart buttons are available in the [header bar](readme-files/us010-1.JPG), [central console](readme-files/us010-2.JPG) and on the match winner alert. 
* When one of these is clicked the gamestart card is shown. Can be verified in game. 

**Bugs**
- Animated arrows do not always appear justified to the centre of the parent div on the Winner Alert. (Not fixed) 
- User clicks restart during gameplay, if gameplay-engine running then alerts do not hide before next game. (Fixed with refactor of restart flow)
- Popup alerts changing content. (Fixed with refactor, hiding existing alert immediately before showing next)
- Offscreen float of Player 2 Card Name appears even when div is visible (not desired). (Not fixed but can be recified with a manual scroll)
- Occasionally on personal mobile device, gamecard images don't render. Cannot replicate in dev env though. (Not fixed)

## Deployment

#### To deploy

Trumps is hosted on **GitHub Pages**

1. In the GitHub repository select **Settings**.
2. The **Pages** section is 75% down the page, scroll here. 
3. In the **Source** dropdown menu select **master**.
4. The website is now deployed.

#### To clone from Github

1. In the Github repository click the green **Code** button.
2. Select clone protocol of your choice (SSL/HTTP/CLI)
3. Go to your IDE.
3. Open **Git Bash**.
4. Change the current working directory to the location where you want the cloned directory to be made.
5. Type **git clone**, and then paste the URL copied from GitHub.
6. Press **enter** and the local clone will be created.

*for more information on cloning in git hub, please see [github cloning documentation](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/cloning-a-repository)

## Credits
- Plugin acquired from http://teamdf.com/jquery-plugins for visibility check.
- Plugin acquired from https://github.com/yckart/jquery-custom-animations for some funcky custom animations.  
- Sounds for the game aquired from https://www.zapsplat.com/ under license. 
- getRandomInt() aquired from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
- coding tips from [W3Schools](https://www.w3schools.com/) & [freecodecamp](https://www.freecodecamp.org/news/) 

## Acknowledgments
[Precious Ijege](https://www.linkedin.com/in/precious-ijege-908a00168/?originalSubdomain=ng) for all his support and guidance.

I would also like to thank Susan for their feedback and support through this process!
# Trumps

## UX

Trumps is a interactive card game based upon [Top Trumps](https://en.wikipedia.org/wiki/Top_Trumps). The game is intended to be a tribute, and to avoid copyright infringement will not be monetized. The cards are traditionally based upon a theme (The theme will be Soccer Players), and each card has a series of "categories" (Trumps will have 4). The player will play against an AI algorithm in the code. 

### Rules of the Game
- The game is for 2 "players", the user and the computer. 
- Both players are dealt an equal amount of cards. (This game will have a total of 24 cards)
- The starting player will be determined by a random number generator. 

- Scenario 1 - It is the user's turn: 
User can see their full card.
User can see the name of the computer's card. 
User selects category on their card (e.g. Height - 186cm) that they think will "Trump" the value on their opponent's card. 
Once selected the values of the opponents card are revealed. 
If the value is higher, then they take the card from the opponent, if not then the card goes to the opponent.
 
- Scenario 2 - It is the computer's turn:
User can see their full card. 
User can see the computer's full card. 
The algorithm knows the best category to select for the card they have. (It will know nothing of what the user holds)
The user is shown the selection and whether that beats their equivalent category. 
If their value is higher, then they take the card from the opponent, if not then the card goes to the opponent.

- Game is continued until one player has all the cards. 

### User Stories 
As the site owner, I want to entice players to play a game of Trumps
    - Given a user has landed upon the page
    - When the page loads
    - Then the user is presented with the 'landing-card' feature
    - And the 'landing-card' feature offers them the challenge to play
    
As the site owner, I want the design to appeal to an audience of 5+ years & adults alike
    - The colour palette/icons/images used are fun, but not too garish as to be unappealing to adults
    
As the site owner, I want to personalize the experience for a player where possible
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
    
As the site owner, I want users to have the option to suggest new ideas for card themes
    - Given the user has navigated to the site
    - When the user browses to the footer
    - Then an input-box is enabled and visible where they can provide ideas for new card themes
    
    - Given the user has entered their idea into the input-box
    - When the user clicks "submit"
    - Then the site owner is emailed the contents
    
As the site owner, I want users to be clear on the rules and gameflow of Trumps with intuitive design/prompts
    - Given the user is active on the site
    - When the user is unsure of the rules 
    - Then the user can click on a link that pops up a dialog to explain the rules
    
    - Given the user has clicked on the rules link and the dialog is showing
    - When the user wishes to continue
    - Then there is a button to close the dialog
    
    - Given the user wishes to continue
    - When the "close" button is clicked
    - Then the rules dialog closes.
    
As the site owner, I want to provide links to the social media accounts associated with Trumps
    - Given the user has navigated to the site
    - When the user browses to the footer
    - Then links to social media accounts are visible and enabled
    - And it is clear which accounts they link to
    
    - Given the user has clicked on a social media link
    - When that link loads
    - Then it is a new window
    - And the link is correct
    
As the site owner, I want gameplay to be effective on all devices
    - Given the user is using a Desktop device
    - When the user is active on the site
    - Then all features are available and work correctly
    
    - Given the user is using a Tablet device
    - When the user is active on the site
    - Then all features are available and work correctly
    
    - Given the user is using a Mobile device
    - When the user is active on the site
    - Then all features are available and work correctly
    
As a user, I want to know my best score recorded
    - Given the user has completed a game of Trumps
    - When the user views their best score in the header element
    - Then the best score recorded on their browser session is shown
    
As a user, I want to know the game state while playing
    - Given the user has started a game of Trumps
    - When the user views the page
    - Then the latest game state (player cards remaining, score, etc) is clear to them 
    
As a user, I want to be able to start a new game at any point
    - Given the user has navigated beyond the landing-card
    - When a user wishes to start a new game
    - Then the user has a clickable element to do so
    
    - Given the user has wishes to start a new game
    - When the user clicks the element 
    - Then the game-start card is shown


### Wireframes

Wireframes were designed using JustInMind and images of the slides can be viewed in the following table:

|    Desktop   |    Tablet    |    Mobile    |
|    :----:    |    :----:    |    :----:    |
|[Home Page](wireframes/desktop/homepage-desktop.JPG)|[Home Page](wireframes/tablet/homepage-tablet.JPG)|[Home Page](wireframes/mobile/homepage-mobile.JPG)|

---

## Features 

**Header** contains
- **** 
- **** 
*The header is fixed at the top of each page, always visible. 

**Footer** contains
- **** 
- **** 
*The footer is available at the bottom of each page

### Feature Roadmap

  
 ## Technologies

**Development:**
- [GitHub](https://github.com/) - site host.
- [Gitpod](https://gitpod.io/) - dev IDE.

**Key content and styling:**
- [HTML5](https://en.wikipedia.org/wiki/HTML5) site content
- [CSS3](https://en.wikipedia.org/wiki/Cascading_Style_Sheets) site styling
- [Bootstrap](https://getbootstrap.com/) - project layout & additional styling
- [Javascript](https://en.wikipedia.org/wiki/JavaScript) - functional logic & gameplay

**Supplementary technologies**

## Testing

**Browser Compatibility**
 
**User Story Testing**

**Bugs**
 
## Deployment

**To deploy**

Trumps is hosted on **GitHub Pages**

1. In the GitHub repository select **Settings**.
2. The **Pages** section is 75% down the page, scroll here. 
3. In the **Source** dropdown menu select **master**.
4. The website is now deployed.

**To clone from Github**

1. In the Github repository click the green **Code** button.
2. Select clone protocol of your choice (SSL/HTTP/CLI)
3. Go to your IDE.
3. Open **Git Bash**.
4. Change the current working directory to the location where you want the cloned directory to be made.
5. Type **git clone**, and then paste the URL copied from GitHub.
6. Press **enter** and the local clone will be created.

*for more information on cloning in git hub, please see [github cloning documentation](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/cloning-a-repository)

## Credits

## Acknowledgments

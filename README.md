<h1 align="center">Gwent Classic - Vue</h1>

###

<div align="center">
  <img height="150" src="https://user-images.githubusercontent.com/26311830/116256903-f1599b00-a7b6-11eb-84a1-16dcb5c9bfc6.jpg"  />
</div>

This is a multiplayer remake of the Classic Gwent mini-game from The Witcher 3: Wild Hunt using Vue.js and Typescript.
**This project is still in active development** and is in no way in a playable state yet.<br>
If you're looking to play righ now, please check [My other project](https://github.com/Leo-Felde/gwent-multiplayer).

###

<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" height="40" alt="vuejs logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="40" alt="typescript logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="40" alt="html5 logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="40" alt="css3 logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" height="40" alt="sass logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" height="40" alt="jest logo"  />
</div>

###

## Known bugs and Todo:


<ul>
  <li>[todo] Abilities and effects such as Muster, Morale, Commander's horn, weather card, etc</li>
  <li>[todo] Leader cards abilities </li>
  <li>[todo] Server integration </li>
</ul>

## Development
#### Install dependencies

This project requires [Node.js](https://nodejs.org/en/download) to run and install dependencies.<br> After having Node.js installed open a command terminal in the project's root (where index.html is located, in windows 11 right clicking should display an option to open in terminal) and run `npm install`

#### Run project / development server
After installing the dependencies, open a terminal in the project's root folder and run `npm run serve`<br>
this should run the project locally, acessible by default in `http://localhost:8080`

## Rules

The game is played in the same way as the original. The player aims to win two of three rounds, where victory within a given round is determined by whoever scores the most points.

#### Cards and Points

Points are obtained by placing down unit cards, each with their corresponding values. Some unit cards have special effects as denoted by a symbol on their left side. The cards and their effects can be examined by selecting them or the row they have been palced on. The game also includes a nubmer of special cards that apply effects like negative weather conditions or bosting card points when played.

#### Turns

A turn consists of playing a single card. Your opponent then does the same until either one of you passes. At this point the remaining player can continue to place cards until they decide to pass. When both players have passed the round is ended. In addition of placing cards, they player may also activate their leader ability by clicking on their leader if it is available to them.

#### Factions

The faction you pick will affect your game in three ways. It limits the specific cards you can use to neutral cards, special cards, and the unit cards in your faction. This includes the leader card that you can pick and the corresponding leader ability. Each faction also has a special effect that is displayed when selecting a faction and at the top of the customization screen for the currently selected faction.

## Features

#### All cards from the TW3 + DLC

All cards from the base games and DLC can be used by you and the AI. This includes the additions from Hearts of Stone and Skellige as a playable deck from Blood and Wine. The total count of cards available corresponds to the number you can find in the original game.

#### Faithful to the original minigame

This remake aims to resemble the orignal minigame as closely as possible from the font to the UI layout and notifications. Some changes have been made in the form of buttons to toggle the music and pass your current turn. The deck customization screen also includes buttons to upload and download decks.

#### Customize, save and upload decks

You can select a faction to play as at the top of the screen and then add and remove cards from your deck by clicking on the cards in either scroll-down menu. You can also pick a leader card by selecting the current leader and scrolling through the options for that faction. At the top of the screen there are buttons to upload and download decks to play with. These are stored in json format and are checked to see if they comply with their assigned faction and maximum card counts.

#### Music tracks

Besides The gwent music tracks streamed from YouTube togglable by pressing the music icon in the center of the customization screen or the bottom-left of the game screen, There are also **general sound effects** related to cards and their effects which were taken from [RandomPianist's fork](https://github.com/RandomPianist).

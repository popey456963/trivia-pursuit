# trivia-pursuit

A controller for "Trivial Pursuit" style games.  Contains two main components, `game` and `host`.  `game` is intended to be displayed to users on a larger screen, `host` should be used on a device controlled by the game master.  Both dashboards are websites, accessible with:

- `<website>/game/<key>`
- `<website>/host/<key>`

Where key is a unique string that represents the game being played.


### Installation

1. Clone the repository, e.g. `git clone https://github.com/popey456963/trivia-pursuit`
2. Go into the cloned directory `cd trivia-pursuit`
3. Install dependencies, `npm i`
4. Start the website `node index.js`

### Screenshots

##### Game Screen

![](https://femto.pw/ruwj.png)

##### Host Screen

![](https://femto.pw/9irq.png)

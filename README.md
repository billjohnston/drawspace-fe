### Running Locally
`yarn install`

`yarn dev`

### General architecture
Built using next.js for static rendering of the website.

Used material-ui for their styling/theming and common UI components

I created a context API called `useDrawCanvas` to allow for dispatching events
to the drawing canvas and setting of state that will be consumed children. Tried
to keep all the canvas operation in on place `utilCanvasOperations`


### Reasoning
I used context to keep the business logic separate from the display components
while allowing children components to change the state of the drawing tools.


### Didn't Implement
- Redraw doesn't show the drawing of lines (not enough time to figure out how to animate quadraticCurveTo)
- Logout (not enough time)
- Page to view the current signed in users drawings (not enough time)
- Public Page pagination (not enough time)
- Resize canvas (not quite shure how I'd handle this, would probably want to keep the canvas its original size as not to distort the drawing)
- I don't love how the login dialog works, would like to spend more time polishing its architecture

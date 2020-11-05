### Running Locally
`yarn install`

`yarn dev`

### General architecture
Built using next.js for static rendering of the website.

Used material-ui for their styling/theming and common UI components

I created a context API called `useDrawCanvas` to allow for dispatching events
to the drawing canvas and setting of state that will be consumed children. Tried
to keep all the canvas operation in on place `utilCanvasOperations`

I used amplify/cognito to do a passwordless login.  I like to give users the quickest possible registration/login in flow

For saving a drawing I'm uploading a thumbnail and a json file or steps s3, getting the url and posting it to the rest api. I like this flow because it cuts out the middle man and is usually faster


### Reasoning
I used context to keep the business logic separate from the display components
while allowing children components to change the state of the drawing tools.

I used two canvas (`canvas` / `tmpCanvas`) to allow for smoother lines using quadraticCurveTo


### Didn't Implement / Trade offs
- Redraw doesn't show the drawing of lines (not enough time to figure out how to animate quadraticCurveTo)
- Logout (not enough time)
- Page to view the current signed in users drawings (not enough time)
- Public Page pagination (not enough time)
- Resize canvas (not quite shure how I'd handle this, would probably want to keep the canvas its original size as not to distort the drawing)
- I don't love how the login dialog works, would like to spend more time polishing its architecture
- I generally like a flat folder structure but this started to get to big for that to be reasonable. Would like to have split up the components more
- I had to use a setTimeout to initialize the canvases. I wanted to make them the full width of the page to give maximum drawing area, but if I initialized them immediately the element would give the wrong width/height
- Weird display bug when the drawings load on the public list page.  Probably has to do with the image loading
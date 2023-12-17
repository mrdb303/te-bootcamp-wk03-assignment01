# Tech Educators Bootcamp Week 03 Assignment

## Build an accessible image gallery

### Task

Create an accessible image gallery with keyboard navigation and maybe even voice announcements.

<br>

### Requirements

- One page, with a set of thumbnail images, and a larger image
- Styled appropriately with CSS, and make use of media queries
- Use client-side JavaScript to display the larger image when a thumbnail is selected
- Use client-side JavaScript to navigate between images using the keyboard (tab, enter)
<br>

### Feedback from user stories

- Requirement of functionality for browsing a set of thumbnail images that load quickly
- A feature request for the user to select a thumbnail and display a larger version of the image, with a description
- Accessible considerations like alternative text for images, and the ability to click next and previous buttons using the keyboard
<br>


### Design notes, additions and changes

User stories were used to define the scope of the project.

A basic wireframe was created and utilised to plan the layout (see design assets folder)

The user is able to view an image on the page that uses all possible page viewing space of the browser. The caption for each image is displayed at the bottom left of the page. 
The navigation functionality is an image thumnail browser that displays three thumbnail images. Each of which can be clicked on to view the selected picture as a larger image. When there are more than three images available, the thumbnail browser will allow the user to step through the additional images. Flexbox was used to create the navigation feature.

'Left' and 'Right' buttons are on the navigation feature, which is a means to step through the images. As the page is composed with accessibility functionality in mind, it was decided to opt for traditional buttons rather than icon images representing buttons. It is understood that traditional buttons are better suited for assisted accessibilty software. When an image is displayed at full screen, the current image is highlighted with a blue border in the navigation element. The backround of the navigation box has some opacity, to allow some of the large image to show through.

The user can also step through the images using the left and right arrow keys using a keyboard.

By default, on larger screens, the image navigation box is sited at the top left of the page. During testing, it was discovered that sometimes this may get in the way of important parts of some images. The JS code allows the user to toggle the menu between the top of the page to the bottom of the page, by using the 'Up' and 'Down' arrow keys on the keyboard.

The page will load a picture size that suits the current device and screen resolution used to show the image. Each image has three sizes for full page viewing which are large, medium and small. Devices will automatically load an image suited to the screen resolution. This was achieved by JS code dynamically generating the HTML code for 'srcSet' settings when the selected image is displayed.

The CSS code written will change the layout of the page depending on the screen resolution, through the use of media queries. When a device's screen is smaller, the navigation feature will switch to the bottom of the page and will reduce in size.

Windows narrator reads out the image description when it is enabled and the entire browser window becomes the main focus. This uses available 'aria' properties in a div element and is populated using JS to read the image from the relevant altText property.

The header uses a contrast of colour between the font and the background. This was done so that it can still be read regardless of what colour the main image is.

Open source font used (Google font "Lato").

When hovering the mouse over the left and right buttons , the colour of the background changes with a gradual transition.

<br>


### Stretch goals

The following stretch goals were implemented

- The page uses event listeners, including 'keydown' functionality; ArrowRight and ArrowLeft to step through images, while ArrowUp and ArrowDown flips the navigation box between the top and bottom of the page

- By using Windows 'Narrator' and clicking on the alt text description box at the bottom left of the page, Narrator announces the alt text of the selected image.

- A div was set up for the 'announcer' with properties as suggested by the brief - When highlighting Narrator's focus on the whole page, it will automatically read the alt text description every time the image is changed


### Issues



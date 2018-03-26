# vue-drag-and-drop

A directive for providing drag and drop capabilities to elements and data.

### Install

Available through `npm install vue-drag-and-drop` or include as an inline script, like in `example.html`.

### Mobile Support

This library simply wraps the native drag and drop in html5. There is no support, and probably never will be any, for native "drag and drop" on mobile. See this [chart](http://caniuse.com/#feat=dragndrop).

The reason for this is that touch devices already have the necessary events (touch events) to implement drag and drop without need the additional apis that the desktop drag and drop has.

If you need a cross-platform solution, you should check out [this awesome library called pep!](http://pep.briangonzalez.org/).

### Demo

![demo gif](http://cl.ly/2B3j0g2K412y/Screen%20Recording%202015-12-09%20at%2009.23%20PM.gif)
![demo gif 2](http://cl.ly/3v2V3w1n3y2D/Screen%20Recording%202015-12-10%20at%2002.36%20PM.gif)

You can load up the `example.html` file here to test the directive.

### Usage

Here is how you might typically use this directive:

```html
<li v-for="task in tasks" v-bind:id="task.id" v-drag-and-drop v-on:drop="handleDrop" v-text="task.title"></li>
```

This directive assumes you are using it *inside* of some sort of list of elements.

You can see a `Vue` instance in `example.html` if you want more details.

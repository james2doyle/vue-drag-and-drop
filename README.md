# vue-drag-and-drop

A directive for providing drag and drop capabilities to elements and data.

### Install

Available through `npm install vue-drag-and-drop` or include as an inline script, like in `example.html`.

### Demo

![demo gif](http://cl.ly/2B3j0g2K412y/Screen%20Recording%202015-12-09%20at%2009.23%20PM.gif)

You can load up the `example.html` file here to test the directive.

### Usage

Here is how you might typically use this directive:

```html
<li v-for="task in tasks" id="{{ $index }}" v-drag-and-drop v-drop="handleDrop">{{ task.title }}</li>
```

This directive assumes you are using it *inside* of some sort of list of elements.

First, you can see the `id`. In this case, it is being used to inform us of *where in my array of tasks is this item?*.

When the list is changed, `v-drop` is called, and we run `handleDrop` (but we can use any function in our `methods` in the Vue instance), which calls with 2 arguments `(draggedElement, dropppedOnElement)`. This way we can do a swap in our data. For the `example.html`, we use the elements `id` as the index in our data.

Since we get these 2 elements, we can then do a normal array swapping dance, which looks like this:

```js
var placeholder = this.tasks[draggedElement.id];
this.tasks.$set(draggedElement.id, this.tasks[dropppedOnElement.id]);
this.tasks.$set(dropppedOnElement.id, placeholder);
```

You can use whatever you want for the `$index` attribute. Maybe you want to use `data-index`? Then just use `draggedElement.getAttribute('data-index')` to grab the index for that item in your data.

You can see a `Vue` instance in `example.html` if you want more details.
var DragDropComponent = {
  props: {
    id: {
      type: String,
      required: false
    },
    classes: {
      type: Object,
      default: function() {
        return {
          dragging: 'dragging',
          dragEnter: 'drag-enter',
          dragOver: 'drag-over'
        };
      }
    }
  },
  functional: true,
  render: function(createElement, context) {
    var _dragEl;
    var children = context.children;
    if (!children) {
      return;
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function(c) {
      return c.tag;
    });

    // istanbul ignore if
    if (!children.length) {
      return;
    }

    var _dragEl = {}; // placeholder for started item
    function mapEvents(child, index) {
      child.data.attrs.draggable = true;
      child.data.attrs.dataOrder = index;
      child.data.on = {
        dragstart: function(e) {
          _dragEl = child;
          // e.dataTransfer.effectAllowed = 'move';
          // Need to set to something or else drag doesn't start
          // e.dataTransfer.setData('text', '*');
          e.target.classList.add(context.props.classes.dragging);
        },
        dragenter: function(e) {
          e.target.classList.add(context.props.classes.dragEnter);
        },
        dragover: function(e) {
          if (e.preventDefault) {
            e.preventDefault(); // Necessary. Allows us to drop.
          }

          // e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.
          // e.dataTransfer.setData('text/html', e.target.outerHTML);

          e.target.classList.add(context.props.classes.dragOver);

          return false;
        },
        dragleave: function(e) {
          children.forEach(function(el) {
            if (el.elm.classList.contains(context.props.classes.dragEnter) || el.elm.classList.contains(context.props.classes.dragOver)) {
              el.elm.classList.remove(context.props.classes.dragEnter, context.props.classes.dragOver);
            }
          });
        },
        drop: function handleDrop(e) {
          // this / e.target is current target element.

          if (e.stopPropagation) {
            e.stopPropagation(); // stops the browser from redirecting.
          }

          var initial = children.indexOf(_dragEl);
          var swapped = children.indexOf(child);

          // Don't do anything if dropping the same column we're dragging.
          if (initial != swapped) {
            // Set the source column's HTML to the HTML of the column we dropped on.
            children[initial] = children[swapped];
            children[swapped] = _dragEl;

            context.children = children.map(mapEvents);
          }

          return false;
        },
        dragend: function handleDragEnd(e) {
          children.forEach(function(el) {
            el.elm.classList.remove(context.props.classes.dragging, context.props.classes.dragEnter, context.props.classes.dragOver);
          });
        }
      };
      return child;
    };

    return createElement('div', {
      'class': 'draggable-group',
      attrs: {
        id: context.props.id
      }
    }, context.children.map(mapEvents));
  }
};

Vue.component('drag-and-drop', DragDropComponent);
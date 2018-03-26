/* globals Vue */
(function () {
  var DragAndDrop = {
    install: function (Vue) {
      Vue.directive('drag-and-drop', {
        bind: function (el, binding, vnode) {
          this.handleDragStart = function (e) {
            e.target.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
            // Need to set to something or else drag doesn't start
            e.dataTransfer.setData('text', '*');
            vnode.context.$emit('drag-start');
          }.bind(this);

          this.handleDragOver = function (e) {
            if (e.preventDefault) {
              // allows dropping
              e.preventDefault();
            }

            e.dataTransfer.dropEffect = 'move';
            e.target.classList.add('drag-over');
            vnode.context.$emit('drag-over');

            return false;
          }.bind(this);

          this.handleDragEnter = function (e) {
            vnode.context.$emit('drag-enter');
            e.target.classList.add('drag-enter');
          }.bind(this);

          this.handleDragLeave = function (e) {
            vnode.context.$emit('drag-leave');
            e.target.classList.remove('drag-enter', 'drag-over');
          }.bind(this);

          this.handleDrag = function () {
            vnode.context.$emit('drag');
          }.bind(this);

          this.handleDragEnd = function (e) {
            e.target.classList.remove('dragging', 'drag-over', 'drag-enter');
            vnode.context.$emit('drag-end');
          }.bind(this);

          this.handleDrop = function (e) {
            e.preventDefault();
            if (e.stopPropagation) {
              // stops the browser from redirecting.
              e.stopPropagation();
            }

            // Don't do anything if dropping the same column we're dragging.
            vnode.context.$emit('drop');

            return false;
          }.bind(this);

          // setup the listeners
          el.setAttribute('draggable', 'true');
          el.addEventListener('dragstart', this.handleDragStart, false);
          el.addEventListener('dragenter', this.handleDragEnter, false);
          el.addEventListener('dragover', this.handleDragOver, false);
          el.addEventListener('drag', this.handleDrag, false);
          el.addEventListener('dragleave', this.handleDragLeave, false);
          el.addEventListener('dragend', this.handleDragEnd, false);
          el.addEventListener('drop', this.handleDrop, false);
        },
        unbind: function (el) {
          // shut er' down
          el.classList.remove('dragging', 'drag-over', 'drag-enter');
          el.removeAttribute('draggable');
          el.removeEventListener('dragstart', this.handleDragStart);
          el.removeEventListener('dragenter', this.handleDragEnter);
          el.removeEventListener('dragover', this.handleDragOver);
          el.removeEventListener('dragleave', this.handleDragLeave);
          el.removeEventListener('drag', this.handleDrag);
        }
      });
    }
  };

  if (typeof exports == 'object') {
    module.exports = DragAndDrop;
  } else if (typeof define == 'function' && define.amd) {
    define([], function () {
      return DragAndDrop;
    });
  } else if (window.Vue) {
    window.DragAndDrop = DragAndDrop;
    Vue.use(DragAndDrop);
  }
})();

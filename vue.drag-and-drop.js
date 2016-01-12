/* globals Vue */
(function () {

  var DragAndDrop = {}

  DragAndDrop.install = function (Vue) {
    Vue.directive('drag-and-drop', {
      params: [
      'v-drag-and-drop',
      'v-drag-start',
      'v-drag-over',
      'v-drag-enter',
      'v-drag-leave',
      'v-drag-end',
      'v-drop'
      ],
      bind: function () {
        // use the VM so we only have 1 dragging item per app
        this.vm._dragSrcEl = null;
        this.handleDragStart = function (e) {
          e.target.classList.add('dragging');
          this.vm._dragSrcEl = e.target;
          e.dataTransfer.effectAllowed = 'move';
          // Need to set to something or else drag doesn't start
          e.dataTransfer.setData('text', '*');
          if (typeof(this.vm[this.params.vDragStart]) === 'function') {
            this.vm[this.params.vDragStart].call(this, e.target);
          }
        }.bind(this);
        this.handleDragOver = function(e) {
          if (e.preventDefault) {
            // allows dropping
            e.preventDefault();
          }
          e.dataTransfer.dropEffect = 'move';
          e.target.classList.add('drag-over');
          if (typeof(this.vm[this.params.vDragOver]) === 'function') {
            this.vm[this.params.vDragOver].call(this, e.target);
          }
          return false;
        }.bind(this);
        this.handleDragEnter = function(e) {
          if (typeof(this.vm[this.params.vDragEnter]) === 'function') {
            this.vm[this.params.vDragEnter].call(this, e.target);
          }
          e.target.classList.add('drag-enter');
        }.bind(this);
        this.handleDragLeave = function(e) {
          if (typeof(this.vm[this.params.vDragLeave]) === 'function') {
            this.vm[this.params.vDragLeave].call(this, e.target);
          }
          e.target.classList.remove('drag-enter');
        }.bind(this);
        this.handleDragEnd = function(e) {
          e.target.classList.remove('dragging', 'drag-over', 'drag-enter');
          if (typeof(this.vm[this.params.vDragEnd]) === 'function') {
            this.vm[this.params.vDragEnd].call(this, e.target);
          }
        }.bind(this);
        this.handleDrop = function(e) {
          if (e.stopPropagation) {
            // stops the browser from redirecting.
            e.stopPropagation();
          }
          // Don't do anything if dropping the same column we're dragging.
          if (this.vm._dragSrcEl != e.target) {
            if (typeof(this.vm[this.params.vDrop]) === 'function') {
              var el = (e.target.draggable) ? e.target : e.target.parentElement;
              this.vm[this.params.vDrop].call(this, this.vm._dragSrcEl, el);
            }
          }
          return false;
        }.bind(this);
        // setup the listeners
        this.el.setAttribute('draggable', 'true');
        this.el.addEventListener('dragstart', this.handleDragStart, false);
        this.el.addEventListener('dragenter', this.handleDragEnter, false);
        this.el.addEventListener('dragover', this.handleDragOver, false);
        this.el.addEventListener('dragleave', this.handleDragLeave, false);
        this.el.addEventListener('drop', this.handleDrop, false);
        this.el.addEventListener('dragend', this.handleDragEnd, false);
      },
      update: function (newValue, oldValue) {
        // console.log(this);
      },
      unbind: function () {
        // shut er' down
        this.el.classList.remove('dragging', 'drag-over', 'drag-enter');
        this.el.removeAttribute('draggable');
        this.el.removeEventListener('dragstart', this.handleDragStart);
        this.el.removeEventListener('dragenter', this.handleDragEnter);
        this.el.removeEventListener('dragover', this.handleDragOver);
        this.el.removeEventListener('dragleave', this.handleDragLeave);
      }
    });
  }

  if (typeof exports == "object") {
    module.exports = DragAndDrop
  } else if (typeof define == "function" && define.amd) {
    define([], function(){ return DragAndDrop })
  } else if (window.Vue) {
    window.DragAndDrop = DragAndDrop
    Vue.use(DragAndDrop)
  }
})()
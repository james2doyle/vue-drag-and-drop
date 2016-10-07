/* globals Vue */
(function () {

    var DragAndDrop = {}

    DragAndDrop.install = function (Vue) {
        Vue.directive('drag-and-drop', {
            params: [
                'drag-and-drop',
                'start',
                'drag',
                'over',
                'enter',
                'leave',
                'end',
                'drop',
                'draggable',
                'droppable'
            ],
            
            bind: function (el, binding, vnode) {
                // use the VM so we only have 1 dragging item per app
                this._dragSrcEl = null;

                if(binding.value.draggable === undefined){
                    binding.value.draggable = true;
                }

                var draggable = binding.value.draggable;

                this.handleDragStart = function (e) {
                    e.target.classList.add('dragging');
                    this.vm._dragSrcEl = e.target;
                    e.dataTransfer.effectAllowed = 'move';
                    
                    // Need to set to something or else drag doesn't start
                    e.dataTransfer.setData('text', '*');

                    if (typeof(this.vm[binding.value.start]) === 'function') {
                        this.vm[binding.value.start].call(this, e.target, e);
                    }            
                }.bind(this);

                this.handleDragOver = function(e) {
                    if (e.preventDefault) {
                        // allows dropping
                        e.preventDefault();
                    }

                    e.dataTransfer.dropEffect = 'move';
                    e.target.classList.add('drag-over');
                    if (typeof(this.vm[binding.value.over]) === 'function') {
                        this.vm[binding.value.over].call(this, e.target, e);
                    }
                    return false;
                }.bind(this);

                this.handleDragEnter = function(e) {
                    if (typeof(this.vm[binding.value.enter]) === 'function') {
                        this.vm[binding.value.enter].call(this, e.target, e);
                    }
                    e.target.classList.add('drag-enter');
                }.bind(this);

                this.handleDragLeave = function(e) {
                    if (typeof(this.vm[binding.value.leave]) === 'function') {
                        this.vm[binding.value.leave].call(this, e.target, e);
                    }
                    e.target.classList.remove('drag-enter');
                }.bind(this);

                this.handleDrag = function(e) {
                    if (typeof(this.vm[binding.value.drag]) === 'function') {
                        this.vm[binding.value.drag].call(this, e.target, e);
                    }
                }.bind(this);

                this.handleDragEnd = function(e) {
                    e.target.classList.remove('dragging', 'drag-over', 'drag-enter');
                    if (typeof(this.vm[binding.value.end]) === 'function') {
                        this.vm[binding.value.end].call(this, e.target, e);
                    }
                }.bind(this);

                this.handleDrop = function(e) {
                    e.preventDefault();
                    if (e.stopPropagation) {
                        // stops the browser from redirecting.
                        e.stopPropagation();
                    }

                    // Don't do anything if dropping the same column we're dragging.
                    if (this.vm._dragSrcEl != e.target) {
                        if (typeof(this.vm[binding.value.drop]) === 'function') {
                            var el = (e.target.draggable) ? e.target : e.target.parentElement;
                            this.vm[binding.value.drop].call(this, this.vm._dragSrcEl, el);
                        }
                    }

                    return false;
                }.bind(this);

                // setup the listeners
                draggable && el.setAttribute('draggable', 'true');
                draggable && el.addEventListener('dragstart', this.handleDragStart, false);
                draggable && el.addEventListener('dragenter', this.handleDragEnter, false);
                draggable && el.addEventListener('dragover', this.handleDragOver, false);
                draggable && el.addEventListener('drag', this.handleDrag, false);
                draggable && el.addEventListener('dragleave', this.handleDragLeave, false);
                draggable && el.addEventListener('drop', this.handleDrop, false);
                draggable && el.addEventListener('dragend', this.handleDragEnd, false);
            },

            update: function (newValue, oldValue) {
                //console.log(this);
            },

            unbind: function () {
                this.el.classList.remove('dragging', 'drag-over', 'drag-enter');
                this.el.removeAttribute('draggable');
                this.el.removeEventListener('dragstart', this.handleDragStart);
                this.el.removeEventListener('dragenter', this.handleDragEnter);
                this.el.removeEventListener('dragover', this.handleDragOver);
                this.el.removeEventListener('dragleave', this.handleDragLeave);
                this.el.removeEventListener('drag', this.handleDrag);
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

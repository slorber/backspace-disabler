var backspaceCode = 8

    // See http://www.w3schools.com/html/html_form_input_types.asp
    // See https://github.com/slorber/backspace-disabler/issues/1
    var validInputTypes = {
        TEXT:1,PASSWORD:1,FILE:1,EMAIL:1,SEARCH:1,DATE:1,NUMBER:1,
        MONTH:1,WEEK:1,TIME:1,DATETIME:1,'DATETIME-LOCAL':1,TEL:1,URL:1
    }

    // Disables the backspace from triggering the browser to go back one history item (which often changes pages)
    exports.disable = function(el) {
        addHandler(el || document,"keydown",disabler)
    }

    // Reenable the browser backs
    exports.enable = function(el) {
        removeHandler(el || document,"keydown",disabler)
    }


    // See http://stackoverflow.com/questions/1495219/how-can-i-prevent-the-backspace-key-from-navigating-back
    function disabler(event) {
        if (event.keyCode === backspaceCode) {
            var node = event.srcElement || event.target
            // We don't want to disable the ability to delete content in form inputs and contenteditables
            if ( !isActiveFormItem(node) ) {
                event.preventDefault()
            }
        }
    }

    // See http://stackoverflow.com/questions/12949590/how-to-detach-event-in-ie-6-7-8-9-using-javascript
    function addHandler(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false)
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler)
        } else {
            element["on" + type] = handler
        }
    }
    function removeHandler(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false)
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler)
        } else {
            element["on" + type] = null
        }
    }

    // Returns true if the node is or is inside an active contenteditable
    function isInActiveContentEditable(node) {
        while (node) {
            if ( node.getAttribute &&
                 node.getAttribute("contenteditable") &&
                 node.getAttribute("contenteditable").toUpperCase() === "TRUE" ) {
                return true
            }

            node = node.parentNode
        }

        return false
    }

    // returns true if the element is contained within a document
    function connectedToTheDom(node) {
      return node.ownerDocument.contains(node);
    }

    function isActiveFormItem(node) {
        var tagName = node.tagName.toUpperCase()
        var isInput = ( tagName === "INPUT" && node.type.toUpperCase() in validInputTypes)
        var isTextarea = ( tagName === "TEXTAREA" )
        if ( isInput || isTextarea ) {
            var isDisabled = node.readOnly || node.disabled
            return !isDisabled && connectedToTheDom(node)  // the element may have been disconnected from the dom between the event happening and the end of the event chain, which is another case that triggers history changes
        }
        else if ( isInActiveContentEditable(node) ) {
            return connectedToTheDom(node)
        }
        else {
            return false
        }
    }

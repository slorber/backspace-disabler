"use strict"


var Backspace = 8;



// See http://stackoverflow.com/questions/12949590/how-to-detach-event-in-ie-6-7-8-9-using-javascript
function addHandler(element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + type, handler);
    } else {
        element["on" + type] = handler;
    }
}
function removeHandler(element, type, handler) {
    if (element.removeEventListener) {
        element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
        element.detachEvent("on" + type, handler);
    } else {
        element["on" + type] = null;
    }
}




// Test wether or not the given node is an active contenteditable,
// or is inside an active contenteditable
function isInActiveContentEditable(node) {
    while (node) {
        if ( node.getAttribute && 
             node.getAttribute("contenteditable") && 
             node.getAttribute("contenteditable").toUpperCase() === "TRUE" ) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}



var ValidInputTypes = ['TEXT','PASSWORD','FILE','EMAIL','SEARCH','DATE'];

function isActiveFormItem(node) {
    var tagName = node.tagName.toUpperCase();
    var isInput = ( tagName === "INPUT" && ValidInputTypes.indexOf(node.type.toUpperCase()) >= 0 );
    var isTextarea = ( tagName === "TEXTAREA" );
    if ( isInput || isTextarea ) {
        var isDisabled = node.readOnly || node.disabled;
        return !isDisabled;
    }
    else if ( isInActiveContentEditable(node) ) {
        return true;
    }
    else {
        return false;
    }
}


// See http://stackoverflow.com/questions/1495219/how-can-i-prevent-the-backspace-key-from-navigating-back
function disabler(event) {
    if (event.keyCode === Backspace) {
        var node = event.srcElement || event.target;
        // We don't want to disable the ability to delete content in form inputs and contenteditables
        if ( isActiveFormItem(node) ) {
            // Do nothing
        }
        // But in any other cases we prevent the default behavior that triggers a browser backward navigation
        else {
            event.preventDefault();
        }
    }
}


/**
 * By default the browser issues a back nav when the focus is not on a form input / textarea
 * But users often press back without focus, and they loose all their form data :(
 *
 * Use this if you want the backspace to never trigger a browser back
 */
exports.disable = function(el) {
    addHandler(el || document,"keydown",disabler);
};

/**
 * Reenable the browser backs
 */
exports.enable = function(el) {
    removeHandler(el || document,"keydown",disabler);
};




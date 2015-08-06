# BACKSPACE DISABLER


Disable the annoying backward navigation that occurs when the user press the backspace key.

It does so by using `preventDefaut()`, and does not cancel the ability of the user to delete text or content on form inputs and contenteditable elements.

# Usage

Require it with CommonJS loader (Browserify / Webpack...)

```javascript
var BackspaceDisabler = require("backspace-disabler");


BackspaceDisabler.disable(); // Disable the backspace that triggers backward navigation
BackspaceDisabler.enable(); // Revert to normal



// Can also be applied to a specific element:
var element = document.getElementById("someEl");
BackspaceDisabler.disable(element);
BackspaceDisabler.enable(element);

```


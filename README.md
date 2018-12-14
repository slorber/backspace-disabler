# BACKSPACE DISABLER

Disable the annoying backward navigation that occurs when the user press the backspace key.

# Features

- Prevent browser back on backspace (by using `preventDefaut()`)
- Does not break ability of user to delete content on all known input types
- Supports contentEditable (in read/edit mode)
- Allow to apply the behavior globally or on a subtree
- No dependency

# Installation

NPM:
```
npm install backspace-disabler
```

Or just copy the code inside index.js into your codebase.

# Usage

Require it with CommonJS loader (Browserify / Webpack...)

```javascript
var BackspaceDisabler = require("backspace-disabler");

// Disable the backspace that triggers backward navigation
BackspaceDisabler.disable(); 
// Revert to normal
BackspaceDisabler.enable();

// Can also be applied to a specific element tree:
var myWidget = document.getElementById("myWidget");
BackspaceDisabler.disable(myWidget);
BackspaceDisabler.enable(myWidget);

```

# Credits

The ideas of this lib come from [StackOverflow](http://stackoverflow.com/questions/1495219/how-can-i-prevent-the-backspace-key-from-navigating-back)

# Hire a freelance expert

Looking for a React/ReactNative freelance expert with more than 5 years production experience?
Contact me from my [website](https://sebastienlorber.com/) or with [Twitter](https://twitter.com/sebastienlorber).

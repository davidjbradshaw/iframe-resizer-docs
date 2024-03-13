---
title: Vue2
description: Vue2 example
---

Create the following Vue directive

```js
import Vue from "vue";
import connectResizer from "@iframe-resizer/core";

Vue.directive("resizer", {
  bind: function (el, { value = {} }) {
    connectResizer(value)(el);
  },
  unbind: function (el) {
    el.iFrameResizer.removeListeners();
  },
});
```

and then include it on your page as follows.

```html
<iframe v-resizer width="100%" src="myiframe.html" frameborder="0"></iframe>
```

- Thanks to [Aldebaran Desombergh](https://github.com/davidjbradshaw/iframe-resizer/issues/513#issuecomment-538333854) for this example

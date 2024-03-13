---
title: Child Page API
description: Child page api for iframe-resizer
prev: Parent Page API
---

The Child API is for use on the page contained within the `<iframe>` tag. It is split into three sections. [Options](#options) contains settings that can be passed when calling iframe-resizer. [Events](#events) are trigged by updates to the iframe, or messages from the iframe. [Methods](#methods) allow you to interact with iframe-resizer after the initial resizing.

## Options

The following options can be set from within the iFrame page by creating a `window.iFrameResizer` object before the JavaScript file is loaded into the page.

```html
<script>
  window.iFrameResizer = {
    targetOrigin: "http://mydomain.com",
  };
</script>
<script src="js/iframeresizer.contentwindow.js"></script>
```

### offsetHeight

    default: 0
    type:    integer

Modify the computed height of the iframe. This is useful if the page in the iframe returns a size value that is consitantly slightly different to how you want the iframe to be sized.

### offsetWidth

    default: 0
    type:    integer

Modify the computed width of the iframe. This is useful if the page in the iframe returns a width value that is consitantly slightly different to how you want the iframe to be sized.

### targetOrigin

    default: '*'
    type: string

This option allows you to restrict the domain of the parent page, to prevent other sites mimicking your parent page.

## Events

The following events can be included in the [options](options.md) object attached to the iframed page.

### onMessage

    type: function (message)

Receive message posted from the parent page with the `iframe.iFrameResizer.sendMessage()` method.

### onReady

    type: function()

This function is called once iFrame-Resizer has been initialized after receiving a call from the parent page. If you need to call any of the [parentIFrame methods](https://github.com/davidjbradshaw/iframe-resizer/blob/master/docs/iframed_page/methods.md) during page load, then they should be called from this event handler.

## Methods

These methods are available in the iFrame via the `window.parentIFrame` object. These method should be contained by a test for the `window.parentIFrame` object, in case the page is not loaded inside an iFrame. For example:

```js
if ("parentIFrame" in window) {
  parentIFrame.close();
}
```

### autoResize([bool])

Turn autoResizing of the iFrame on and off. Returns bool of current state.

### close()

Remove the iFrame from the parent page.

### getId()

Returns the ID of the iFrame that the page is contained in.

### getParentInfo(callback||false)

Ask the containing page for its positioning coordinates. You need to provide a callback which receives an object with the following read only properties:

```js
{
  // iframe.getBoundingRect()
  iframe: {
    width
    height
    top
    right
    bottom
    left
  },

  // fron document.documentEkement
  document: {
    scrollWidth
    scrollHeight
  },

  // window.visualViewport
  viewport: {
    width
    height
    offsetLeft
    offsetTop
    pageLeft
    pageTop
    scale
  }
}
```

<!--
* **documentHeight** The containing document's height in pixels (the equivalent of  `document.documentElement.clientHeight` in the container)
* **documentWidth** The containing document's width in pixels (the equivalent of `document.documentElement.clientWidth` in the container)
* **iframeHeight** The height of the iframe in pixels
* **iframeWidth** The width of the iframe in pixels
* **offsetLeft** The number of pixels between the left edge of the containing page and the left edge of the iframe
* **offsetTop** The number of pixels between the top edge of the containing page and the top edge of the iframe
* **scrollX** The number of pixels between the top edge of the iframe and the top edge of the iframe viewport (`window.scrollX`)
* **scrollY** The number of pixels between the left edge of the iframe and the left edge of the iframe viewport (`window.scrollY`)
* **windowHeight** The containing window's height in pixels (the equivalent of `window.innerHeight` in the container)
* **windowWidth** The containing window's width in pixels (the equivalent of `window.innerWidth` in the container)
-->

Your callback function will be recalled when the parent page is scrolled or resized.

Pass `false` to disable the callback.

### scrollTo(x,y)

Scroll the parent page to the coordinates x and y.

### scrollToOffset(x,y)

Scroll the parent page to the coordinates x and y relative to the position of the iFrame.

### sendMessage(message,[targetOrigin])

Send data to the containing page, `message` can be any data type that can be serialized into JSON. The `targetOrigin` option is used to restrict where the message is sent to; to stop an attacker mimicking your parent page. See the MDN documentation on [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window.postMessage) for more details.

<!--
### setHeightCalculationMethod(heightCalculationMethod)

Change the method use to workout the height of the iFrame.
-->

### size()

Manually force iFrame to resize. If for some reason a change in content size is not detected, this method allows you to nudge iframe-resizer to recalculate the page size.

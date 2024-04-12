---
title: Upgrading to Version 5
description: Upgrading to iframe-resizer 5
---

Version 5 of _iframe-resizer_ drops support for legacy browsers and changes the way content resize events are detected. These changes greatly improves detection of content changes and _iframe-resizer_ can now detect a number of events, such as user `<textarea>` resizing and CSS animation that previous versions struggled with.

These changes, along with further code optimisations, have lead to a large improvement in the performance of this library and it is now possible to have _iframe-resizer_ both detect and keep up with CSS animation that causes the iframe to resize on every annimation frame.

In addition to this, _iframe-resizer 5_ contains a number of other improvements and API changes that should be considered when upgrading from a previous version.

## API Changes

Over the last decade _iframe-resizer_ has had a gradaul increase in the number of available configuration options. With _iframe-resizer 5_ the aim has been to reduce and clarify these options in order to reduce complexity of using this library. The library will now auto detect a number of settings and also log advisory warnings to the console where it thinks you should make changes to the config.

### Auto detection of the best content size calculation method

The previous versions of _iframe-resizer_ offered the choice of a wide ranage of ways to calculate the size of the content in the iframe and it was left to the developer to determine which was the most appropreate by setting the `heightCalculationMethod` and `widthCalculationMethod` options.

With _iframe-resizer 5_, these options have been deprecated and _iframe-resizer_ will now inspect the the page layout to automatically determine which is the best page size calculation method each time the iframe is resized. If it is determind that the best calculation method is `taggedElement` and the page has no tags, an advisory warning will be logged in the console to suggest adding these.

The name of the tag attributes have now been consolidated from `data-iframe-height` and `date-iframe-width`, to the single tag `data-iframe-size`.

Use of the old calculation options or the old tag names will trigger a deprecation warning in the console with advice on how to update your config.

### New `direction` option replaces `sizeHeight` / `sizeWidth` and `autoResize`

This library has always supported resizing in both directions, but changing the direction confusingly required the setting of multiple different options in the config. This has now been consolidated into the new single `direction` option, which can have the following values: `vertical`, `horizontal` or `none`.

Use of the old values will trigger a deprication warning.

### New `getParentInfo()` method replaces `getPageInfo()`

The `getPageInfo()` method as been deprecated in favor of the new `getParentInfo()` method. Since it was first added to _iframe-resizer_ **getPageInfo** has been extended and extended and is now a bit of a mess of values.

The new **getParentInfo** method now groups values into three objects that contain infomation about the containing iframe tag, the parent document object and the parent viewport.

```js
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

Use of the old method will trigger a deprecation warning in the console.

### The `onInit()` method has been renamed to `onReady()`

The `onInit()` method has been deprecated in favour of `onReady()`. This brings the parent page and iframe names for this event inline with each other. Use of `onInit()` will trigger a deprecation warning in the console.

### Min/Max size values now taken from iframe computed CSS values

These settings are now read from the computed style of the iframe tag. Setting them via the call to `iframeResize()` will trigger a deprication warning.

### New `offsetHeight` and `offsetWidth` options

These new options allow you to adjust the value returned by the iframe, they can have either a positive or negative value.

## Other Improvements

In addition to the above API changes, _iframe-resizer 5_ includes the following other enhancements.

### Direct communitcation for same domain iframes

Iframe-resizer now detects when the iframe is on the same domain as the parent page, and will then pass messages directly via the browser DOM. This provides an additional performance improvement over always using `postMessage()`, which is now only used for cross-domain iframes.

### Visability checking

The visability of both the iframe and the parent page are now observered. This allows resizing to be disabled while the iframe is not visible to the user.

### Ensures CSS sizing of iframe html and body tags set to auto

The most common reason for Iframe Resizer to have difficulty resizing, or going into an endless loop of resizing, is the `<html>` and/or `<body>` elements having a size set on them by CSS. Iframe Resizer now inspects these elements and ensures that the height and width is set to `auto`.

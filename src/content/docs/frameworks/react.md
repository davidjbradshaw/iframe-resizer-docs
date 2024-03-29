---
title: iframe-resizer/react
description: React plugin for iframe-resizer
prev: Child Page API
---

## Install

Install this package with the following command.

```bash
npm install --save @iframe-resizer/react
```

You will also need to ensure that the `@iframe-resizer/child` package has been loaded into the iframe.

## Usage

The `<IframeResizer />` component can be passed all`<iframe>` atrributes, along with _[options](https://github.com/davidjbradshaw/iframe-resizer/blob/master/docs/parent_page/options.md)_ and _[events](https://github.com/davidjbradshaw/iframe-resizer/blob/master/docs/parent_page/events.md)_ from [iframe-resizer](https://github.com/davidjbradshaw/iframe-resizer). You can also optionally pass a `forwardRef` to gain access to a few _[methods](https://github.com/davidjbradshaw/iframe-resizer/blob/master/docs/parent_page/methods.md)_ that provide a simple interface to communicate with the page in the iframe.

```jsx
<IframeResizer
  {iframe attributes}
  {iframe-resizer options}
  {iframe-resizer events}
/>
```

The page in the iframe then needs ([iframeResizer.contentWindow.min.js](https://raw.github.com/davidjbradshaw/iframe-resizer/master/js/iframeResizer.contentWindow.min.js)) from [iframe-resizer](https://github.com/davidjbradshaw/iframe-resizer). _This file is designed to be a guest on someone else's system, so has no dependencies and won't do anything until it's activated by a message from the containing page_.

### Typical setup

The normal configuration is to have the iframe resize when the browser window changes size or the content of the iFrame changes. To set this up you need to configure one of the dimensions of the iFrame to a percentage and tell the library to only update the other dimension. Normally you would set the width to 100% and have the height scale to fit the content.

```jsx
<IframeResizer
  src="http://anotherdomain.com/iframe.html"
  style={{ width: "1px", minWidth: "100%" }}
/>
```

**Note:** Using _min-width_ to set the width of the iFrame, works around an issue in iOS that can prevent the iFrame from sizing correctly.

### Advanced Setup

This is a more advanced configuration, taken from the [example](https://github.com/davidjbradshaw/iframe-resizer-react/tree/master/example) folder, which demostrates the use of _options_, _events_ and _methods_ from the [iframe-resizer](https://github.com/davidjbradshaw/iframe-resizer) API.

```jsx
import React, { useRef, useState } from "react";
import IframeResizer from "@iframe-resizer/react";

import MessageData from "./message-data";

export default () => {
  const iframeRef = useRef(null);
  const [messageData, setMessageData] = useState();

  const onResized = (data) => setMessageData(data);

  const onMessage = (data) => {
    setMessageData(data);
    iframeRef.current.sendMessage("Hello back from the parent page");
  };

  return (
    <>
      <IframeResizer
        forwardRef={iframeRef}
        inPageLinks
        onMessage={onMessage}
        onResized={onResized}
        src="http://anotherdomain.com/iframe.html"
        style={{ width: "1px", minWidth: "100%" }}
      />
      <MessageData data={messageData} />
    </>
  );
};
```

The `<MessageData/>` component is then used to display some of the data returned from the iframe.

```jsx
import React from "react";

const MessageData = ({ data }) => {
  data ? (
    data.message ? (
      <span>
        <b>Frame ID:</b> {data.iframe.id} &nbsp;
        <b>Message:</b> {data.message}
      </span>
    ) : (
      <span>
        <b>Frame ID:</b> {data.iframe.id} &nbsp;
        <b>Height:</b> {data.height} &nbsp;
        <b>Width:</b> {data.width} &nbsp;
        <b>Event type:</b> {data.type}
      </span>
    )
  ) : null

export default MessageData
```

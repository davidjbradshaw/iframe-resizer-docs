import React from 'react';

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
}

export default MessageData


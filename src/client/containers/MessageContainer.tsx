import React, { useState, useEffect, Fragment } from 'react';
import MessageForm from '../components/MessageForm';
import MessageDisplay from '../components/MessageDisplay';
import * as events from '../events/eventCreators';

interface Props {};

const MessageContainer: React.FC<Props> = () => {
  const ws = new WebSocket('ws://localhost:3000');
  const [messages, setMessages] = useState([]);
  const deleteMessage = (id: number): void => ws.send(JSON.stringify(events.deleteMessage(id)));

  ws.onmessage = (event: any): void => setMessages(JSON.parse(event.data));

  // Get messages on initial load when WebSocket state is OPEN
  useEffect((): void => {
    if (ws.readyState === 1) ws.send(JSON.stringify(events.getMessages()));
  }, [ws.readyState]);

  return (
    <Fragment>
      <MessageForm ws={ws} />
      <MessageDisplay messages={messages} deleteMessage={deleteMessage} />
    </Fragment>
  );
};

export default MessageContainer;

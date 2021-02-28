import React, { useState, useEffect } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import { IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import './App.css';
import Message from './Message';
import { db } from './firebase';


function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    db.collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
    });
  }, []);

  useEffect(() => {
    setUsername(prompt('Please enter your name'));
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    // all the logic to send a message goes
    // setMessages([...messages, input]);
    // setMessages([...messages, {username: username, message: input}]);
    db.collection('messages').add({
      username: username,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput('');
  };

  return (
    <div className="App">
      <div className='img_container'>
        <img src="fecebook_messenger_icon.png"  width="100" />
      </div>
      <h1>Messenger App</h1>
      <h2>Welcome {username}</h2>
      <FlipMove>
        {
          messages.map(({id, message}) => (
            // 1. messageを入力したmessage.usernameと、2. ログインしているusernname
            <Message key={id} username={username} message={message} />
          ))
        }
      </FlipMove>
      { username ? (
      <form className='app_form'>
        <FormControl className='app_formControl' >
            <Input
              placeholder='Enter a message...'
              className='app_input'
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <IconButton
              variant='contained'
              color='primary'
              className='app_iconButton'
              disabled={!input}
              type='submit'
              onClick={sendMessage}
            >
              <SendIcon />
            </IconButton>
          </FormControl>
        </form>
      ): null }
    </div>
  );
}

export default App;

import React from 'react';

const DialogBox = ({ message, onClose }) => {
  return (
    <div style={dialogContainerStyle}>
      <div style={dialogBoxStyle}>
      <p style={messageStyle}>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

const dialogContainerStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const dialogBoxStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '5px',
  textAlign: 'center',
};

const messageStyle = {
    color: 'green',
    fontWeight: 'bold',
  };
export default DialogBox;

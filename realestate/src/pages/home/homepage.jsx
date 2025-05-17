// eslint-disable-next-line no-unused-vars
import React from 'react';


const iframeStyle = {
  width: '100%',
  height: '100vh', 
  border: 'none', 
};


const wrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw', 
  height: '100vh', 
  margin: 0, 
  padding: 0, 
  backgroundColor: '#f0f2f5', 
  overflow: 'hidden', 
};

const Home = () => (
  <div style={wrapperStyle}>
    <iframe
      src="https://site14231157.nicepage.io/Page-2.html?uid=fe519472-0326-47b9-90c8-4288a9d6619e"
      style={iframeStyle}
      title="Embedded Page"
    />
  </div>
);

export default Home;

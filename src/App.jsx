// App.jsx
import React from 'react';

const App = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Vite + React!</h1>
      <p style={styles.subtitle}>This is a sample App.jsx file.</p>
    </div>
  );
};

export default App;

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#666',
  },
};

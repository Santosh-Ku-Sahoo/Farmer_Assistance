import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App runtime exception:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#EAF0E6',
          fontFamily: 'sans-serif',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '450px',
            backgroundColor: '#FFFFFF',
            padding: '24px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '1px solid #D5DEC9'
          }}>
            <h2 style={{ color: '#1E4D2B', marginBottom: '8px', fontSize: '18px', fontWeight: 'bold' }}>
              🌿 AI Farmer Assistant | କୃଷକ ସହାୟକ
            </h2>
            <p style={{ color: '#5A4D41', fontSize: '14px', marginBottom: '16px' }}>
              A temporary issue occurred while loading. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                backgroundColor: '#1E4D2B',
                color: '#FFFFFF',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              🔄 Refresh / ପୁନର୍ବାର ଲୋଡ୍ କରନ୍ତୁ
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

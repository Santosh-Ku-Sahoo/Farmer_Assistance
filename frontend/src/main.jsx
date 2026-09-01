import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Runtime error caught by boundary:', error, errorInfo);
    this.setState({ errorInfo });
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
          padding: '16px',
          textAlign: 'left'
        }}>
          <div style={{
            maxWidth: '520px',
            width: '100%',
            backgroundColor: '#FFFFFF',
            padding: '24px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '2px solid #8B3A2B'
          }}>
            <h2 style={{ color: '#8B3A2B', margin: '0 0 10px 0', fontSize: '18px', fontWeight: 'bold' }}>
              🌿 AI Farmer Assistant (କୃଷକ ସହାୟକ)
            </h2>
            <p style={{ color: '#5A4D41', fontSize: '13px', margin: '0 0 12px 0' }}>
              A client runtime issue occurred. Details:
            </p>
            <pre style={{
              backgroundColor: '#FEF2F2',
              color: '#991B1B',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '11px',
              overflowX: 'auto',
              whiteSpace: 'pre-wrap',
              marginBottom: '16px'
            }}>
              {String(this.state.error?.stack || this.state.error?.message || this.state.error || 'Unknown Error')}
            </pre>
            <button
              onClick={() => {
                localStorage.clear();
                sessionStorage.clear();
                window.location.reload();
              }}
              style={{
                backgroundColor: '#1E4D2B',
                color: '#FFFFFF',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              🔄 Clear Cache & Reload / ପୁନର୍ବାର ଲୋଡ୍ କରନ୍ତୁ
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

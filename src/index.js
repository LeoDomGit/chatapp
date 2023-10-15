import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="161063259833-re72a63p1kr81oo9cc3v5rqupf5sl9uv.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);


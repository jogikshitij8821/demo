import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import  store from "./component/Redux/store" ;
import { Provider } from 'react-redux';

ReactDOM.render(
    <GoogleOAuthProvider clientId={process.env.REACT_APP_API_CLIENTID_URL}>
        <React.StrictMode>
            <Provider store={store}>
            <App />
            </Provider>
        </React.StrictMode>
    </GoogleOAuthProvider>,
    document.getElementById('root')
);
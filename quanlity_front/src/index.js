import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // Import Provider từ react-redux
import './index.css';
import App from './App';
import appStore from 'src/app-store'; // Import store từ redux

ReactDOM.render(
    <React.StrictMode>
        <Provider store={appStore}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

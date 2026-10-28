import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/App.tsx';
import reportWebVitals from './reportWebVitals';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import store from '../src/app/store';

let persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);


reportWebVitals();

// Android hardware back button: step back through the app, leave it from the home screen.
if (window.Capacitor && typeof window.Capacitor.isNativePlatform === 'function' && window.Capacitor.isNativePlatform()) {
    import('@capacitor/app').then((module) => {
        module.App.addListener('backButton', ({ canGoBack }) => {
            if (window.location.pathname !== '/' && canGoBack) {
                window.history.back();
            } else {
                module.App.exitApp();
            }
        });
    }).catch(() => { /* plugin not bundled: the platform default applies */ });
}

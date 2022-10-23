import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './assets/css/antd.custom.css'
import reportWebVitals from './reportWebVitals';
import App from './App.js'
import store from './app/store'
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { ConfigProvider as PhoneConfigProvider } from 'antd-country-phone-input';
import en from 'world_countries_lists/data/countries/en/world.json';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <PhoneConfigProvider locale={en}>
        <Provider store={store}>
            <ConfigProvider prefixCls='custom'>
                <App />
            </ConfigProvider>
        </Provider>
    </PhoneConfigProvider>
);

ConfigProvider.config({
        prefixCls: 'custom',
        theme: {
            primaryColor: 'orange',
          }
    })

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

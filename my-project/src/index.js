import React from 'react';
import ReactDOM from 'react-dom';//创建一个虚拟dom

import * as serviceWorker from './serviceWorker';

// import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import "antd/dist/antd.css";

import App from "./App.js"

import {Provider} from "react-redux"
import MyStore from "../src/redux/store/myStore"
const store=MyStore()

moment.locale('zh-cn')

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")//把App组件渲染到div id="root"
)

serviceWorker.unregister();

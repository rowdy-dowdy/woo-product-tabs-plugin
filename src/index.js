// import { ReactDOM } from "react-dom"
import { render } from '@wordpress/element';
import App from "./app.js";
import './app.css'

// ReactDOM.render(<App />, document.querySelector("#wptReactSettings"))

render(<App />, document.getElementById('wptReactSettings'));
import React from "react"; 

function NavigationBar (props) {
    return (
        <nav className="navbar">
            <a href="/" className="navbar-brand">Speedial</a>
            <div className="chat-timer">TIMER</div>
            <div className="user-online">{props.numberofUsrs} Users Online</div>
        </nav>
    );
}

export default NavigationBar;
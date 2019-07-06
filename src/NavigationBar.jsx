import React, {Component} from 'react';

class NavigationBar extends Component {
    render() {
        return (
            <nav className="navbar">
                <a href="/" className="navbar-brand">Speedial</a>
                <div className="chat-timer">TIMER</div>
                <div className="user-online">{this.props.numberofUsrs} Users Online</div>
            </nav>
        );
    }
}

export default NavigationBar;
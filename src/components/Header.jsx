import React from 'react'
import Logo from '../images/logo.png'


export const Header = () => {
    return (
        <header className="header">
        <nav className="nav">
            <img className="image" src={Logo } alt="todolist"></img>
        </nav>
        </header>
    )
}

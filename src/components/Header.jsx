import React from 'react'
import logo from '../assets/logo/pokemon.png'

function Header() {
    return (
        <div className="flex justify-center mb-10">
            <img src={logo} alt="logo" className="w-[400px]" />
        </div>
    )
}

export default Header
import React from 'react'

export default function Main(props) {
    return (
        <div>
            <header>myheder</header>
            {props.children}
            <footer>footer</footer>
        </div>
    )
}

import React from 'react'
import { Route } from 'react-router-dom'
import Main from './Main'

export default function DefaultLayout({ component: Component, ...otherProps }) {
    return (
        <Route {...otherProps} render={matchProps => (
            <Main>
                <Component {...matchProps} />
            </Main>
        )} />
    )
}

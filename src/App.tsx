import React, { Component, ReactElement, Fragment } from "react";
import Player from "./components/Player";
import Playlist from "./components/Playlist";
import './css/App.css';

class App extends Component {

    public render(): ReactElement {

        return (
            <Fragment>
                <Player />
                <Playlist />
            </Fragment> 
        );
    }
}

export default App;

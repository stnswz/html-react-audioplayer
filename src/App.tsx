import React, { Component, ReactElement, Fragment } from "react";
import Player from "./components/Player";
import Playlist from "./components/Playlist";
import './css/App.css';

interface IState {
    /** empty */
}
interface IProps {
    /** empty */
}

class App extends Component<IProps, IState>  {

    constructor(props:IProps) { 
        super(props);
        this.state = {
            height: 0,
        }
    }

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

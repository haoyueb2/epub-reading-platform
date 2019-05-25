import React from 'react';
import {withRouter} from "react-router";
import Animation from "./animation"

class BookShow extends  React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div >
                <Animation/>
            </div>
        )
    }
}
export default withRouter(BookShow);
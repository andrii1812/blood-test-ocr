import React = require("react");
import NewTab from '@material-ui/icons/Launch'

export default ({path}: {path: string}) => (
    <a className="open-new-tab-icon" href={path} target="_blank">
        <NewTab/>
    </a>
)
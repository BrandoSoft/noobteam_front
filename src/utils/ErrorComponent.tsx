import React from 'react';
import {TbFaceIdError} from "react-icons/tb";

interface Props {
    content: string;
}

const ErrorComponent = (props: Props)=> {
    return (
        <div className="error error-relative">
            <TbFaceIdError className="error__icon"/>
            <div className="error__message">{props.content}</div>
        </div>
    );
}

export default ErrorComponent;
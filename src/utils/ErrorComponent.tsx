import React from 'react';
import {BiCommentError} from "react-icons/bi";

interface Props {
    content: string;
}

const ErrorComponent = (props: Props)=> {
    return (
        <div className="error error-relative">
            <BiCommentError className="error__icon"/>
            <div className="error__message">{props.content}</div>
        </div>
    );
}

export default ErrorComponent;
import React from 'react';

interface Props{
    text: string,
    logout?: ()=> void,
    icon: any
}

const DropdownItem = ({text, icon, logout}: Props) => {
    return (
            <li>
                {icon}<p onClick={logout}> {text}</p>
            </li>
    );
};

export default DropdownItem;
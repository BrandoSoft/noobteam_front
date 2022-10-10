import React, {useEffect, useRef, useState} from 'react';
import DropdownItem from "./DropdownItem";

import avatar from '../../img/useravatar.jpg'
import { CgProfile } from 'react-icons/cg';
import { FiSettings } from 'react-icons/fi';
import { BiLogOutCircle } from 'react-icons/bi';
import { HiOutlineChevronDown } from 'react-icons/hi';


interface Props {
    logoutUser: () => void,
    userName: string
}

const NavbarDropDownMenu = ({logoutUser, userName}: Props) => {
    const [open, setOpen] = useState(false)

    const menuRef = useRef<any>(null);

    useEffect(()=>{
        const handler = (e:MouseEvent)=>{
            if(!menuRef.current.contains(e.target)){
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handler);

        return() => {
            document.removeEventListener('mousedown', handler)
        }
    })

    return (
        <div className="dropdownMenu" ref={menuRef}>
            <div className="dropdownMenu__trigger" onClick={()=>{setOpen(!open)}}>
                <p className="dropdownMenu__text">
                    <img src={avatar} alt="user avatar" className="dropdownMenu__img"/>
                    {userName}
                </p>
                <p className="dropdownMenu__text dropdownMenu__text--arrow"> <HiOutlineChevronDown/> </p>
                {/*<button onClick={logoutUser} className=""> {userName} </button>*/}
            </div>
            <div className={`dropdownMenu__extend ${open? 'active': 'inactive'}`}>
                <ul>
                    <DropdownItem icon={<CgProfile/>} text={"Mój profil"}/>
                    <DropdownItem icon={<FiSettings/>} text={"Ustawienia"}/>
                    <DropdownItem icon={<BiLogOutCircle/>} text={"Wyloguj"} logout={logoutUser}/>
                </ul>
            </div>
        </div>
    );
};

export default NavbarDropDownMenu;
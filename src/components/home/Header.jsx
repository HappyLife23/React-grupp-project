import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { columnDisplayHandler } from "../../features/columnSlice";
import { handleMenu } from "../../features/settingsSlice";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../../features/loginSlice";

const Header = () => {
    const columns = useSelector(state => state.columns.columns);
    const dispatch = useDispatch();
    const style = useSelector(state => state.settings.header);
    const logoSize = style.logoSize;
    const headerSize = style.headerSize;
    const headerColor = style.headerColor;
    const textSize = style.textSize;
    const textColor = style.textColor;
    const wordSpace = style.wordSpace;
    const myAccount = JSON.parse(localStorage.getItem('userAccount'));
    const [signOut, setSignOut] = useState(false);
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(null); // håller reda på vilketn column (li-element) man klickat på för att ändra färgen

    const tasks = useSelector(state => state.tasks.tasks);
    let done = 0;
    let other = 0;

    tasks.forEach(task => {
        task.columnName === 'Done' ? done++ : other++
    });

    const progressStyle = {
        position: 'absolute',
        width: textSize ? textSize * 1.5 + 'px' : '27px',
        height: textSize ? textSize * 1.5 + 'px' : '27px',
        clipPath: 'circle()',
        transform: 'translate(-120%, -90%)',
        background: `conic-gradient(${textColor || '#000'} 0 ${done / tasks.length * 100}%, #bbb ${done / tasks.length * 100}% ${done / tasks.length * 100 + other}%)`
    }

    const headerStyle = {
        height: headerSize ? headerSize + 'px' : 'unset',
        background: headerColor || '#ddd'
    }

    const headerTextStyle = {
        fontSize: textSize ? textSize + 'px' : '18px',
        color: textColor
    }

    const handleSignout = () => {
        localStorage.removeItem('userAccount');
        delete localStorage.isLogedin;
        dispatch(handleLogout());
        navigate('/login');
    }
    
    // Skapar en funktion som läser in vilken 'li' som har valts, så att vi därefter kan ändra färg på den
    const handleListClick = (e, dispatchItem, index) => {
        dispatch(columnDisplayHandler(dispatchItem));
        
        // Uppdatera activeIndex med det klickade 'li' elementets index
        setActiveIndex(index);
    };

    return (
        <header>
            <nav style={headerStyle}>
                <div>
                    <img src="/src/images/logo.png" alt="Logo" style={{ width: logoSize ? logoSize + 'px' : '83px' }} />
                    <NavLink to='/taskList'>
                        <p>Task List</p>
                    </NavLink>
                </div>
                {/* Ändrar färg beroende på om den är aktiv eller inte */}
                <ul style={{ gap: wordSpace ? wordSpace + 'px' : '5px' }}>
                    <li style={{ ...headerTextStyle, color: activeIndex === 0 ? 'blue' : 'black'}} onClick={
                        (e) => handleListClick(e, null, 0)}> Show all </li>
                    {columns.map((column, index) => (
                        <li style={{...headerTextStyle, color: activeIndex === index + 1 ? 'blue' : 'black'}}
                            key={index} onClick={
                                (e) => handleListClick(e, column.title, index + 1)}>{column.title}</li>
                    ))}
                    <li style={{...headerTextStyle, color: activeIndex === columns.length + 1 ? 'blue' : 'black'}} onClick={
                        (e) => handleListClick(e, 'Done', columns.length + 1)}> Done </li>
                </ul>
                <div id='headerLeft'>
                    <a>
                        <p style={headerTextStyle}>Progress</p>
                        <div style={progressStyle}>
                            <div id='progressInnerCircle' style={{
                                background: headerColor || '#ddd',
                                width: '70%',
                                height: '70%'
                            }}>
                            </div>
                        </div>
                    </a>
                    {signOut && <button onClick={handleSignout}>Sign-out</button>}
                    {!myAccount ?
                        <NavLink to='/login'>
                            <p style={headerTextStyle}><i className="fas fa-user-alt"></i></p>
                        </NavLink>
                        : <img id='userImage' src={myAccount[0].imageUrl} alt="User" onClick={() => setSignOut(!signOut)} />}
                    <NavLink to='/about'>
                        <p style={headerTextStyle}>About</p>
                    </NavLink>
                    <NavLink to='/admin'>
                        <p style={headerTextStyle}>Admin <i className="fas fa-users-cog"></i></p>
                    </NavLink>
                    <div id="navSetting" title='Settings' onClick={() => dispatch(handleMenu(true))}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
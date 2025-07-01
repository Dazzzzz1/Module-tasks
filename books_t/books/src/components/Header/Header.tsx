import './Header.scss'
import logo from '#imgs/logo.png'

import { useTheme } from '../../context/ThemeContext';

function Header() {
    const { theme, toggleTheme } = useTheme();
    return ( <>
    <header> 
        <div className="header_cont"> 
            <div className="header_left">
                <img className="logo_img" src={logo} alt="logo"/>
                <div className="logo">Modsen Books</div>
            </div>
            <button className="theme_toggle" onClick={toggleTheme}>
            {theme === 'light' ? <i className="fa-solid fa-moon"></i> : <i className="fa-solid fa-sun"></i>}
            </button>
        </div>
    </header>
    </> );
}

export default Header;
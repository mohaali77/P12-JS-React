import './style/Header.css'
import { Link } from 'react-router-dom'

import logo from '../../images/logo.png'

export function Header() {
    return <>
        <header>
            <img src={logo} alt="Logo du site web SportSee" />
            <nav>
                <Link to={'/'} ><div>Accueil</div></Link>
                <Link to={'/'} ><div>Profil</div></Link>
                <Link to={'/'} ><div>Réglage</div></Link>
                <Link to={'/'} ><div>Communauté</div></Link>
            </nav>
        </header>
    </>
}

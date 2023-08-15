import logo from '../images/logo.png'

export function Header() {
    return <>
        <header>
            <img src={logo} alt="Logo du site web SportSee" />
            <nav>
                <div>Accueil</div>
                <div>Profil</div>
                <div>Réglage</div>
                <div>Communauté</div>
            </nav>
        </header>
    </>
}

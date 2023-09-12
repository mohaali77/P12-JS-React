import { NavLink, Link } from "react-router-dom";
import './style/ErrorPage.css'

export function ErrorPage() {

    return <>
        <section id='error'>
            <div id='errorNumber'>Error 404</div>
            <div id='errorMessage'>La page que vous demandez n'existe pas.</div>
            <div id='returnHome'><Link to='/'>Retourner sur la page d’accueil</Link></div>
        </section>
    </>;
};



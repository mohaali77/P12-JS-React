//Import Fonctionnalités, Hook, Bibliothèque...
import { Link } from "react-router-dom";

// Import Données Mock
import { USER_MAIN_DATA } from '../../data/mock.js'

// Import CSS
import './style/HomePage.css'

export default function HomePage() {

    // On récupère les données du mock dans une constante
    const data = USER_MAIN_DATA

    return <>
        <ul className='users'>
            {
                // Pour chaque utilisateur, on va créer un lien qui le redirigera vers une page avec son id correspondant. 
                data.map((data, index) =>
                    <Link to={`/user/${data.id}`} key={data.id}>
                        <li>
                            Utilisateur{' ' + (index + 1)} : {data.userInfos.firstName}
                        </li>
                    </Link>
                )}
        </ul>
    </>;
};



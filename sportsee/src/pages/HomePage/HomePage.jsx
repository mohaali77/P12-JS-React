import { Link } from "react-router-dom";
import { USER_MAIN_DATA } from '../../data/mock.js'
import './style/HomePage.css'

export default function HomePage() {

    const data = USER_MAIN_DATA

    return <>
        <ul className='users'>
            {
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



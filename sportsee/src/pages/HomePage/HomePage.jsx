import { NavLink, Link } from "react-router-dom";
import { USER_MAIN_DATA } from '../../data/mock.js'

export default function HomePage() {

    const data = USER_MAIN_DATA

    return <>
        <ul className='homeUsers'>
            {
                data.map(data =>
                    <Link to={`/user/${data.id}`} key={data.id}>
                        <li>
                            User : {data.userInfos.firstName}
                        </li>
                    </Link>
                )}
        </ul>
    </>;
};



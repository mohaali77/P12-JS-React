import meditate from '../images/icon/meditate.png'
import musculation from '../images/icon/musculation.png'
import ridebike from '../images/icon/ridebike.png'
import swim from '../images/icon/swim.png'

import '../styles/Sidebar.css'

export function Sidebar() {
    return <>
        <nav>
            <img src={meditate} alt="" />
            <img src={musculation} alt="" />
            <img src={ridebike} alt="" />
            <img src={swim} alt="" />
            <div className='copiRyght'>Copiryght, SportSee 2020</div>
        </nav>
    </>
}

import meditate from '../images/icon/meditate.png'
import musculation from '../images/icon/musculation.png'
import ridebike from '../images/icon/ridebike.png'
import swim from '../images/icon/swim.png'

export function Sidebar({ fetchedData }) {

    console.log(fetchedData);

    // Vérifiez d'abord si 'data' est défini pour éviter les erreurs
    if (fetchedData && fetchedData.data && fetchedData.data.userInfos) {
        const { id, data: userData } = fetchedData;
        const { userInfos } = userData;

        console.log(id);
        console.log(userInfos.firstName);
        console.log(userInfos.lastName);
        console.log(userInfos.age);
        // ... autres informations de 'userInfos'
    } else {
        console.log("Aucune donnée d'utilisateur disponible.");
    }
    return <>
        <nav className='navigateProfile'>
            <div className='sportSelection'>
                <img src={meditate} alt="" />
                <img src={musculation} alt="" />
                <img src={ridebike} alt="" />
                <img src={swim} alt="" />
            </div>
            <div className='copiRyght'>Copiryght, SportSee 2020</div>
        </nav>
    </>
}

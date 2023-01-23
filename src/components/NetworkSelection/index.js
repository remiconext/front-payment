import styles from './Network.module.scss';
import ethereumLogo from '../../assets/Ethereum-Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'


function NetworkSelection({onClick,availableNetworks}){

    return(
        <div className={styles.body}>
            <div className={styles.label}>Select network : </div>
            {
                availableNetworks !== undefined && availableNetworks.map((network,index)=>
                    
                    <div key={index} className={styles.network} onClick={()=>onClick(network)}>
                        <img alt="logo " src={ethereumLogo}/>
                        <div className={styles.name}>{network}</div>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                    
                )
            }

        </div>
    )
}

export default NetworkSelection;
import styles from './Currency.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useEffect,useState } from 'react';


function CurrencySelection({onClick,selectedNetwork,listCurrencies,removeSelectedNetwork}){
    const [currencies,setCurrencies] = useState()

    useEffect(()=>{
        let currenciesList=[]
        for(const currency in listCurrencies){
            listCurrencies[currency].forEach(blockchain => {
                if(blockchain === selectedNetwork && !currenciesList.includes(currency)){
                    currenciesList.push(currency)
                }
            });  
        }
        setCurrencies(currenciesList)
    },[listCurrencies,selectedNetwork])

    return(
        <div className={styles.body}>
            <div className={styles.label}>Select currency : </div>
            {
                currencies !== undefined && currencies.map((currency,index)=>
                    <div key={index} className={styles.network} onClick={()=>onClick(currency)}>
                            {/*<img alt="logo " src={ethereumLogo}/>*/}
                            <div className={styles.name}>{currency}</div>
                            <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                )
            }
            <div className={styles.backButton + " back_btn"} onClick={removeSelectedNetwork}>Back</div>

        </div>
    )
}

export default CurrencySelection;
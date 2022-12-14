import styles from './Card.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useState,useEffect, useRef} from 'react';

function Card({logo,amount,currency,order,children,changeSelectedCurrency,network,listCurrencies}){
    const [showCurrencySelector, setShowCurrencySelector] = useState(false)
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setShowCurrencySelector(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);
    return(
        <div className={styles.card + " card_custom"}>
            <div className={styles.header + " header_custom"}>
                <div className={styles.priceContainer + " priceContainer_custom"}>
                    <div className={styles.price + " price_custom"}>
                        <div className={styles.amount+ " amount_custom"}>
                            {amount}
                        </div>
                        <div className={styles.currency + " currency_custom"}>
                            {currency} {network ===undefined && <FontAwesomeIcon onClick={()=>setShowCurrencySelector(true)} style={{cursor:"pointer"}} icon={faChevronDown} />}
                            {showCurrencySelector && network ===undefined && <li ref={ref} className={styles.currencySelection + " currencySelection_custom"}>
                                {
                                    Object.keys(listCurrencies).map((currency,i)=>
                                        <ul key={i} onClick={()=>{changeSelectedCurrency(currency);setShowCurrencySelector(false)}}>{currency}</ul>
                                    )
                                }
                                
                            </li>}
                        </div>
                    </div>
                </div>
                <div className={styles.order + " order_custom"}>Order #{order}</div>
                {logo !== undefined && <div className={styles.logo + " logo_custom"}><img src={logo} alt="logo"/></div>}
            </div>

            <div className={styles.body + " body_custom"}>
                {children}
            </div>
        </div>
    )
}
export default Card;
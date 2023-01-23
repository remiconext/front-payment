import styles from './Card.module.scss'

function Card({logo,amount,order,children,network}){    
    return(
        <div className={styles.card + " card_custom"}>
            <div className={styles.header + " header_custom"}>
                <div className={styles.priceContainer + " priceContainer_custom"}>
                    <div className={styles.price + " price_custom"}>
                        <div className={styles.amount+ " amount_custom"}>
                            {amount}$
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
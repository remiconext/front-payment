import styles from './Payment.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClone } from '@fortawesome/free-solid-svg-icons'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import QRCode from "react-qr-code";
import {useState,useEffect} from 'react';
import axios from 'axios';
import queryString from "query-string";
import jwt from "jsonwebtoken";

function Payment({network,amount,currency,removeSelectedCurrency}){
    const [copied,setCopied] = useState(false)
    const [address,setAddress] = useState()
    const [error,setError] = useState(undefined)

    useEffect(()=>{
        if(copied){
            setTimeout(()=>setCopied(false),2000)
        }
    },[copied]);

    useEffect(()=>{
        if(network !== undefined && currency !== undefined){
            const token = queryString.parse(window.location.search).token

            const config = {
                headers: { Authorization: `Bearer ${token}` }
                
    
            };
            axios.post(
                process.env.NODE_ENV==="production" ?  `${process.env.REACT_APP_API_URL}/new_payment`: `http://localhost:3001/new_payment`,
                {network:network,currency:currency},
                config
            ).then(
                (response)=>{
                    setAddress(response.data.address)
                }
            ).catch((e)=>{
                setError(e.response.data)
            })
        }

    },[network,currency]);

    useEffect(()=>{
        const token = queryString.parse(window.location.search).token
        const url=new URL(jwt.decode(token).redirect)
        const callback=url.href

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const interval = setInterval(() => {
            axios.get(
                process.env.NODE_ENV==="production" ?  `${process.env.REACT_APP_API_URL}/payment_state`: `http://localhost:3001/payment_state`,
                config
            ).then(
                (response)=>{
                    if(response.data.isTotalAmount){
                        window.location.replace(callback)
                    }
                }
            ).catch((e)=>{console.log(e)})
        },3000)
        return () => clearInterval(interval);

    },[]);

    return(
        <div className={styles.body}>
            {error===undefined ? 
            <>
                <div >
                    <div className={styles.label}>To pay, send {amount} {currency} to :</div>
                    <div className={styles.address}>
                        <span>{address}</span>
                        <CopyToClipboard 
                            text={address} 
                            onCopy={() => setCopied(true)}
                        >   
                            <FontAwesomeIcon icon={faClone} />
                        </CopyToClipboard>
                    </div>
                    {copied && <p className={styles.copied}>Copied</p>}
                </div>
                <QRCode 
                    value={`${network}:${address}`}
                    style={{left:"50%",position: "relative",transform: "translateX(-50%)"}}
                />
                <p className={styles.message}>Once the payment is done, you will be automaticaly redirected. It can take up to 15 minutes</p>
                <div className={styles.backButton + " back_btn"} onClick={removeSelectedCurrency}>Back</div>
            </> : (
                <div>{error}</div>
            )}
            
        </div>
    )
}
export default Payment
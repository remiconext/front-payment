import './App.css';
import Card from './components/Card'
import NetworkSelection from './components/NetworkSelection'
import Payment from './components/Payment'
import {useState,useEffect} from 'react'
import jwt from "jsonwebtoken"
import queryString from "query-string"
import axios from 'axios';


function App() {
  const [network,setNetwork] = useState()
  const [order, setOrder] = useState()
  const [price, setPrice] = useState()
  const [cssFile, setCssFile] = useState()
  const [logo, setLogo] = useState()
  const [queryParams, setQueryParams] = useState()

  const [selectedCurrency,setSelectedCurrency] = useState()
  const [listCurrencies,setListCurrencies] = useState()
  const [availableNetworks,setAvailableNetworks] = useState()

  useEffect(()=>{
    const queryParams = queryString.parse(window.location.search)
    setQueryParams(queryParams)
  },[])

  useEffect(()=>{
    if(queryParams !== undefined){
      let decoded = jwt.decode(queryParams.token)
      
      const uuidTable = decoded.callback.split("/")
      const uuid = uuidTable[uuidTable.length - 1]
  
      setPrice(decoded.amount)
  
      setLogo(decoded.logo)
      setOrder(uuid)
  
      setCssFile(decoded.css)
  
  
      axios.get(
        process.env.NODE_ENV==="production" ?  `${process.env.REACT_APP_API_URL}/available_currency` : "http://localhost:3001/available_currency"
      ).then(
          (response)=>{
              setSelectedCurrency(Object.keys(response.data)[0])
              setListCurrencies(response.data)
              let availableNetworksArray=[]
              for(const currency in response.data){
                response.data[currency].forEach(blockchain => {
                  if(!(availableNetworksArray.includes(blockchain))){availableNetworksArray.push(blockchain)}
                });  
              }
              setAvailableNetworks(availableNetworksArray)
          }
      ).catch((e)=>{console.log(e)})
    }
    
  
  },[queryParams])
  
  return (
    <div className="App">
      <link rel="stylesheet" type="text/css" href={cssFile} />
      <Card logo={logo} currency={selectedCurrency} listCurrencies={listCurrencies} network={network} changeSelectedCurrency={setSelectedCurrency} amount={price} order={order}>
        {
          network === undefined?
            <NetworkSelection listCurrencies={listCurrencies} availableNetworks={availableNetworks} selectedCurrency={selectedCurrency} onClick={setNetwork}/>
          :
            <Payment currency={selectedCurrency} amount={price} network={network} />
        }
      </Card>
    </div>
  );
}

export default App;

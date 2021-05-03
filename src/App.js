import React, { useEffect, useState } from "react";
import './App.css';
import axios from "axios";
import Coin from "./Coin";

function App() {
  const [search,setSearch]=useState('');
  const [coins,setCoins]=useState([]);

  useEffect(()=>{
     axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false")
     .then(res=> {
        setCoins(res.data);
        console.log(res.data);

     })
     .catch(error =>console.log("Error"));
      
  },[]);
    
const handleChange=e=>{
  setSearch(e.target.value);
}

const filteredCoins=coins.filter(coin=>
  coin.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="App">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input className="coin-input" placeholder="Search" type="text" onChange={handleChange}></input>
        </form>
        </div>
        {filteredCoins.map(coin=>{
          return (
            <Coin key={coin.id}
             name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              marketcap={coin.market_cap}
              price={coin.current_price}
              priceChange={coin.price_change_percentage_24h}
             volume={coin.total_volume}
              />
          )
        })}

  
    </div>
  );
}

export default App;

import React, { useState } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import styled from "styled-components";
import { useEffect } from 'react';

//interface
interface InfoData {
  id : string;
  name : string;
  symbol : string;
  rank : number;
  is_new : boolean;
  is_active : boolean;
  type : string;
  logo : string;
  description : string;
  message : string;
  open_source : boolean;
  started_at : string;
  development_status : string;
  hardware_wallet : boolean;
  proof_type : string;
  org_structure : string;
  hash_algorithm : string;
  whitepaper : object;
  first_data_at : string;
  last_data_at : string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date:string;
      ath_price:number;
      market_cap:number;
      market_cap_change_24h:number;
      percent_change_1h:number;
      percent_change_1y:number;
      percent_change_7d:number;
      percent_change_12h:number;
      percent_change_15m:number;
      percent_change_24h:number;
      percent_change_30d:number;
      percent_change_30m:number;
      percent_from_price_ath:number;
      price:number;
      volume_24h:number;
      volume_24h_change_24h:number;
    }
  };
}

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
font-size: 48px;
  color : ${(props) => props.theme.accentColor};
`;

const Loader = styled.p`
  text-align: center;
`

const Coin = () => {
    const {coinId} = useParams();
    const [loading, setLoading] = useState(true);
    const { state } = useLocation();
    const [info, setInfo] = useState<InfoData>();
    const [price, setPrice] = useState<PriceData>();

    useEffect(() => {
      (async() => {
        const infoData = await (
          await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
        ).json();
        const priceData = await (
          await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
        ).json();
        setInfo(infoData);
        setPrice(priceData);
        setLoading(false);

      }) ();
    }, []);

  return (
    <Container>
      <Header>
        <Title>
          {state?.name || "Loading..."}
        </Title>
      </Header>
      {loading ? <Loader>로딩즁...</Loader> : 
        <>
          <span>{ info?.name }</span>
          <span>{ price?.quotes.USD.ath_date }</span>
        </>
      }
    </Container>
  )
}

export default Coin
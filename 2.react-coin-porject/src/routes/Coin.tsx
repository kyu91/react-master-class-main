import { useParams, useLocation, Outlet, Link, useMatch } from 'react-router-dom';
import styled from "styled-components";
import { useQuery } from 'react-query';
import { fetchCoinsInfo, fetchCoinsTickers } from '../api';
import { Helmet } from 'react-helmet';
import { IoMdArrowRoundBack } from "react-icons/io";



// //interface
// interface InfoData {
//   id : string;
//   name : string;
//   symbol : string;
//   rank : number;
//   is_new : boolean;
//   is_active : boolean;
//   type : string;
//   logo : string;
//   description : string;
//   message : string;
//   open_source : boolean;
//   started_at : string;
//   development_status : string;
//   hardware_wallet : boolean;
//   proof_type : string;
//   org_structure : string;
//   hash_algorithm : string;
//   whitepaper : object;
//   first_data_at : string;
//   last_data_at : string;
// }

// interface PriceData {
//   id: string;
//   name: string;
//   symbol: string;
//   rank: number;
//   circulating_supply: number;
//   total_supply: number;
//   max_supply: number;
//   beta_value: number;
//   first_data_at: string;
//   last_updated: string;
//   quotes: {
//     USD: {
//       ath_date:string;
//       ath_price:number;
//       market_cap:number;
//       market_cap_change_24h:number;
//       percent_change_1h:number;
//       percent_change_1y:number;
//       percent_change_7d:number;
//       percent_change_12h:number;
//       percent_change_15m:number;
//       percent_change_24h:number;
//       percent_change_30d:number;
//       percent_change_30m:number;
//       percent_from_price_ath:number;
//       price:number;
//       volume_24h:number;
//       volume_24h_change_24h:number;
//     }
//   };
// }

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  /* display: flex;
  justify-content: center;
  align-items: center; */
`;

const Title = styled.h1`
  font-size: 48px;
  color : ${(props) => props.theme.accentColor};
  text-align: center;
  
`;

const Loader = styled.p`
  text-align: center;
`

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

const BackButton = styled.div`
  display: flex; 
  width: 30px;
  a {
    font-size: 30px;
  }
  
`

const Coin = () => {
  const { coinId } = useParams();
  const { state } = useLocation();
  //useRouteMatch hook: 유저가 있는 페이지가 url과 매칭이 된다면 리턴을 줌
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  /* const [loading, setLoading] = useState(true);
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
  }, [coinId]); */

  const { isLoading: infoLoding, data: infoData } = useQuery(["info", coinId], () => fetchCoinsInfo(coinId!));
  const { isLoading: tickersLoding, data: tickerData } = useQuery(
    ["tickers", coinId],
    () => fetchCoinsTickers(coinId!),
    {
      refetchInterval: 5000,
    }
  );

  const isLoading = infoLoding || tickersLoding;

  return (
    <Container>
      <Helmet>
        <title>{state?.name ? state.name : isLoading ? "Loading..." : infoData?.name}</title>
      </Helmet>
      <Header>
        <BackButton>
          <Link to="/">
            <IoMdArrowRoundBack />
          </Link>
        </BackButton>
        <Title>
          {state?.name ? state.name : isLoading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {isLoading ? <Loader>로딩즁...</Loader> :
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{tickerData?.quotes.USD.price}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickerData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickerData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          {/* 탭메뉴 */}
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          {/* 탭메뉴 컨탠츠 */}
          <Outlet context={{ coinId: coinId }} />
        </>
      }
    </Container>
  )
}

export default Coin
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoins } from '../api';
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from './atoms';

interface ICoin {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
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

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: black;
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
font-size: 48px;
  color : ${(props) => props.theme.accentColor};
`;

const Loader = styled.p`
  text-align: center;
`

const CoinImg = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`

const Coins = () => {
  const setIsDarkFn = useSetRecoilState(isDarkAtom);

  //react-query로 수정
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins)

  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>
          코인
        </Title>
        <button onClick={() => setIsDarkFn((prev) => !prev)}>Dark toogle</button>
      </Header>
      {isLoading ? <Loader>로딩즁...</Loader> :
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={`${coin.id}`}
                state={{ name: coin.name }}
              >
                <CoinImg alt={coin.name} src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>}

    </Container>
  )
}

export default Coins
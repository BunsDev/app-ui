import { DEI_COLLATERAL_STAKING, DEI_DEUS_STAKING, DEI_COLLATERAL_ZAP, DEI_DEUS_ZAP, DEUS_NATIVE_STAKING } from "./contracts"
import { deiDeusLpToken, deiCollateralLpToken, DeusNativeLpToken } from "./token"
import { ChainId } from "./web3"

export const urls = [{
  name: 'Mint',
  link: '/stable/mint'
},
{
  name: 'Redeem',
  link: '/stable/redeem'
},
{
  name: 'Zap',
  link: '/stable/zap'
},
{
  name: 'Farms',
  link: '/stable/farms'
},
{
  name: 'Buyback & Recollateralize',
  link: '/stable/buyback-recollat'
},
]

export const StakingConfig = {
  [ChainId.MATIC]: [
    {
      id: 0,
      title: "DEI-USDC",
      pic1: "/tokens/dei.svg",
      pic2: "/tokens/usdc.svg",
      depositToken: deiCollateralLpToken[ChainId.MATIC],
      stakingContract: DEI_COLLATERAL_STAKING[ChainId.MATIC],
      zapperContract: DEI_COLLATERAL_ZAP[ChainId.MATIC],
      provideLink: "https://quickswap.exchange/#/add/0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      apy: "35"
    },
    {
      id: 1,
      title: "DEI-DEUS",
      pic1: "/tokens/dei.svg",
      pic2: "/tokens/deus.svg",
      depositToken: deiDeusLpToken[ChainId.MATIC],
      stakingContract: DEI_DEUS_STAKING[ChainId.MATIC],
      zapperContract: DEI_DEUS_ZAP[ChainId.MATIC],
      provideLink: "https://quickswap.exchange/#/add/0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44/0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3",
      apy: "80"
    },
    {
      id: 2,
      title: "DEUS-MATIC",
      pic1: "/tokens/dei.svg",
      pic2: "/tokens/matic.png",
      depositToken: DeusNativeLpToken[ChainId.MATIC],
      stakingContract: DEUS_NATIVE_STAKING[ChainId.MATIC],
      zapperContract: DEI_DEUS_ZAP[ChainId.MATIC],
      provideLink: "https://quickswap.exchange/#/add/0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44/0x0d350B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
      apy: "35"
    }
  ],
  [ChainId.ETH]: [
    {
      id: 0,
      title: "DEI-USDC",
      pic1: "/tokens/dei.svg",
      pic2: "/tokens/usdc.svg",
      depositToken: deiCollateralLpToken[ChainId.ETH],
      stakingContract: DEI_COLLATERAL_STAKING[ChainId.ETH],
      zapperContract: DEI_COLLATERAL_ZAP[ChainId.ETH],
      provideLink: "https://curve.fi/factory/47/deposit",
      apy: "35"
    },
    {
      id: 1,
      title: "DEI-DEUS",
      pic1: "/tokens/dei.svg",
      pic2: "/tokens/deus.svg",
      depositToken: deiDeusLpToken[ChainId.ETH],
      stakingContract: DEI_DEUS_STAKING[ChainId.ETH],
      zapperContract: DEI_DEUS_ZAP[ChainId.ETH],
      provideLink: "https://app.uniswap.org/#/add/v2/0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3/0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44?use=V2",
      apy: "80"
    },
    {
      id: 2,
      title: "DEUS-ETH",
      pic1: "/tokens/deus.svg",
      pic2: "/tokens/eth_logo.svg",
      depositToken: DeusNativeLpToken[ChainId.ETH],
      stakingContract: DEUS_NATIVE_STAKING[ChainId.ETH],
      zapperContract: DEI_DEUS_ZAP[ChainId.ETH],
      provideLink: "https://app.uniswap.org/#/add/v2/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44?use=V2",
      apy: "35"
    }
  ],
}
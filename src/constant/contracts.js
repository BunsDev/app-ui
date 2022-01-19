import { ChainId } from './web3'

export const MULTICALL_NETWORKS = {
  [ChainId.ETH]: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
  [ChainId.ROPSTEN]: '0x53C43764255c17BD724F74c4eF150724AC50a3ed',
  [ChainId.RINKEBY]: '0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821',
  [ChainId.FTM]: '0x63B8310c5093ac917552931D8b15d5AB6945c0a6',
  [ChainId.FTM_TESTNET]: '0xA740811dBA35B719DAc61395A913dE67AA60a415',
  [ChainId.XDAI]: '0xb5b692a88BDFc81ca69dcB1d924f59f0413A602a',
  [ChainId.BSC]: '0xe348b292e8eA5FAB54340656f3D374b259D658b8',
  [ChainId.BSC_TESTNET]: '0xe348b292e8eA5FAB54340656f3D374b259D658b8',
  [ChainId.HECO]: '0xc9a9F768ebD123A00B52e7A0E590df2e9E998707',
  [ChainId.HECO_TESTNET]: '0x935Bfe9AfaA2Be26049ea4EDE40A3A2243361F87',
  [ChainId.MATIC]: '0x95028E5B8a734bb7E2071F96De89BABe75be9C8E',
  [ChainId.MATIC_TESTNET]: '0x9Fc8e50Eb08C1F463b45d1AFb9c261B0a1903006',
  [ChainId.AVALANCHE]: '0x0FB54156B496b5a040b51A71817aED9e2927912E',
}

export const SEALED_ADDRESS = '0xd8cb412e40447eefc7ddab672f1001c5e039f166'



export const MUON_PRESALE_ADDRESS = {
  [ChainId.ETH]: '0xA0b0AA5D2bd1738504577E1883537C9af3392454',
  [ChainId.MATIC]: '0x6D8f193469731F11B51b71Ef49E4aDc754EE2cE8',
  [ChainId.XDAI]: '0x059ce16319Da782E2909c9e15f3232233649a321',
  [ChainId.BSC]: '0x059ce16319Da782E2909c9e15f3232233649a321',
}

export const MIGRATOR_ADDRESS = {
  [ChainId.RINKEBY]: '0xAD87A38efc21B5Ce2C15431A0c493C6645e4D81C',
  [ChainId.MATIC]: '0xD6739b3012Dd4179C0Cb45C57e6eADD063983143',
  [ChainId.ETH]: '0xD6739b3012Dd4179C0Cb45C57e6eADD063983143',
}

//START DEI
export const COLLATERAL_ADDRESS = {
  [ChainId.MATIC]: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  [ChainId.ETH]: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  [ChainId.FTM]: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
  [ChainId.BSC]: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  [ChainId.BSC_TESTNET]: '0xffc38e278121b41983FFe996317bcA3D197F44A3',
}

export const ORACLE_ADDRESS = {
  [ChainId.MATIC]: '0x3967e99B02d86ffc84fb69Fd9a7C136952906201',
  [ChainId.ETH]: '0x3967e99B02d86ffc84fb69Fd9a7C136952906201',
  [ChainId.FTM]: '0x3967e99B02d86ffc84fb69Fd9a7C136952906201',
  [ChainId.BSC]: '0x3967e99B02d86ffc84fb69Fd9a7C136952906201',
  [ChainId.BSC_TESTNET]: '0x3967e99B02d86ffc84fb69Fd9a7C136952906201',
}

export const DEI_ADDRESS = {
  [ChainId.MATIC]: '0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3',
  [ChainId.ETH]: '0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3',
  [ChainId.FTM]: '0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3',
  [ChainId.BSC]: '0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3',
  [ChainId.BSC_TESTNET]: '0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3',
}

export const DEUS_ADDRESS = {
  [ChainId.MATIC]: '0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44',
  [ChainId.ETH]: '0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44',
  [ChainId.FTM]: '0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44',
  [ChainId.BSC]: '0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44',
  [ChainId.BSC_TESTNET]: '0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44',
}

export const VE_DEUS_ADDRESS = {
  [ChainId.MATIC]: '0x4D3A7828aa8a7f579c4cD8f5Ba96b2AFCA0150ba',
}

export const DEI_POOL_ADDRESS = {
  // DEI Pool library
  [ChainId.MATIC]: '0xc63eAf6BC162531b153Dfc61F225E62d2edB4488',
  [ChainId.ETH]: '0xc63eAf6BC162531b153Dfc61F225E62d2edB4488',
  [ChainId.FTM]: '0xc63eAf6BC162531b153Dfc61F225E62d2edB4488',
  [ChainId.BSC]: '0xc63eAf6BC162531b153Dfc61F225E62d2edB4488',
  [ChainId.BSC_TESTNET]: '0xc63eAf6BC162531b153Dfc61F225E62d2edB4488',
}

export const COLLATERAL_POOL_ADDRESS = {
  [ChainId.MATIC]: '0xa0F395aD5df1Fceb319e162CCf1Ef6645dE8508f',
  [ChainId.ETH]: '0xa0F395aD5df1Fceb319e162CCf1Ef6645dE8508f',
  [ChainId.FTM]: '0xa0F395aD5df1Fceb319e162CCf1Ef6645dE8508f',
  [ChainId.BSC]: '0xa0F395aD5df1Fceb319e162CCf1Ef6645dE8508f',
  [ChainId.BSC_TESTNET]: '0xa0F395aD5df1Fceb319e162CCf1Ef6645dE8508f',
}


export const PROXY_MINT_ADDRESS = {
  [ChainId.MATIC]: '0x8E17742983CBa809bc554868D8a69A37e3a8a207',
  [ChainId.ETH]: '0xB095aA0A0A206ed943FAA7f5BD28A47Aaf2fEc09',
}

export const DEUS_SWAP_ADDRESS = {
  [ChainId.ETH]: '0x45558df54A0CD8dF50134E8675DB1A39815E7768',
  [ChainId.MATIC]: "0xEa798f9c3eDD2A66ec036Ec754BB4561074DaCA2",
}

//LP
export const DEI_DEUS_LP = {
  [ChainId.MATIC]: '0x2Bc3ce6D7cfc0B476E60aDaA1B27DE76DB95EE4e',
  [ChainId.ETH]: '0xd6dd359B8C9d18CCB3FE8627060F88D1776d2993',
  [ChainId.FTM]: "0xdDC92fcEd95e913728CBc8f197A4E058062Bd4b6",
}

export const DEI_COLLATERAL_LP = {
  [ChainId.MATIC]: "0xD4F9134ba896FB6901CD6A5EA4EEB683eb1c15c6",
  [ChainId.ETH]: '0x6870F9b4DD5d34C7FC53D0d85D9dBd1aAB339BF7',
  [ChainId.FTM]: "0x8eFD36aA4Afa9F4E157bec759F1744A7FeBaEA0e",
}

export const DEUS_NATIVE_LP = {
  [ChainId.MATIC]: "0x6152943b506211ce1FA872702a1b0bc594Cfa2d2",
  [ChainId.ETH]: '0x367E2D443988E4b222FBFdAFDb35eeB7ddA9FBB7',
  [ChainId.FTM]: "0x2599Eba5fD1e49F294C76D034557948034d6C96E",
}

/************STAKING****************/
export const DEUS_NATIVE_STAKING = {
  [ChainId.MATIC]: "0x4C48f1421F62d923d9130834135FB4A58E2F4298",
  [ChainId.ETH]: '0x4C48f1421F62d923d9130834135FB4A58E2F4298',
  [ChainId.FTM]: '0x06EAA3cefb69509865CF8B8CED1A7E7581bB7030',
}

export const DEI_DEUS_STAKING = {
  [ChainId.MATIC]: "0x4e5D8794f08F2792DC51016d0a4b9A205cAFc63A",
  [ChainId.ETH]: '0x4e5D8794f08F2792DC51016d0a4b9A205cAFc63A',
  [ChainId.FTM]: '0x4e5D8794f08F2792DC51016d0a4b9A205cAFc63A',
}

export const DEI_COLLATERAL_STAKING = {
  [ChainId.MATIC]: "0xa78Ea447ce5AA4669A5f0cD8D27bF5883E1Bf20f",
  [ChainId.ETH]: '0xa78Ea447ce5AA4669A5f0cD8D27bF5883E1Bf20f',
  [ChainId.FTM]: '0xa78Ea447ce5AA4669A5f0cD8D27bF5883E1Bf20f',
}

/************ZAPPER****************/
export const DEI_COLLATERAL_ZAP = {
  [ChainId.MATIC]: "0xeb562C1DE6806081760b9B81Dc68f1bA69835C0f",
}

export const DEI_DEUS_ZAP = {
  [ChainId.MATIC]: "0xeFc49A08B75ebc42196B45Db51c9110B4A09Edd7",
  [ChainId.ETH]: '0x38C89aE559cc0A2a81aa40D173919Aaa79Dc0bD9',
}

export const DEUS_NATIVE_ZAP = {
  [ChainId.MATIC]: "0x6dcCE3217710a2104FCFb9113E4E68225a3B6107",
  [ChainId.ETH]: '0xd8e79FeC03dd3ca0dCF4d7525d2dC438E8Fc0606',
}


//WRAP NATIVE
export const WMaticAddress = {
  [ChainId.MATIC]: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
}

export const WFTMAddress = {
  [ChainId.FTM]: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83",
}

export const WETHAddress = {
  [ChainId.MATIC]: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
  [ChainId.ETH]: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  [ChainId.BSC]: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
}

export const TO_NATIVE_PATH = {
  [ChainId.MATIC]: {
    MATIC: [WMaticAddress[ChainId.MATIC]],
    DEUS: [DEUS_ADDRESS[ChainId.MATIC], WMaticAddress[ChainId.MATIC]],
    DEUS_edited: [DEUS_ADDRESS[ChainId.MATIC], DEI_ADDRESS[ChainId.MATIC], COLLATERAL_ADDRESS[ChainId.MATIC], WMaticAddress[ChainId.MATIC]],
    DEI: [DEI_ADDRESS[ChainId.MATIC], COLLATERAL_ADDRESS[ChainId.MATIC], WMaticAddress[ChainId.MATIC]],
    WETH: [WETHAddress[ChainId.MATIC], COLLATERAL_ADDRESS[ChainId.MATIC], WMaticAddress[ChainId.MATIC]],
    USDC: [COLLATERAL_ADDRESS[ChainId.MATIC], WMaticAddress[ChainId.MATIC]],
    WBTC: ["0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6", COLLATERAL_ADDRESS[ChainId.MATIC], WMaticAddress[ChainId.MATIC]],
  },
  [ChainId.ETH]: {
    ETH: [WETHAddress[ChainId.ETH]],
    WETH: [WETHAddress[ChainId.ETH]],
    DEUS: [DEUS_ADDRESS[ChainId.ETH], DEI_ADDRESS[ChainId.ETH], COLLATERAL_ADDRESS[ChainId.ETH], WETHAddress[ChainId.ETH]],
    DEI: [DEI_ADDRESS[ChainId.ETH], COLLATERAL_ADDRESS[ChainId.ETH], WETHAddress[ChainId.ETH]],
    USDC: [COLLATERAL_ADDRESS[ChainId.ETH], WETHAddress[ChainId.ETH]],
  },
}

export const MINT_PATH = { // TO_USDC_PATH
  [ChainId.MATIC]: {
    DEUS: [DEUS_ADDRESS[ChainId.MATIC], WMaticAddress[ChainId.MATIC], COLLATERAL_ADDRESS[ChainId.MATIC]],
    DEUS_edited: [DEUS_ADDRESS[ChainId.MATIC], DEI_ADDRESS[ChainId.MATIC], COLLATERAL_ADDRESS[ChainId.MATIC]],
    DEI: [DEI_ADDRESS[ChainId.MATIC], COLLATERAL_ADDRESS[ChainId.MATIC]],
    WETH: [WETHAddress[ChainId.MATIC], COLLATERAL_ADDRESS[ChainId.MATIC]],
    USDC: [COLLATERAL_ADDRESS[ChainId.MATIC]],
    MATIC: [WMaticAddress[ChainId.MATIC], COLLATERAL_ADDRESS[ChainId.MATIC]]
  },
  [ChainId.RINKEBY]: {
    DEUS: [DEUS_ADDRESS[ChainId.RINKEBY], DEI_ADDRESS[ChainId.RINKEBY]],
    ETH: ['0xc778417e063141139fce010982780140aa0cd5ab', COLLATERAL_ADDRESS[ChainId.RINKEBY]],
    USDC: [COLLATERAL_ADDRESS[ChainId.RINKEBY]],
    HUSD: ['0x8313949568A16b2Cc786Af26F363071777Af4b8b', COLLATERAL_ADDRESS[ChainId.RINKEBY]],
    DEI: [DEI_ADDRESS[ChainId.RINKEBY], COLLATERAL_ADDRESS[ChainId.RINKEBY]]
  },
  [ChainId.ETH]: {
    DEUS: [DEUS_ADDRESS[ChainId.ETH], DEI_ADDRESS[ChainId.ETH], COLLATERAL_ADDRESS[ChainId.ETH]],
    ETH: [WETHAddress[ChainId.ETH], COLLATERAL_ADDRESS[ChainId.ETH]],
    USDC: [COLLATERAL_ADDRESS[ChainId.ETH]],
    DAI: ['0x6B175474E89094C44Da98b954EedeAC495271d0F', COLLATERAL_ADDRESS[ChainId.ETH]],
    DEI: [DEI_ADDRESS[ChainId.ETH], COLLATERAL_ADDRESS[ChainId.ETH]],
    wBTC: ['0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', WETHAddress[ChainId.ETH], COLLATERAL_ADDRESS[ChainId.ETH]]
  },
  [ChainId.BSC]: {
    DEUS: [DEUS_ADDRESS[ChainId.BSC], DEI_ADDRESS[ChainId.BSC], COLLATERAL_ADDRESS[ChainId.BSC]],
    DEI: [DEI_ADDRESS[ChainId.BSC], COLLATERAL_ADDRESS[ChainId.BSC]],
    WETH: [WETHAddress[ChainId.BSC], COLLATERAL_ADDRESS[ChainId.BSC]],
    USDC: [COLLATERAL_ADDRESS[ChainId.BSC]],
  },
}

//END DEI
export const BRIDGE_ADDRESS = {
  [ChainId.FTM]: '0x7aB4C5738e39E613186AFFD4c50DbfDFF6c22065',
  [ChainId.BSC]: '0x70A4c35eABFa973B27Cb3d489e154DB6d9A24ebD',
  [ChainId.ETH]: '0x7aB4C5738e39E613186AFFD4c50DbfDFF6c22065',
  [ChainId.MATIC]: '0x7aB4C5738e39E613186AFFD4c50DbfDFF6c22065',
  [ChainId.RINKEBY]: '0x64F1CECCBbD039f70E8CB600a94429671629e418',
  [ChainId.BSC_TESTNET]: '0x135Bd7be1c1e2162d4C8AEdD551bB1758C3AB110',
}

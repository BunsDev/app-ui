import BigNumber from "bignumber.js"
import { HUSD_POOL_ADDRESS } from "../constant/contracts"
import { ChainMap } from "../constant/web3"
import { formatUnitAmount } from "../utils/utils"
import { getDeiContract, getDeiPoolContract, getHusdPoolContract } from "./contractHelpers"
import { fromWei } from "./formatBalance"
import { fetcher } from "./muonHelper"


const baseUrl = "https://oracle4.deus.finance/dei"

export const dollarDecimals = 6

export const makeCostData = (deiPrice, collatRatio, poolBalance, ceiling) => {
    const dp = deiPrice ? `$${new BigNumber(fromWei(deiPrice, dollarDecimals)).toFixed(2)}` : null
    const cr = collatRatio ? `${new BigNumber(collatRatio).toFixed(2)}%` : null
    const pc = poolBalance && ceiling ? formatUnitAmount(fromWei(poolBalance, dollarDecimals)) + ' / ' + formatUnitAmount(fromWei(ceiling, dollarDecimals)) : null
    const av = pc ? formatUnitAmount(fromWei(new BigNumber(poolBalance).minus(ceiling), dollarDecimals)) : null
    return [{
        name: 'DEI PRICE',
        value: dp
    }, {
        name: 'COLLATERAL RATIO',
        value: cr
    }, {
        name: 'POOL BALANCE / CEILING',
        value: pc
    }, {
        name: 'AVAILABLE TO MINT',
        value: av
    }]
}

export const makeCostDataRedeem = (collatRatio, redemptionFee, poolBalance) => {
    const cr = collatRatio ? `${new BigNumber(collatRatio).toFixed(2)}%` : null
    const pb = poolBalance ? `${formatUnitAmount(fromWei(poolBalance))} HUSD` : null
    return [{
        name: 'COLLATERAL RATIO',
        value: cr
    }, {
        name: 'POOL BALANCE',
        value: pb
    }]
}

export const makeCostDataBuyBack = (pool) => {
    const p = pool ? pool : null
    return [{
        name: 'EXCHANGE RATES',
        title1: 'USDC: ',
        value1: '$1.000',
        title2: 'DEI: ',
        value2: '$874.34'
    }, {
        name: 'POOL 🌊',
        value1: p,
    }]
}

export const makeDeiRequest = async (path) => {
    return fetcher(baseUrl + path)
}


export const getHusdPoolData = (chainId = ChainMap.RINKEBY, collat_usd_balance = 1000000) => {

    const calls = [
        {
            address: HUSD_POOL_ADDRESS[chainId],
            name: 'collatDollarBalance',
            params: [collat_usd_balance],
        },
        {
            address: HUSD_POOL_ADDRESS[chainId],
            name: 'pool_ceiling',
        },
        {
            address: HUSD_POOL_ADDRESS[chainId],
            name: 'redemption_fee',
        },
        {
            address: HUSD_POOL_ADDRESS[chainId],
            name: 'minting_fee',
        },
        {
            address: HUSD_POOL_ADDRESS[chainId],
            name: 'buyback_fee',
        },
        {
            address: HUSD_POOL_ADDRESS[chainId],
            name: 'recollat_fee',
        },
    ]
    return calls
}


export const mintDei = async (amountIn1, DEI_out_min = "0", collateral_price, expire_block, signature, account, chainId, web3) => {
    return getHusdPoolContract(web3, chainId)
        .methods
        .mint1t1DEI(amountIn1, DEI_out_min, collateral_price, expire_block, [signature])
        .send({ from: account })
}

export const mintFractional = async (collateral_price, deus_current_price, expireBlock, signature, collateral_amount, deus_amount, DEI_out_min = "0", account, chainId, web3) => {
    return getHusdPoolContract(web3, chainId)
        .methods
        .mintFractionalDEI(collateral_price, deus_current_price, expireBlock, [signature], collateral_amount, deus_amount, DEI_out_min)
        .send({ from: account })
}

export const mintAlgorithmic = async (amountIn1, DEI_out_min = "0", collateral_price, expire_block, signature, account, chainId, web3) => {
    return getHusdPoolContract(web3, chainId)
        .methods
        .mint1t1DEI(amountIn1, DEI_out_min, collateral_price, expire_block, [signature])
        .send({ from: account })
}



export const collatDei = async (amountIn, DEI_out_min = "0", collateral_price, expire_block, signature, account, chainId, web3) => {
    // console.log(amountIn, DEI_out_min, collateral_price, expire_block, signature);
    return getHusdPoolContract(web3, chainId)
        .methods
        .redeem1t1DEI(amountIn, DEI_out_min, collateral_price, expire_block, [signature])
        .send({ from: account })
}

export const getRedeemDEUSBalances = async (account, web3, chainId = ChainMap.RINKEBY) => {
    return getHusdPoolContract(web3, chainId)
        .methods
        .redeemDEUSBalances(account)
        .call()
}

export const getRedeemCollateralBalances = async (account, web3, chainId = ChainMap.RINKEBY) => {
    return getHusdPoolContract(web3, chainId)
        .methods
        .redeemCollateralBalances(account)
        .call()
}

export const getClaimAll = async (account, web3, chainId = ChainMap.RINKEBY) => {
    return getHusdPoolContract(web3, chainId)
        .methods
        .collectRedemption()
        .send({ from: account })
}

export const getDeiInfo = async (web3, chainId = ChainMap.RINKEBY, collat_usd_balance = 1000000) => {
    return getDeiContract(web3, chainId)
        .methods
        .dei_info(collat_usd_balance)
}

export const getCollatDollarBalance = async (web3, chainId = ChainMap.RINKEBY, collat_usd_balance = 1000000) => {
    return getHusdPoolContract(web3)
        .methods
        .collatDollarBalance(collat_usd_balance)
        .call()
}

export const getPoolCeiling = async (web3, chainId = ChainMap.RINKEBY) => {
    return getHusdPoolContract(web3)
        .methods
        .pool_ceiling()
        .call()
}




export const getRedemptionFee = async (web3, chainId = ChainMap.RINKEBY, collat_usd_balance = 1000000) => {
    return getHusdPoolContract(web3)
        .methods
        .redemption_fee()
        .call()
}

export const getCollatRatio = async (web3, chainId = ChainMap.RINKEBY, collat_usd_balance = 1000000) => {
    return getDeiContract(web3, chainId)
        .methods
        .dei_info(collat_usd_balance)
        .call()
}

export const getMintingFee = async (web3, chainId = ChainMap.RINKEBY) => {
    return getHusdPoolContract(web3)
        .methods
        .minting_fee()
        .call()
}

export const getBuyBackFee = async (web3, chainId = ChainMap.RINKEBY) => {
    return getHusdPoolContract(web3)
        .methods
        .buyback_fee()
        .call()
}

export const getRecollatFee = async (web3, chainId = ChainMap.RINKEBY) => {
    return getHusdPoolContract(web3)
        .methods
        .recollat_fee()
        .call()
}

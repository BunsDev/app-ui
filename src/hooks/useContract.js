import { isAddress } from '@ethersproject/address'
import { useWeb3React } from '@web3-react/core'
import { useMemo } from 'react'
import {
    getDeusAutomaticMarketMakerContract,
    getERC20Contract,
    getVeDEUSContract
} from '../helper/contractHelpers'
import useWeb3, { useCrossWeb3 } from './useWeb3'
import { VE_DEUS_ADDRESS } from '../constant/contracts';


export const useERC20 = (address) => {
    const web3 = useWeb3()
    return useMemo(() => {
        if (!isAddress(address)) return null
        return getERC20Contract(address, web3)
    }, [address, web3])
}

export const useVeDEUS = (chainId) => {
    const web3 = useWeb3(chainId)
    return useMemo(() => {
        return getVeDEUSContract(VE_DEUS_ADDRESS[chainId ?? 137], web3)
    }, [chainId, web3])
}

export const useCrossERC20 = (address, web3) => {
    return useMemo(() => {
        if (!isAddress(address)) return null
        return getERC20Contract(address, web3)
    }, [address, web3])
}

export const useDeusAMM = (address) => {
    const web3 = useWeb3()
    const { chainId } = useWeb3React()
    return useMemo(() => getDeusAutomaticMarketMakerContract(address, web3, chainId), [address, web3, chainId])
}


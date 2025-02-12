import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { ButtonSyncDeactivated, ButtonSyncActive } from '../Button';
import { FlexCenter } from '../Container';
import { WaveLoading } from 'react-loadingg';
import { useWeb3React } from '@web3-react/core';
import { isGt, isZero } from '../../../constant/number';
import Wallets from '../../common/Navbar/Wallets';
import { addRPC } from '../../../utils/addRPC';
import { NameChainId } from '../../../constant/web3';


const errors = {
    NotConnected: "CONNECT WALLET",
    SWITCH: "SWITCH TO",
    EMPTY: "ENTER AN AMOUNT",
    INSUFFICIENT: "INSUFFICIENT BALANCE",
    LOADING: "LOADING...",
}

const WrapActions = styled.div`
    margin-top:33px;
    height: "55px";
    display:flex;
    font-size:20px;
    font-family:"Monument Grotesk Semi";
    & > button {
        margin:0px 5px;
    }
`
const ButtonSwap = styled(ButtonSyncActive)`
    background: ${({ theme, bgColor }) => bgColor ? theme[bgColor] : theme.grad3};
    color: ${({ theme, txColor }) => txColor ? theme[txColor] : theme.text1_2};
    font-size:${({ fontSize }) => fontSize || "20px"};
    ${({ theme }) => theme.mediaWidth.upToSmall`
          font-size: 15px;
  `}
`

const WrapStep = styled(FlexCenter)`
    margin-top:10px;
`

const CycleNumber = styled(FlexCenter)`
    width:20px;
    height:20px;
    border-radius:20px;
    font-weight:400;
    background: ${({ theme, bgColor, active }) => active ? bgColor ? theme[bgColor] : theme.grad3 : theme.border1};
    color: ${({ theme, active, txColor }) => active ? txColor ? theme[txColor] : theme.text1_2 : theme.text1};
    z-index: 0;
    font-size:12px;
    margin:0 -1px;
`
const Line = styled.div`
    background: ${({ theme, bgColor }) => bgColor ? theme[bgColor] : theme.grad3} ;
    height: 2px;
    width: 50%;
`
const SwapAction = ({ text = "SWAP", isPreApproved, amountIn, amountOut, swapState, TokensMap, isApproved, loading, validNetwork, handleApprove, handleSwap, bgColor, txColor }) => {

    const { account, chainId } = useWeb3React()
    const [showWallets, setShowWallets] = useState(false)

    const checkError = () => {
        if (amountIn === "" || isZero(amountIn)) return errors.EMPTY
        if (TokensMap && isGt(amountIn, TokensMap[swapState.from.address]?.balance)) return errors.INSUFFICIENT
        if (isNaN(amountOut)) return errors.LOADING
        return null;
    }

    useEffect(() => {
        if (account)
            setShowWallets(false)
    }, [account])

    if (!account) {
        return <WrapActions>
            <Wallets showWallets={showWallets} setShowWallets={setShowWallets} />
            <ButtonSwap txColor={txColor} bgColor={bgColor} active={true} onClick={() => setShowWallets(true)}>
                CONNECT WALLET
            </ButtonSwap>
        </WrapActions>
    }

    if (chainId && chainId !== validNetwork) {
        return <WrapActions>
            <Wallets showWallets={showWallets} setShowWallets={setShowWallets} />
            <ButtonSwap txColor={txColor} bgColor={bgColor} active={true} onClick={() => addRPC(account, validNetwork)}>
                SWITCH TO {NameChainId[validNetwork].toUpperCase()}
            </ButtonSwap>
        </WrapActions>
    }


    if (checkError()) {
        return <WrapActions>
            <ButtonSyncDeactivated >{checkError()}</ButtonSyncDeactivated>
        </WrapActions>
    }

    if (isPreApproved == null) {
        return <WrapActions>
            <ButtonSyncDeactivated>
                <WaveLoading />
            </ButtonSyncDeactivated>
        </WrapActions>
    }

    return (<>
        {isPreApproved ?
            <WrapActions>
                <ButtonSwap active={true} fontSize={"25px"} onClick={handleSwap} txColor={txColor} bgColor={bgColor}>{text}</ButtonSwap>
            </WrapActions> : <>
                <WrapActions>
                    {!isApproved ? <>
                        <ButtonSwap txColor={txColor} bgColor={bgColor} active={true} onClick={handleApprove} >
                            APPROVE
                            {loading && <img style={{ position: "absolute", right: "10px" }} alt="sp" src="/img/spinner.svg" width="35" height="35" />}
                        </ButtonSwap>
                        <ButtonSyncDeactivated> {text}</ButtonSyncDeactivated>
                    </> : <>
                        <ButtonSyncDeactivated>APPROVED</ButtonSyncDeactivated>
                        <ButtonSwap txColor={txColor} bgColor={bgColor} active={true} onClick={handleSwap}>
                            {text}
                        </ButtonSwap>
                    </>
                    }
                </WrapActions>
                <WrapStep bgColor={bgColor}>
                    <CycleNumber bgColor={bgColor} active={true}>1</CycleNumber>
                    <Line bgColor={bgColor}></Line>
                    <CycleNumber bgColor={bgColor} active={isApproved}>2</CycleNumber>
                </WrapStep>
            </>
        }
    </>);
}

export default SwapAction;
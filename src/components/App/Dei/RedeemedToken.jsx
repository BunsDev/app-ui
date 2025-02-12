import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components'
import ReactTooltip from "react-tooltip";
import { useRecoilValue } from 'recoil';
import { Flex, Text } from 'rebass/styled-components';
import { AlertCircle } from 'react-feather';
import DefaultLogo from '../../.../../../assets/images/empty-token.svg'
import { husdPoolDataState } from '../../../store/dei'
import { useClaimRedeemedTokens, useRedeemClaimTools } from '../../../hooks/useDei';
import useRefresh from "../../../hooks/useRefresh";
import { fromWei } from "../../../helper/formatBalance";
import { handleSmallBalance } from "../../../utils/utils";

const SmallWrapper = styled.div`
    padding:0 20px;
    width: 560px;
    background: #0D0D0D;
    border: 1px solid #1C1C1C;
    border-radius: 15px;
    min-height: 85px;
    text-align:center;
    margin: 0 auto;
    width:100%;
    max-width:500px;
`


export const InfoTextWrapper = styled.div`
     max-width:700px;
     width:80%;
     margin:auto;
    ${({ theme }) => theme.mediaWidth.upToLarge`
     max-width:500px;
    
  `}
`

const MyText = styled(Text)`
    margin: 20px 0px;
    box-sizing: border-box;
    font-size: 12px;
    opacity: 0.75;
    display: flex;
`

const TextWrapper = styled(Text)`
  color: ${({ color, theme }) => (theme)[color]};
  font-size: 16px;
  opacity: 0.75;
  text-align: left;
  margin-left: 7px;
`

const NumberWrapper = styled(Text)`
  color: ${({ color, theme }) => (theme)[color]};
  opacity: 0.75;
  font-size: 14px;
  margin-left: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const TokenInfo = styled(Flex)`
  border-top: 1px solid ${({ theme }) => theme.bg5};
  padding: 12px 0px;
  align-items:center;
  background-color: #0D0D0D;
`

const StyledLogo = styled.img`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  vertical-align: "middle";
`

const ClaimButton = styled.div`
  max-width: 297px;
  height: 24px;
  border-radius: 10px;
  font-style: normal;
  font-weight: normal;
  font-size: 6px;
  line-height: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: "Monument Grotesk Semi";
  font-size: 14px;
  line-height: 17px;
  background-color: ${({ disabled }) => disabled ? "#333333" : "#325cfe"};
  color: #FFF;
  cursor: ${({ disabled }) => disabled ? null : "pointer"};
  padding: 15px 0px;
  width: 100px;
  margin-left: auto;
`

function CurrencyLogo({
    symbol,
    logo,
    size = '25px',
}) {
    return <StyledLogo size={size} src={logo || DefaultLogo} alt={`${symbol ?? 'token'} logo`} />
}

const IMG = <img src="/img/spinner.svg" width="20" height="20" alt="sp" />
const IMG_GOLD = <img src="/img/spinner-gold.svg" width="25" height="25" alt="sp" />

const ClaimTokenRow = ({ token, handleClaim, remainingWaitTime, amount, disabledTip, tipId, amountError, loading }) => {

    const onClaim = useCallback(
        () => {
            if (!loading) {
                handleClaim()
            }
        },
        [handleClaim, loading],
    );

    const amountDisplay = useMemo(() => {
        if (!amount) return IMG
        return handleSmallBalance(amount, 3)
    }, [amount])

    return (
        <TokenInfo>

            <CurrencyLogo symbol={token.symbol} logo={token.logo} />

            <TextWrapper color="text1"> {token.symbol} </TextWrapper>

            <NumberWrapper>
                {amountError ?
                    <AlertCircle color={"#ffe7a1"} size={'15px'} data-tip data-for={'amount-error-' + tipId} /> : amountDisplay}
            </NumberWrapper>
            <ClaimButton data-tip data-for={'disabled-tip-' + tipId} onClick={onClaim} disabled={disabledTip}>
                {loading ? IMG_GOLD : (remainingWaitTime ?? 'Claim')}</ClaimButton>


            {amountError && <ReactTooltip id={'amount-error-' + tipId} place="bottom" effect="solid" type="info">
                <div>{amountError}</div>
            </ReactTooltip>}

            {disabledTip && <ReactTooltip id={'disabled-tip-' + tipId} place="bottom" effect="solid" type="info">
                <div>{disabledTip}</div>
            </ReactTooltip>}
        </TokenInfo>
    )
}

const CollateralClaim = ({ theCollateralToken, chainId, onClaimDone }) => {
    const poolData = useRecoilValue(husdPoolDataState)
    const { fastRefresh } = useRefresh()
    const [remainingWaitTime, setRemainingWaitTime] = useState(null);
    const { onCollectCollateral } = useClaimRedeemedTokens(chainId)
    const { redeemCollateralBalances, diffTimeStampStr } = useRedeemClaimTools()
    const mounted = useRef(false);
    const [loading, setLoading] = useState(false);

    const handleClaim = useCallback(async () => {
        setLoading(true);
        if (!remainingWaitTime) {
            try {
                const tx = await onCollectCollateral()
                if (tx && tx.status) {
                    console.log("claim did");
                    onClaimDone()
                } else {
                    console.log("claim Failed");
                }
            } catch (e) {
                console.error(e)
            }
        }
        if (mounted.current) {
            setLoading(false);
        }
    }, [onCollectCollateral, remainingWaitTime, onClaimDone])

    useEffect(() => {
        mounted.current = true
        if (poolData.allPositions?.length) {
            const lastRedeemTimestamp = poolData.allPositions[poolData.allPositions.length - 1].timestamp.toNumber()
            setRemainingWaitTime(
                diffTimeStampStr(poolData.collateralRedemptionDelay, lastRedeemTimestamp)
            )
        }
        return () => {
            mounted.current = false;
        };
    }, [poolData, fastRefresh, diffTimeStampStr])

    const disabledTip = useMemo(() => {
        if (!!remainingWaitTime) {
            return "period until DEUS is claimable"
        }
        return ""
    }, [remainingWaitTime])

    return (
        <ClaimTokenRow
            disabledTip={disabledTip}
            token={theCollateralToken}
            handleClaim={handleClaim}
            remainingWaitTime={remainingWaitTime}
            amount={redeemCollateralBalances}
            amountError={null}
            tipId={0}
            loading={loading}
        />
    )
}

const PairClaim = ({ pairToken, chainId, index, position, onClaimDone }) => {
    const poolData = useRecoilValue(husdPoolDataState)
    const { fastRefresh } = useRefresh()
    const [remainingWaitTime, setRemainingWaitTime] = useState(null);
    const { onCollectDeus } = useClaimRedeemedTokens(chainId)
    const { diffTimeStamp, diffTimeStampStr, nextRedeemId, getDeusTwapPrice } = useRedeemClaimTools()
    const mounted = useRef(false);
    const [loading, setLoading] = useState(false);
    const handleClaim = useCallback(async () => {
        setLoading(true);
        if (!remainingWaitTime && index === nextRedeemId) {
            try {
                const tx = await onCollectDeus(index)
                onClaimDone()
                if (tx && tx.status) {
                    console.log("claim did");
                } else {
                    console.log("claim Failed");
                }
            } catch (e) {
                console.error(e)
            }
        }
        if (mounted.current) {
            setLoading(false);
        }
    }, [index, nextRedeemId, onCollectDeus, remainingWaitTime, onClaimDone])

    useEffect(() => {
        setRemainingWaitTime(
            diffTimeStamp(poolData.deusRedemptionDelay, position.timestamp.toNumber()) < 1000 ?
                diffTimeStampStr(poolData.deusRedemptionDelay, position.timestamp.toNumber()) : "N/A"
        )
    }, [poolData, fastRefresh, diffTimeStamp, diffTimeStampStr, position])

    const [amount, setAmount] = useState("");
    const [amountError, setAmountError] = useState("");
    useEffect(() => {
        mounted.current = true
        const fun = async () => {
            const dollarAmount = fromWei(position.amount.toString(), pairToken?.decimals)

            const diffInSeconds = diffTimeStamp(poolData.deusRedemptionDelay, position.timestamp.toNumber())
            if (diffInSeconds > 0) {
                const dollarAmountString = handleSmallBalance(dollarAmount, 3, "$")
                if (mounted.current) {
                    setAmountError(`${dollarAmountString} worth of DEUS after cooldown`)
                }
                return
            }

            if (mounted.current) {
                setAmountError("")
            }
            const deusTwapPrice = await getDeusTwapPrice(position.timestamp.toNumber())
            if (mounted.current) {
                setAmount(dollarAmount / deusTwapPrice)
            }
        }
        fun()
        return () => {
            mounted.current = false;
        };
    }, [position, pairToken, fastRefresh, diffTimeStamp, poolData.deusRedemptionDelay, getDeusTwapPrice])



    const disabledTip = useMemo(() => {
        if (!!remainingWaitTime) {
            return "period until DEUS is claimable"
        }
        if (index !== nextRedeemId) {
            return "start by the first position"
        }
        return ""
    }, [remainingWaitTime, nextRedeemId, index])

    return (
        <ClaimTokenRow
            disabledTip={disabledTip}
            token={pairToken}
            handleClaim={handleClaim}
            remainingWaitTime={remainingWaitTime}
            amount={amount}
            tipId={index + 1}
            amountError={amountError}
            loading={loading}
        />
    )
}

const RedeemedToken = ({ title, currencies, chainId, setFastUpdate }) => {
    const { collateralRedeemAvailable, redeemAvailable, pairTokenPositions, nextRedeemId } = useRedeemClaimTools()
    const onClaimDone = useCallback(
        () => {
            setFastUpdate(fastUpdate => fastUpdate + 1)
        },
        [setFastUpdate],
    );

    return (
        <>
            {redeemAvailable &&
                <SmallWrapper>
                    <MyText> {title} </MyText>
                    {collateralRedeemAvailable &&
                        <CollateralClaim
                            onClaimDone={onClaimDone}
                            chainId={chainId}
                            theCollateralToken={currencies[0]}
                        />
                    }
                    {
                        pairTokenPositions && pairTokenPositions
                            .slice(nextRedeemId)
                            .map(
                                (pos, index) => (
                                    <PairClaim
                                        onClaimDone={onClaimDone}
                                        key={index}
                                        chainId={chainId}
                                        pairToken={currencies[1]}
                                        index={index + nextRedeemId}
                                        position={pos}
                                    />
                                )
                            )
                    }


                </SmallWrapper>
            }
        </>
    );
}

export default RedeemedToken

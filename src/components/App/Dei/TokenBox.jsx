import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Flex, Box, Image } from 'rebass/styled-components';
import styled from 'styled-components';
import { getFullDisplayBalance } from '../../../helper/formatBalance';
import useCrossTokenBalance from '../../../hooks/useCrossTokenBalance';
import { formatBalance3 } from '../../../utils/utils';
import { ButtonMax } from '../Button';
import CurrencyLogo from '../Currency';
import { InputAmount } from '../Swap';
import { Type } from '../Text';

const Wrapper = styled.div`
    position: relative;
    height: ${({ height }) => (height || "90px")};
    width: ${({ width }) => (width || "100%")};
    margin-top: ${({ mt }) => (mt && mt)};
    background: ${({ theme }) => theme.border1};
    border: 2px solid #000000;
    padding:0 15px;
    border-radius: ${({ borderRadius }) => borderRadius || "15px"};
`
const TokenInfo = styled(Flex)`
    align-items:center;
    cursor:${({ active }) => active ? "pointer" : "default"};
    &:hover{
        filter:${({ active }) => active && "brightness(0.8)"};
    }
`

const TokenBox = ({ hasMax, title, currency, inputAmount = "", setInputAmount, setFocusType, focusType, type, setActive, TokensMap, chainId, wrongNetwork, fastUpdate, mt }) => {
    const [onMax, setOnMax] = useState(false)
    const data = useCrossTokenBalance(currency?.address, chainId, fastUpdate)
    const [balance, setBalance] = useState(wrongNetwork ? "0" : data)

    useEffect(() => {
        const getBalance = () => {
            setBalance(data ? getFullDisplayBalance(data, currency?.decimals) : TokensMap[currency.address]?.balance ? TokensMap[currency.address]?.balance : "0")
        }

        if (currency) {
            getBalance()
        }

    }, [data, currency, wrongNetwork, TokensMap])

    useEffect(() => {
        if (inputAmount === balance) {
            setOnMax(true)
        } else {
            setOnMax(false)
        }
    }, [inputAmount, balance])


    return (<Wrapper mt={mt}>
        <Flex
            p="10px 0"
            justifyContent={"space-between"}
        >
            <Box>
                <Type.SM color={'secondary'}>
                    {title || "From"}
                </Type.SM>
            </Box>
            <Box>
                <Type.SM color={'secondary'}>
                    Balance: {formatBalance3(balance)}
                </Type.SM>
            </Box>
        </Flex>

        <Flex
            justifyContent="space-between"
            alignItems="center"
            mt="5px"
        >
            <InputAmount placeholder="0.0" min="0" value={isNaN(inputAmount) ? "" : inputAmount} onChange={(e) => {
                setFocusType(focusType)
                setInputAmount(e.currentTarget.value)
            }} />

            {hasMax && !onMax && <ButtonMax width={"40px"}
                onClick={() => setInputAmount(balance)}>
                MAX
            </ButtonMax>}

            <TokenInfo onClick={setActive ? () => setActive(true, type) : undefined} active={setActive ? true : false}>
                <CurrencyLogo
                    style={{ verticalAlign: "middle" }}
                    currency={currency}
                    size={"25px"}
                />
                <Type.LG color="text1" ml="7px" mr="9px">{currency?.symbol}</Type.LG>
                {setActive && <Image src="/img/select.svg" size="10px" />}
            </TokenInfo>
        </Flex>



    </Wrapper>);
}

export default TokenBox;
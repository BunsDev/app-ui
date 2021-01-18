import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { getStayledNumber, notify, formatBalance, checkLimit } from '../../utils/utils';
import TokenMarket from './TokenMarket';
import Title from './Title';
import SwapStockButton from './SwapStockButton';
import { SwapService } from '../../services/SwapService';
// import Routes from './Routes';
import WrappedTokenButton from './WrappedTokenButton';
import SearchAssets from './SearchAssets';
import StockBox from './StockBox';
import _ from "lodash"
import { TokenType } from '../../config';
import './mainSwap.scss';



class StockSwap extends Component {
    state = {
        tokens: ["dai"],
        web3: null,
        tokensMap: {},
        swap: {
            from: {
                name: "", pic_name: "", price: "", balance: "", amount: ""
            },
            to: {
                name: "", pic_name: "", price: "", balance: "", amount: ""
            }
        },
        showSearchBox: false,
        searchBoxType: "from",
        fromPerTo: true,
        claimable_amount: null,
        typingTimeout: 0,
        typeTransaction: "",
        slippageAmount: 0.1,
        toAmount: "",
        fromAmount: ""
    }

    methods = {
        onStart: () => {

        },
        onSuccess: () => {
            const { swap, typeTransaction } = this.state
            if (typeTransaction === "approve") {
                this.getSingleAllowances(swap.from.name, true)
                this.setState({ typeTransaction: "" })
            } else {
                this.getSingleBalance(swap.to.name, true)
                this.getSingleBalance(swap.from.name, true)
            }

        },
        onError: () => console.log("onError"),
    }



    async componentDidMount() {
        document.body.style.backgroundColor = '#2c2f36'
        document.body.style.backgroundImage = 'radial-gradient(50% 50% at 50% 50%, #5c5c5c61 0%, #000000 100%)'
        const { chainId, account } = this.props
        this.handleInitToken("from", this.props.deployed[0])
        this.handleInitTokenByName("to", "AAPL")


        if (!chainId || !account) return

        await this.setState({ web3: new SwapService(account, chainId) })
        await this.handleIinitBalances()
        await this.getClaimable()
        await this.handleInitAllowances()
    }

    async componentDidUpdate(prevProps) {

        const { chainId, account } = this.props

        if (prevProps.account !== account || prevProps.chainId !== chainId) {
            if (!chainId || !account) return

            await this.setState({ web3: new SwapService(account, chainId) })
            await this.handleIinitBalances(true)
            await this.getClaimable()
            await this.handleInitAllowances(true)

            this.handleInitToken("from", this.props.deployed[0])
            this.handleInitTokenByName("to", "AAPL")
        }
    }

    getClaimable = async () => {
        const { web3 } = this.state
        if (!web3) return
        try {
            const amount = await web3.getWithdrawableAmount()
            this.setState({ claimable_amount: amount })
            return amount
        } catch (error) {
            return 0
        }
    }


    handleSlippage = (amount) => {
        this.setState({ slippageAmount: amount })
    }

    handleTokensToMap = () => {
        const { tokens, tokensMap } = this.state
        for (let i = 0; i < tokens.length; i++) {
            tokensMap[tokens[i].name] = tokens[i]
        }
        this.setState({ tokensMap })
    }

    handleInitToken = (type, token, amount = "") => {
        const { swap } = this.state
        swap[type] = { ...token, amount: amount }
        this.setState({ swap, toAmount: "", fromAmount: "" })
    }

    handleInitTokenByName = (type, tokenName, amount = "") => {
        const { swap } = this.state
        let token = {}
        if (type === "from") {
            token = _.find(this.props.deployed, { symbol: tokenName })
        } else {
            token = _.find(this.props.allStocks, { symbol: tokenName })
        }
        swap[type] = { ...token, amount: amount }
        this.setState({ swap, toAmount: "", fromAmount: "" })
    }

    getToken = (tokenName) => this.state.tokens.find(t => t.name === tokenName)

    handleChangeType = () => {
        const { swap } = this.state
        const { from, to } = swap
        from.amount = ""
        to.amount = ""
        swap.from = to
        swap.to = from
        this.setState({ swap, toAmount: "", fromAmount: "" })
        this.handleSwichPerPrice()
    }

    handleSwichPerPrice = () => {
        const { fromPerTo } = this.state
        this.setState({ fromPerTo: !fromPerTo })
    }

    handleTokenInputChange = (stype, amount) => {
        this.handleTyping()

        const { swap } = this.state

        if (amount === "") {
            swap.from.amount = ""
            swap.to.amount = ""
            this.setState({ swap, toAmount: "", fromAmount: "" })
            return
        }
        if (amount === "00") {
            swap.from.amount = "0"
            swap.to.amount = "0"
            this.setState({ swap })
            return
        }

        swap[stype].amount = amount

        this.setState({
            typingTimeout: setTimeout(() => {
                this.handleCalcPairPrice(stype, amount)

                this.setState({ swap })
            }, 500)
        })

        this.setState({ swap })
    }

    handleTyping = () => {
        if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
        }
    }

    handleCalcPairPrice = async (searchBoxType, amount) => {
        const { swap, web3 } = this.state
        if (!web3) return

        const vstype = searchBoxType === "from" ? "to" : "from"

        if (parseFloat(swap[searchBoxType].amount) === 0) {
            swap[vstype].amount = "0"
            this.setState({ swap })
            return
        }

        try {
            const data = searchBoxType === "from" ? await web3.getAmountsOut(swap.from.name, swap.to.name, amount) : await web3.getAmountsIn(swap.from.name, swap.to.name, amount)
            swap[vstype].amount = getStayledNumber(data, 9)
            this.setState({
                swap,
                fromAmount: swap.from.amount,
                toAmount: swap.to.amount
            })
        } catch (error) {
            console.log(error);
            this.setState({ swap })
        }
    }

    handleSearchBox = (flag, type = "from") => {

        this.setState({ showSearchBox: flag, searchBoxType: type })
    }

    handleIinitBalances = async (foceUpdate) => {
        const { tokens } = this.state

        tokens.map(async (t) => {
            try {
                this.getSingleBalance(t, foceUpdate)
            } catch (error) {
                console.log(error);
            }
        })

    }

    getSingleBalance = async (tokenName, force = false) => {

        const { swap, web3 } = this.state
        if (!web3) return
        const { allTokens, setAllTokens } = this.props

        if (force || !allTokens[tokenName].lastFetchBalance) {

            try {
                const data = await web3.getTokenBalance(tokenName)
                const balance = formatBalance(data)
                allTokens[tokenName].balance = balance
                allTokens[tokenName].lastFetchBalance = true
                if (tokenName === swap.to.name || tokenName === swap.from.name) {
                    this.handleInitToken("from", swap.from.name)
                    this.handleInitToken("to", swap.to.name)
                }
            } catch (error) {
                console.log("getSingleBalance ", tokenName, error);
            }
            setAllTokens(allTokens)
        } else {
            // console.log("fetched balance");
        }
    }

    handleInitAllowances = async (foceUpdate) => {
        const { tokens } = this.state

        tokens.map(async (t) => {
            try {
                this.getSingleAllowances(t, foceUpdate)
            } catch (error) {
                console.log(error);
            }
        })
    }


    getSingleAllowances = async (tokenName, force = false) => {
        const { swap, web3 } = this.state

        if (!web3) return

        const { allTokens, setAllTokens } = this.props

        if (tokenName === "deus" || force || !allTokens[tokenName].lastFechAllowance) {

            try {
                const allowances = await web3.getAllowances(tokenName)
                allTokens[tokenName].allowances = parseInt(allowances)
                allTokens[tokenName].lastFechAllowance = true
                if (tokenName === swap.from.name || tokenName === swap.to.name) {
                    this.handleInitToken("from", swap.from.name, swap.from.amount)
                    this.handleInitToken("to", swap.to.name, swap.to.amount)
                }
                setAllTokens(allTokens)

            } catch (error) {
                console.log(tokenName, error);
            }
        }

    }

    handleChangeToken = (token) => {
        const { searchBoxType, swap } = this.state
        const vstype = searchBoxType === "from" ? "to" : "from"

        if (searchBoxType === "from") {
            this.handleInitToken(searchBoxType, token)
            if (token.symbol !== "DAI") {
                this.handleInitToken(vstype, this.props.deployed[0])
            } else {
                this.handleInitToken(vstype, this.props.allStocks[0])
            }
        } else {
            this.handleInitToken(searchBoxType, token)
            if (token.symbol !== "DAI") {
                this.handleInitToken(vstype, this.props.deployed[0])
            }
        }

        this.handleSearchBox(false)
    }

    handleFilterToken = () => {
        const { searchBoxType, tokens, swap } = this.state
        return tokens.filter(t => swap[searchBoxType].name !== t.name)
    }


    isApproved = () => {
        const { swap } = this.state
        return swap.from.allowances > 0
    }

    handleSwap = async () => {
        const { swap, web3 } = this.state
        if (!web3) return

        if (checkLimit(swap)) {
            return
        }

        const { from, to } = swap

        try {
            this.setState({ typeTransaction: "swap" })

            !(swap.from.allowances > 0) ?
                this.handleApprove(swap) :
                await web3.swapTokens(from.name, to.name, from.amount, notify(this.methods))
        } catch (error) {

        }
    }

    handleApprove = async (swap) => {
        const { web3 } = this.state

        if (checkLimit(swap)) {
            return
        }

        try {
            this.setState({ typeTransaction: "approve" })
            const data = await web3.approve(swap.from.name, swap.from.amount, notify(this.methods))
            return data
        } catch (error) {
            console.log(error);
        }
        return 0
    }

    render() {
        const { showSearchBox, swap, fromPerTo, toAmount, fromAmount, searchBoxType, tokens, web3, claimable_amount } = this.state

        const from_token = swap.from
        const to_token = swap.to
        const approved = this.isApproved()
        const isMobile = window.innerWidth < 670

        return (<div className="deus-swap-wrap">

            {!isMobile && <ToastContainer style={{ width: "450px" }} />}
            <Title web3={web3} claimable_amount={claimable_amount} />

            {/* <Volume /> */}
            <SearchAssets
                searchBoxType={searchBoxType}
                isStock={true}
                showSearchBox={showSearchBox}
                choosedToken={swap[searchBoxType].name}
                handleSearchBox={this.handleSearchBox}
                allTokens={this.props.allStocks}
                fromTokens={this.props.deployed}
                toTokens={this.props.allStocks}
                tokens={tokens}
                handleFilterToken={this.state.tokensMap}
                handleChangeToken={this.handleChangeToken}
            />

            <div className="swap-container-wrap">
                <div className="swap-container">
                    <div className="swap-box-wrap">
                        <div className="swap-box">

                            <StockBox type="from" token={from_token}
                                estimated=""
                                handleSearchBox={this.handleSearchBox}
                                handleTokenInputChange={this.handleTokenInputChange}
                            />

                            <img
                                onClick={this.handleChangeType}
                                src={process.env.PUBLIC_URL + "/img/arrow.svg"}
                                alt="arrow"
                                className="arrow" />

                            <StockBox type="to" token={to_token}
                                estimated=" (estimated)"
                                handleSearchBox={this.handleSearchBox}
                                handleTokenInputChange={this.handleTokenInputChange}
                            />

                            <TokenMarket
                                handleSwich={this.handleSwichPerPrice}
                                swap={swap}
                                toAmount={toAmount}
                                fromAmount={fromAmount}
                                fromPerTo={fromPerTo}
                                perPrice={""}
                                tvl={""}
                                tradeVol={""} />

                            {to_token.isDeployed && to_token.type === TokenType.Wrapped && <WrappedTokenButton isWrap={true} isLong={null} />}

                            <SwapStockButton handleSwap={this.handleSwap} from_token={from_token} to_token={to_token} approved={approved} web3={web3} isMobile={isMobile} />

                        </div>

                        {/* <PriceBox impact={""} vaultsFee={""} /> */}

                        {/* {from_token.name && to_token && <Routes from={from_token} to={to_token} chainId={chainId} />} */}
                    </div>
                </div>
            </div>
        </div >);
    }
}


export default StockSwap;
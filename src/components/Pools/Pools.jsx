import React, { Component } from 'react'
import Stake from './Stake';
import { connectWallet } from '../../services/StaticPriceSale'
import * as stakeService from '../../services/StakingService'
import { getStayledNumber } from '../../utils/utils'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../../styles/scss/pools.css';


class Pools extends Component {
    state = {
        isConnected: false,
        showPopup: false,
        staking: {
            name: "",
            amount: "",
            isApprove: true
        },
        wallet: {
            address: null,
        },
        stakes: {
            deus_eth: {
                name: "deus_eth",
                amounts: {
                    dea: 0,
                    newdea: 0,
                    apy: 0,
                    lp: 0,
                    pool: 0,
                    currLp: 0,
                },
                liqLink: "https://app.uniswap.org/#/add/ETH/0xf025DB474fcF9bA30844e91A54bC4747d4FC7842"
            },
            deus: {
                name: "deus",
                amounts: {
                    dea: 0,
                    newdea: 0,
                    apy: 0,
                    lp: 0,
                    pool: 0,
                    currLp: 0,
                },
                liqLink: "https://app.uniswap.org/#/add/ETH/0xf025DB474fcF9bA30844e91A54bC4747d4FC7842"
            },
        },
    }

    constructor(props) {
        super(props);
        // create a ref to store the textInput DOM element
        this.scrollRef = React.createRef();
        // this.focusTextInput = this.focusTextInput.bind(this);
    }



    componentDidMount() {
        document.title = 'DEUS pools';
        this.isConnected()
        setTimeout(() => this.isConnected(), 1000);
        setTimeout(() => this.handleScroller(), 100);
        this.handleUpdateDEA()
    }

    handleStakeState = (state) => {
        if (state === "receipt" || state === "error") {
            this.setState({ SwapState: null })
            this.notify(state)
            return
        }
        this.notify(state)
    }

    notify = (state) => {
        const { staking } = this.state

        switch (state) {
            case "waiting": {
                toast.info("Waiting for Metamask confirmation.", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                break
            }
            case "transactionHash": {
                toast.info("Transaction broadcasted.", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                break
            }
            case "receipt": {
                toast.success("Transaction Successful.", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                if (staking.isApprove) {
                    staking.isApprove = false
                    this.setState({ staking })
                } else {
                    this.handlePopup(staking.name, false)
                }
                this.initial()
                break
            }
            case "connectWallet": {
                toast.warn("Please Connect Wallet.", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                break
            }
            case "error": {
                toast.warn("Transaction Failed.", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                break
            }
            default: {
                toast.info("Unhandled Event.", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        }
    };

    initial = () => {
        console.log("initial called");
        const { stakes } = this.state
        for (const tokenName in stakes) {
            const token = stakes[tokenName]
            stakeService.getNumberOfStakedTokens(token.name).then((amount) => {
                token.amounts.lp = getStayledNumber(amount)
                this.setState({ stakes })
                stakeService.getTotalStakedToken(token.name).then((amount) => {
                    token.amounts.pool = token.amounts.lp == "0" || amount == "0" ? 0 : ((token.amounts.lp / amount) * 100).toFixed(2)
                    this.setState({ stakes })
                })
            })
            stakeService.getNumberOfPendingRewardTokens(token.name).then((amount) => {
                token.amounts.dea = token.amounts.newdea
                token.amounts.newdea = getStayledNumber(amount)
                this.setState({ stakes })
            })
            stakeService.getUserWalletStakedTokenBalance(token.name).then((amount) => {
                token.amounts.currLp = getStayledNumber(amount)
                this.setState({ stakes })
            })

        }


    }

    handleUpdateDEA = () => setInterval(() => {
        const { stakes } = this.state
        for (const tokenName in stakes) {
            const token = stakes[tokenName]
            stakeService.getNumberOfPendingRewardTokens(token.name).then((amount) => {
                token.amounts.dea = token.amounts.newdea
                token.amounts.newdea = getStayledNumber(amount)
                this.setState({ stakes })
            })
        }
    }, 5000)


    handleStake = () => {
        const { staking } = this.state
        console.log(staking.amount);
        stakeService.stake(staking.name, staking.amount, this.handleStakeState)
    }


    handleApprove = () => {
        const { staking } = this.state
        console.log(staking.amount);
        stakeService.approve(staking.name, staking.amount, this.handleStakeState)
    }

    handleScroller = () => {
        const width = (2300 - window.innerWidth) / 2
        if (this.scrollRef.current) {
            this.scrollRef.current.scrollLeft = width
        }
    }


    handleClaim = (stakedToken) => {
        stakeService.withdraw(stakedToken, 0, this.handleStakeState)
        console.log("0 handleClaim clicked")
    }


    handleWithdraw = (stakedToken, amount) => {
        console.log("withdraw" + amount);
        stakeService.withdraw(stakedToken, amount, this.handleStakeState)
    }

    handleLP = (pair) => {
        console.log(pair + " handleLP clicked");
    }


    isConnected = () => {
        if (window.ethereum) {
            if (window.ethereum.selectedAddress) {
                const { wallet } = this.state
                wallet.address = window.ethereum.selectedAddress
                this.setState({ wallet, isConnected: true })
                this.handleScroller()
            }
            if (window.ethereum.isMetaMask) {
                this.setState({ isMetamask: true })
            }
        }
        this.initial()
    }

    setStakingAmount = (value) => {
        const { staking } = this.state
        staking.amount = value
        this.setState({ staking })
    }


    handleConnectWallet = async () => {
        try {
            const rep = await connectWallet()
            console.log(rep ? "connected to metamask" : "");
            this.isConnected()
        } catch (error) {
            console.log("didnt connect to metamask");
        }
    }
    showAddress = () => {
        const { address } = this.state.wallet
        return address.substring(0, 6) + "..." + address.substring(address.length - 4, address.length)
    }

    handleMaxLP = (amount) => {
        const { staking } = this.state
        staking.amount = amount
        this.setState({ staking })
    }

    handlePopup = (stakedToken, bool) => {
        const { staking } = this.state
        staking.amount = ""
        staking.isApprove = true
        staking.name = stakedToken
        this.setState({ showPopup: bool, staking })
    }


    counterClaim = async (stakedToken, targetDea) => {
        if (targetDea == 0) return
        const { stakes } = this.state
        const token = stakes[stakedToken]
        const { dea } = token.amounts
        let seed = 0.001
        seed = targetDea < dea ? seed * -1 : seed
        const counter = Math.abs(targetDea - dea) / seed
        console.log(counter);
        for (let i = 0; i < counter; i++) {
            token.dea += seed
            this.setState({ stakes })
        }
    }

    getCalimableDEA = async (stakedToken) => {
        try {
            const amount = await stakeService.getNumberOfPendingRewardTokens(stakedToken)
            // this.counterClaim(stakedToken, getStayledNumber(amount))
        } catch (error) {
            return 0
        }
    }


    render() {
        const { isConnected, showPopup, staking } = this.state
        const { stakes } = this.state
        // const { deus_eth, deus } = stakes
        // console.log(deus_eth);
        let marginPool = 150
        if (window.innerWidth < 1500) {
            marginPool = 250
        }
        // const stake2 = this.state.stakes[1]

        return (<>

            {showPopup &&
                <div className="stake-popup ">
                    <div className="pop-x" onClick={() => this.handlePopup(false)}>X</div>
                    <div className="pop-title">Stake your Tokens to earn DEA</div>
                    <div className="stake-wrap">
                        <div className="pop-input-wrap">
                            <div className="pop-input-label">Amount: {stakes[staking.name].amounts.currLp} LP</div>
                            <div className="pop-input" >
                                <div className="pop-max" onClick={() => this.handleMaxLP(stakes[staking.name].amounts.currLp)}>max</div>
                                <input type="number" name="stake-amount" placeholder="0.0" value={staking.amount} onChange={(e) => this.setStakingAmount(e.currentTarget.value)} />
                            </div>
                        </div>
                        <a className="pop-contract" href="/contract">bring me to the contract
                <div className="arrow-triangle"></div>
                        </a>
                        <div className="pop-btns">
                            <button className="approve" onClick={() => this.handleApprove()} disabled={staking.isApprove && staking.amount > 0 ? false : true}>Approve</button>
                            <button className="stake" onClick={() => this.handleStake()} disabled={staking.isApprove ? true : false}>Stake</button>
                        </div>
                    </div>
                </div>}
            <ToastContainer />
            { !isConnected && <div className="pools-unlock-wrap" id="pools-unlock-wrap">
                <img className="line-top-img" src="../img/line-top.png" alt="line-top" />
                <div className="beta-btn">We are currently in beta DEA</div>
                <div className="pools-unlock">
                    <div className="liquidity-title">DEUS <br />Liquidity Pools</div>
                    <div className="decription">We also provide single asset pools</div>
                    <div className="pools-btn unlock-btn" onClick={this.handleConnectWallet}>Unlock Wallet</div>
                    <a className="pools-btn learn-more-btn" href="/learn-more-dea">Learn more about DEA</a>
                </div>
            </div>}
            {isConnected && <div className="main-wrap  " id="main-wrap" ref={this.scrollRef} onClick={this.handleScrollerCenter}>
                <div className="right-btn">
                    <div className="pools-btn beta-btn ">We are currently in BETA</div>
                    <a className="pools-btn learn-more-btn" href="/learn-more-dea">Learn more about DEA</a>
                </div>
                <div className="pools-btn unlock-btn connected" onClick={this.handleConnectWallet}>{this.showAddress()}</div>
                <div className="pools-wrapper" id="pools-wrap">
                    <img className="line-top-img" src="../img/line-top.png" alt="line-top" />
                    <div className="pools" style={{ marginTop: marginPool + "px" }}>
                        <div className="row-1">
                            <Stake shadowClass={`blue-200-shadow`} token={stakes.deus_eth} handlePopup={this.handlePopup} handleClaim={this.handleClaim} handleLP={this.handleLP} handleWithdraw={this.handleWithdraw} />
                        </div>
                        <div style={{ position: 'relative' }}>
                            <div className="staking-pools">
                                <div className="title">Staking Pools </div>
                                <div className="desc">We also provide <br /> single asset pools</div>
                            </div>
                            <div className="row-2">
                                {/* <Stake shadowClass={`yellow-400-shadow`} stake={stake2} handleClaim={this.handleClaim} handleLP={this.handleLP} handleWithdraw={this.handleWithdraw} /> */}

                                <div className="triangle-wrap yellow-400-shadow">
                                    <div className="triangle" />
                                </div>
                                <Stake shadowClass={`blue-200-shadow`} token={stakes.deus} handlePopup={this.handlePopup} handleClaim={this.handleClaim} handleLP={this.handleLP} handleWithdraw={this.handleWithdraw} />

                            </div>
                        </div>
                        <div className="row-2">
                            <div className="triangle-wrap  yellow-400-shadow ">
                                <div className="triangle" />
                            </div>
                            <div className="triangle-wrap  yellow-300-shadow ">
                                <div className="triangle" />
                            </div>
                            <div className="triangle-wrap blue-200-shadow">
                                <div className="triangle" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>);
    }
}

export default Pools;
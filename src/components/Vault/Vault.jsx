import React, { Component } from 'react';
import CloseBox from './CloseBox';
import OpenBox from './OpenBox';
import { vaultsStaking } from '../../config'
// import GonbadBox from './GonbadBox';
// import GonbadOpen from './GonbadOpen';
import UnLockPupop from './UnLockPupop';
import Alert from './Alert/Alert';
import { VaultsService } from '../../services/VaultsService';
import { notify, formatBalance, setBackground } from '../../utils/utils';

import { ToastContainer } from 'react-toastify';
import './vaults.scss'

class Vault extends Component {
    state = {
        unlocked: false,
        locked: false,
        typeTransaction: "",
        allTokens: {},
        // vaultsList: ["deus_dea", "dea_usdc", "deus_eth", "deus", "dea", "dai", "eth", "wbtc"],
        vaultsList: ["deus_dea", "dea_usdc", "deus_eth", "deus", "dea"],
        vaults: vaultsStaking,
        approved: false,
        web3: null,
        showLockAlert: false,
        savedVault: null
    }



    methods = {
        onStart: () => {
            console.log("onStart")
        },
        onSuccess: () => {
            console.log("onSuccess")
            const { currToken, typeTransaction } = this.state
            if (typeTransaction === "approve") {
                this.handleInitAllowances(currToken.name, currToken.name)
                this.setState({ typeTransaction: "" })
            } else {
                this.handleClose()
                this.getSingleBalance(currToken.name, true)
                this.getSingleBalance("sand_" + currToken.name, true)
                this.getTotalStakedToken("sand_" + currToken.name)
                this.getSingleBalance("timetoken", true)
                // this.getLockedAmount("timetoken", true)
            }
        },
        onError: () => console.log("onError"),
    }


    getTotalStakedToken = async (tokenName) => {
        const { web3, vaults } = this.state

        try {
            const data = await web3.getTokenTotalSupply(tokenName)
            // console.log("getTokenTotalSupply", data);
            // const balance = formatBalance(data, 4)
            const balance = formatBalance(data, 3)
            vaults[tokenName.substring(5)].total = balance
            // console.log("vaults", balance);
            this.setState({ vaults })
            // vaults[tokenName].own = parseFloat(own / balance * 100).toFixed(2)
        } catch (error) {
            console.log(tokenName, error);
        }
    }



    async componentDidMount() {
        const { chainId, account } = this.props
        document.addEventListener("keydown", this.escFunction, false);

        this.setState({ lockAllow: this.handleIsAllowLock() })
        if (!chainId || !account) return

        await this.setState({ web3: new VaultsService(account, chainId) })
        await this.handleIinitToken()

    }

    escFunction = (event) => {
        if (event.keyCode === 27) {
            this.handleClose()
        }
    }

    getSandAndTime = (contranctName) => async (amount) => {
        const { web3 } = this.state

        try {
            // console.log("amount is" + amount);
            const data = await web3.getSandAndTimeAmount(contranctName, amount)
            return data
        } catch (error) {
            return [0, 0]
        }
    }

    setLockedAmount = async (vaultName, amount) => {
        const { web3 } = this.state

        try {
            await web3.lock(vaultName, amount, notify(this.methods))
        } catch (error) {
            console.log(error);
        }
    }

    getLockedAmount = async (vaultName) => {
        const { allTokens, web3 } = this.state

        try {
            const data = await web3.getLockedAmount(vaultName)
            allTokens[vaultName].locked = data
            this.setState({ allTokens })
        } catch (error) {
            console.log(error);

        }
    }


    async componentDidUpdate(prevProps) {

        const { chainId, account } = this.props

        if (prevProps.account !== account || prevProps.chainId !== chainId) {

            console.log("chain id is", chainId);

            if (!chainId || !account) return

            console.log("log did update", account, chainId);

            await this.setState({ web3: new VaultsService(account, chainId) })
            await this.handleIinitToken()
        }
    }

    componentWillMount() {
        this.setState({ allTokens: this.props.allTokens })
    }


    handleIinitToken = async () => {
        const { vaultsList } = this.state
        vaultsList.map((tokenName) => {
            this.getSingleBalance(tokenName)
            this.handleInitAllowances(tokenName, tokenName)
            this.getTotalStakedToken("sand_" + tokenName)
            this.getSingleBalance("sand_" + tokenName)
            // this.getLockedAmount(tokenName)
        })
        this.getSingleBalance("timetoken")
    }

    getSingleBalance = async (tokenName) => {
        const { allTokens, vaults, web3 } = this.state
        try {
            const data = await web3.getTokenBalance(tokenName)

            const balance = data
            allTokens[tokenName].balance = balance
            if (tokenName.substring(0, 5) === "sand_") {
                vaults[tokenName.substring(5)].locked = parseFloat(balance)
            }
            this.setState({ allTokens, vaults })
        } catch (error) {
            console.log(tokenName, error);
        }
    }

    handleInitAllowances = async (tokenName, contractName) => {
        const { allTokens, vaults, currVault, web3 } = this.state

        try {
            const data = await web3.getAllowances(tokenName, contractName)
            // console.log(tokenName, "\t allowances\t", data);
            allTokens[tokenName].allowances = data
            vaults[tokenName].allowances = data

            if (currVault?.name === tokenName) {
                this.setState({ approved: parseFloat(data) > 0 })
            }

            this.setState({ allTokens, vaults })

        } catch (error) {
            console.log(error);
        }
    }



    handleLock = (vault) => {
        if (!this.handleIsAllowLock()) {
            this.setState({ showLockAlert: true, savedVault: vault })
            setBackground("dark")
            return
        }
        const { allTokens, vaults } = this.state

        setBackground("dark")

        this.setState({
            unlocked: false,
            locked: true,
            currToken: allTokens[vault.name],
            currSand: allTokens["sand_" + vault.name],
            currVault: vault,
        })

        if (!vaults[vault.name].allowances || parseInt(vaults[vault.name].allowances) <= 0) {
            // console.log(vaults[vault.name]);
            // this.handleInitAllowances(vault.name, vault.name)
        } else {
            this.setState({ approved: parseInt(vaults[vault.name].allowances) > 0 })
        }

    }


    handleUnLock = () => {
        document.getElementById("blur-pop").classList.add("blured")
        this.setState({ unlocked: true, locked: false })
    }

    handleClose = () => {
        setBackground("light")
        this.setState({ unlocked: false, locked: false, currVault: null, approved: false, showLockAlert: false })
    }

    handleSwap = (from) => (amount) => {
        if (amount === "" || amount === "0" || this.state.approved !== true) return

        // console.log(from.name + "\t" + amount + "\t handleSwap ");
        this.setLockedAmount(from.name, amount)
    }

    handleApprove = (from) => async (amount) => {
        if (amount === "" || amount === "0") return
        // console.log(from.name + "\t" + amount + "\t handleApprove ");

        const { web3 } = this.state
        try {
            this.setState({ typeTransaction: "approve" })
            await web3.approve(from.name, from.name, amount, notify(this.methods))
        } catch (error) {
            console.log(error)
        }
    }


    // handleInitialTokens = () => {
    //     const tokens = this.state.tokens
    //     const aa = ["wbtc", "dai", "eth"]
    //     aa.map((name, i) => {
    //         console.log(tokens[name]);
    //         tokens[name].deposited = 1
    //     })
    //     this.setState({ tokens })
    // }

    handleOkAllow = () => {
        localStorage.setItem("lockPermission", Date())
        this.handleClose()
        this.handleLock(this.state.savedVault)
    }

    handleIsAllowLock = () => {
        return localStorage.getItem("lockPermission") !== null
    }

    render() {
        const { locked, showLockAlert, currToken, currVault, currSand, vaults, vaultsList, allTokens } = this.state


        const timetoken = allTokens.timetoken

        return (<div>
            <ToastContainer style={{ width: "400px" }} />
            <div style={{ position: "relative" }}>

                {/* {unlocked && <UnLockPupop
                    token={currToken}
                    handleLock={this.handleLock}
                    handleClose={this.handleClose}
                    sandToken={sandToken}
                    handleSwap={this.handleSwap}
                    handleToggle={this.handleLock}
                    locked={unlocked}
                />} */}
                <Alert show={showLockAlert} handleGotIt={this.handleOkAllow} handleClose={this.handleClose} />

                {locked && currVault && <UnLockPupop
                    token={currToken}
                    sandToken={currSand}
                    timeToken={timetoken}
                    vault={currVault}
                    handleLock={this.handleLock}
                    handleClose={this.handleClose}
                    handleApprove={this.handleApprove(currToken)}
                    handleSwap={this.handleSwap(currToken)}
                    handleToggle={this.handleUnLock}
                    getSandAndTime={this.getSandAndTime(currToken.name)}
                    locked={locked}
                    approved={this.state.approved}
                />}

                <div className={`vaults-wrap`}>
                    <div className="gonbad"></div>

                    {/* {vaults.uni_lp_deus_dea.locked > 0 ? <GonbadOpen token={allTokens.uni_lp_deus_dea} handleLock={this.handleLock} />
                        : <GonbadBox token={allTokens.uni_lp_deus_dea} handleLock={this.handleLock} />} */}

                    <div className="doors-wrap">

                        <div className="doors">

                            {
                                vaultsList.map((name, i) => {
                                    const vault = vaults[name]
                                    const token = allTokens["sand_" + name]
                                    if (vault.locked && vault.locked > 0) {
                                        return <OpenBox
                                            key={i}
                                            vault={vault}
                                            token={token}
                                            handleLock={this.handleLock}
                                        />
                                    } else {
                                        return <CloseBox
                                            key={i}
                                            vault={vault}
                                            token={token}
                                            handleLock={this.handleLock}
                                        />
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default Vault;
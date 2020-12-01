import React, { Component } from 'react';
import ProvideButton from './ProvideButton';


class QStake extends Component {
    state = {}

    render() {
        const { token, handleStake } = this.props
        const isStaked = parseFloat(token.deposited) > 0 ? true : false
        const closedClass = isStaked ? "" : "closed"
        const stakeHere = isStaked ? "more" : "here"

        /*   return (<>
              <div className={`stake-token-wrap ${closedClass}`}>
                  <div className="stake-more" onClick={() => handleStake(token.name)}><p>stake <br /> {stakeHere}</p></div>
                  <div className="token-name"> {"s" + token.title}</div>
                  <div className="sand-title">SandToken</div>
                  <div className="apy">{token.apy}% APY</div>
                  {isStaked && <>
                      <div className="black-line"></div>
                      <div className="own-pool">you own {token.pool}% ($4320.30) of the pool</div>
                      <DepositButton token={token} />
                      <ClaimButton token={token} />
                  </>}
  
                  {!isStaked && <>
                      <ProvideButton token={token} />
                  </>}
  
              </div>
          </>); */

        return (<div className={`single-wrap ${closedClass}`}>
            <div className="single">
                <div className="stake-here" onClick={() => handleStake(token.name)}>
                    STAKE {stakeHere}
                </div>

                <div className="token-name">{"s" + token.title}</div>
                <div className="token-title">SandToken</div>


                {!isStaked && <>
                    <ProvideButton token={token} />
                </>}


                {isStaked && <>
                    <div className="own-pool">you own {token.pool}% ($4320.30) of the pool</div>

                    <div className="btns-wrap">
                        <div className="btns">

                            <div className="left-single disabled">{token.claimable_amount} {token.claimable_unit} claimable</div>
                            <div className="right-single">
                                <span>claim</span>
                            </div>
                        </div>
                    </div>
                    <div className="btns-wrap">
                        <div className="btns">
                            <div className="left-single disabled">{token.deposited} sDAI deposited</div>
                            <div className="right-single">
                                <span>withdraw and claim</span>
                            </div>
                        </div>
                    </div>

                    <div className="btns-wrap">
                        <div className="btns">
                            <div className="left-single disabled zap" ><span>ZAP⚡ in/out</span></div>
                            <div className="right-single">
                                <span>buy more</span><img className="swap-icon" src={process.env.PUBLIC_URL + "/vaults/swap.svg"} alt="swap" />
                            </div>
                        </div>
                    </div>
                </>}



            </div>
        </div>)
    }
}

export default QStake;
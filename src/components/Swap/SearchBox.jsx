import React, { Component } from 'react';
import { getStayledNumber } from '../../utils/utils';

class SearchBox extends Component {
    state = {}

    render() {
        const { showSearchBox, handleSearchBox, choosedToken, allTokens, tokens, handleChangeToken } = this.props
        const sortedList = tokens.sort((a, b) => allTokens[b]?.balance - allTokens[a]?.balance)

        return (<>
            { showSearchBox && <div className="search-box-wrap">
                <div className="search-box">
                    <div className="label">
                        <p> </p>
                        <div onClick={() => handleSearchBox(false)}>close</div>
                    </div>
                    <input type="text" placeholder="Search name or paste address" spellCheck="false" autoComplete="off" />
                    <div className="token-items-wrap">
                        <div className="titles">
                            <p>Token</p>
                            <p>Balance</p>
                        </div>
                        <div className="token-items">
                            {
                                sortedList.map((tokenName, i) => {
                                    if (tokenName === choosedToken) return <></>
                                    const token = allTokens[tokenName]
                                    return <div key={i} className="token-item" onClick={() => handleChangeToken(token.name)}>
                                        <div>
                                            <img src={process.env.PUBLIC_URL + `/tokens/${token.pic_name}`} alt={token.name} />
                                            <p style={{ textTransform: "uppercase" }}>{token.name}</p>
                                            {token.isFutures && <img className="futures" src={process.env.PUBLIC_URL + "/img/futures.svg"} alt="futures" />}
                                        </div>
                                        <p >{getStayledNumber(token.balance)}</p>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>

            </div>}
        </>);
    }
}

export default SearchBox;
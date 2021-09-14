import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { ButtonSyncDeactivated } from '../App/Button';
import { useTranslation } from 'react-i18next';

const MigratorButton = ({ approved, token, handleMigrate, isMobile }) => {
    const web3React = useWeb3React()
    const { account, chainId } = web3React
    const { t } = useTranslation()
    const amount = typeof (token.amount) === "string" ? parseFloat(token.amount) : token.amount
    console.log(chainId);
    if (chainId && (chainId !== 1 && chainId !== 4)) {
        return (<>
            <ButtonSyncDeactivated>
                {t("wrongNetwork")}
            </ButtonSyncDeactivated>

        </>)
    }

    return (<>
        {account && <>{(token.balance < amount) ? <ButtonSyncDeactivated style={{ animation: "scale-up 0.3s forwards" }}>
            {t("insufficientBalance")}
        </ButtonSyncDeactivated> :
            <div className="swap-btn-wrap grad-wrap xdai-button" style={{ background: "linear-gradient(90deg, #DFF4FE 0%, #8EB5FF 100%)", animation: "scale-up 0.3s forwards" }} onClick={handleMigrate}>
                <div className="swap-btn grad" >
                    {approved ? t("migrate") : t("approve")}
                </div>
            </div>}
        </>}
        {
            !account && <ButtonSyncDeactivated>
                {t("connectWallet")}
            </ButtonSyncDeactivated>
        }
    </>);
}

export default MigratorButton;
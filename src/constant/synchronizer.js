import { Token } from '../utils/classes';
import { ChainMap } from './web3';

export const registrar = ["https://oracle1.deus.finance/registrar-detail.json"]
const signatures = ["https://oracle4.deus.finance/signature", "https://oracle5.deus.finance/signature"]
const prices = ["https://oracle4.deus.finance/price"]

export const SyncData = {
    [ChainMap.ETH]: {
        requiredSignatures: 2,
        isStableApprovable: true,
        isAssetApprovable: false,
        contract: "0x7a27a7BF25d64FAa090404F94606c580ce8E1D37",
        stableCoin: new Token(ChainMap.ETH, "0x6B175474E89094C44Da98b954EedeAC495271d0F", 18, "DAI", "DAI", "/tokens/dai.png"),
        conducted: ["https://oracle1.deus.finance/eth/conducted.json"],
        prices,
        signatures,
        registrar,
    },
    [ChainMap.BSC]: {
        requiredSignatures: 2,
        isStableApprovable: true,
        isAssetApprovable: false,
        contract: "0x3b62F3820e0B035cc4aD602dECe6d796BC325325",
        stableCoin: new Token(ChainMap.BSC, "0xe9e7cea3dedca5984780bafc599bd69add087d56", 18, "BUSD", "BUSD", "/tokens/busd.svg"),
        conducted: ["https://oracle1.deus.finance/bsc/conducted.json"],
        prices,
        signatures,
        registrar,
    },
    [ChainMap.XDAI]: {
        requiredSignatures: 2,
        isStableApprovable: false,
        isAssetApprovable: true,
        contract: "0x89951F2546f36789072c72C94272a68970Eba65e",
        stableCoin: new Token(ChainMap.XDAI, "0x", 18, "xDAI", "xDAI", "/tokens/xdai.svg"),
        conducted: ["https://oracle1.deus.finance/xdai/conducted.json"],
        prices,
        signatures,
        registrar,
    },
    [ChainMap.HECO]: {
        requiredSignatures: 2,
        isStableApprovable: true,
        isAssetApprovable: false,
        contract: "0xe82aa18b107aaf8D3829111C91CD0D133E0773DC",
        stableCoin: new Token(ChainMap.HECO, "0x0298c2b32eae4da002a15f36fdf7615bea3da047", 8, "HUSD", "HUSD", "/tokens/husd.svg"),
        conducted: ["https://oracle1.deus.finance/husd/conducted.json"],
        prices,
        signatures,
        registrar,
    },
    [ChainMap.MATIC]: {
        requiredSignatures: 2,
        isStableApprovable: true,
        isAssetApprovable: false,
        contract: "0x5e16B021994e3c2536435CA3A45f0dA6536eD315",
        stableCoin: new Token(ChainMap.MATIC, "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", 6, "USDC", "USDC", "/tokens/usdc.svg"),
        conducted: ["https://oracle1.deus.finance/husd/conducted.json"],
        prices,
        signatures,
        registrar,
    },
}
export const MIGRATION_CONFIG = [
    {
        id: 0,
        title: {
            from: "DEA / sDEA",
            to: "DEUS V2"
        },
        tokens: {
            from: [
                { symbol: "DEA", balance: "342.23" },
                { symbol: "sDEA", balance: "342.23" },
                { symbol: "DEA", balance: "342.23" },
                { symbol: "sDEA", balance: "342.23" },
            ],
            to: [
                { symbol: "DEUS", amount: "342.23" },
                { symbol: "DEUS-USDC LP", amount: "342.23" },
            ]
        }
    },
    {
        id: 1,
        title: {
            from: "DEUS / sDEUS",
            to: "DEUS V2"
        },
        tokens: {
            from: [
                { symbol: "DEUS", balance: "342.23" },
                { symbol: "sDEUS", balance: "342.23" },
            ],
            to: [
                { symbol: "DEUS", amount: "100" },
            ]
        }
    },
]

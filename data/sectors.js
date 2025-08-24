export const sectors = [
    {
        name: 'Technology',
        emoji: '💻',
        baskets: [
            { 
                ticker: 'TECHB', 
                name: 'Tech Leaders Basket', 
                price: '342.15', 
                type: 'basket', 
                up: true, 
                intradayData: [335, 340, 342, 342.15],
                about: { 
                    description: 'A diversified basket of leading technology companies focused on innovation and growth in the digital economy.',
                    manager: 'OneBasket',
                    founded: '2023',
                    totalAssets: '$2.4B'
                },
                assets: [
                    { ticker: 'AAPL', name: 'Apple Inc.', weight: '25%', price: '173.50', type: 'stock' },
                    { ticker: 'MSFT', name: 'Microsoft Corp.', weight: '22%', price: '338.11', type: 'stock' },
                    { ticker: 'GOOGL', name: 'Alphabet Inc.', weight: '18%', price: '138.21', type: 'stock' },
                    { ticker: 'NVDA', name: 'NVIDIA Corp.', weight: '15%', price: '432.89', type: 'stock' },
                    { ticker: 'META', name: 'Meta Platforms', weight: '12%', price: '296.73', type: 'stock' },
                    { ticker: 'TSLA', name: 'Tesla Inc.', weight: '8%', price: '248.42', type: 'stock' }
                ]
            },
            { 
                ticker: 'CLOUD', 
                name: 'Cloud Computing Basket', 
                price: '189.67', 
                type: 'basket', 
                up: false, 
                intradayData: [192, 188, 190, 189.67],
                about: { 
                    description: 'A focused basket targeting the cloud infrastructure and software-as-a-service market leaders.',
                    manager: 'OneBasket',
                    founded: '2023',
                    totalAssets: '$850M'
                },
                assets: [
                    { ticker: 'AMZN', name: 'Amazon.com Inc.', weight: '30%', price: '142.53', type: 'stock' },
                    { ticker: 'MSFT', name: 'Microsoft Corp.', weight: '25%', price: '338.11', type: 'stock' },
                    { ticker: 'GOOGL', name: 'Alphabet Inc.', weight: '20%', price: '138.21', type: 'stock' },
                    { ticker: 'CRM', name: 'Salesforce Inc.', weight: '15%', price: '217.85', type: 'stock' },
                    { ticker: 'ORCL', name: 'Oracle Corp.', weight: '10%', price: '108.92', type: 'stock' }
                ]
            },
            { 
                ticker: 'AI', 
                name: 'AI Innovation Basket', 
                price: '276.33', 
                type: 'basket', 
                up: true, 
                intradayData: [270, 275, 278, 276.33],
                about: { 
                    description: 'A cutting-edge basket focused on artificial intelligence and machine learning companies.',
                    manager: 'OneBasket',
                    founded: '2024',
                    totalAssets: '$1.2B'
                },
                assets: [
                    { ticker: 'NVDA', name: 'NVIDIA Corp.', weight: '35%', price: '432.89', type: 'stock' },
                    { ticker: 'GOOGL', name: 'Alphabet Inc.', weight: '25%', price: '138.21', type: 'stock' },
                    { ticker: 'MSFT', name: 'Microsoft Corp.', weight: '20%', price: '338.11', type: 'stock' },
                    { ticker: 'AMD', name: 'Advanced Micro Devices', weight: '15%', price: '142.78', type: 'stock' },
                    { ticker: 'PLTR', name: 'Palantir Technologies', weight: '5%', price: '16.24', type: 'stock' }
                ]
            }
        ]
    },
    {
        name: 'Healthcare',
        emoji: '🏥',
        baskets: [
            { 
                ticker: 'HEALTH', 
                name: 'Healthcare Leaders Basket', 
                price: '234.89', 
                type: 'basket', 
                up: true, 
                intradayData: [230, 235, 234, 234.89],
                about: { 
                    description: 'A comprehensive basket of leading healthcare companies spanning pharmaceuticals, medical devices, and health services.',
                    manager: 'OneBasket',
                    founded: '2023',
                    totalAssets: '$1.8B'
                },
                assets: [
                    { ticker: 'JNJ', name: 'Johnson & Johnson', weight: '30%', price: '159.32', type: 'stock' },
                    { ticker: 'UNH', name: 'UnitedHealth Group', weight: '25%', price: '521.45', type: 'stock' },
                    { ticker: 'PFE', name: 'Pfizer Inc.', weight: '20%', price: '28.94', type: 'stock' },
                    { ticker: 'ABT', name: 'Abbott Labs', weight: '15%', price: '109.67', type: 'stock' },
                    { ticker: 'MRK', name: 'Merck & Co.', weight: '10%', price: '108.45', type: 'stock' }
                ]
            },
            { 
                ticker: 'BIOTECH', 
                name: 'Biotech Innovation Basket', 
                price: '156.22', 
                type: 'basket', 
                up: false, 
                intradayData: [160, 155, 157, 156.22],
                about: { 
                    description: 'A focused basket targeting breakthrough biotechnology companies developing next-generation therapies.',
                    manager: 'OneBasket',
                    founded: '2024',
                    totalAssets: '$650M'
                },
                assets: [
                    { ticker: 'GILD', name: 'Gilead Sciences', weight: '25%', price: '78.43', type: 'stock' },
                    { ticker: 'BIIB', name: 'Biogen Inc.', weight: '20%', price: '269.75', type: 'stock' },
                    { ticker: 'AMGN', name: 'Amgen Inc.', weight: '20%', price: '284.12', type: 'stock' },
                    { ticker: 'REGN', name: 'Regeneron Pharma', weight: '15%', price: '789.34', type: 'stock' },
                    { ticker: 'VRTX', name: 'Vertex Pharma', weight: '20%', price: '385.67', type: 'stock' }
                ]
            }
        ]
    },
    {
        name: 'Energy',
        emoji: '⚡',
        assets: [
            { ticker: 'XOM', name: 'Exxon Mobil Corp.', price: '116.73', type: 'stock', up: true, intradayData: [115, 118, 116.5, 116.73] },
            { ticker: 'CVX', name: 'Chevron Corp.', price: '154.21', type: 'stock', up: false, intradayData: [156, 154, 155, 154.21] },
            { ticker: 'COP', name: 'ConocoPhillips', price: '107.84', type: 'stock', up: true, intradayData: [106, 109, 108, 107.84] }
        ]
    },
    {
        name: 'Finance',
        emoji: '🏦',
        assets: [
            { ticker: 'JPM', name: 'JPMorgan Chase', price: '194.52', type: 'stock', up: true, intradayData: [192, 196, 194, 194.52] },
            { ticker: 'BAC', name: 'Bank of America', price: '41.73', type: 'stock', up: false, intradayData: [42, 41.5, 42.2, 41.73] },
            { ticker: 'WFC', name: 'Wells Fargo & Co.', price: '57.84', type: 'stock', up: true, intradayData: [57, 58.5, 58, 57.84] },
            { ticker: 'GS', name: 'Goldman Sachs', price: '378.92', type: 'stock', up: true, intradayData: [375, 380, 378, 378.92] }
        ]
    },
    {
        name: 'Consumer Goods',
        emoji: '🛍️',
        assets: [
            { ticker: 'PG', name: 'Procter & Gamble', price: '156.43', type: 'stock', up: false, intradayData: [158, 156, 157, 156.43] },
            { ticker: 'KO', name: 'Coca-Cola Co.', price: '62.89', type: 'stock', up: true, intradayData: [62, 63.5, 63, 62.89] },
            { ticker: 'PEP', name: 'PepsiCo Inc.', price: '171.25', type: 'stock', up: true, intradayData: [170, 172, 171.5, 171.25] }
        ]
    },
    {
        name: 'Crypto',
        emoji: '₿',
        baskets: [
            { 
                ticker: 'CRYPTO10', 
                name: 'Top 10 Crypto Basket', 
                price: '847.33', 
                type: 'basket', 
                up: true, 
                intradayData: [820, 850, 845, 847.33],
                about: { 
                    description: 'A diversified basket of the top 10 cryptocurrencies by market capitalization, providing broad exposure to the digital asset ecosystem.',
                    manager: 'OneBasket',
                    founded: '2023',
                    totalAssets: '$420M'
                },
                assets: [
                    { ticker: 'BTC', name: 'Bitcoin', weight: '40%', price: '43250.00', type: 'crypto' },
                    { ticker: 'ETH', name: 'Ethereum', weight: '25%', price: '2684.50', type: 'crypto' },
                    { ticker: 'BNB', name: 'Binance Coin', weight: '8%', price: '315.67', type: 'crypto' },
                    { ticker: 'SOL', name: 'Solana', weight: '7%', price: '98.45', type: 'crypto' },
                    { ticker: 'ADA', name: 'Cardano', weight: '5%', price: '0.47', type: 'crypto' },
                    { ticker: 'AVAX', name: 'Avalanche', weight: '5%', price: '36.78', type: 'crypto' },
                    { ticker: 'DOT', name: 'Polkadot', weight: '4%', price: '6.23', type: 'crypto' },
                    { ticker: 'MATIC', name: 'Polygon', weight: '3%', price: '0.89', type: 'crypto' },
                    { ticker: 'LINK', name: 'Chainlink', weight: '2%', price: '14.23', type: 'crypto' },
                    { ticker: 'UNI', name: 'Uniswap', weight: '1%', price: '6.78', type: 'crypto' }
                ]
            },
            { 
                ticker: 'DEFI', 
                name: 'DeFi Innovation Basket', 
                price: '234.56', 
                type: 'basket', 
                up: false, 
                intradayData: [240, 232, 238, 234.56],
                about: { 
                    description: 'A focused basket targeting decentralized finance protocols and governance tokens driving the future of finance.',
                    manager: 'OneBasket',
                    founded: '2024',
                    totalAssets: '$180M'
                },
                assets: [
                    { ticker: 'UNI', name: 'Uniswap', weight: '25%', price: '6.78', type: 'crypto' },
                    { ticker: 'AAVE', name: 'Aave', weight: '20%', price: '89.34', type: 'crypto' },
                    { ticker: 'COMP', name: 'Compound', weight: '15%', price: '45.67', type: 'crypto' },
                    { ticker: 'MKR', name: 'Maker', weight: '15%', price: '1567.89', type: 'crypto' },
                    { ticker: 'SUSHI', name: 'SushiSwap', weight: '10%', price: '1.23', type: 'crypto' },
                    { ticker: 'CRV', name: 'Curve', weight: '10%', price: '0.67', type: 'crypto' },
                    { ticker: 'YFI', name: 'Yearn Finance', weight: '5%', price: '6789.12', type: 'crypto' }
                ]
            }
        ]
    }
];
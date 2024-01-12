# VideoEditor - Front-End

# Web3 doc

We have the useWeb3 hook. It returns a `send` function.
It has 2 required arguments: `method` and `params`. The first argument is the
name of the web3 method to call, and the second argument is
the parameters such as the body in the http POST message.

web3 methods divided into 4 parts

- `nft`
- `balance`
- `auction`
- `membership` not implemented...

## NFT

- `nftMint` publishing NFT for the first time (it call `createSailing` from contract).
    - `artId`: id of ART
    - `price`: price of 1 copy (convert to WEI before sending to contract)
    - `quantity`: quantity of nft copies
    - `galleryFee`: fee of gallery (multiply by 100 before sending to contract)
    - `galleryAddress`: address of gallery (wallet public key)
    - `blockchain`: NFT network (`ethereum` or `polygon`)
    - `collaborators`: Array of ```{ user, fee }``` (multiply fees by 100 before sending to contract)
    - `address`: current wallet public key
- `nftBuy` buy auction nft with buyNow price (it call `buy` from contract).
    - `price`: NFT buy now price (convert to WEI before sending to contract)
    - `seller`: public address of NFT owner
    - `tokenId`: NFT Id
    - `quantity`: quantity of NFT copies, always 1
    - `blockchain`: NFT network (`ethereum` or `polygon`)
- `nftMultipleBuy` buy multiple copies of 1 NFT (it call `multiBuy` from contract).
    - `amount`: sum of prices (convert to WEI before sending to contract)
    - `tokenIds`: NFT id's
    - `sellers`: Public keys of copies owners
    - `counts`: quantities of copies
    - `blockchain`: NFT network (`ethereum` or `polygon`)
- `nftSell` resell NFT (it call `resell` from contract).
    - `price`: price of nft
    - `tokenId`: NFT id
    - `quantity`: quantity of copies
    - `blockchain`: NFT network (`ethereum` or `polygon`)

## BALANCE

- `balanceGet` get balance (it call `_fundRecord` from contract).
    - `address`: current wallet public address
- `balanceTopUp`: fill wallet balance (it call `addFund` from contract).
    - `price`: amount to fill
    - `blockchain`: NFT network (`ethereum` or `polygon`)
- `balanceDrop`: drop amount from balance (it call `dropFund` from contract)
    - `amount`: amount to drop from balance
    - `blockchain`: NFT network (`ethereum` or `polygon`)

## AUCTION

- `auctionMint`: publish NFT with auction first time (it call `createAuction` from contract).
    - `artId`: id of ART
    - `duration`: duration of auction in seconds
    - `minPrice`: auction start price (convert to WEI before sending to contract)
    - `maxPrice`: buy now price (convert to WEI before sending to contract)
    - `reservePrice`: minimum price (convert to WEI before sending to contract)
    - `galleryFee`: fee of gallery (multiply by 100 before sending to contract)
    - `galleryAddress`: address of gallery (wallet public key)
    - `blockchain`: NFT network (`ethereum` or `polygon`)
    - `collaborators`: Array of ```{ user, fee }``` (multiply fees by 100 before sending to contract)
- `auctionSell`: resell NFT with auction (it call `resaleWithAuction` from contract).
    - `tokenId`: NFT id
    - `minPrice`: auction start price (convert to WEI before sending to contract)
    - `maxPrice`: buy now price (convert to WEI before sending to contract)
    - `reservePrice`: minimum price (convert to WEI before sending to contract)
    - `blockchain`: NFT network (`ethereum` or `polygon`)
    - `duration`: duration of auction in seconds
- `auctionEndBySeller`: close auction (it call `endAuctionBySeller` from contract).
    - `tokenId`: NFT id
    - `blockchain`: NFT network (`ethereum` or `polygon`)
- `auctionEnd`: close auction if NFT has winner (it call `endAuction` from contract).
    - `tokenId`: NFT id
    - `blockchain`: NFT network (`ethereum` or `polygon`)
- `auctionBidFromBalance`: bid from balance (it call `bidAuction` from contract).
  - `amount`: amount to bid (convert to WEI before sending to contract)
  - `tokenId`: NFT id
  - `blockchain`: NFT network (`ethereum` or `polygon`)

## MEMBERSHIP (Not implemented...)

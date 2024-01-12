import { AbiItem } from 'web3-utils';
import { INetwork } from '@constants/types';

const MAIN_NETWORKS: INetwork = {
  ethereum: {
    chainName: 'Ethereum Mainnet',
    rpcUrls: ['https://mainnet.infura.io/v3/'],

    currency: 'ETH',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },

    chainId: 1,
    blockExplorerUrls: ['https://etherscan.io'],
  },
  polygon: {
    chainName: 'Polygon Mainnet',
    rpcUrls: ['https://polygon-rpc.com/'],

    currency: 'MATIC',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },

    chainId: 137,
    blockExplorerUrls: ['https://polygonscan.com'],
  },
};

// =================== TEST NETWORKS ===================
const TEST_NETWORKS: INetwork = {
  ethereum: {
    chainName: 'Goerli test network',
    rpcUrls: ['https://eth-goerli.g.alchemy.com/v2/SoS26cKPwlty4eKBisFBcU7GkzUbkUNW'],

    currency: 'ETH',
    nativeCurrency: {
      name: 'Goerli test network',
      symbol: 'GoerliETH',
      decimals: 18,
    },

    chainId: 5,
    blockExplorerUrls: ['https://goerli.etherscan.io'],
  },
  polygon: {
    chainName: 'Mumbai',
    rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],

    currency: 'MATIC',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },

    chainId: 80001,
    blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
  },
};

export const NETWORK_ENV: 'prod' | 'stage' = 'stage';

export const AVAILABLE_NETWORKS: INetwork = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ...(NETWORK_ENV === 'prod' && (MAIN_NETWORKS)),
  ...(NETWORK_ENV === 'stage' && (TEST_NETWORKS)),
};

export const ALLOWED_CHAINS = [AVAILABLE_NETWORKS.ethereum.chainId, AVAILABLE_NETWORKS.polygon.chainId];

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const NFT_ABI: AbiItem[] = [
  {
    'inputs': [],
    'stateMutability': 'nonpayable',
    'type': 'constructor',
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': true,
      'internalType': 'address',
      'name': 'account',
      'type': 'address',
    }, {
      'indexed': true,
      'internalType': 'address',
      'name': 'operator',
      'type': 'address',
    }, {
      'indexed': false,
      'internalType': 'bool',
      'name': 'approved',
      'type': 'bool',
    }],
    'name': 'ApprovalForAll',
    'type': 'event',
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': false,
      'internalType': 'uint256',
      'name': 'tokenId',
      'type': 'uint256',
    }, {
      'indexed': false,
      'internalType': 'uint32',
      'name': 'qty',
      'type': 'uint32',
    }, {
      'indexed': false,
      'internalType': 'address',
      'name': 'creator',
      'type': 'address',
    }, {
      'indexed': false,
      'internalType': 'bool',
      'name': 'isGallery',
      'type': 'bool',
    }, {
      'indexed': false,
      'internalType': 'uint32',
      'name': 'galleryFee',
      'type': 'uint32',
    }, {
      'indexed': false,
      'internalType': 'address',
      'name': 'galleryAddress',
      'type': 'address',
    }, {
      'indexed': false,
      'internalType': 'address[]',
      'name': 'collaborators',
      'type': 'address[]',
    }, {
      'indexed': false,
      'internalType': 'uint32[]',
      'name': 'collaboratorsFee',
      'type': 'uint32[]',
    }],
    'name': 'NftItemCreated',
    'type': 'event',
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': true,
      'internalType': 'address',
      'name': 'previousOwner',
      'type': 'address',
    }, {
      'indexed': true,
      'internalType': 'address',
      'name': 'newOwner',
      'type': 'address',
    }],
    'name': 'OwnershipTransferred',
    'type': 'event',
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': true,
      'internalType': 'address',
      'name': 'operator',
      'type': 'address',
    }, {
      'indexed': true,
      'internalType': 'address',
      'name': 'from',
      'type': 'address',
    }, {
      'indexed': true,
      'internalType': 'address',
      'name': 'to',
      'type': 'address',
    }, {
      'indexed': false,
      'internalType': 'uint256[]',
      'name': 'ids',
      'type': 'uint256[]',
    }, {
      'indexed': false,
      'internalType': 'uint256[]',
      'name': 'values',
      'type': 'uint256[]',
    }],
    'name': 'TransferBatch',
    'type': 'event',
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': true,
      'internalType': 'address',
      'name': 'operator',
      'type': 'address',
    }, {
      'indexed': true,
      'internalType': 'address',
      'name': 'from',
      'type': 'address',
    }, {
      'indexed': true,
      'internalType': 'address',
      'name': 'to',
      'type': 'address',
    }, {
      'indexed': false,
      'internalType': 'uint256',
      'name': 'id',
      'type': 'uint256',
    }, {
      'indexed': false,
      'internalType': 'uint256',
      'name': 'value',
      'type': 'uint256',
    }],
    'name': 'TransferSingle',
    'type': 'event',
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': false,
      'internalType': 'string',
      'name': 'value',
      'type': 'string',
    }, {
      'indexed': true,
      'internalType': 'uint256',
      'name': 'id',
      'type': 'uint256',
    }],
    'name': 'URI',
    'type': 'event',
  }, {
    'inputs': [{
      'internalType': 'address',
      'name': 'account',
      'type': 'address',
    }, {
      'internalType': 'uint256',
      'name': 'id',
      'type': 'uint256',
    }],
    'name': 'balanceOf',
    'outputs': [{
      'internalType': 'uint256',
      'name': '',
      'type': 'uint256',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'address[]',
      'name': 'accounts',
      'type': 'address[]',
    }, {
      'internalType': 'uint256[]',
      'name': 'ids',
      'type': 'uint256[]',
    }],
    'name': 'balanceOfBatch',
    'outputs': [{
      'internalType': 'uint256[]',
      'name': '',
      'type': 'uint256[]',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'address',
      'name': '_creator',
      'type': 'address',
    }, {
      'internalType': 'string',
      'name': '_uri',
      'type': 'string',
    }, {
      'internalType': 'uint32',
      'name': '_quantity',
      'type': 'uint32',
    }],
    'name': 'createMembershipToken',
    'outputs': [{
      'internalType': 'uint256',
      'name': '',
      'type': 'uint256',
    }],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'address',
      'name': '_creator',
      'type': 'address',
    }, {
      'internalType': 'string',
      'name': '_uri',
      'type': 'string',
    }, {
      'internalType': 'uint32',
      'name': '_quantity',
      'type': 'uint32',
    }, {
      'internalType': 'uint32',
      'name': '_galleryFee',
      'type': 'uint32',
    }, {
      'internalType': 'address',
      'name': '_galleryAddress',
      'type': 'address',
    }, {
      'internalType': 'address[]',
      'name': '_collaborators',
      'type': 'address[]',
    }, {
      'internalType': 'uint32[]',
      'name': '_collaboratorsFee',
      'type': 'uint32[]',
    }],
    'name': 'createNftItem',
    'outputs': [{
      'internalType': 'uint256',
      'name': '',
      'type': 'uint256',
    }],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'uint256',
      'name': '_tokenId',
      'type': 'uint256',
    }],
    'name': 'getNftItem',
    'outputs': [{
      'components': [{
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256',
      }, {
        'internalType': 'uint32',
        'name': 'quantity',
        'type': 'uint32',
      }, {
        'internalType': 'address',
        'name': 'creator',
        'type': 'address',
      }, {
        'internalType': 'bool',
        'name': 'isListed',
        'type': 'bool',
      }, {
        'internalType': 'bool',
        'name': 'isGallery',
        'type': 'bool',
      }, {
        'internalType': 'uint32',
        'name': 'galleryFee',
        'type': 'uint32',
      }, {
        'internalType': 'address',
        'name': 'galleryAddress',
        'type': 'address',
      }, {
        'internalType': 'address[]',
        'name': 'collaborators',
        'type': 'address[]',
      }, {
        'internalType': 'uint32[]',
        'name': 'collaboratorsFee',
        'type': 'uint32[]',
      }, {
        'internalType': 'bool',
        'name': 'isMembership',
        'type': 'bool',
      }],
      'internalType': 'struct AisNft.NftItem',
      'name': '',
      'type': 'tuple',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'address',
      'name': 'account',
      'type': 'address',
    }, {
      'internalType': 'address',
      'name': 'operator',
      'type': 'address',
    }],
    'name': 'isApprovedForAll',
    'outputs': [{
      'internalType': 'bool',
      'name': '',
      'type': 'bool',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [],
    'name': 'marketplace',
    'outputs': [{
      'internalType': 'address',
      'name': '',
      'type': 'address',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'address',
      'name': 'from',
      'type': 'address',
    }, {
      'internalType': 'address',
      'name': 'to',
      'type': 'address',
    }, {
      'internalType': 'uint256',
      'name': 'id',
      'type': 'uint256',
    }, {
      'internalType': 'uint256',
      'name': 'amount',
      'type': 'uint256',
    }],
    'name': 'marketplaceTransfer',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [],
    'name': 'membership',
    'outputs': [{
      'internalType': 'address',
      'name': '',
      'type': 'address',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'address',
      'name': 'from',
      'type': 'address',
    }, {
      'internalType': 'address',
      'name': 'to',
      'type': 'address',
    }, {
      'internalType': 'uint256',
      'name': 'id',
      'type': 'uint256',
    }],
    'name': 'membershipTransfer',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [],
    'name': 'nextTokenId',
    'outputs': [{
      'internalType': 'uint256',
      'name': '',
      'type': 'uint256',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [],
    'name': 'owner',
    'outputs': [{
      'internalType': 'address',
      'name': '',
      'type': 'address',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [],
    'name': 'renounceOwnership',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'address',
      'name': 'from',
      'type': 'address',
    }, {
      'internalType': 'address',
      'name': 'to',
      'type': 'address',
    }, {
      'internalType': 'uint256[]',
      'name': 'ids',
      'type': 'uint256[]',
    }, {
      'internalType': 'uint256[]',
      'name': 'amounts',
      'type': 'uint256[]',
    }, {
      'internalType': 'bytes',
      'name': 'data',
      'type': 'bytes',
    }],
    'name': 'safeBatchTransferFrom',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'address',
      'name': 'from',
      'type': 'address',
    }, {
      'internalType': 'address',
      'name': 'to',
      'type': 'address',
    }, {
      'internalType': 'uint256',
      'name': 'id',
      'type': 'uint256',
    }, {
      'internalType': 'uint256',
      'name': 'amount',
      'type': 'uint256',
    }, {
      'internalType': 'bytes',
      'name': 'data',
      'type': 'bytes',
    }],
    'name': 'safeTransferFrom',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'address',
      'name': 'operator',
      'type': 'address',
    }, {
      'internalType': 'bool',
      'name': 'approved',
      'type': 'bool',
    }],
    'name': 'setApprovalForAll',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'address',
      'name': '_marketplace',
      'type': 'address',
    }],
    'name': 'setMarketplace',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'address',
      'name': '_membership',
      'type': 'address',
    }],
    'name': 'setMembership',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'bytes4',
      'name': 'interfaceId',
      'type': 'bytes4',
    }],
    'name': 'supportsInterface',
    'outputs': [{
      'internalType': 'bool',
      'name': '',
      'type': 'bool',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'address',
      'name': 'newOwner',
      'type': 'address',
    }],
    'name': 'transferOwnership',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'uint256',
      'name': '_tokenId',
      'type': 'uint256',
    }],
    'name': 'uri',
    'outputs': [{
      'internalType': 'string',
      'name': '',
      'type': 'string',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }];

export const MEMBERSHIP_ABI: AbiItem[] = [
  {
    'anonymous': false,
    'inputs': [{
      'indexed': false,
      'internalType': 'uint8',
      'name': 'version',
      'type': 'uint8',
    }],
    'name': 'Initialized',
    'type': 'event',
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': false,
      'internalType': 'bytes32',
      'name': '_type',
      'type': 'bytes32',
    }, {
      'indexed': false,
      'internalType': 'uint256',
      'name': 'tokenId',
      'type': 'uint256',
    }, {
      'indexed': false,
      'internalType': 'uint256',
      'name': 'price',
      'type': 'uint256',
    }],
    'name': 'MembershipCreated',
    'type': 'event',
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': false,
      'internalType': 'bytes32',
      'name': '_type',
      'type': 'bytes32',
    }],
    'name': 'MembershipDisabled',
    'type': 'event',
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': false,
      'internalType': 'bytes32',
      'name': '_type',
      'type': 'bytes32',
    }, {
      'indexed': false,
      'internalType': 'address',
      'name': 'user',
      'type': 'address',
    }, {
      'indexed': false,
      'internalType': 'address',
      'name': 'caller',
      'type': 'address',
    }],
    'name': 'MembershipReleased',
    'type': 'event',
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': false,
      'internalType': 'bytes32',
      'name': '_type',
      'type': 'bytes32',
    }, {
      'indexed': false,
      'internalType': 'address',
      'name': 'user',
      'type': 'address',
    }, {
      'indexed': false,
      'internalType': 'uint256',
      'name': 'till',
      'type': 'uint256',
    }, {
      'indexed': false,
      'internalType': 'uint256',
      'name': 'paid',
      'type': 'uint256',
    }],
    'name': 'MembershipSubmitted',
    'type': 'event',
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': false,
      'internalType': 'bytes32',
      'name': '_fromType',
      'type': 'bytes32',
    }, {
      'indexed': false,
      'internalType': 'bytes32',
      'name': '_toType',
      'type': 'bytes32',
    }, {
      'indexed': false,
      'internalType': 'address',
      'name': 'user',
      'type': 'address',
    }, {
      'indexed': false,
      'internalType': 'uint256',
      'name': 'till',
      'type': 'uint256',
    }, {
      'indexed': false,
      'internalType': 'uint256',
      'name': 'paid',
      'type': 'uint256',
    }],
    'name': 'MembershipUpdated',
    'type': 'event',
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': true,
      'internalType': 'address',
      'name': 'previousOwner',
      'type': 'address',
    }, {
      'indexed': true,
      'internalType': 'address',
      'name': 'newOwner',
      'type': 'address',
    }],
    'name': 'OwnershipTransferred',
    'type': 'event',
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': false,
      'internalType': 'bool',
      'name': 'isPaused',
      'type': 'bool',
    }],
    'name': 'PauseChanged',
    'type': 'event',
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': true,
      'internalType': 'bytes32',
      'name': 'role',
      'type': 'bytes32',
    }, {
      'indexed': true,
      'internalType': 'bytes32',
      'name': 'previousAdminRole',
      'type': 'bytes32',
    }, {
      'indexed': true,
      'internalType': 'bytes32',
      'name': 'newAdminRole',
      'type': 'bytes32',
    }],
    'name': 'RoleAdminChanged',
    'type': 'event',
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': true,
      'internalType': 'bytes32',
      'name': 'role',
      'type': 'bytes32',
    }, {
      'indexed': true,
      'internalType': 'address',
      'name': 'account',
      'type': 'address',
    }, {
      'indexed': true,
      'internalType': 'address',
      'name': 'sender',
      'type': 'address',
    }],
    'name': 'RoleGranted',
    'type': 'event',
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': true,
      'internalType': 'bytes32',
      'name': 'role',
      'type': 'bytes32',
    }, {
      'indexed': true,
      'internalType': 'address',
      'name': 'account',
      'type': 'address',
    }, {
      'indexed': true,
      'internalType': 'address',
      'name': 'sender',
      'type': 'address',
    }],
    'name': 'RoleRevoked',
    'type': 'event',
  }, {
    'inputs': [],
    'name': 'ADMIN_ROLE',
    'outputs': [{
      'internalType': 'bytes32',
      'name': '',
      'type': 'bytes32',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [],
    'name': 'DEFAULT_ADMIN_ROLE',
    'outputs': [{
      'internalType': 'bytes32',
      'name': '',
      'type': 'bytes32',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'uint256',
      'name': '',
      'type': 'uint256',
    }, {
      'internalType': 'address',
      'name': '',
      'type': 'address',
    }],
    'name': '_membershipOfUserOnTokenTill',
    'outputs': [{
      'internalType': 'uint256',
      'name': '',
      'type': 'uint256',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'uint256',
      'name': '',
      'type': 'uint256',
    }],
    'name': '_membershipTokenLeft',
    'outputs': [{
      'internalType': 'uint32',
      'name': '',
      'type': 'uint32',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'uint256',
      'name': '',
      'type': 'uint256',
    }],
    'name': '_membershipTokenPrice',
    'outputs': [{
      'internalType': 'uint256',
      'name': '',
      'type': 'uint256',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'bytes32',
      'name': '',
      'type': 'bytes32',
    }],
    'name': '_membershipTypeToTokenId',
    'outputs': [{
      'internalType': 'uint256',
      'name': '',
      'type': 'uint256',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [],
    'name': 'contractBalance',
    'outputs': [{
      'internalType': 'uint256',
      'name': '',
      'type': 'uint256',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'bytes32',
      'name': '_type',
      'type': 'bytes32',
    }],
    'name': 'disableMembership',
    'outputs': [{
      'internalType': 'bool',
      'name': '',
      'type': 'bool',
    }],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'bytes32',
      'name': '_type',
      'type': 'bytes32',
    }, {
      'internalType': 'address',
      'name': '_user',
      'type': 'address',
    }],
    'name': 'getMembership',
    'outputs': [{
      'internalType': 'uint256',
      'name': 'till',
      'type': 'uint256',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'bytes32',
      'name': '_type',
      'type': 'bytes32',
    }],
    'name': 'getMembershipLeft',
    'outputs': [{
      'internalType': 'uint256',
      'name': 'left',
      'type': 'uint256',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'bytes32',
      'name': 'role',
      'type': 'bytes32',
    }],
    'name': 'getRoleAdmin',
    'outputs': [{
      'internalType': 'bytes32',
      'name': '',
      'type': 'bytes32',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'bytes32',
      'name': 'role',
      'type': 'bytes32',
    }, {
      'internalType': 'address',
      'name': 'account',
      'type': 'address',
    }],
    'name': 'grantRole',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'bytes32',
      'name': 'role',
      'type': 'bytes32',
    }, {
      'internalType': 'address',
      'name': 'account',
      'type': 'address',
    }],
    'name': 'hasRole',
    'outputs': [{
      'internalType': 'bool',
      'name': '',
      'type': 'bool',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'address',
      'name': '_nft',
      'type': 'address',
    }],
    'name': 'initialize',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [],
    'name': 'lastPauseTime',
    'outputs': [{
      'internalType': 'uint256',
      'name': '',
      'type': 'uint256',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'uint256',
      'name': '',
      'type': 'uint256',
    }],
    'name': 'membershipTypesIds',
    'outputs': [{
      'internalType': 'uint256',
      'name': '',
      'type': 'uint256',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'bytes32',
      'name': '_type',
      'type': 'bytes32',
    }, {
      'internalType': 'string',
      'name': '_uri',
      'type': 'string',
    }, {
      'internalType': 'uint256',
      'name': '_price',
      'type': 'uint256',
    }],
    'name': 'mintMembership',
    'outputs': [{
      'internalType': 'bool',
      'name': '',
      'type': 'bool',
    }, {
      'internalType': 'uint256',
      'name': '',
      'type': 'uint256',
    }],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [],
    'name': 'owner',
    'outputs': [{
      'internalType': 'address',
      'name': '',
      'type': 'address',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [],
    'name': 'paused',
    'outputs': [{
      'internalType': 'bool',
      'name': '',
      'type': 'bool',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'bytes32',
      'name': '_type',
      'type': 'bytes32',
    }, {
      'internalType': 'address',
      'name': '_user',
      'type': 'address',
    }],
    'name': 'releaseMembership',
    'outputs': [{
      'internalType': 'bool',
      'name': '',
      'type': 'bool',
    }],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [],
    'name': 'renounceOwnership',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'bytes32',
      'name': 'role',
      'type': 'bytes32',
    }, {
      'internalType': 'address',
      'name': 'account',
      'type': 'address',
    }],
    'name': 'renounceRole',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'bytes32',
      'name': 'role',
      'type': 'bytes32',
    }, {
      'internalType': 'address',
      'name': 'account',
      'type': 'address',
    }],
    'name': 'revokeRole',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'bool',
      'name': '_paused',
      'type': 'bool',
    }],
    'name': 'setPaused',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'bytes32',
      'name': '_type',
      'type': 'bytes32',
    }],
    'name': 'submitMembership',
    'outputs': [{
      'internalType': 'bool',
      'name': '',
      'type': 'bool',
    }],
    'stateMutability': 'payable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'address',
      'name': 'newOwner',
      'type': 'address',
    }],
    'name': 'transferOwnership',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'bytes32',
      'name': '_currentType',
      'type': 'bytes32',
    }, {
      'internalType': 'bytes32',
      'name': '_toType',
      'type': 'bytes32',
    }],
    'name': 'upgradeMembership',
    'outputs': [{
      'internalType': 'bool',
      'name': '',
      'type': 'bool',
    }],
    'stateMutability': 'payable',
    'type': 'function',
  }, {
    'inputs': [],
    'name': 'withdrawAdmin',
    'outputs': [{
      'internalType': 'bool',
      'name': '',
      'type': 'bool',
    }],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }];

export const MARKETPLACE_ABI: AbiItem[] = [
  {
    'anonymous': false,
    'inputs': [{
      'indexed': false,
      'internalType': 'uint256',
      'name': 'tokenId',
      'type': 'uint256',
    }, {
      'indexed': false,
      'internalType': 'address',
      'name': 'seller',
      'type': 'address',
    }, {
      'indexed': false,
      'internalType': 'address',
      'name': 'caller',
      'type': 'address',
    }],
    'name': 'AuctionClosed',
    'type': 'event',
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': false,
      'internalType': 'uint256',
      'name': 'tokenId',
      'type': 'uint256',
    }, {
      'indexed': false,
      'internalType': 'address',
      'name': 'creator',
      'type': 'address',
    }, {
      'indexed': false,
      'internalType': 'uint256',
      'name': 'minPrice',
      'type': 'uint256',
    }, {
      'indexed': false,
      'internalType': 'uint256',
      'name': 'reservePrice',
      'type': 'uint256',
    }, {
      'indexed': false,
      'internalType': 'uint256',
      'name': 'buyNowPrice',
      'type': 'uint256',
    }, {
      'indexed': false,
      'internalType': 'bool',
      'name': 'isResell',
      'type': 'bool',
    }, {
      'indexed': false,
      'internalType': 'uint256',
      'name': 'createTime',
      'type': 'uint256',
    }, {
      'indexed': false,
      'internalType': 'uint32',
      'name': 'duration',
      'type': 'uint32',
    }],
    'name': 'AuctionCreated',
    'type': 'event',
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': false,
      'internalType': 'uint256',
      'name': 'tokenId',
      'type': 'uint256',
    }, {
      'indexed': false,
      'internalType': 'address',
      'name': 'bidder',
      'type': 'address',
    }, {
      'indexed': false,
      'internalType': 'uint256',
      'name': 'newBid',
      'type': 'uint256',
    }],
    'name': 'BidCreated',
    'type': 'event',
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': false,
      'internalType': 'uint256',
      'name': 'tokenId',
      'type': 'uint256',
    }, {
      'indexed': false,
      'internalType': 'address',
      'name': 'bidder',
      'type': 'address',
    }],
    'name': 'BidWithdrawn',
    'type': 'event',
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': false,
      'internalType': 'address',
      'name': 'user',
      'type': 'address',
    }, {
      'indexed': false,
      'internalType': 'uint256',
      'name': 'amount',
      'type': 'uint256',
    }],
    'name': 'FundAdded',
    'type': 'event',
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': false,
      'internalType': 'address',
      'name': 'user',
      'type': 'address',
    }, {
      'indexed': false,
      'internalType': 'uint256',
      'name': 'amount',
      'type': 'uint256',
    }],
    'name': 'FundDropped',
    'type': 'event',
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': false,
      'internalType': 'uint8',
      'name': 'version',
      'type': 'uint8',
    }],
    'name': 'Initialized',
    'type': 'event',
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': false,
      'internalType': 'uint256',
      'name': 'tokenId',
      'type': 'uint256',
    }, {
      'indexed': false,
      'internalType': 'uint256',
      'name': 'price',
      'type': 'uint256',
    }, {
      'indexed': false,
      'internalType': 'uint32',
      'name': 'qty',
      'type': 'uint32',
    }, {
      'indexed': false,
      'internalType': 'address',
      'name': 'seller',
      'type': 'address',
    }, {
      'indexed': false,
      'internalType': 'address',
      'name': 'buyer',
      'type': 'address',
    }, {
      'indexed': false,
      'internalType': 'bool',
      'name': 'wasAuction',
      'type': 'bool',
    }],
    'name': 'NftItemSold',
    'type': 'event',
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': true,
      'internalType': 'address',
      'name': 'previousOwner',
      'type': 'address',
    }, {
      'indexed': true,
      'internalType': 'address',
      'name': 'newOwner',
      'type': 'address',
    }],
    'name': 'OwnershipTransferred',
    'type': 'event',
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': false,
      'internalType': 'bool',
      'name': 'isPaused',
      'type': 'bool',
    }],
    'name': 'PauseChanged',
    'type': 'event',
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': true,
      'internalType': 'bytes32',
      'name': 'role',
      'type': 'bytes32',
    }, {
      'indexed': true,
      'internalType': 'bytes32',
      'name': 'previousAdminRole',
      'type': 'bytes32',
    }, {
      'indexed': true,
      'internalType': 'bytes32',
      'name': 'newAdminRole',
      'type': 'bytes32',
    }],
    'name': 'RoleAdminChanged',
    'type': 'event',
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': true,
      'internalType': 'bytes32',
      'name': 'role',
      'type': 'bytes32',
    }, {
      'indexed': true,
      'internalType': 'address',
      'name': 'account',
      'type': 'address',
    }, {
      'indexed': true,
      'internalType': 'address',
      'name': 'sender',
      'type': 'address',
    }],
    'name': 'RoleGranted',
    'type': 'event',
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': true,
      'internalType': 'bytes32',
      'name': 'role',
      'type': 'bytes32',
    }, {
      'indexed': true,
      'internalType': 'address',
      'name': 'account',
      'type': 'address',
    }, {
      'indexed': true,
      'internalType': 'address',
      'name': 'sender',
      'type': 'address',
    }],
    'name': 'RoleRevoked',
    'type': 'event',
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': false,
      'internalType': 'uint256',
      'name': 'tokenId',
      'type': 'uint256',
    }, {
      'indexed': false,
      'internalType': 'address',
      'name': 'creator',
      'type': 'address',
    }, {
      'indexed': false,
      'internalType': 'uint32',
      'name': 'qty',
      'type': 'uint32',
    }, {
      'indexed': false,
      'internalType': 'uint256',
      'name': 'price',
      'type': 'uint256',
    }, {
      'indexed': false,
      'internalType': 'bool',
      'name': 'isResell',
      'type': 'bool',
    }],
    'name': 'SaleCreated',
    'type': 'event',
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': false,
      'internalType': 'uint256',
      'name': 'tokenId',
      'type': 'uint256',
    }, {
      'indexed': false,
      'internalType': 'address',
      'name': 'creator',
      'type': 'address',
    }],
    'name': 'SaleDropped',
    'type': 'event',
  }, {
    'inputs': [],
    'name': 'AUCTION_FINISHER_ROLE',
    'outputs': [{
      'internalType': 'bytes32',
      'name': '',
      'type': 'bytes32',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [],
    'name': 'DEFAULT_ADMIN_ROLE',
    'outputs': [{
      'internalType': 'bytes32',
      'name': '',
      'type': 'bytes32',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'address',
      'name': '',
      'type': 'address',
    }],
    'name': '_fundRecord',
    'outputs': [{
      'internalType': 'uint256',
      'name': '',
      'type': 'uint256',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'uint256',
      'name': '_amount',
      'type': 'uint256',
    }],
    'name': 'addFund',
    'outputs': [{
      'internalType': 'bool',
      'name': '',
      'type': 'bool',
    }],
    'stateMutability': 'payable',
    'type': 'function',
  }, {
    'inputs': [],
    'name': 'adminFee',
    'outputs': [{
      'internalType': 'uint32',
      'name': '',
      'type': 'uint32',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [],
    'name': 'adminFeeOnResell',
    'outputs': [{
      'internalType': 'uint32',
      'name': '',
      'type': 'uint32',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [],
    'name': 'afterBidDuration',
    'outputs': [{
      'internalType': 'uint32',
      'name': '',
      'type': 'uint32',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [],
    'name': 'afterBidDurationNoResPrice',
    'outputs': [{
      'internalType': 'uint32',
      'name': '',
      'type': 'uint32',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [],
    'name': 'auctionMaxDuration',
    'outputs': [{
      'internalType': 'uint32',
      'name': '',
      'type': 'uint32',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [],
    'name': 'auctionMinDuration',
    'outputs': [{
      'internalType': 'uint32',
      'name': '',
      'type': 'uint32',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'uint256',
      'name': '_tokenId',
      'type': 'uint256',
    }, {
      'internalType': 'uint256',
      'name': '_newBid',
      'type': 'uint256',
    }],
    'name': 'bidAuction',
    'outputs': [{
      'internalType': 'bool',
      'name': '',
      'type': 'bool',
    }],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'uint256',
      'name': '_tokenId',
      'type': 'uint256',
    }, {
      'internalType': 'uint32',
      'name': '_quantity',
      'type': 'uint32',
    }, {
      'internalType': 'address',
      'name': '_seller',
      'type': 'address',
    }],
    'name': 'buy',
    'outputs': [{
      'internalType': 'bool',
      'name': '',
      'type': 'bool',
    }],
    'stateMutability': 'payable',
    'type': 'function',
  }, {
    'inputs': [],
    'name': 'buyNowPercentage',
    'outputs': [{
      'internalType': 'uint32',
      'name': '',
      'type': 'uint32',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'address',
      'name': '_newAddress',
      'type': 'address',
    }],
    'name': 'changeAdminAddress',
    'outputs': [{
      'internalType': 'bool',
      'name': '',
      'type': 'bool',
    }],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'uint32',
      'name': '_afterBidDuration',
      'type': 'uint32',
    }],
    'name': 'changeAfterBidDuration',
    'outputs': [{
      'internalType': 'bool',
      'name': '',
      'type': 'bool',
    }],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'uint32',
      'name': '_afterBidDurationNoResPrice',
      'type': 'uint32',
    }],
    'name': 'changeAfterBidDurationNoResPrice',
    'outputs': [{
      'internalType': 'bool',
      'name': '',
      'type': 'bool',
    }],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'uint32',
      'name': '_auctionMaxDuration',
      'type': 'uint32',
    }],
    'name': 'changeAuctionMaxDuration',
    'outputs': [{
      'internalType': 'bool',
      'name': '',
      'type': 'bool',
    }],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'uint32',
      'name': '_auctionMinDuration',
      'type': 'uint32',
    }],
    'name': 'changeAuctionMinDuration',
    'outputs': [{
      'internalType': 'bool',
      'name': '',
      'type': 'bool',
    }],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'uint32',
      'name': '_buyNowPercentage',
      'type': 'uint32',
    }],
    'name': 'changeBuyNowPercentage',
    'outputs': [{
      'internalType': 'bool',
      'name': '',
      'type': 'bool',
    }],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'address',
      'name': '_newAddress',
      'type': 'address',
    }],
    'name': 'changeFoundationAddress',
    'outputs': [{
      'internalType': 'bool',
      'name': '',
      'type': 'bool',
    }],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'uint32',
      'name': '_reservePercentage',
      'type': 'uint32',
    }],
    'name': 'changeReservePercentage',
    'outputs': [{
      'internalType': 'bool',
      'name': '',
      'type': 'bool',
    }],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [],
    'name': 'contractBalance',
    'outputs': [{
      'internalType': 'uint256',
      'name': '',
      'type': 'uint256',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'string',
      'name': '_uri',
      'type': 'string',
    }, {
      'internalType': 'uint256',
      'name': '_minPrice',
      'type': 'uint256',
    }, {
      'internalType': 'uint256',
      'name': '_buyNowPrice',
      'type': 'uint256',
    }, {
      'internalType': 'uint256',
      'name': '_reservePrice',
      'type': 'uint256',
    }, {
      'internalType': 'uint32',
      'name': '_duration',
      'type': 'uint32',
    }, {
      'internalType': 'uint32',
      'name': '_galleryFee',
      'type': 'uint32',
    }, {
      'internalType': 'address',
      'name': '_galleryAddress',
      'type': 'address',
    }, {
      'internalType': 'address[]',
      'name': '_collaborators',
      'type': 'address[]',
    }, {
      'internalType': 'uint32[]',
      'name': '_collaboratorsFee',
      'type': 'uint32[]',
    }, {
      'internalType': 'bytes',
      'name': '_signature',
      'type': 'bytes',
    }],
    'name': 'createAuction',
    'outputs': [{
      'internalType': 'uint256',
      'name': '',
      'type': 'uint256',
    }],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'string',
      'name': '_uri',
      'type': 'string',
    }, {
      'internalType': 'uint256',
      'name': '_price',
      'type': 'uint256',
    }, {
      'internalType': 'uint32',
      'name': '_quantity',
      'type': 'uint32',
    }, {
      'internalType': 'uint32',
      'name': '_galleryFee',
      'type': 'uint32',
    }, {
      'internalType': 'address',
      'name': '_galleryAddress',
      'type': 'address',
    }, {
      'internalType': 'address[]',
      'name': '_collaborators',
      'type': 'address[]',
    }, {
      'internalType': 'uint32[]',
      'name': '_collaboratorsFee',
      'type': 'uint32[]',
    }, {
      'internalType': 'bytes',
      'name': '_signature',
      'type': 'bytes',
    }],
    'name': 'createSailing',
    'outputs': [{
      'internalType': 'bool',
      'name': '',
      'type': 'bool',
    }, {
      'internalType': 'uint256',
      'name': '',
      'type': 'uint256',
    }],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [],
    'name': 'creatorFee',
    'outputs': [{
      'internalType': 'uint32',
      'name': '',
      'type': 'uint32',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'uint256',
      'name': '_amount',
      'type': 'uint256',
    }],
    'name': 'dropFund',
    'outputs': [{
      'internalType': 'bool',
      'name': '',
      'type': 'bool',
    }],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'uint256',
      'name': '_tokenId',
      'type': 'uint256',
    }],
    'name': 'dropSailingList',
    'outputs': [{
      'internalType': 'bool',
      'name': '',
      'type': 'bool',
    }],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'uint256',
      'name': '_tokenId',
      'type': 'uint256',
    }],
    'name': 'endAuction',
    'outputs': [{
      'internalType': 'bool',
      'name': '',
      'type': 'bool',
    }],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'uint256',
      'name': '_tokenId',
      'type': 'uint256',
    }, {
      'internalType': 'bool',
      'name': '_close',
      'type': 'bool',
    }],
    'name': 'endAuctionBySeller',
    'outputs': [{
      'internalType': 'bool',
      'name': '',
      'type': 'bool',
    }],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [],
    'name': 'foundationFee',
    'outputs': [{
      'internalType': 'uint32',
      'name': '',
      'type': 'uint32',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'uint256',
      'name': '_tokenId',
      'type': 'uint256',
    }],
    'name': 'getAuctionEndTime',
    'outputs': [{
      'internalType': 'uint256',
      'name': '',
      'type': 'uint256',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'bytes32',
      'name': 'role',
      'type': 'bytes32',
    }],
    'name': 'getRoleAdmin',
    'outputs': [{
      'internalType': 'bytes32',
      'name': '',
      'type': 'bytes32',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'uint256',
      'name': '_tokenId',
      'type': 'uint256',
    }],
    'name': 'getSailingList',
    'outputs': [{
      'components': [{
        'internalType': 'uint32',
        'name': 'quantity',
        'type': 'uint32',
      }, {
        'internalType': 'uint256',
        'name': 'price',
        'type': 'uint256',
      }, {
        'internalType': 'address',
        'name': 'seller',
        'type': 'address',
      }, {
        'internalType': 'bool',
        'name': 'resell',
        'type': 'bool',
      }],
      'internalType': 'struct MarketplaceV2.Sale',
      'name': '',
      'type': 'tuple',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'uint256',
      'name': '_tokenId',
      'type': 'uint256',
    }, {
      'internalType': 'address',
      'name': '_seller',
      'type': 'address',
    }],
    'name': 'getSailingParams',
    'outputs': [{
      'internalType': 'uint256',
      'name': '',
      'type': 'uint256',
    }, {
      'internalType': 'uint32',
      'name': '',
      'type': 'uint32',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'uint256',
      'name': '_tokenId',
      'type': 'uint256',
    }],
    'name': 'getStateAuction',
    'outputs': [{
      'components': [{
        'internalType': 'bool',
        'name': 'active',
        'type': 'bool',
      }, {
        'internalType': 'uint256',
        'name': 'creationTime',
        'type': 'uint256',
      }, {
        'internalType': 'uint32',
        'name': 'duration',
        'type': 'uint32',
      }, {
        'internalType': 'uint256',
        'name': 'price',
        'type': 'uint256',
      }, {
        'internalType': 'uint256',
        'name': 'reservePrice',
        'type': 'uint256',
      }, {
        'internalType': 'address',
        'name': 'seller',
        'type': 'address',
      }, {
        'internalType': 'bool',
        'name': 'resell',
        'type': 'bool',
      }, {
        'internalType': 'uint256',
        'name': 'highestBid',
        'type': 'uint256',
      }, {
        'internalType': 'address',
        'name': 'highestBidder',
        'type': 'address',
      }],
      'internalType': 'struct MarketplaceV2.AuctionState',
      'name': '',
      'type': 'tuple',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'address',
      'name': 'user',
      'type': 'address',
    }],
    'name': 'getUserFund',
    'outputs': [{
      'internalType': 'uint256',
      'name': '',
      'type': 'uint256',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'bytes32',
      'name': 'role',
      'type': 'bytes32',
    }, {
      'internalType': 'address',
      'name': 'account',
      'type': 'address',
    }],
    'name': 'grantRole',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'bytes32',
      'name': 'role',
      'type': 'bytes32',
    }, {
      'internalType': 'address',
      'name': 'account',
      'type': 'address',
    }],
    'name': 'hasRole',
    'outputs': [{
      'internalType': 'bool',
      'name': '',
      'type': 'bool',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'address',
      'name': '_nft',
      'type': 'address',
    }],
    'name': 'initialize',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [],
    'name': 'initializeV2',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'uint256',
      'name': '_tokenId',
      'type': 'uint256',
    }],
    'name': 'isActiveAuction',
    'outputs': [{
      'internalType': 'bool',
      'name': '',
      'type': 'bool',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [],
    'name': 'lastPauseTime',
    'outputs': [{
      'internalType': 'uint256',
      'name': '',
      'type': 'uint256',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'uint256[]',
      'name': '_tokenIds',
      'type': 'uint256[]',
    }, {
      'internalType': 'uint32[]',
      'name': '_quantities',
      'type': 'uint32[]',
    }, {
      'internalType': 'address[]',
      'name': '_sellers',
      'type': 'address[]',
    }],
    'name': 'multiBuy',
    'outputs': [{
      'internalType': 'bool',
      'name': '',
      'type': 'bool',
    }],
    'stateMutability': 'payable',
    'type': 'function',
  }, {
    'inputs': [],
    'name': 'owner',
    'outputs': [{
      'internalType': 'address',
      'name': '',
      'type': 'address',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [],
    'name': 'paused',
    'outputs': [{
      'internalType': 'bool',
      'name': '',
      'type': 'bool',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [],
    'name': 'renounceOwnership',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'bytes32',
      'name': 'role',
      'type': 'bytes32',
    }, {
      'internalType': 'address',
      'name': 'account',
      'type': 'address',
    }],
    'name': 'renounceRole',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'uint256',
      'name': '_tokenId',
      'type': 'uint256',
    }, {
      'internalType': 'uint256',
      'name': '_minPrice',
      'type': 'uint256',
    }, {
      'internalType': 'uint256',
      'name': '_buyNowPrice',
      'type': 'uint256',
    }, {
      'internalType': 'uint256',
      'name': '_reservePrice',
      'type': 'uint256',
    }, {
      'internalType': 'uint32',
      'name': '_duration',
      'type': 'uint32',
    }],
    'name': 'resaleWithAuction',
    'outputs': [{
      'internalType': 'bool',
      'name': '',
      'type': 'bool',
    }],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'uint256',
      'name': '_tokenId',
      'type': 'uint256',
    }, {
      'internalType': 'uint32',
      'name': '_quantity',
      'type': 'uint32',
    }, {
      'internalType': 'uint256',
      'name': '_price',
      'type': 'uint256',
    }],
    'name': 'resell',
    'outputs': [{
      'internalType': 'bool',
      'name': '',
      'type': 'bool',
    }],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [],
    'name': 'reservePercentage',
    'outputs': [{
      'internalType': 'uint32',
      'name': '',
      'type': 'uint32',
    }],
    'stateMutability': 'view',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'bytes32',
      'name': 'role',
      'type': 'bytes32',
    }, {
      'internalType': 'address',
      'name': 'account',
      'type': 'address',
    }],
    'name': 'revokeRole',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'bool',
      'name': '_paused',
      'type': 'bool',
    }],
    'name': 'setPaused',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  }, {
    'inputs': [{
      'internalType': 'address',
      'name': 'newOwner',
      'type': 'address',
    }],
    'name': 'transferOwnership',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
];

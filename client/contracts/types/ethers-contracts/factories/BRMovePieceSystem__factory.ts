/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  BRMovePieceSystem,
  BRMovePieceSystemInterface,
} from "../BRMovePieceSystem";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IWorld",
        name: "_world",
        type: "address",
      },
      {
        internalType: "address",
        name: "_components",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "BREntityNotGame",
    type: "error",
  },
  {
    inputs: [],
    name: "BRGameNotInProgress",
    type: "error",
  },
  {
    inputs: [],
    name: "BRIncorrectControllers",
    type: "error",
  },
  {
    inputs: [],
    name: "BRNotInGame",
    type: "error",
  },
  {
    inputs: [],
    name: "BRNotRecharged",
    type: "error",
  },
  {
    inputs: [],
    name: "BRNotRevokeSystem",
    type: "error",
  },
  {
    inputs: [],
    name: "BRPieceDead",
    type: "error",
  },
  {
    inputs: [],
    name: "NotOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "Ownable__NotOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "Ownable__NotTransitiveOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "UnimplementedPieceType",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "arguments",
        type: "bytes",
      },
    ],
    name: "execute",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "piece",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "int32",
            name: "x",
            type: "int32",
          },
          {
            internalType: "int32",
            name: "y",
            type: "int32",
          },
        ],
        internalType: "struct Coord",
        name: "position",
        type: "tuple",
      },
    ],
    name: "executeTyped",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "piece",
        type: "uint256",
      },
    ],
    name: "revokeController",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620035753803806200357583398101604081905262000034916200022c565b818162000041336200010f565b6001600160a01b03811615620000585780620000bd565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000097573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bd91906200026b565b600080546001600160a01b03199081166001600160a01b0393841690811790925560018054909116928516928317905562000105919062000183602090811b6200064517901c565b5050505062000292565b600062000126620001ef60201b620006d61760201c565b80546040519192506001600160a01b03808516929116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b7ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a8780546001600160a01b039384166001600160a01b0319918216179091557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a868054929093169116179055565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6001600160a01b03811681146200022957600080fd5b50565b600080604083850312156200024057600080fd5b82516200024d8162000213565b6020840151909250620002608162000213565b809150509250929050565b6000602082840312156200027e57600080fd5b81516200028b8162000213565b9392505050565b6132d380620002a26000396000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c80638da5cb5b116100505780638da5cb5b146100aa578063b15895dd146100d7578063f2fde38b146100ea57600080fd5b806309c5eabe1461006c5780636318c82d14610095575b600080fd5b61007f61007a36600461298c565b6100fd565b60405161008c9190612a30565b60405180910390f35b6100a86100a3366004612a81565b6103a6565b005b6100b261054c565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161008c565b61007f6100e5366004612aa9565b610591565b6100a86100f8366004612b72565b6105c9565b60606000806000848060200190518101906101189190612bf4565b600080549396509194509250906101659073ffffffffffffffffffffffffffffffffffffffff167f4c5443efce5b9ecc79a1896dd0de307031c10094a3b3fc9a5d2b086c5b792de06106fa565b60008054919250906101ad9073ffffffffffffffffffffffffffffffffffffffff167f6f6c09948e327abfd3c44b7965920048be367af522273db94a5172d20538b9ac6106fa565b60008054919250906101f59073ffffffffffffffffffffffffffffffffffffffff167f52421b68e3cf0b4ddf63c1e76add9d0e18a22b2144367451769083243b41d1c36106fa565b600080549192509061023d9073ffffffffffffffffffffffffffffffffffffffff167f023253b2241a10d36b8c9af452236123ad9f4644f2ef4963970b2c4b77c42db56106fa565b60008054919250906102859073ffffffffffffffffffffffffffffffffffffffff167f3f2fb6fd7210998f35a2426a57025beb8981672a7fe1d2a38eee35cd7fc2230561084c565b905060006102938689610885565b610100015160028111156102a9576102a9612c2a565b036102d9576102bc818385898c8c610a2a565b505060408051600081526020810190915298975050505050505050565b6102e38888610b8f565b6102ef84868a8a610d4e565b6040517f1ab06ee50000000000000000000000000000000000000000000000000000000081526004810189905242602482015273ffffffffffffffffffffffffffffffffffffffff851690631ab06ee590604401600060405180830381600087803b15801561035d57600080fd5b505af1158015610371573d6000803e3d6000fd5b50505050610380888888610f62565b61038b8888886111de565b610399818385898c8c610a2a565b5050505050505050919050565b6000546103e99073ffffffffffffffffffffffffffffffffffffffff167fc460a39063d43ec0746708579b6d331f5d24b3fd0a5b1ec179dd09d5c0daa6ac61084c565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461044d576040517fc3a4a1fa00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080546104919073ffffffffffffffffffffffffffffffffffffffff167f1ec70c1de07ff6a0c043722045ffa20707571b9fcddd4bdecc65ed19faf4debe61084c565b6040517f3e991df30000000000000000000000000000000000000000000000000000000081526004810184905290915073ffffffffffffffffffffffffffffffffffffffff821690633e991df3906024016000604051808303816000875af1158015610501573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526105479190810190612c59565b505050565b600061058c7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b60606105bf8484846040516020016105ab93929190612cc7565b6040516020818303038152906040526100fd565b90505b9392505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff163314610639576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6106428161149f565b50565b7ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805473ffffffffffffffffffffffffffffffffffffffff9384167fffffffffffffffffffffffff0000000000000000000000000000000000000000918216179091557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a868054929093169116179055565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa15801561076a573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526107b09190810190612cf2565b90508051600003610821576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f742072656769737465726564000000000000000000000000000000604482015260640160405180910390fd5b6108428160008151811061083757610837612d8c565b602002602001015190565b9150505b92915050565b600080610879847f017c816a964927a00e050edd780dcf113ca2756dfa9e9fda94a05c140d9317b06106fa565b905061084281846106fa565b6108d26040805161012081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c0810182905260e081018290529061010082015290565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa15801561093d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109619190612dbb565b610997576040517f82203a4100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905260009073ffffffffffffffffffffffffffffffffffffffff851690630ff4c9169060240161012060405180830381865afa158015610a06573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108429190612e28565b610a36858584846114a8565b6000610a4284836115c2565b6040517f1ab06ee5000000000000000000000000000000000000000000000000000000008152600481018290526024810185905290915073ffffffffffffffffffffffffffffffffffffffff861690631ab06ee590604401600060405180830381600087803b158015610ab457600080fd5b505af1158015610ac8573d6000803e3d6000fd5b50506040517ff2f9a0ab00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8a16925063f2f9a0ab9150610b209086908890600401612ed0565b6000604051808303816000875af1158015610b3f573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052610b859190810190612c59565b5050505050505050565b60008054610bd39073ffffffffffffffffffffffffffffffffffffffff167f3aa78a206fc67ba4c2dbdbfa4f9637a0b391d7db261dacc2eb5d96f7b5693d976106fa565b6000805491925090610c1b9073ffffffffffffffffffffffffffffffffffffffff167f1f26ebf637805df90fe5cf9a282dd66905185d55ff65696a9171e1a656152d396106fa565b6000805491925090610c639073ffffffffffffffffffffffffffffffffffffffff167f023253b2241a10d36b8c9af452236123ad9f4644f2ef4963970b2c4b77c42db56106fa565b6000805491925090610cab9073ffffffffffffffffffffffffffffffffffffffff167f4c5443efce5b9ecc79a1896dd0de307031c10094a3b3fc9a5d2b086c5b792de06106fa565b6000805491925090610cf39073ffffffffffffffffffffffffffffffffffffffff167f33c4aae4b327d551cc4ea42873cd8dcaa61f5bc0f248cf0e6dd3473f9a820d666106fa565b6000805491925090610d3b9073ffffffffffffffffffffffffffffffffffffffff167f3e4e98a8b24cd1e4f79528ef3f1cf7edfe0dbe0043563a44641446b8716086b46106fa565b9050610b858686868686868e8e33611652565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff85169063cccf7a8e90602401602060405180830381865afa158015610db9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ddd9190612dbb565b15610f5c576040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905260009073ffffffffffffffffffffffffffffffffffffffff861690630ff4c91690602401602060405180830381865afa158015610e50573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e749190612ef7565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810184905290915060009073ffffffffffffffffffffffffffffffffffffffff861690630ff4c9169060240161012060405180830381865afa158015610ee6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f0a9190612e28565b60200151905042610f2163ffffffff831684612f3f565b1115610f59576040517fbabe350500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50505b50505050565b60008054610fa69073ffffffffffffffffffffffffffffffffffffffff167f3e4e98a8b24cd1e4f79528ef3f1cf7edfe0dbe0043563a44641446b8716086b46106fa565b6000805491925090610fee9073ffffffffffffffffffffffffffffffffffffffff167f3fe0524a97d46cff1be1703cd4a84d28fcc28e6c9bc09d2eedb2f0c75291a7646106fa565b60008054919250906110369073ffffffffffffffffffffffffffffffffffffffff167fd43e0d138a55035def2f150c31798e941af349936fa84a9e5eda703a2e41218b6106fa565b600080549192509061107e9073ffffffffffffffffffffffffffffffffffffffff167f52421b68e3cf0b4ddf63c1e76add9d0e18a22b2144367451769083243b41d1c36106fa565b905060008061108e83888a611689565b9150915081801561109f5750888114155b156111d3576040517f4cc822150000000000000000000000000000000000000000000000000000000081526004810182905273ffffffffffffffffffffffffffffffffffffffff871690634cc8221590602401600060405180830381600087803b15801561110c57600080fd5b505af1158015611120573d6000803e3d6000fd5b50506040517f0ff4c916000000000000000000000000000000000000000000000000000000008152600481018490526000925073ffffffffffffffffffffffffffffffffffffffff87169150630ff4c91690602401602060405180830381865afa158015611192573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111b69190612f52565b905060006111c3826117dc565b90506111d0878c836118b0565b50505b505050505050505050565b600080546112229073ffffffffffffffffffffffffffffffffffffffff167f9f1f3a31a60a234bc8a508336873749af020b9699210e11065568648853a05fa6106fa565b600080549192509061126a9073ffffffffffffffffffffffffffffffffffffffff167f4c5443efce5b9ecc79a1896dd0de307031c10094a3b3fc9a5d2b086c5b792de06106fa565b60008054919250906112b29073ffffffffffffffffffffffffffffffffffffffff167f3fe0524a97d46cff1be1703cd4a84d28fcc28e6c9bc09d2eedb2f0c75291a7646106fa565b90506112c082848787611aff565b15610f595760006112d18587611c9c565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905290915060019073ffffffffffffffffffffffffffffffffffffffff86169063cccf7a8e90602401602060405180830381865afa158015611342573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113669190612dbb565b15611407576040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff861690630ff4c91690602401602060405180830381865afa1580156113d6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113fa9190612f73565b6114049082612f8e565b90505b6040517fd923c3c40000000000000000000000000000000000000000000000000000000081526004810183905263ffffffff8216602482015273ffffffffffffffffffffffffffffffffffffffff86169063d923c3c490604401600060405180830381600087803b15801561147b57600080fd5b505af115801561148f573d6000803e3d6000fd5b50505050610b85838960016118b0565b61064281611cf3565b6040517f0ff4c916000000000000000000000000000000000000000000000000000000008152600481018390526000906115439073ffffffffffffffffffffffffffffffffffffffff871690630ff4c916906024016040805180830381865afa158015611519573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061153d9190612fb2565b836115c2565b6040517f4cc822150000000000000000000000000000000000000000000000000000000081526004810182905290915073ffffffffffffffffffffffffffffffffffffffff851690634cc8221590602401600060405180830381600087803b1580156115ae57600080fd5b505af11580156111d3573d6000803e3d6000fd5b815160208084015160405160e093841b9281019290925290911b6024820152602881018290527f52421b68e3cf0b4ddf63c1e76add9d0e18a22b2144367451769083243b41d1c360488201526000906068015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe081840301815291905280516020909101209392505050565b61165e89898584611d9f565b6116688683611db4565b611673858484611e12565b61167d8484611e59565b6111d386888585611e9e565b600080600061169885856115c2565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905290915073ffffffffffffffffffffffffffffffffffffffff87169063cccf7a8e90602401602060405180830381865afa158015611706573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061172a9190612dbb565b156117cb576040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810182905260019073ffffffffffffffffffffffffffffffffffffffff881690630ff4c91690602401602060405180830381865afa15801561179d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117c19190612ef7565b92509250506117d4565b60008092509250505b935093915050565b6000808260058111156117f1576117f1612c2a565b036117fe57506001919050565b600282600581111561181257611812612c2a565b148061182f5750600182600581111561182d5761182d612c2a565b145b1561183c57506003919050565b600382600581111561185057611850612c2a565b0361185d57506005919050565b600482600581111561187157611871612c2a565b0361187e57506009919050565b6040517f1ed6e93400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa15801561191b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061193f9190612dbb565b6119d4576040517fd923c3c40000000000000000000000000000000000000000000000000000000081526004810183905263ffffffff8216602482015273ffffffffffffffffffffffffffffffffffffffff84169063d923c3c490604401600060405180830381600087803b1580156119b757600080fd5b505af11580156119cb573d6000803e3d6000fd5b50505050505050565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905260009073ffffffffffffffffffffffffffffffffffffffff851690630ff4c91690602401602060405180830381865afa158015611a42573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a669190612f73565b905073ffffffffffffffffffffffffffffffffffffffff841663d923c3c484611a8f8585612f8e565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b168152600481019290925263ffffffff166024820152604401600060405180830381600087803b158015611aeb57600080fd5b505af1158015610b85573d6000803e3d6000fd5b600080611b0c8685610885565b90506000611b1b878686611f79565b90508160a0015161ffff168112611c8d576000611b388587611c9c565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905290915073ffffffffffffffffffffffffffffffffffffffff88169063cccf7a8e90602401602060405180830381865afa158015611ba6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611bca9190612dbb565b611bda5760019350505050611c94565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810182905260009073ffffffffffffffffffffffffffffffffffffffff891690630ff4c91690602401602060405180830381865afa158015611c48573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c6c9190612f73565b905060018163ffffffff161015611c8a576001945050505050611c94565b50505b6000925050505b949350505050565b815160208084015160405160e093841b9281019290925290911b6024820152602881018290527f9f1f3a31a60a234bc8a508336873749af020b9699210e11065568648853a05fa6048820152600090606801611615565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405173ffffffffffffffffffffffffffffffffffffffff8481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b611daa848383612089565b610f5c83836120ca565b6000611dc08383610885565b905060018161010001516002811115611ddb57611ddb612c2a565b14610547576040517f9c594b6100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b611e1d8383836121bb565b15611e2757505050565b6040517f95913fa700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b611e638282612309565b15611e6c575050565b6040517ff9f7e24f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905260009073ffffffffffffffffffffffffffffffffffffffff851690630ff4c916906024016040805180830381865afa158015611f0b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611f2f9190612fb2565b9050611f3c858383612439565b611f72576040517ff9f7e24f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5050505050565b600080611f868585610885565b905061208073__$b5fa70ce9c99e9bebab5594b5571ea90bd$__631f92e70f8360c0015161ffff168660000151611fbd9190612fce565b8460c0015161ffff168760200151611fd59190612fce565b608086015160e0808801516040519186901b7fffffffff00000000000000000000000000000000000000000000000000000000168252600394850b60048301529290930b6024840152604483015260ff166064820152608401602060405180830381865af415801561204b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061206f9190613010565b61207b6003600a6131db565b612526565b95945050505050565b612094838383612650565b610547576040517f30cd747100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810182905260009073ffffffffffffffffffffffffffffffffffffffff841690630ff4c91690602401600060405180830381865afa158015612138573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405261217e9190810190612cf2565b90508051600214610547576040517f520f044600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810183905260009073ffffffffffffffffffffffffffffffffffffffff85169063cccf7a8e90602401602060405180830381865afa158015612229573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061224d9190612dbb565b612259575060006105c2565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810184905260009073ffffffffffffffffffffffffffffffffffffffff861690630ff4c91690602401602060405180830381865afa1580156122c7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906122eb9190612ef7565b90508281036122fe5760019150506105c2565b506000949350505050565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905260009073ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa158015612377573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061239b9190612dbb565b6123a757506000610846565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905260009073ffffffffffffffffffffffffffffffffffffffff851690630ff4c91690602401602060405180830381865afa158015612415573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108429190612dbb565b60006124458484611db4565b60006124518585610885565b9050600061246c8260400151836060015184600001516127ca565b905060008160030b856000015160030b131580156124bd57506124af827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6131ea565b60030b856000015160030b12155b905060008260030b866020015160030b1315801561250e5750612500837fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6131ea565b60030b866020015160030b12155b905081801561251a5750805b98975050505050505050565b60006f80000000000000000000000000000000600f84900b016125a3577fffffffffffffffff000000000000000000000000000000000000000000000001821215801561258c575078010000000000000000000000000000000000000000000000008213155b61259557600080fd5b506000819003603f1b610846565b60008084600f0b12156125bb57836000039350600190505b60008312156125cd5760009290920391155b60006125d98585612819565b9050811561261a577f800000000000000000000000000000000000000000000000000000000000000081111561260e57600080fd5b60000391506108469050565b7f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81111561264757600080fd5b91506108469050565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810183905260009073ffffffffffffffffffffffffffffffffffffffff85169063cccf7a8e90602401602060405180830381865afa1580156126be573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906126e29190612dbb565b6126ee575060006105c2565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810184905260009073ffffffffffffffffffffffffffffffffffffffff861690630ff4c91690602401602060405180830381865afa15801561275c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612780919061320a565b90508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146127bf5760009150506105c2565b506001949350505050565b6000806127d78342613227565b905060006127e5858361323a565b90508561ffff168161ffff1610612801576000925050506105c2565b61280b8187613282565b61ffff169695505050505050565b60008160000361282b57506000610846565b600083600f0b121561283c57600080fd5b600f83900b6fffffffffffffffffffffffffffffffff8316810260401c90608084901c0277ffffffffffffffffffffffffffffffffffffffffffffffff81111561288557600080fd5b60401b811981111561289657600080fd5b019392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051610120810167ffffffffffffffff811182821017156128f1576128f161289e565b60405290565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff8111828210171561293e5761293e61289e565b604052919050565b600067ffffffffffffffff8211156129605761296061289e565b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01660200190565b60006020828403121561299e57600080fd5b813567ffffffffffffffff8111156129b557600080fd5b8201601f810184136129c657600080fd5b80356129d96129d482612946565b6128f7565b8181528560208385010111156129ee57600080fd5b81602084016020830137600091810160200191909152949350505050565b60005b83811015612a27578181015183820152602001612a0f565b50506000910152565b6020815260008251806020840152612a4f816040850160208701612a0c565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160400192915050565b600060208284031215612a9357600080fd5b5035919050565b8060030b811461064257600080fd5b60008060008385036080811215612abf57600080fd5b843593506020850135925060407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc082011215612afa57600080fd5b506040516040810181811067ffffffffffffffff82111715612b1e57612b1e61289e565b6040908152850135612b2f81612a9a565b81526060850135612b3f81612a9a565b602082015292959194509192509050565b73ffffffffffffffffffffffffffffffffffffffff8116811461064257600080fd5b600060208284031215612b8457600080fd5b81356105c281612b50565b600060408284031215612ba157600080fd5b6040516040810181811067ffffffffffffffff82111715612bc457612bc461289e565b80604052508091508251612bd781612a9a565b81526020830151612be781612a9a565b6020919091015292915050565b600080600060808486031215612c0957600080fd5b8351925060208401519150612c218560408601612b8f565b90509250925092565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600060208284031215612c6b57600080fd5b815167ffffffffffffffff811115612c8257600080fd5b8201601f81018413612c9357600080fd5b8051612ca16129d482612946565b818152856020838501011115612cb657600080fd5b612080826020830160208601612a0c565b83815260208082018490528251600390810b604084015290830151900b606082015260808101611c94565b60006020808385031215612d0557600080fd5b825167ffffffffffffffff80821115612d1d57600080fd5b818501915085601f830112612d3157600080fd5b815181811115612d4357612d4361289e565b8060051b9150612d548483016128f7565b8181529183018401918481019088841115612d6e57600080fd5b938501935b8385101561251a57845182529385019390850190612d73565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600060208284031215612dcd57600080fd5b815180151581146105c257600080fd5b805163ffffffff81168114612df157600080fd5b919050565b805161ffff81168114612df157600080fd5b805160ff81168114612df157600080fd5b805160038110612df157600080fd5b60006101208284031215612e3b57600080fd5b612e436128cd565b82518152612e5360208401612ddd565b6020820152612e6460408401612df6565b6040820152612e7560608401612df6565b606082015260808301516080820152612e9060a08401612df6565b60a0820152612ea160c08401612df6565b60c0820152612eb260e08401612e08565b60e0820152610100612ec5818501612e19565b908201529392505050565b828152606081016105c26020830184805160030b8252602081015160030b60208301525050565b600060208284031215612f0957600080fd5b5051919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b8082018082111561084657610846612f10565b600060208284031215612f6457600080fd5b8151600681106105c257600080fd5b600060208284031215612f8557600080fd5b6105c282612ddd565b63ffffffff818116838216019080821115612fab57612fab612f10565b5092915050565b600060408284031215612fc457600080fd5b6105c28383612b8f565b600381810b9083900b01637fffffff81137fffffffffffffffffffffffffffffffffffffffffffffffffffffffff800000008212171561084657610846612f10565b60006020828403121561302257600080fd5b815180600f0b81146105c257600080fd5b80825b600180861161304557506117d4565b817f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0482111561307757613077612f10565b8086161561308457918102915b9490941c938002613036565b60008280156130a657600181146130b0576130b9565b6001915050610846565b82915050610846565b50816130c757506000610846565b506001600082138082146130e057801561311757613149565b827f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483111561311257613112612f10565b613149565b827f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0583121561314957613149612f10565b50808316156131555750805b6131658360011c83840283613033565b807f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04821160008313161561319c5761319c612f10565b807f80000000000000000000000000000000000000000000000000000000000000000582126000831216156131d3576131d3612f10565b029392505050565b60006105c260ff841683613090565b60008260030b8260030b028060030b9150808214612fab57612fab612f10565b60006020828403121561321c57600080fd5b81516105c281612b50565b8181038181111561084657610846612f10565b600061ffff80841680613276577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b92169190910492915050565b61ffff828116828216039080821115612fab57612fab612f1056fea26469706673582212200c6a001a6ad79824830d5901dba9faf25bc05650ee3692930ee777882ac79ad364736f6c63430008110033";

type BRMovePieceSystemConstructorParams =
  | [linkLibraryAddresses: BRMovePieceSystemLibraryAddresses, signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BRMovePieceSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => {
  return (
    typeof xs[0] === "string" ||
    (Array.isArray as (arg: any) => arg is readonly any[])(xs[0]) ||
    "_isInterface" in xs[0]
  );
};

export class BRMovePieceSystem__factory extends ContractFactory {
  constructor(...args: BRMovePieceSystemConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      const [linkLibraryAddresses, signer] = args;
      super(
        _abi,
        BRMovePieceSystem__factory.linkBytecode(linkLibraryAddresses),
        signer
      );
    }
  }

  static linkBytecode(
    linkLibraryAddresses: BRMovePieceSystemLibraryAddresses
  ): string {
    let linkedBytecode = _bytecode;

    linkedBytecode = linkedBytecode.replace(
      new RegExp("__\\$b5fa70ce9c99e9bebab5594b5571ea90bd\\$__", "g"),
      linkLibraryAddresses[
        "node_modules/@latticexyz/noise/contracts/Perlin.sol:Perlin"
      ]
        .replace(/^0x/, "")
        .toLowerCase()
    );

    return linkedBytecode;
  }

  override deploy(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<BRMovePieceSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<BRMovePieceSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): BRMovePieceSystem {
    return super.attach(address) as BRMovePieceSystem;
  }
  override connect(signer: Signer): BRMovePieceSystem__factory {
    return super.connect(signer) as BRMovePieceSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BRMovePieceSystemInterface {
    return new utils.Interface(_abi) as BRMovePieceSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BRMovePieceSystem {
    return new Contract(address, _abi, signerOrProvider) as BRMovePieceSystem;
  }
}

export interface BRMovePieceSystemLibraryAddresses {
  ["node_modules/@latticexyz/noise/contracts/Perlin.sol:Perlin"]: string;
}

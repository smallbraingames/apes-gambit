/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  BRSetPieceTypeSystem,
  BRSetPieceTypeSystemInterface,
} from "../BRSetPieceTypeSystem";

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
    name: "BRNotEnoughPoints",
    type: "error",
  },
  {
    inputs: [],
    name: "BRNotInGame",
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
        internalType: "enum PieceType",
        name: "pieceType",
        type: "uint8",
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
        name: "newOwner",
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
  "0x60806040523480156200001157600080fd5b50604051620019e1380380620019e1833981016040819052620000349162000117565b600280546001600160a01b0319163317905581816001600160a01b038116156200005f5780620000c4565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa1580156200009e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000c4919062000156565b600080546001600160a01b039283166001600160a01b0319918216179091556001805494909216931692909217909155506200017d915050565b6001600160a01b03811681146200011457600080fd5b50565b600080604083850312156200012b57600080fd5b82516200013881620000fe565b60208401519092506200014b81620000fe565b809150509250929050565b6000602082840312156200016957600080fd5b81516200017681620000fe565b9392505050565b611854806200018d6000396000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c80636318c82d116100505780636318c82d146100a85780638da5cb5b146100bd578063f2fde38b146100e557600080fd5b806309c5eabe1461006c57806314b63f5714610095575b600080fd5b61007f61007a36600461132b565b6100f8565b60405161008c91906113cf565b60405180910390f35b61007f6100a3366004611430565b610404565b6100bb6100b6366004611469565b61043c565b005b60025460405173ffffffffffffffffffffffffffffffffffffffff909116815260200161008c565b6100bb6100f33660046114a4565b6105e2565b606060008060008480602001905181019061011391906114c1565b600080549396509194509250906101609073ffffffffffffffffffffffffffffffffffffffff167f3aa78a206fc67ba4c2dbdbfa4f9637a0b391d7db261dacc2eb5d96f7b5693d976106f6565b60008054919250906101a89073ffffffffffffffffffffffffffffffffffffffff167f1f26ebf637805df90fe5cf9a282dd66905185d55ff65696a9171e1a656152d396106f6565b60008054919250906101f09073ffffffffffffffffffffffffffffffffffffffff167f4c5443efce5b9ecc79a1896dd0de307031c10094a3b3fc9a5d2b086c5b792de06106f6565b60008054919250906102389073ffffffffffffffffffffffffffffffffffffffff167f33c4aae4b327d551cc4ea42873cd8dcaa61f5bc0f248cf0e6dd3473f9a820d666106f6565b60008054919250906102809073ffffffffffffffffffffffffffffffffffffffff167f3e4e98a8b24cd1e4f79528ef3f1cf7edfe0dbe0043563a44641446b8716086b46106f6565b60008054919250906102c89073ffffffffffffffffffffffffffffffffffffffff167f3fe0524a97d46cff1be1703cd4a84d28fcc28e6c9bc09d2eedb2f0c75291a7646106f6565b60008054919250906103109073ffffffffffffffffffffffffffffffffffffffff167f071fd7222c337f8cc12e5eda16f464c9a741636e3840e0490d89dc6df55b80b0610844565b905061032287878787878f8f3361087d565b600061032d896108b2565b905061033a838c83610986565b6040517fa140161800000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff83169063a14016189061038e908e908d90600401611559565b6000604051808303816000875af11580156103ad573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526103f3919081019061156d565b505050505050505050505050919050565b606061043284848460405160200161041e939291906115e4565b6040516020818303038152906040526100f8565b90505b9392505050565b60005461047f9073ffffffffffffffffffffffffffffffffffffffff167fd5d499bdc334643141f29898fd38b7db4bdd2de01297b918ad21ebaa4be388ed610844565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146104e3576040517fc3a4a1fa00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080546105279073ffffffffffffffffffffffffffffffffffffffff167f1ec70c1de07ff6a0c043722045ffa20707571b9fcddd4bdecc65ed19faf4debe610844565b6040517f3e991df30000000000000000000000000000000000000000000000000000000081526004810184905290915073ffffffffffffffffffffffffffffffffffffffff821690633e991df3906024016000604051808303816000875af1158015610597573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526105dd919081019061156d565b505050565b60025473ffffffffffffffffffffffffffffffffffffffff163314610668576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f4f4e4c595f4f574e45520000000000000000000000000000000000000000000060448201526064015b60405180910390fd5b60025460405173ffffffffffffffffffffffffffffffffffffffff8084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3600280547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa158015610766573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526107ac9190810190611607565b90508051600003610819576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f742072656769737465726564000000000000000000000000000000604482015260640161065f565b61083a8160008151811061082f5761082f6116ad565b602002602001015190565b9150505b92915050565b600080610871847f017c816a964927a00e050edd780dcf113ca2756dfa9e9fda94a05c140d9317b06106f6565b905061083a81846106f6565b61088988888584610bbc565b6108938683610bcd565b61089e858484610c2a565b6108a88484610c71565b5050505050505050565b6000808260058111156108c7576108c76114ef565b036108d457506001919050565b60028260058111156108e8576108e86114ef565b148061090557506001826005811115610903576109036114ef565b145b1561091257506003919050565b6003826005811115610926576109266114ef565b0361093357506005919050565b6004826005811115610947576109476114ef565b0361095457506009919050565b6040517f1ed6e93400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa1580156109f1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a1591906116dc565b610a4b576040517feb30efaf00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905260009073ffffffffffffffffffffffffffffffffffffffff851690630ff4c91690602401602060405180830381865afa158015610ab9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610add9190611717565b90508063ffffffff168263ffffffff161115610b25576040517feb30efaf00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff841663d923c3c484610b4c8585611732565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b168152600481019290925263ffffffff166024820152604401600060405180830381600087803b158015610ba857600080fd5b505af11580156108a8573d6000803e3d6000fd5b610bc7848383610cb6565b50505050565b6000610bd98383610cf7565b9050600181604001516002811115610bf357610bf36114ef565b146105dd576040517f9c594b6100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610c35838383610e6f565b15610c3f57505050565b6040517f95913fa700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610c7b8282610fbd565b15610c84575050565b6040517ff9f7e24f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610cc18383836110ed565b6105dd576040517f30cd747100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610d1860408051606081018252600080825260208201819052909182015290565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa158015610d83573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610da791906116dc565b610ddd576040517f82203a4100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905260009073ffffffffffffffffffffffffffffffffffffffff851690630ff4c91690602401606060405180830381865afa158015610e4b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061083a919061177d565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810183905260009073ffffffffffffffffffffffffffffffffffffffff85169063cccf7a8e90602401602060405180830381865afa158015610edd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f0191906116dc565b610f0d57506000610435565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810184905260009073ffffffffffffffffffffffffffffffffffffffff861690630ff4c91690602401602060405180830381865afa158015610f7b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f9f91906117e8565b9050828103610fb2576001915050610435565b506000949350505050565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905260009073ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa15801561102b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061104f91906116dc565b61105b5750600061083e565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905260009073ffffffffffffffffffffffffffffffffffffffff851690630ff4c91690602401602060405180830381865afa1580156110c9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061083a91906116dc565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810183905260009073ffffffffffffffffffffffffffffffffffffffff85169063cccf7a8e90602401602060405180830381865afa15801561115b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061117f91906116dc565b61118b57506000610435565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810184905260009073ffffffffffffffffffffffffffffffffffffffff861690630ff4c91690602401602060405180830381865afa1580156111f9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061121d9190611801565b90508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461125c576000915050610435565b506001949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff811182821017156112dd576112dd611267565b604052919050565b600067ffffffffffffffff8211156112ff576112ff611267565b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01660200190565b60006020828403121561133d57600080fd5b813567ffffffffffffffff81111561135457600080fd5b8201601f8101841361136557600080fd5b8035611378611373826112e5565b611296565b81815285602083850101111561138d57600080fd5b81602084016020830137600091810160200191909152949350505050565b60005b838110156113c65781810151838201526020016113ae565b50506000910152565b60208152600082518060208401526113ee8160408501602087016113ab565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160400192915050565b6006811061142d57600080fd5b50565b60008060006060848603121561144557600080fd5b8335925060208401359150604084013561145e81611420565b809150509250925092565b60006020828403121561147b57600080fd5b5035919050565b73ffffffffffffffffffffffffffffffffffffffff8116811461142d57600080fd5b6000602082840312156114b657600080fd5b813561043581611482565b6000806000606084860312156114d657600080fd5b8351925060208401519150604084015161145e81611420565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60068110611555577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b9052565b82815260408101610435602083018461151e565b60006020828403121561157f57600080fd5b815167ffffffffffffffff81111561159657600080fd5b8201601f810184136115a757600080fd5b80516115b5611373826112e5565b8181528560208385010111156115ca57600080fd5b6115db8260208301602086016113ab565b95945050505050565b83815260208101839052606081016115ff604083018461151e565b949350505050565b6000602080838503121561161a57600080fd5b825167ffffffffffffffff8082111561163257600080fd5b818501915085601f83011261164657600080fd5b81518181111561165857611658611267565b8060051b9150611669848301611296565b818152918301840191848101908884111561168357600080fd5b938501935b838510156116a157845182529385019390850190611688565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000602082840312156116ee57600080fd5b8151801515811461043557600080fd5b805163ffffffff8116811461171257600080fd5b919050565b60006020828403121561172957600080fd5b610435826116fe565b63ffffffff828116828216039080821115611776577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b5092915050565b60006060828403121561178f57600080fd5b6040516060810181811067ffffffffffffffff821117156117b2576117b2611267565b604052825181526117c5602084016116fe565b60208201526040830151600381106117dc57600080fd5b60408201529392505050565b6000602082840312156117fa57600080fd5b5051919050565b60006020828403121561181357600080fd5b81516104358161148256fea26469706673582212207f58ca878f947d42b24ea240652bb2bb1b501f606f694680c8b49536da80953764736f6c63430008110033";

type BRSetPieceTypeSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BRSetPieceTypeSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BRSetPieceTypeSystem__factory extends ContractFactory {
  constructor(...args: BRSetPieceTypeSystemConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<BRSetPieceTypeSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<BRSetPieceTypeSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): BRSetPieceTypeSystem {
    return super.attach(address) as BRSetPieceTypeSystem;
  }
  override connect(signer: Signer): BRSetPieceTypeSystem__factory {
    return super.connect(signer) as BRSetPieceTypeSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BRSetPieceTypeSystemInterface {
    return new utils.Interface(_abi) as BRSetPieceTypeSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BRSetPieceTypeSystem {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as BRSetPieceTypeSystem;
  }
}

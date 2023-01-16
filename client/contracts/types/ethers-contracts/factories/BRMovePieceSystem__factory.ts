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
    name: "BRNotInGame",
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
  "0x60806040523480156200001157600080fd5b5060405162001c8338038062001c83833981016040819052620000349162000117565b600280546001600160a01b0319163317905581816001600160a01b038116156200005f5780620000c4565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa1580156200009e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000c4919062000156565b600080546001600160a01b039283166001600160a01b0319918216179091556001805494909216931692909217909155506200017d915050565b6001600160a01b03811681146200011457600080fd5b50565b600080604083850312156200012b57600080fd5b82516200013881620000fe565b60208401519092506200014b81620000fe565b809150509250929050565b6000602082840312156200016957600080fd5b81516200017681620000fe565b9392505050565b611af6806200018d6000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780638da5cb5b1461007a578063b15895dd146100a2578063f2fde38b146100b5575b600080fd5b61006461005f366004611550565b6100ca565b60405161007191906115f4565b60405180910390f35b60025460405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610071565b6100646100b0366004611657565b61037f565b6100c86100c3366004611702565b6103d1565b005b60606000806000848060200190518101906100e5919061171f565b600080549396509194509250906101329073ffffffffffffffffffffffffffffffffffffffff167f3aa78a206fc67ba4c2dbdbfa4f9637a0b391d7db261dacc2eb5d96f7b5693d976104e5565b600080549192509061017a9073ffffffffffffffffffffffffffffffffffffffff167f1f26ebf637805df90fe5cf9a282dd66905185d55ff65696a9171e1a656152d396104e5565b60008054919250906101c29073ffffffffffffffffffffffffffffffffffffffff167f4c5443efce5b9ecc79a1896dd0de307031c10094a3b3fc9a5d2b086c5b792de06104e5565b600080549192509061020a9073ffffffffffffffffffffffffffffffffffffffff167f33c4aae4b327d551cc4ea42873cd8dcaa61f5bc0f248cf0e6dd3473f9a820d666104e5565b60008054919250906102529073ffffffffffffffffffffffffffffffffffffffff167f3e4e98a8b24cd1e4f79528ef3f1cf7edfe0dbe0043563a44641446b8716086b46104e5565b600080549192509061029a9073ffffffffffffffffffffffffffffffffffffffff167f3f2fb6fd7210998f35a2426a57025beb8981672a7fe1d2a38eee35cd7fc22305610633565b90506102ac86868686868e8e3361066c565b6102b78989896106a1565b6040517ff2f9a0ab00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff82169063f2f9a0ab9061030b908c908b90600401611797565b6000604051808303816000875af115801561032a573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405261037091908101906117be565b50505050505050505050919050565b6040805160208082018690529181018490528251600390810b60608381019190915292840151900b60808201526103c79060a0016040516020818303038152906040526100ca565b90505b9392505050565b60025473ffffffffffffffffffffffffffffffffffffffff163314610457576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f4f4e4c595f4f574e45520000000000000000000000000000000000000000000060448201526064015b60405180910390fd5b60025460405173ffffffffffffffffffffffffffffffffffffffff8084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3600280547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa158015610555573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405261059b9190810190611835565b90508051600003610608576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f742072656769737465726564000000000000000000000000000000604482015260640161044e565b6106298160008151811061061e5761061e6118db565b602002602001015190565b9150505b92915050565b600080610660847f017c816a964927a00e050edd780dcf113ca2756dfa9e9fda94a05c140d9317b06104e5565b905061062981846104e5565b6106788888858461095c565b610682868361096d565b61068d8584846109cf565b6106978484610a16565b5050505050505050565b600080546106e59073ffffffffffffffffffffffffffffffffffffffff167f33c4aae4b327d551cc4ea42873cd8dcaa61f5bc0f248cf0e6dd3473f9a820d666104e5565b600080549192509061072d9073ffffffffffffffffffffffffffffffffffffffff167f3e4e98a8b24cd1e4f79528ef3f1cf7edfe0dbe0043563a44641446b8716086b46104e5565b60008054919250906107759073ffffffffffffffffffffffffffffffffffffffff167f3fe0524a97d46cff1be1703cd4a84d28fcc28e6c9bc09d2eedb2f0c75291a7646104e5565b60008054919250906107bd9073ffffffffffffffffffffffffffffffffffffffff167f023253b2241a10d36b8c9af452236123ad9f4644f2ef4963970b2c4b77c42db56104e5565b60008054919250906108059073ffffffffffffffffffffffffffffffffffffffff167fd43e0d138a55035def2f150c31798e941af349936fa84a9e5eda703a2e41218b6104e5565b90506000806108178488888b8d610a5b565b915091508115610950576040517f4cc822150000000000000000000000000000000000000000000000000000000081526004810182905273ffffffffffffffffffffffffffffffffffffffff871690634cc8221590602401600060405180830381600087803b15801561088957600080fd5b505af115801561089d573d6000803e3d6000fd5b50506040517f0ff4c916000000000000000000000000000000000000000000000000000000008152600481018490526000925073ffffffffffffffffffffffffffffffffffffffff86169150630ff4c91690602401602060405180830381865afa15801561090f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610933919061190a565b9050600061094082610b9d565b905061094d878d83610c71565b50505b50505050505050505050565b610967848383610ec0565b50505050565b60006109798383610f01565b90506001816020015160028111156109935761099361192b565b146109ca576040517f9c594b6100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b505050565b6109da83838361106b565b156109e457505050565b6040517f95913fa700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610a2082826111b9565b15610a29575050565b6040517ff9f7e24f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008060008773ffffffffffffffffffffffffffffffffffffffff1663b361be4686604051602001610a8d919061195a565b6040516020818303038152906040526040518263ffffffff1660e01b8152600401610ab891906115f4565b600060405180830381865afa158015610ad5573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052610b1b9190810190611835565b905060005b8151811015610b89576000828281518110610b3d57610b3d6118db565b60200260200101519050610b5289828861106b565b8015610b635750610b6388826111b9565b15610b7657600194509250610b93915050565b5080610b81816119aa565b915050610b20565b5060008092509250505b9550959350505050565b600080826005811115610bb257610bb261192b565b03610bbf57506001919050565b6002826005811115610bd357610bd361192b565b1480610bf057506001826005811115610bee57610bee61192b565b145b15610bfd57506003919050565b6003826005811115610c1157610c1161192b565b03610c1e57506005919050565b6004826005811115610c3257610c3261192b565b03610c3f57506009919050565b6040517f1ed6e93400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa158015610cdc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d0091906119e2565b610d95576040517fd923c3c40000000000000000000000000000000000000000000000000000000081526004810183905263ffffffff8216602482015273ffffffffffffffffffffffffffffffffffffffff84169063d923c3c490604401600060405180830381600087803b158015610d7857600080fd5b505af1158015610d8c573d6000803e3d6000fd5b50505050505050565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905260009073ffffffffffffffffffffffffffffffffffffffff851690630ff4c91690602401602060405180830381865afa158015610e03573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e279190611a04565b905073ffffffffffffffffffffffffffffffffffffffff841663d923c3c484610e508585611a2a565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b168152600481019290925263ffffffff166024820152604401600060405180830381600087803b158015610eac57600080fd5b505af1158015610697573d6000803e3d6000fd5b610ecb8383836112e9565b6109ca576040517f30cd747100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60408051808201909152600080825260208201526040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa158015610f80573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fa491906119e2565b610fda576040517f82203a4100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905260009073ffffffffffffffffffffffffffffffffffffffff851690630ff4c916906024016040805180830381865afa158015611047573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106299190611a4e565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810183905260009073ffffffffffffffffffffffffffffffffffffffff85169063cccf7a8e90602401602060405180830381865afa1580156110d9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110fd91906119e2565b611109575060006103ca565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810184905260009073ffffffffffffffffffffffffffffffffffffffff861690630ff4c91690602401602060405180830381865afa158015611177573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061119b9190611a8a565b90508281036111ae5760019150506103ca565b506000949350505050565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905260009073ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa158015611227573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061124b91906119e2565b6112575750600061062d565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905260009073ffffffffffffffffffffffffffffffffffffffff851690630ff4c91690602401602060405180830381865afa1580156112c5573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061062991906119e2565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810183905260009073ffffffffffffffffffffffffffffffffffffffff85169063cccf7a8e90602401602060405180830381865afa158015611357573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061137b91906119e2565b611387575060006103ca565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810184905260009073ffffffffffffffffffffffffffffffffffffffff861690630ff4c91690602401602060405180830381865afa1580156113f5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114199190611aa3565b90508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146114585760009150506103ca565b506001949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040805190810167ffffffffffffffff811182821017156114b5576114b5611463565b60405290565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff8111828210171561150257611502611463565b604052919050565b600067ffffffffffffffff82111561152457611524611463565b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01660200190565b60006020828403121561156257600080fd5b813567ffffffffffffffff81111561157957600080fd5b8201601f8101841361158a57600080fd5b803561159d6115988261150a565b6114bb565b8181528560208385010111156115b257600080fd5b81602084016020830137600091810160200191909152949350505050565b60005b838110156115eb5781810151838201526020016115d3565b50506000910152565b60208152600082518060208401526116138160408501602087016115d0565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160400192915050565b8060030b811461165457600080fd5b50565b6000806000838503608081121561166d57600080fd5b843593506020850135925060407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc0820112156116a857600080fd5b506116b1611492565b60408501356116bf81611645565b815260608501356116cf81611645565b602082015292959194509192509050565b73ffffffffffffffffffffffffffffffffffffffff8116811461165457600080fd5b60006020828403121561171457600080fd5b81356103ca816116e0565b6000806000838503608081121561173557600080fd5b845193506020850151925060407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc08201121561177057600080fd5b50611779611492565b604085015161178781611645565b815260608501516116cf81611645565b828152606081016103ca6020830184805160030b8252602081015160030b60208301525050565b6000602082840312156117d057600080fd5b815167ffffffffffffffff8111156117e757600080fd5b8201601f810184136117f857600080fd5b80516118066115988261150a565b81815285602083850101111561181b57600080fd5b61182c8260208301602086016115d0565b95945050505050565b6000602080838503121561184857600080fd5b825167ffffffffffffffff8082111561186057600080fd5b818501915085601f83011261187457600080fd5b81518181111561188657611886611463565b8060051b91506118978483016114bb565b81815291830184019184810190888411156118b157600080fd5b938501935b838510156118cf578451825293850193908501906118b6565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60006020828403121561191c57600080fd5b8151600681106103ca57600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b6040810161062d8284805160030b8252602081015160030b60208301525050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036119db576119db61197b565b5060010190565b6000602082840312156119f457600080fd5b815180151581146103ca57600080fd5b600060208284031215611a1657600080fd5b815163ffffffff811681146103ca57600080fd5b63ffffffff818116838216019080821115611a4757611a4761197b565b5092915050565b600060408284031215611a6057600080fd5b611a68611492565b82518152602083015160038110611a7e57600080fd5b60208201529392505050565b600060208284031215611a9c57600080fd5b5051919050565b600060208284031215611ab557600080fd5b81516103ca816116e056fea2646970667358221220bb8a215ba12932fd9f67963d1891ffb544b31889c78fe0c77dd9e3856721c31e64736f6c63430008110033";

type BRMovePieceSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BRMovePieceSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BRMovePieceSystem__factory extends ContractFactory {
  constructor(...args: BRMovePieceSystemConstructorParams) {
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
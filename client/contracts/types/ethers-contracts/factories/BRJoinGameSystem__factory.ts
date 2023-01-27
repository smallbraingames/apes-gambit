/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  BRJoinGameSystem,
  BRJoinGameSystemInterface,
} from "../BRJoinGameSystem";

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
    name: "BRAlreadyInGame",
    type: "error",
  },
  {
    inputs: [],
    name: "BREntityNotGame",
    type: "error",
  },
  {
    inputs: [],
    name: "BRGameAlreadyStarted",
    type: "error",
  },
  {
    inputs: [],
    name: "NotOwner",
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
  "0x60806040523480156200001157600080fd5b506040516200103038038062001030833981016040819052620000349162000117565b600280546001600160a01b0319163317905581816001600160a01b038116156200005f5780620000c4565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa1580156200009e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000c4919062000156565b600080546001600160a01b039283166001600160a01b0319918216179091556001805494909216931692909217909155506200017d915050565b6001600160a01b03811681146200011457600080fd5b50565b600080604083850312156200012b57600080fd5b82516200013881620000fe565b60208401519092506200014b81620000fe565b809150509250929050565b6000602082840312156200016957600080fd5b81516200017681620000fe565b9392505050565b610ea3806200018d6000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780638da5cb5b1461007a578063915657fb146100a2578063f2fde38b146100b5575b600080fd5b61006461005f366004610b0d565b6100ca565b6040516100719190610bc0565b60405180910390f35b60025460405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610071565b6100646100b0366004610c2c565b610383565b6100c86100c3366004610c73565b6103bf565b005b6060600080838060200190518101906100e39190610c90565b600080549294509092509061012e9073ffffffffffffffffffffffffffffffffffffffff167f3aa78a206fc67ba4c2dbdbfa4f9637a0b391d7db261dacc2eb5d96f7b5693d976104d3565b60008054919250906101769073ffffffffffffffffffffffffffffffffffffffff167f1f26ebf637805df90fe5cf9a282dd66905185d55ff65696a9171e1a656152d396104d3565b60008054919250906101be9073ffffffffffffffffffffffffffffffffffffffff167f4c5443efce5b9ecc79a1896dd0de307031c10094a3b3fc9a5d2b086c5b792de06104d3565b60008054919250906102069073ffffffffffffffffffffffffffffffffffffffff167f33c4aae4b327d551cc4ea42873cd8dcaa61f5bc0f248cf0e6dd3473f9a820d666104d3565b600080549192509061024e9073ffffffffffffffffffffffffffffffffffffffff167f3e4e98a8b24cd1e4f79528ef3f1cf7edfe0dbe0043563a44641446b8716086b46104d3565b905061025c8585893361061f565b6102668387610630565b6102708288610692565b6040517f1ab06ee5000000000000000000000000000000000000000000000000000000008152600481018890526024810187905273ffffffffffffffffffffffffffffffffffffffff831690631ab06ee590604401600060405180830381600087803b1580156102df57600080fd5b505af11580156102f3573d6000803e3d6000fd5b50506040517f60fe47b1000000000000000000000000000000000000000000000000000000008152600481018a905273ffffffffffffffffffffffffffffffffffffffff841692506360fe47b19150602401600060405180830381600087803b15801561035f57600080fd5b505af1158015610373573d6000803e3d6000fd5b5050505050505050505050919050565b60606103b883836040516020016103a4929190918252602082015260400190565b6040516020818303038152906040526100ca565b9392505050565b60025473ffffffffffffffffffffffffffffffffffffffff163314610445576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f4f4e4c595f4f574e45520000000000000000000000000000000000000000000060448201526064015b60405180910390fd5b60025460405173ffffffffffffffffffffffffffffffffffffffff8084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3600280547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa158015610543573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526105899190810190610cb4565b905080516000036105f6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f742072656769737465726564000000000000000000000000000000604482015260640161043c565b6106178160008151811061060c5761060c610d5a565b602002602001015190565b949350505050565b61062a84838361075c565b50505050565b600061063c838361079d565b905060008160400151600281111561065657610656610d89565b1461068d576040517f4221b8ac00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b505050565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905273ffffffffffffffffffffffffffffffffffffffff83169063cccf7a8e90602401602060405180830381865afa1580156106fd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107219190610db8565b15610758576040517f4be0fd3a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5050565b610767838383610915565b61068d576040517f30cd747100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6107be60408051606081018252600080825260208201819052909182015290565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa158015610829573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061084d9190610db8565b610883576040517f82203a4100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905260009073ffffffffffffffffffffffffffffffffffffffff851690630ff4c91690602401606060405180830381865afa1580156108f1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106179190610dda565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810183905260009073ffffffffffffffffffffffffffffffffffffffff85169063cccf7a8e90602401602060405180830381865afa158015610983573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109a79190610db8565b6109b3575060006103b8565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810184905260009073ffffffffffffffffffffffffffffffffffffffff861690630ff4c91690602401602060405180830381865afa158015610a21573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a459190610e50565b90508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610a845760009150506103b8565b506001949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715610b0557610b05610a8f565b604052919050565b60006020808385031215610b2057600080fd5b823567ffffffffffffffff80821115610b3857600080fd5b818501915085601f830112610b4c57600080fd5b813581811115610b5e57610b5e610a8f565b610b8e847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601610abe565b91508082528684828501011115610ba457600080fd5b8084840185840137600090820190930192909252509392505050565b600060208083528351808285015260005b81811015610bed57858101830151858201604001528201610bd1565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b60008060408385031215610c3f57600080fd5b50508035926020909101359150565b73ffffffffffffffffffffffffffffffffffffffff81168114610c7057600080fd5b50565b600060208284031215610c8557600080fd5b81356103b881610c4e565b60008060408385031215610ca357600080fd5b505080516020909101519092909150565b60006020808385031215610cc757600080fd5b825167ffffffffffffffff80821115610cdf57600080fd5b818501915085601f830112610cf357600080fd5b815181811115610d0557610d05610a8f565b8060051b9150610d16848301610abe565b8181529183018401918481019088841115610d3057600080fd5b938501935b83851015610d4e57845182529385019390850190610d35565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600060208284031215610dca57600080fd5b815180151581146103b857600080fd5b600060608284031215610dec57600080fd5b6040516060810181811067ffffffffffffffff82111715610e0f57610e0f610a8f565b60405282518152602083015163ffffffff81168114610e2d57600080fd5b6020820152604083015160038110610e4457600080fd5b60408201529392505050565b600060208284031215610e6257600080fd5b81516103b881610c4e56fea264697066735822122055131f741ff909910ba79edf78ab65a971d989d5718cbc3ebad4d703702b116864736f6c63430008110033";

type BRJoinGameSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BRJoinGameSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BRJoinGameSystem__factory extends ContractFactory {
  constructor(...args: BRJoinGameSystemConstructorParams) {
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
  ): Promise<BRJoinGameSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<BRJoinGameSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): BRJoinGameSystem {
    return super.attach(address) as BRJoinGameSystem;
  }
  override connect(signer: Signer): BRJoinGameSystem__factory {
    return super.connect(signer) as BRJoinGameSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BRJoinGameSystemInterface {
    return new utils.Interface(_abi) as BRJoinGameSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BRJoinGameSystem {
    return new Contract(address, _abi, signerOrProvider) as BRJoinGameSystem;
  }
}

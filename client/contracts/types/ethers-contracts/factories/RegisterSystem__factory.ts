/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  RegisterSystem,
  RegisterSystemInterface,
} from "../RegisterSystem";

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
        name: "args",
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
        internalType: "address",
        name: "msgSender",
        type: "address",
      },
      {
        internalType: "enum RegisterType",
        name: "registerType",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
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
        internalType: "bytes",
        name: "args",
        type: "bytes",
      },
    ],
    name: "requirement",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
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
  "0x60806040523480156200001157600080fd5b50604051620010ae380380620010ae833981016040819052620000349162000117565b600280546001600160a01b0319163317905581816001600160a01b038116156200005f5780620000c4565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa1580156200009e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000c4919062000156565b600080546001600160a01b039283166001600160a01b0319918216179091556001805494909216931692909217909155506200017d915050565b6001600160a01b03811681146200011457600080fd5b50565b600080604083850312156200012b57600080fd5b82516200013881620000fe565b60208401519092506200014b81620000fe565b809150509250929050565b6000602082840312156200016957600080fd5b81516200017681620000fe565b9392505050565b610f21806200018d6000396000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c80638da5cb5b116100505780638da5cb5b146100a9578063f2fde38b146100d1578063f6cd7a01146100e657600080fd5b806309c5eabe1461006c5780638b246a5b14610095575b600080fd5b61007f61007a366004610b1b565b6100f9565b60405161008c9190610bce565b60405180910390f35b61007f6100a3366004610b1b565b50606090565b60025460405173ffffffffffffffffffffffffffffffffffffffff909116815260200161008c565b6100e46100df366004610c5f565b610814565b005b61007f6100f4366004610c90565b610923565b6060600080600080858060200190518101906101159190610ce1565b6001549397509195509350915073ffffffffffffffffffffffffffffffffffffffff1633146101cb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f73797374656d2063616e206f6e6c792062652063616c6c65642076696120576f60448201527f726c64000000000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b60008360018111156101df576101df610d34565b14806101fc575060018360018111156101fa576101fa610d34565b145b610262576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f696e76616c69642074797065000000000000000000000000000000000000000060448201526064016101c2565b806000036102cc576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f696e76616c69642069640000000000000000000000000000000000000000000060448201526064016101c2565b73ffffffffffffffffffffffffffffffffffffffff8216610349576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f696e76616c69642061646472657373000000000000000000000000000000000060448201526064016101c2565b60008084600181111561035e5761035e610d34565b146103ab576000546103a69073ffffffffffffffffffffffffffffffffffffffff167f017c816a964927a00e050edd780dcf113ca2756dfa9e9fda94a05c140d9317b061095c565b6103c5565b60005473ffffffffffffffffffffffffffffffffffffffff165b9050600073ffffffffffffffffffffffffffffffffffffffff84166040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905290915073ffffffffffffffffffffffffffffffffffffffff83169063cccf7a8e90602401602060405180830381865afa15801561044e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104729190610d63565b156104d9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f656e7469747920616c726561647920726567697374657265640000000000000060448201526064016101c2565b6040517ffbdfa1ea0000000000000000000000000000000000000000000000000000000081526004810184905260009073ffffffffffffffffffffffffffffffffffffffff84169063fbdfa1ea90602401600060405180830381865afa158015610547573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405261058d9190810190610d85565b905080516000148061066457508051600114801561066457508673ffffffffffffffffffffffffffffffffffffffff166105de826000815181106105d3576105d3610e2b565b602002602001015190565b73ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610628573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061064c9190610e5a565b73ffffffffffffffffffffffffffffffffffffffff16145b6106f0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f696420616c7265616479207265676973746572656420616e642063616c6c657260448201527f206e6f74206f776e65720000000000000000000000000000000000000000000060648201526084016101c2565b8051600103610781578273ffffffffffffffffffffffffffffffffffffffff16634cc822158260008151811061072857610728610e2b565b60200260200101516040518263ffffffff1660e01b815260040161074e91815260200190565b600060405180830381600087803b15801561076857600080fd5b505af115801561077c573d6000803e3d6000fd5b505050505b6040517f1ab06ee5000000000000000000000000000000000000000000000000000000008152600481018390526024810185905273ffffffffffffffffffffffffffffffffffffffff841690631ab06ee590604401600060405180830381600087803b1580156107f057600080fd5b505af1158015610804573d6000803e3d6000fd5b5050505050505050505050919050565b60025473ffffffffffffffffffffffffffffffffffffffff163314610895576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f4f4e4c595f4f574e45520000000000000000000000000000000000000000000060448201526064016101c2565b60025460405173ffffffffffffffffffffffffffffffffffffffff8084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3600280547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60606109538585858560405160200161093f9493929190610e77565b6040516020818303038152906040526100f9565b95945050505050565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa1580156109cc573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052610a129190810190610d85565b90508051600003610a7f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f74207265676973746572656400000000000000000000000000000060448201526064016101c2565b610a95816000815181106105d3576105d3610e2b565b949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715610b1357610b13610a9d565b604052919050565b60006020808385031215610b2e57600080fd5b823567ffffffffffffffff80821115610b4657600080fd5b818501915085601f830112610b5a57600080fd5b813581811115610b6c57610b6c610a9d565b610b9c847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601610acc565b91508082528684828501011115610bb257600080fd5b8084840185840137600090820190930192909252509392505050565b600060208083528351808285015260005b81811015610bfb57858101830151858201604001528201610bdf565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b73ffffffffffffffffffffffffffffffffffffffff81168114610c5c57600080fd5b50565b600060208284031215610c7157600080fd5b8135610c7c81610c3a565b9392505050565b60028110610c5c57600080fd5b60008060008060808587031215610ca657600080fd5b8435610cb181610c3a565b93506020850135610cc181610c83565b92506040850135610cd181610c3a565b9396929550929360600135925050565b60008060008060808587031215610cf757600080fd5b8451610d0281610c3a565b6020860151909450610d1381610c83565b6040860151909350610d2481610c3a565b6060959095015193969295505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600060208284031215610d7557600080fd5b81518015158114610c7c57600080fd5b60006020808385031215610d9857600080fd5b825167ffffffffffffffff80821115610db057600080fd5b818501915085601f830112610dc457600080fd5b815181811115610dd657610dd6610a9d565b8060051b9150610de7848301610acc565b8181529183018401918481019088841115610e0157600080fd5b938501935b83851015610e1f57845182529385019390850190610e06565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600060208284031215610e6c57600080fd5b8151610c7c81610c3a565b73ffffffffffffffffffffffffffffffffffffffff8581168252608082019060028610610ecd577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8560208401528085166040840152508260608301529594505050505056fea264697066735822122007ab1a2f2f5d80935482523757f2fc67ba89ffa31b83dc5f79fe56c5e122badd64736f6c63430008110033";

type RegisterSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RegisterSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class RegisterSystem__factory extends ContractFactory {
  constructor(...args: RegisterSystemConstructorParams) {
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
  ): Promise<RegisterSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<RegisterSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): RegisterSystem {
    return super.attach(address) as RegisterSystem;
  }
  override connect(signer: Signer): RegisterSystem__factory {
    return super.connect(signer) as RegisterSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RegisterSystemInterface {
    return new utils.Interface(_abi) as RegisterSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RegisterSystem {
    return new Contract(address, _abi, signerOrProvider) as RegisterSystem;
  }
}

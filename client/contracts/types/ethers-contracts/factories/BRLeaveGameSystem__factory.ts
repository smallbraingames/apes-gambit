/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  BRLeaveGameSystem,
  BRLeaveGameSystemInterface,
} from "../BRLeaveGameSystem";

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
    name: "Ownable__NotOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "Ownable__NotTransitiveOwner",
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
  "0x60806040523480156200001157600080fd5b5060405162000db338038062000db383398101604081905262000034916200022c565b818162000041336200010f565b6001600160a01b03811615620000585780620000bd565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000097573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bd91906200026b565b600080546001600160a01b03199081166001600160a01b0393841690811790925560018054909116928516928317905562000105919062000183602090811b6200050817901c565b5050505062000292565b600062000126620001ef60201b620005991760201c565b80546040519192506001600160a01b03808516929116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b7ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a8780546001600160a01b039384166001600160a01b0319918216179091557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a868054929093169116179055565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6001600160a01b03811681146200022957600080fd5b50565b600080604083850312156200024057600080fd5b82516200024d8162000213565b6020840151909250620002608162000213565b809150509250929050565b6000602082840312156200027e57600080fd5b81516200028b8162000213565b9392505050565b610b1180620002a26000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780633e991df31461007a5780638da5cb5b1461008d578063f2fde38b146100ba575b600080fd5b61006461005f366004610878565b6100cf565b604051610071919061092b565b60405180910390f35b610064610088366004610997565b610415565b610095610447565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610071565b6100cd6100c83660046109b0565b61048c565b005b60606000828060200190518101906100e791906109ed565b600080549192509061012f9073ffffffffffffffffffffffffffffffffffffffff167f33c4aae4b327d551cc4ea42873cd8dcaa61f5bc0f248cf0e6dd3473f9a820d666105bd565b60008054919250906101779073ffffffffffffffffffffffffffffffffffffffff167f3e4e98a8b24cd1e4f79528ef3f1cf7edfe0dbe0043563a44641446b8716086b46105bd565b6040517f4cc822150000000000000000000000000000000000000000000000000000000081526004810185905290915073ffffffffffffffffffffffffffffffffffffffff831690634cc8221590602401600060405180830381600087803b1580156101e257600080fd5b505af11580156101f6573d6000803e3d6000fd5b50506040517f4cc822150000000000000000000000000000000000000000000000000000000081526004810186905273ffffffffffffffffffffffffffffffffffffffff84169250634cc822159150602401600060405180830381600087803b15801561026257600080fd5b505af1158015610276573d6000803e3d6000fd5b5050600080549092506102c0915073ffffffffffffffffffffffffffffffffffffffff167fc4351b56c4cd08a217ed0cd7583fb7b8c9b1bf5e79db10cb324b32a4fe5416ff61070d565b60008054919250906103089073ffffffffffffffffffffffffffffffffffffffff167f66187145093415ec582e1f831f4ab9cd5c382f164a9f3593d2defc665e76007d61070d565b6040517f6318c82d0000000000000000000000000000000000000000000000000000000081526004810187905290915073ffffffffffffffffffffffffffffffffffffffff831690636318c82d90602401600060405180830381600087803b15801561037357600080fd5b505af1158015610387573d6000803e3d6000fd5b50506040517f6318c82d0000000000000000000000000000000000000000000000000000000081526004810188905273ffffffffffffffffffffffffffffffffffffffff84169250636318c82d9150602401600060405180830381600087803b1580156103f357600080fd5b505af1158015610407573d6000803e3d6000fd5b505050505050505050919050565b60606104418260405160200161042d91815260200190565b6040516020818303038152906040526100cf565b92915050565b60006104877f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1633146104fc576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61050581610746565b50565b7ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805473ffffffffffffffffffffffffffffffffffffffff9384167fffffffffffffffffffffffff0000000000000000000000000000000000000000918216179091557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a868054929093169116179055565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa15801561062d573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526106739190810190610a06565b905080516000036106e4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f742072656769737465726564000000000000000000000000000000604482015260640160405180910390fd5b610705816000815181106106fa576106fa610aac565b602002602001015190565b949350505050565b60008061073a847f017c816a964927a00e050edd780dcf113ca2756dfa9e9fda94a05c140d9317b06105bd565b905061070581846105bd565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804608054604051610505928492909173ffffffffffffffffffffffffffffffffffffffff8085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715610870576108706107fa565b604052919050565b6000602080838503121561088b57600080fd5b823567ffffffffffffffff808211156108a357600080fd5b818501915085601f8301126108b757600080fd5b8135818111156108c9576108c96107fa565b6108f9847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601610829565b9150808252868482850101111561090f57600080fd5b8084840185840137600090820190930192909252509392505050565b600060208083528351808285015260005b818110156109585785810183015185820160400152820161093c565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b6000602082840312156109a957600080fd5b5035919050565b6000602082840312156109c257600080fd5b813573ffffffffffffffffffffffffffffffffffffffff811681146109e657600080fd5b9392505050565b6000602082840312156109ff57600080fd5b5051919050565b60006020808385031215610a1957600080fd5b825167ffffffffffffffff80821115610a3157600080fd5b818501915085601f830112610a4557600080fd5b815181811115610a5757610a576107fa565b8060051b9150610a68848301610829565b8181529183018401918481019088841115610a8257600080fd5b938501935b83851015610aa057845182529385019390850190610a87565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fdfea2646970667358221220e0a50f70a68082df6f0da3fe094f1c2ce993b1bc2b86680b2107853a1e028ef264736f6c63430008110033";

type BRLeaveGameSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BRLeaveGameSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BRLeaveGameSystem__factory extends ContractFactory {
  constructor(...args: BRLeaveGameSystemConstructorParams) {
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
  ): Promise<BRLeaveGameSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<BRLeaveGameSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): BRLeaveGameSystem {
    return super.attach(address) as BRLeaveGameSystem;
  }
  override connect(signer: Signer): BRLeaveGameSystem__factory {
    return super.connect(signer) as BRLeaveGameSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BRLeaveGameSystemInterface {
    return new utils.Interface(_abi) as BRLeaveGameSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BRLeaveGameSystem {
    return new Contract(address, _abi, signerOrProvider) as BRLeaveGameSystem;
  }
}
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  BRStartGameSystem,
  BRStartGameSystemInterface,
} from "../BRStartGameSystem";

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
    name: "BRBeforeStartTime",
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
  "0x60806040523480156200001157600080fd5b5060405162000fe838038062000fe883398101604081905262000034916200022c565b818162000041336200010f565b6001600160a01b03811615620000585780620000bd565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000097573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bd91906200026b565b600080546001600160a01b03199081166001600160a01b0393841690811790925560018054909116928516928317905562000105919062000183602090811b6200023517901c565b5050505062000292565b600062000126620001ef60201b620002c61760201c565b80546040519192506001600160a01b03808516929116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b7ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a8780546001600160a01b039384166001600160a01b0319918216179091557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a868054929093169116179055565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6001600160a01b03811681146200022957600080fd5b50565b600080604083850312156200024057600080fd5b82516200024d8162000213565b6020840151909250620002608162000213565b809150509250929050565b6000602082840312156200027e57600080fd5b81516200028b8162000213565b9392505050565b610d4680620002a26000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780633e991df31461007a5780638da5cb5b1461008d578063f2fde38b146100ba575b600080fd5b61006461005f366004610886565b6100cf565b6040516100719190610939565b60405180910390f35b6100646100883660046109a5565b610142565b610095610174565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610071565b6100cd6100c83660046109be565b6101b9565b005b60606000828060200190518101906100e791906109fb565b600080549192509061012f9073ffffffffffffffffffffffffffffffffffffffff167f4c5443efce5b9ecc79a1896dd0de307031c10094a3b3fc9a5d2b086c5b792de06102ea565b905061013b818361043a565b5050919050565b606061016e8260405160200161015a91815260200190565b6040516020818303038152906040526100cf565b92915050565b60006101b47f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff163314610229576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61023281610521565b50565b7ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805473ffffffffffffffffffffffffffffffffffffffff9384167fffffffffffffffffffffffff0000000000000000000000000000000000000000918216179091557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a868054929093169116179055565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa15801561035a573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526103a09190810190610a14565b90508051600003610411576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f742072656769737465726564000000000000000000000000000000604482015260640160405180910390fd5b6104328160008151811061042757610427610aba565b602002602001015190565b949350505050565b610444828261052a565b6000610450838361058d565b805190915042101561048e576040517fe69032f200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60016101008201526040517ff6fa94db00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff84169063f6fa94db906104ea9085908590600401610b53565b600060405180830381600087803b15801561050457600080fd5b505af1158015610518573d6000803e3d6000fd5b50505050505050565b61023281610732565b6000610536838361058d565b90506000816101000151600281111561055157610551610ae9565b14610588576040517f4221b8ac00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b505050565b6105da6040805161012081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c0810182905260e081018290529061010082015290565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa158015610645573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106699190610bfb565b61069f576040517f82203a4100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905260009073ffffffffffffffffffffffffffffffffffffffff851690630ff4c9169060240161012060405180830381865afa15801561070e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104329190610c68565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405173ffffffffffffffffffffffffffffffffffffffff8481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051610120810167ffffffffffffffff81118282101715610831576108316107de565b60405290565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff8111828210171561087e5761087e6107de565b604052919050565b6000602080838503121561089957600080fd5b823567ffffffffffffffff808211156108b157600080fd5b818501915085601f8301126108c557600080fd5b8135818111156108d7576108d76107de565b610907847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601610837565b9150808252868482850101111561091d57600080fd5b8084840185840137600090820190930192909252509392505050565b600060208083528351808285015260005b818110156109665785810183015185820160400152820161094a565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b6000602082840312156109b757600080fd5b5035919050565b6000602082840312156109d057600080fd5b813573ffffffffffffffffffffffffffffffffffffffff811681146109f457600080fd5b9392505050565b600060208284031215610a0d57600080fd5b5051919050565b60006020808385031215610a2757600080fd5b825167ffffffffffffffff80821115610a3f57600080fd5b818501915085601f830112610a5357600080fd5b815181811115610a6557610a656107de565b8060051b9150610a76848301610837565b8181529183018401918481019088841115610a9057600080fd5b938501935b83851015610aae57845182529385019390850190610a95565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60038110610b4f577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b9052565b6000610140820190508382528251602083015263ffffffff602084015116604083015261ffff60408401511660608301526060830151610b99608084018261ffff169052565b50608083015160a083015260a0830151610bb960c084018261ffff169052565b5060c083015161ffff811660e08401525060e0830151610100610be08185018360ff169052565b8401519050610bf3610120840182610b18565b509392505050565b600060208284031215610c0d57600080fd5b815180151581146109f457600080fd5b805163ffffffff81168114610c3157600080fd5b919050565b805161ffff81168114610c3157600080fd5b805160ff81168114610c3157600080fd5b805160038110610c3157600080fd5b60006101208284031215610c7b57600080fd5b610c8361080d565b82518152610c9360208401610c1d565b6020820152610ca460408401610c36565b6040820152610cb560608401610c36565b606082015260808301516080820152610cd060a08401610c36565b60a0820152610ce160c08401610c36565b60c0820152610cf260e08401610c48565b60e0820152610100610d05818501610c59565b90820152939250505056fea2646970667358221220d34da3ba344751004a738c0f7ae81a246aa41e4cc40c1e63b9fa39047dcf46e964736f6c63430008110033";

type BRStartGameSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BRStartGameSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BRStartGameSystem__factory extends ContractFactory {
  constructor(...args: BRStartGameSystemConstructorParams) {
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
  ): Promise<BRStartGameSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<BRStartGameSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): BRStartGameSystem {
    return super.attach(address) as BRStartGameSystem;
  }
  override connect(signer: Signer): BRStartGameSystem__factory {
    return super.connect(signer) as BRStartGameSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BRStartGameSystemInterface {
    return new utils.Interface(_abi) as BRStartGameSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BRStartGameSystem {
    return new Contract(address, _abi, signerOrProvider) as BRStartGameSystem;
  }
}

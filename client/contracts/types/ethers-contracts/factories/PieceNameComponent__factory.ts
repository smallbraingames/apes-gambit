/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  PieceNameComponent,
  PieceNameComponentInterface,
} from "../PieceNameComponent";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "world",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "BareComponent__NotImplemented",
    type: "error",
  },
  {
    inputs: [],
    name: "OwnableWritable__NotWriter",
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
        internalType: "address",
        name: "writer",
        type: "address",
      },
    ],
    name: "authorizeWriter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getEntities",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "getEntitiesWithValue",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "entity",
        type: "uint256",
      },
    ],
    name: "getRawValue",
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
    inputs: [],
    name: "getSchema",
    outputs: [
      {
        internalType: "string[]",
        name: "keys",
        type: "string[]",
      },
      {
        internalType: "enum LibTypes.SchemaValue[]",
        name: "values",
        type: "uint8[]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "entity",
        type: "uint256",
      },
    ],
    name: "getValue",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "entity",
        type: "uint256",
      },
    ],
    name: "has",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "id",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
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
        name: "",
        type: "address",
      },
    ],
    name: "registerIndexer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_world",
        type: "address",
      },
    ],
    name: "registerWorld",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "entity",
        type: "uint256",
      },
    ],
    name: "remove",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "entity",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "value",
        type: "string",
      },
    ],
    name: "set",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "entity",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "value",
        type: "bytes",
      },
    ],
    name: "set",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "writer",
        type: "address",
      },
    ],
    name: "unauthorizeWriter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "world",
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
        name: "operator",
        type: "address",
      },
    ],
    name: "writeAccess",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200156a3803806200156a833981016040819052620000349162000204565b807fa584515f2273fad14d3c759d354d23374dec542bc978d7147c47e681a7b4649e818162000063336200008e565b60028190556001600160a01b038216156200008357620000838262000102565b505050505062000236565b6000620000a5620001ba60201b62000a121760201c565b80546040519192506001600160a01b03808516929116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6200010c620001de565b6001600160a01b0316336001600160a01b0316146200013e57604051632f7a8ee160e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b038316908117909155600254604051630f30347760e41b8152306004820152602481019190915263f303477090604401600060405180830381600087803b1580156200019e57600080fd5b505af1158015620001b3573d6000803e3d6000fd5b5050505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6000620001f5620001ba60201b62000a121760201c565b546001600160a01b0316919050565b6000602082840312156200021757600080fd5b81516001600160a01b03811681146200022f57600080fd5b9392505050565b61132480620002466000396000f3fe608060405234801561001057600080fd5b50600436106101365760003560e01c80638b282947116100b2578063b361be4611610081578063bf4fe57e11610066578063bf4fe57e146102b0578063cccf7a8e146102c3578063f2fde38b146102d657600080fd5b8063b361be461461028a578063b8bc073d1461029d57600080fd5b80638b282947146102455780638da5cb5b146102585780639d2c76b414610260578063af640d0f1461027357600080fd5b80634fef6a38116101095780636b122fe0116100ee5780636b122fe0146101f957806375c0669c1461020f578063861eb9051461022257600080fd5b80634fef6a38146101d357806364371977146101e657600080fd5b80630ff4c9161461013b57806330b67baa1461016457806331b933b9146101a95780634cc82215146101be575b600080fd5b61014e610149366004610c4d565b6102e9565b60405161015b9190610cd4565b60405180910390f35b6000546101849073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161015b565b6101b1610310565b60405161015b9190610ce7565b6101d16101cc366004610c4d565b610344565b005b6101d16101e1366004610d2b565b61038f565b6101d16101f4366004610e63565b61046d565b61020161049a565b60405161015b929190610eed565b6101d161021d366004610d2b565b610586565b610235610230366004610d2b565b6105b8565b604051901515815260200161015b565b6101d1610253366004610ffd565b610643565b61018461068c565b6101d161026e366004610d2b565b6106d1565b61027c60025481565b60405190815260200161015b565b6101b161029836600461103a565b610310565b61014e6102ab366004610c4d565b6107fa565b6101d16102be366004610d2b565b61089c565b6102356102d1366004610c4d565b610977565b6101d16102e4366004610d2b565b610999565b606060006102f6836107fa565b8060200190518101906103099190611077565b9392505050565b60606040517f17d5b8e800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61034d336105b8565b610383576040517f406ed3da00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61038c81610a36565b50565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1633146103ff576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff1660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c9096020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001179055565b61049682826040516020016104829190610cd4565b604051602081830303815290604052610643565b5050565b604080516001808252818301909252606091829190816020015b60608152602001906001900390816104b4575050604080516001808252818301909252919350602080830190803683370190505090506040518060400160405280600581526020017f76616c756500000000000000000000000000000000000000000000000000000081525082600081518110610533576105336110ee565b6020026020010181905250600f81600081518110610553576105536110ee565b6020026020010190602181111561056c5761056c610ebe565b9081602181111561057f5761057f610ebe565b9052509091565b6040517f17d5b8e800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff811660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c909602052604081205460ff168061063d575061060e61068c565b73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16145b92915050565b61064c336105b8565b610682576040517f406ed3da00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6104968282610aa4565b60006106cc7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff163314610741576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83169081179091556002546040517ff3034770000000000000000000000000000000000000000000000000000000008152306004820152602481019190915263f3034770906044015b600060405180830381600087803b1580156107df57600080fd5b505af11580156107f3573d6000803e3d6000fd5b5050505050565b60008181526001602052604090208054606091906108179061111d565b80601f01602080910402602001604051908101604052809291908181526020018280546108439061111d565b80156108905780601f1061086557610100808354040283529160200191610890565b820191906000526020600020905b81548152906001019060200180831161087357829003601f168201915b50505050509050919050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff16331461090c576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff1660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c9096020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00169055565b600081815260016020526040812080546109909061111d565b15159392505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff163314610a09576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61038c81610b4b565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6000818152600160205260408120610a4d91610bff565b6000546040517f0de3b7b50000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff90911690630de3b7b5906024016107c5565b6000828152600160205260409020610abc82826111bb565b506000546040517fcfd3c57f00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff9091169063cfd3c57f90610b1590859085906004016112d5565b600060405180830381600087803b158015610b2f57600080fd5b505af1158015610b43573d6000803e3d6000fd5b505050505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405161038c928492909173ffffffffffffffffffffffffffffffffffffffff8085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b508054610c0b9061111d565b6000825580601f10610c1b575050565b601f01602090049060005260206000209081019061038c91905b80821115610c495760008155600101610c35565b5090565b600060208284031215610c5f57600080fd5b5035919050565b60005b83811015610c81578181015183820152602001610c69565b50506000910152565b60008151808452610ca2816020860160208601610c66565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b6020815260006103096020830184610c8a565b6020808252825182820181905260009190848201906040850190845b81811015610d1f57835183529284019291840191600101610d03565b50909695505050505050565b600060208284031215610d3d57600080fd5b813573ffffffffffffffffffffffffffffffffffffffff8116811461030957600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715610dd757610dd7610d61565b604052919050565b600067ffffffffffffffff821115610df957610df9610d61565b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01660200190565b6000610e38610e3384610ddf565b610d90565b9050828152838383011115610e4c57600080fd5b828260208301376000602084830101529392505050565b60008060408385031215610e7657600080fd5b82359150602083013567ffffffffffffffff811115610e9457600080fd5b8301601f81018513610ea557600080fd5b610eb485823560208401610e25565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b6000604082016040835280855180835260608501915060608160051b8601019250602080880160005b83811015610f62577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa0888703018552610f50868351610c8a565b95509382019390820190600101610f16565b50508584038187015286518085528782019482019350915060005b82811015610fd057845160228110610fbe577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b84529381019392810192600101610f7d565b5091979650505050505050565b600082601f830112610fee57600080fd5b61030983833560208501610e25565b6000806040838503121561101057600080fd5b82359150602083013567ffffffffffffffff81111561102e57600080fd5b610eb485828601610fdd565b60006020828403121561104c57600080fd5b813567ffffffffffffffff81111561106357600080fd5b61106f84828501610fdd565b949350505050565b60006020828403121561108957600080fd5b815167ffffffffffffffff8111156110a057600080fd5b8201601f810184136110b157600080fd5b80516110bf610e3382610ddf565b8181528560208385010111156110d457600080fd5b6110e5826020830160208601610c66565b95945050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600181811c9082168061113157607f821691505b60208210810361116a577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b601f8211156111b657600081815260208120601f850160051c810160208610156111975750805b601f850160051c820191505b81811015610b43578281556001016111a3565b505050565b815167ffffffffffffffff8111156111d5576111d5610d61565b6111e9816111e3845461111d565b84611170565b602080601f83116001811461123c57600084156112065750858301515b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600386901b1c1916600185901b178555610b43565b6000858152602081207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08616915b828110156112895788860151825594840194600190910190840161126a565b50858210156112c557878501517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600388901b60f8161c191681555b5050505050600190811b01905550565b82815260406020820152600061106f6040830184610c8a56fea26469706673582212205e8bd5c1fa94a3d8e6db13f8f880a7d5f806ef0e65497299d6a05a094430f58464736f6c63430008110033";

type PieceNameComponentConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PieceNameComponentConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PieceNameComponent__factory extends ContractFactory {
  constructor(...args: PieceNameComponentConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    world: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<PieceNameComponent> {
    return super.deploy(world, overrides || {}) as Promise<PieceNameComponent>;
  }
  override getDeployTransaction(
    world: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(world, overrides || {});
  }
  override attach(address: string): PieceNameComponent {
    return super.attach(address) as PieceNameComponent;
  }
  override connect(signer: Signer): PieceNameComponent__factory {
    return super.connect(signer) as PieceNameComponent__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PieceNameComponentInterface {
    return new utils.Interface(_abi) as PieceNameComponentInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PieceNameComponent {
    return new Contract(address, _abi, signerOrProvider) as PieceNameComponent;
  }
}
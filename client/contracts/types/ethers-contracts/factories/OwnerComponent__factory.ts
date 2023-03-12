/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  OwnerComponent,
  OwnerComponentInterface,
} from "../OwnerComponent";

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
        internalType: "address",
        name: "value",
        type: "address",
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
  "0x60806040523480156200001157600080fd5b50604051620014b3380380620014b3833981016040819052620000349162000204565b807f3aa78a206fc67ba4c2dbdbfa4f9637a0b391d7db261dacc2eb5d96f7b5693d97818162000063336200008e565b60028190556001600160a01b038216156200008357620000838262000102565b505050505062000236565b6000620000a5620001ba60201b62000a1f1760201c565b80546040519192506001600160a01b03808516929116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6200010c620001de565b6001600160a01b0316336001600160a01b0316146200013e57604051632f7a8ee160e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b038316908117909155600254604051630f30347760e41b8152306004820152602481019190915263f303477090604401600060405180830381600087803b1580156200019e57600080fd5b505af1158015620001b3573d6000803e3d6000fd5b5050505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6000620001f5620001ba60201b62000a1f1760201c565b546001600160a01b0316919050565b6000602082840312156200021757600080fd5b81516001600160a01b03811681146200022f57600080fd5b9392505050565b61126d80620002466000396000f3fe608060405234801561001057600080fd5b50600436106101365760003560e01c80638b282947116100b2578063b361be4611610081578063bf4fe57e11610066578063bf4fe57e146102ac578063cccf7a8e146102bf578063f2fde38b146102d257600080fd5b8063b361be4614610279578063b8bc073d1461028c57600080fd5b80638b282947146102345780638da5cb5b146102475780639d2c76b41461024f578063af640d0f1461026257600080fd5b80634cc82215116101095780636b122fe0116100ee5780636b122fe0146101e857806375c0669c146101fe578063861eb9051461021157600080fd5b80634cc82215146101c25780634fef6a38146101d557600080fd5b80630ff4c9161461013b5780632f30c6f61461017857806330b67baa1461018d57806331b933b9146101ad575b600080fd5b61014e610149366004610c5a565b6102e5565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020015b60405180910390f35b61018b610186366004610c95565b61030b565b005b60005461014e9073ffffffffffffffffffffffffffffffffffffffff1681565b6101b561034a565b60405161016f9190610cc5565b61018b6101d0366004610c5a565b61037e565b61018b6101e3366004610d09565b6103c9565b6101f06104a7565b60405161016f929190610db9565b61018b61020c366004610d09565b610593565b61022461021f366004610d09565b6105c5565b604051901515815260200161016f565b61018b610242366004610f83565b610650565b61014e610699565b61018b61025d366004610d09565b6106de565b61026b60025481565b60405190815260200161016f565b6101b5610287366004610fca565b61034a565b61029f61029a366004610c5a565b610807565b60405161016f9190611007565b61018b6102ba366004610d09565b6108a9565b6102246102cd366004610c5a565b610984565b61018b6102e0366004610d09565b6109a6565b6000806102f183610807565b806020019051810190610304919061101a565b9392505050565b6040805173ffffffffffffffffffffffffffffffffffffffff8316602082015261034691849101604051602081830303815290604052610650565b5050565b60606040517f17d5b8e800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610387336105c5565b6103bd576040517f406ed3da00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6103c681610a43565b50565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff163314610439576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff1660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c9096020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001179055565b604080516001808252818301909252606091829190816020015b60608152602001906001900390816104c1575050604080516001808252818301909252919350602080830190803683370190505090506040518060400160405280600581526020017f76616c75650000000000000000000000000000000000000000000000000000008152508260008151811061054057610540611037565b6020026020010181905250600d8160008151811061056057610560611037565b6020026020010190602181111561057957610579610d8a565b9081602181111561058c5761058c610d8a565b9052509091565b6040517f17d5b8e800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff811660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c909602052604081205460ff168061064a575061061b610699565b73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16145b92915050565b610659336105c5565b61068f576040517f406ed3da00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6103468282610ab1565b60006106d97f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff16331461074e576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83169081179091556002546040517ff3034770000000000000000000000000000000000000000000000000000000008152306004820152602481019190915263f3034770906044015b600060405180830381600087803b1580156107ec57600080fd5b505af1158015610800573d6000803e3d6000fd5b5050505050565b600081815260016020526040902080546060919061082490611066565b80601f016020809104026020016040519081016040528092919081815260200182805461085090611066565b801561089d5780601f106108725761010080835404028352916020019161089d565b820191906000526020600020905b81548152906001019060200180831161088057829003601f168201915b50505050509050919050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff163314610919576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff1660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c9096020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00169055565b6000818152600160205260408120805461099d90611066565b15159392505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff163314610a16576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6103c681610b58565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6000818152600160205260408120610a5a91610c0c565b6000546040517f0de3b7b50000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff90911690630de3b7b5906024016107d2565b6000828152600160205260409020610ac98282611104565b506000546040517fcfd3c57f00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff9091169063cfd3c57f90610b22908590859060040161121e565b600060405180830381600087803b158015610b3c57600080fd5b505af1158015610b50573d6000803e3d6000fd5b505050505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516103c6928492909173ffffffffffffffffffffffffffffffffffffffff8085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b508054610c1890611066565b6000825580601f10610c28575050565b601f0160209004906000526020600020908101906103c691905b80821115610c565760008155600101610c42565b5090565b600060208284031215610c6c57600080fd5b5035919050565b73ffffffffffffffffffffffffffffffffffffffff811681146103c657600080fd5b60008060408385031215610ca857600080fd5b823591506020830135610cba81610c73565b809150509250929050565b6020808252825182820181905260009190848201906040850190845b81811015610cfd57835183529284019291840191600101610ce1565b50909695505050505050565b600060208284031215610d1b57600080fd5b813561030481610c73565b6000815180845260005b81811015610d4c57602081850181015186830182015201610d30565b5060006020828601015260207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f83011685010191505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b6000604082016040835280855180835260608501915060608160051b8601019250602080880160005b83811015610e2e577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa0888703018552610e1c868351610d26565b95509382019390820190600101610de2565b50508584038187015286518085528782019482019350915060005b82811015610e9c57845160228110610e8a577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b84529381019392810192600101610e49565b5091979650505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600082601f830112610ee957600080fd5b813567ffffffffffffffff80821115610f0457610f04610ea9565b604051601f83017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f01168101908282118183101715610f4a57610f4a610ea9565b81604052838152866020858801011115610f6357600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060408385031215610f9657600080fd5b82359150602083013567ffffffffffffffff811115610fb457600080fd5b610fc085828601610ed8565b9150509250929050565b600060208284031215610fdc57600080fd5b813567ffffffffffffffff811115610ff357600080fd5b610fff84828501610ed8565b949350505050565b6020815260006103046020830184610d26565b60006020828403121561102c57600080fd5b815161030481610c73565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600181811c9082168061107a57607f821691505b6020821081036110b3577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b601f8211156110ff57600081815260208120601f850160051c810160208610156110e05750805b601f850160051c820191505b81811015610b50578281556001016110ec565b505050565b815167ffffffffffffffff81111561111e5761111e610ea9565b6111328161112c8454611066565b846110b9565b602080601f831160018114611185576000841561114f5750858301515b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600386901b1c1916600185901b178555610b50565b6000858152602081207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08616915b828110156111d2578886015182559484019460019091019084016111b3565b508582101561120e57878501517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600388901b60f8161c191681555b5050505050600190811b01905550565b828152604060208201526000610fff6040830184610d2656fea26469706673582212205dcaa0abf94c9d296c61bb37b81c70963af4cef3bc304f2fc58067cf6a77bebb64736f6c63430008110033";

type OwnerComponentConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: OwnerComponentConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class OwnerComponent__factory extends ContractFactory {
  constructor(...args: OwnerComponentConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    world: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<OwnerComponent> {
    return super.deploy(world, overrides || {}) as Promise<OwnerComponent>;
  }
  override getDeployTransaction(
    world: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(world, overrides || {});
  }
  override attach(address: string): OwnerComponent {
    return super.attach(address) as OwnerComponent;
  }
  override connect(signer: Signer): OwnerComponent__factory {
    return super.connect(signer) as OwnerComponent__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OwnerComponentInterface {
    return new utils.Interface(_abi) as OwnerComponentInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OwnerComponent {
    return new Contract(address, _abi, signerOrProvider) as OwnerComponent;
  }
}

/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  BRCreateGameSystem,
  BRCreateGameSystemInterface,
} from "../BRCreateGameSystem";

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
        name: "startTime",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "rechargeTime",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "initialGridDim",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "secondsPerGridShrink",
        type: "uint32",
      },
      {
        internalType: "int256",
        name: "perlinDenom",
        type: "int256",
      },
      {
        internalType: "int128",
        name: "perlinThresholdBanana",
        type: "int128",
      },
      {
        internalType: "uint16",
        name: "perlinSeed",
        type: "uint16",
      },
      {
        internalType: "uint8",
        name: "perlinPrecision",
        type: "uint8",
      },
    ],
    name: "executeTyped",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
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
  "0x60806040523480156200001157600080fd5b5060405162000f1338038062000f1383398101604081905262000034916200022c565b818162000041336200010f565b6001600160a01b03811615620000585780620000bd565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000097573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bd91906200026b565b600080546001600160a01b03199081166001600160a01b0393841690811790925560018054909116928516928317905562000105919062000183602090811b6200044717901c565b5050505062000292565b600062000126620001ef60201b620004d81760201c565b80546040519192506001600160a01b03808516929116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b7ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a8780546001600160a01b039384166001600160a01b0319918216179091557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a868054929093169116179055565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6001600160a01b03811681146200022957600080fd5b50565b600080604083850312156200024057600080fd5b82516200024d8162000213565b6020840151909250620002608162000213565b809150509250929050565b6000602082840312156200027e57600080fd5b81516200028b8162000213565b9392505050565b610c7180620002a26000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780638da5cb5b1461007a5780639e27a640146100a7578063f2fde38b146100c8575b600080fd5b61006461005f36600461077e565b6100dd565b6040516100719190610831565b60405180910390f35b6100826102f5565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610071565b6100ba6100b53660046108dd565b61033a565b604051908152602001610071565b6100db6100d6366004610974565b6103cb565b005b6060600080600080600080600080898060200190518101906100ff91906109b1565b975097509750975097509750975097506000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663614bfa6e6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561017e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101a29190610a3c565b60008054919250906101ea9073ffffffffffffffffffffffffffffffffffffffff167f4c5443efce5b9ecc79a1896dd0de307031c10094a3b3fc9a5d2b086c5b792de06104fc565b90508073ffffffffffffffffffffffffffffffffffffffff16631742912b836040518061012001604052808e81526020018d63ffffffff1681526020018c61ffff1681526020018b61ffff1681526020018a815260200189600f0b81526020018861ffff1681526020018760ff1681526020016000600281111561027057610270610a55565b8152506040518363ffffffff1660e01b8152600401610290929190610abf565b600060405180830381600087803b1580156102aa57600080fd5b505af11580156102be573d6000803e3d6000fd5b50505050816040516020016102d591815260200190565b6040516020818303038152906040529a5050505050505050505050919050565b60006103357f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b60408051602081018a905263ffffffff808a16928201929092528188166060820152908616608082015260a08101859052600f84900b60c082015261ffff831660e082015260ff821661010082015260009081906103aa90610120016040516020818303038152906040526100dd565b8060200190518101906103bd9190610a3c565b9a9950505050505050505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff16331461043b576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6104448161064c565b50565b7ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805473ffffffffffffffffffffffffffffffffffffffff9384167fffffffffffffffffffffffff0000000000000000000000000000000000000000918216179091557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a868054929093169116179055565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa15801561056c573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526105b29190810190610b66565b90508051600003610623576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f742072656769737465726564000000000000000000000000000000604482015260640160405180910390fd5b6106448160008151811061063957610639610c0c565b602002602001015190565b949350505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804608054604051610444928492909173ffffffffffffffffffffffffffffffffffffffff8085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff8111828210171561077657610776610700565b604052919050565b6000602080838503121561079157600080fd5b823567ffffffffffffffff808211156107a957600080fd5b818501915085601f8301126107bd57600080fd5b8135818111156107cf576107cf610700565b6107ff847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8401160161072f565b9150808252868482850101111561081557600080fd5b8084840185840137600090820190930192909252509392505050565b600060208083528351808285015260005b8181101561085e57858101830151858201604001528201610842565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b63ffffffff8116811461044457600080fd5b80600f0b811461044457600080fd5b61ffff8116811461044457600080fd5b60ff8116811461044457600080fd5b600080600080600080600080610100898b0312156108fa57600080fd5b88359750602089013561090c8161089d565b9650604089013561091c8161089d565b9550606089013561092c8161089d565b94506080890135935060a0890135610943816108af565b925060c0890135610953816108be565b915060e0890135610963816108ce565b809150509295985092959890939650565b60006020828403121561098657600080fd5b813573ffffffffffffffffffffffffffffffffffffffff811681146109aa57600080fd5b9392505050565b600080600080600080600080610100898b0312156109ce57600080fd5b8851975060208901516109e08161089d565b60408a01519097506109f1816108be565b60608a0151909650610a02816108be565b60808a015160a08b01519196509450610a1a816108af565b60c08a0151909350610a2b816108be565b60e08a0151909250610963816108ce565b600060208284031215610a4e57600080fd5b5051919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60038110610abb577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b9052565b6000610140820190508382528251602083015263ffffffff602084015116604083015261ffff60408401511660608301526060830151610b05608084018261ffff169052565b50608083015160a083015260a0830151610b2460c0840182600f0b9052565b5060c083015161ffff811660e08401525060e0830151610100610b4b8185018360ff169052565b8401519050610b5e610120840182610a84565b509392505050565b60006020808385031215610b7957600080fd5b825167ffffffffffffffff80821115610b9157600080fd5b818501915085601f830112610ba557600080fd5b815181811115610bb757610bb7610700565b8060051b9150610bc884830161072f565b8181529183018401918481019088841115610be257600080fd5b938501935b83851015610c0057845182529385019390850190610be7565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fdfea264697066735822122042412b40229ccba6828baa7e673456105863cf9418f5d5339ec646e61a0afb6264736f6c63430008110033";

type BRCreateGameSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BRCreateGameSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BRCreateGameSystem__factory extends ContractFactory {
  constructor(...args: BRCreateGameSystemConstructorParams) {
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
  ): Promise<BRCreateGameSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<BRCreateGameSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): BRCreateGameSystem {
    return super.attach(address) as BRCreateGameSystem;
  }
  override connect(signer: Signer): BRCreateGameSystem__factory {
    return super.connect(signer) as BRCreateGameSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BRCreateGameSystemInterface {
    return new utils.Interface(_abi) as BRCreateGameSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BRCreateGameSystem {
    return new Contract(address, _abi, signerOrProvider) as BRCreateGameSystem;
  }
}

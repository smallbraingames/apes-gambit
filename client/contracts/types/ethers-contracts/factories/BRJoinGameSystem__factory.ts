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
  "0x60806040523480156200001157600080fd5b50604051620013923803806200139283398101604081905262000034916200022c565b818162000041336200010f565b6001600160a01b03811615620000585780620000bd565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000097573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bd91906200026b565b600080546001600160a01b03199081166001600160a01b0393841690811790925560018054909116928516928317905562000105919062000183602090811b620004ce17901c565b5050505062000292565b600062000126620001ef60201b6200055f1760201c565b80546040519192506001600160a01b03808516929116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b7ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a8780546001600160a01b039384166001600160a01b0319918216179091557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a868054929093169116179055565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6001600160a01b03811681146200022957600080fd5b50565b600080604083850312156200024057600080fd5b82516200024d8162000213565b6020840151909250620002608162000213565b809150509250929050565b6000602082840312156200027e57600080fd5b81516200028b8162000213565b9392505050565b6110f080620002a26000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780638da5cb5b1461007a578063915657fb146100a7578063f2fde38b146100ba575b600080fd5b61006461005f366004610cce565b6100cf565b6040516100719190610d81565b60405180910390f35b6100826103d1565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610071565b6100646100b5366004610ded565b610416565b6100cd6100c8366004610e31565b610452565b005b6060600080838060200190518101906100e89190610e4e565b60008054929450909250906101339073ffffffffffffffffffffffffffffffffffffffff167f3aa78a206fc67ba4c2dbdbfa4f9637a0b391d7db261dacc2eb5d96f7b5693d97610583565b600080549192509061017b9073ffffffffffffffffffffffffffffffffffffffff167f1f26ebf637805df90fe5cf9a282dd66905185d55ff65696a9171e1a656152d39610583565b60008054919250906101c39073ffffffffffffffffffffffffffffffffffffffff167f4c5443efce5b9ecc79a1896dd0de307031c10094a3b3fc9a5d2b086c5b792de0610583565b600080549192509061020b9073ffffffffffffffffffffffffffffffffffffffff167f33c4aae4b327d551cc4ea42873cd8dcaa61f5bc0f248cf0e6dd3473f9a820d66610583565b60008054919250906102539073ffffffffffffffffffffffffffffffffffffffff167f3e4e98a8b24cd1e4f79528ef3f1cf7edfe0dbe0043563a44641446b8716086b4610583565b9050610261858589336106d3565b61026b83876106e4565b6102758288610747565b6040517f1ab06ee5000000000000000000000000000000000000000000000000000000008152600481018890526024810187905273ffffffffffffffffffffffffffffffffffffffff831690631ab06ee590604401600060405180830381600087803b1580156102e457600080fd5b505af11580156102f8573d6000803e3d6000fd5b50506040517f60fe47b1000000000000000000000000000000000000000000000000000000008152600481018a905273ffffffffffffffffffffffffffffffffffffffff841692506360fe47b19150602401600060405180830381600087803b15801561036457600080fd5b505af1158015610378573d6000803e3d6000fd5b5050600080549092506103c2915073ffffffffffffffffffffffffffffffffffffffff167f3fe0524a97d46cff1be1703cd4a84d28fcc28e6c9bc09d2eedb2f0c75291a764610583565b90505050505050505050919050565b60006104117f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b606061044b8383604051602001610437929190918252602082015260400190565b6040516020818303038152906040526100cf565b9392505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1633146104c2576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6104cb81610811565b50565b7ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805473ffffffffffffffffffffffffffffffffffffffff9384167fffffffffffffffffffffffff0000000000000000000000000000000000000000918216179091557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a868054929093169116179055565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa1580156105f3573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526106399190810190610e72565b905080516000036106aa576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f742072656769737465726564000000000000000000000000000000604482015260640160405180910390fd5b6106cb816000815181106106c0576106c0610f18565b602002602001015190565b949350505050565b6106de84838361081a565b50505050565b60006106f0838361085b565b90506000816101000151600281111561070b5761070b610f47565b14610742576040517f4221b8ac00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b505050565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905273ffffffffffffffffffffffffffffffffffffffff83169063cccf7a8e90602401602060405180830381865afa1580156107b2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107d69190610f76565b1561080d576040517f4be0fd3a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5050565b6104cb81610a00565b610825838383610aac565b610742576040517f30cd747100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6108a86040805161012081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c0810182905260e081018290529061010082015290565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa158015610913573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109379190610f76565b61096d576040517f82203a4100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905260009073ffffffffffffffffffffffffffffffffffffffff851690630ff4c9169060240161012060405180830381865afa1580156109dc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106cb9190610ff5565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405173ffffffffffffffffffffffffffffffffffffffff8481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810183905260009073ffffffffffffffffffffffffffffffffffffffff85169063cccf7a8e90602401602060405180830381865afa158015610b1a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b3e9190610f76565b610b4a5750600061044b565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810184905260009073ffffffffffffffffffffffffffffffffffffffff861690630ff4c91690602401602060405180830381865afa158015610bb8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bdc919061109d565b90508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610c1b57600091505061044b565b506001949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051610120810167ffffffffffffffff81118282101715610c7957610c79610c26565b60405290565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715610cc657610cc6610c26565b604052919050565b60006020808385031215610ce157600080fd5b823567ffffffffffffffff80821115610cf957600080fd5b818501915085601f830112610d0d57600080fd5b813581811115610d1f57610d1f610c26565b610d4f847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601610c7f565b91508082528684828501011115610d6557600080fd5b8084840185840137600090820190930192909252509392505050565b600060208083528351808285015260005b81811015610dae57858101830151858201604001528201610d92565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b60008060408385031215610e0057600080fd5b50508035926020909101359150565b73ffffffffffffffffffffffffffffffffffffffff811681146104cb57600080fd5b600060208284031215610e4357600080fd5b813561044b81610e0f565b60008060408385031215610e6157600080fd5b505080516020909101519092909150565b60006020808385031215610e8557600080fd5b825167ffffffffffffffff80821115610e9d57600080fd5b818501915085601f830112610eb157600080fd5b815181811115610ec357610ec3610c26565b8060051b9150610ed4848301610c7f565b8181529183018401918481019088841115610eee57600080fd5b938501935b83851015610f0c57845182529385019390850190610ef3565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600060208284031215610f8857600080fd5b8151801515811461044b57600080fd5b805163ffffffff81168114610fac57600080fd5b919050565b805161ffff81168114610fac57600080fd5b8051600f81900b8114610fac57600080fd5b805160ff81168114610fac57600080fd5b805160038110610fac57600080fd5b6000610120828403121561100857600080fd5b611010610c55565b8251815261102060208401610f98565b602082015261103160408401610fb1565b604082015261104260608401610fb1565b60608201526080830151608082015261105d60a08401610fc3565b60a082015261106e60c08401610fb1565b60c082015261107f60e08401610fd5565b60e0820152610100611092818501610fe6565b908201529392505050565b6000602082840312156110af57600080fd5b815161044b81610e0f56fea2646970667358221220c66104b363a9d23276eb977cc8840e34d846f6ce9b1a9ac2584d12b37670f23d64736f6c63430008110033";

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

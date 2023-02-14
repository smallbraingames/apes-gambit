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
    name: "BRIncorrectControllers",
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
  "0x60806040523480156200001157600080fd5b50604051620017283803806200172883398101604081905262000034916200022c565b818162000041336200010f565b6001600160a01b03811615620000585780620000bd565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000097573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bd91906200026b565b600080546001600160a01b03199081166001600160a01b0393841690811790925560018054909116928516928317905562000105919062000183602090811b6200065c17901c565b5050505062000292565b600062000126620001ef60201b620006ed1760201c565b80546040519192506001600160a01b03808516929116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b7ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a8780546001600160a01b039384166001600160a01b0319918216179091557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a868054929093169116179055565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6001600160a01b03811681146200022957600080fd5b50565b600080604083850312156200024057600080fd5b82516200024d8162000213565b6020840151909250620002608162000213565b809150509250929050565b6000602082840312156200027e57600080fd5b81516200028b8162000213565b9392505050565b61148680620002a26000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780638da5cb5b1461007a578063915657fb146100a7578063f2fde38b146100ba575b600080fd5b61006461005f366004610fd6565b6100cf565b604051610071919061107a565b60405180910390f35b61008261055f565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610071565b6100646100b53660046110cb565b6105a4565b6100cd6100c836600461110f565b6105e0565b005b6060600080838060200190518101906100e8919061112c565b60008054929450909250906101339073ffffffffffffffffffffffffffffffffffffffff167f3aa78a206fc67ba4c2dbdbfa4f9637a0b391d7db261dacc2eb5d96f7b5693d97610711565b600080549192509061017b9073ffffffffffffffffffffffffffffffffffffffff167f1f26ebf637805df90fe5cf9a282dd66905185d55ff65696a9171e1a656152d39610711565b60008054919250906101c39073ffffffffffffffffffffffffffffffffffffffff167f4c5443efce5b9ecc79a1896dd0de307031c10094a3b3fc9a5d2b086c5b792de0610711565b600080549192509061020b9073ffffffffffffffffffffffffffffffffffffffff167f33c4aae4b327d551cc4ea42873cd8dcaa61f5bc0f248cf0e6dd3473f9a820d66610711565b60008054919250906102539073ffffffffffffffffffffffffffffffffffffffff167f3e4e98a8b24cd1e4f79528ef3f1cf7edfe0dbe0043563a44641446b8716086b4610711565b600080549192509061029b9073ffffffffffffffffffffffffffffffffffffffff167fc4351b56c4cd08a217ed0cd7583fb7b8c9b1bf5e79db10cb324b32a4fe5416ff610861565b90506102a986868a3361089a565b6102b384886108b5565b6102bd8389610918565b6040517f1ab06ee5000000000000000000000000000000000000000000000000000000008152600481018990526024810188905273ffffffffffffffffffffffffffffffffffffffff841690631ab06ee590604401600060405180830381600087803b15801561032c57600080fd5b505af1158015610340573d6000803e3d6000fd5b50506040517f60fe47b1000000000000000000000000000000000000000000000000000000008152600481018b905273ffffffffffffffffffffffffffffffffffffffff851692506360fe47b19150602401600060405180830381600087803b1580156103ac57600080fd5b505af11580156103c0573d6000803e3d6000fd5b50506000805490925061040a915073ffffffffffffffffffffffffffffffffffffffff167f3fe0524a97d46cff1be1703cd4a84d28fcc28e6c9bc09d2eedb2f0c75291a764610711565b6040517fd923c3c4000000000000000000000000000000000000000000000000000000008152600481018b90526000602482015290915073ffffffffffffffffffffffffffffffffffffffff82169063d923c3c490604401600060405180830381600087803b15801561047c57600080fd5b505af1158015610490573d6000803e3d6000fd5b50506040517f14b63f5700000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff851692506314b63f5791506104eb908c908c9060009060040161117f565b6000604051808303816000875af115801561050a573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405261055091908101906111d2565b50505050505050505050919050565b600061059f7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b60606105d983836040516020016105c5929190918252602082015260400190565b6040516020818303038152906040526100cf565b9392505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff163314610650576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610659816109e2565b50565b7ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805473ffffffffffffffffffffffffffffffffffffffff9384167fffffffffffffffffffffffff0000000000000000000000000000000000000000918216179091557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a868054929093169116179055565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa158015610781573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526107c79190810190611249565b90508051600003610838576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f742072656769737465726564000000000000000000000000000000604482015260640160405180910390fd5b6108598160008151811061084e5761084e6112ef565b602002602001015190565b949350505050565b60008061088e847f017c816a964927a00e050edd780dcf113ca2756dfa9e9fda94a05c140d9317b0610711565b90506108598184610711565b6108a58483836109eb565b6108af8383610a2c565b50505050565b60006108c18383610b1d565b9050600081610100015160028111156108dc576108dc611150565b14610913576040517f4221b8ac00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b505050565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905273ffffffffffffffffffffffffffffffffffffffff83169063cccf7a8e90602401602060405180830381865afa158015610983573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109a7919061131e565b156109de576040517f4be0fd3a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5050565b61065981610cc2565b6109f6838383610d6e565b610913576040517f30cd747100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810182905260009073ffffffffffffffffffffffffffffffffffffffff841690630ff4c91690602401600060405180830381865afa158015610a9a573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052610ae09190810190611249565b90508051600214610913576040517f520f044600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610b6a6040805161012081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c0810182905260e081018290529061010082015290565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa158015610bd5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bf9919061131e565b610c2f576040517f82203a4100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905260009073ffffffffffffffffffffffffffffffffffffffff851690630ff4c9169060240161012060405180830381865afa158015610c9e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610859919061138b565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405173ffffffffffffffffffffffffffffffffffffffff8481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810183905260009073ffffffffffffffffffffffffffffffffffffffff85169063cccf7a8e90602401602060405180830381865afa158015610ddc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e00919061131e565b610e0c575060006105d9565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810184905260009073ffffffffffffffffffffffffffffffffffffffff861690630ff4c91690602401602060405180830381865afa158015610e7a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e9e9190611433565b90508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610edd5760009150506105d9565b506001949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051610120810167ffffffffffffffff81118282101715610f3b57610f3b610ee8565b60405290565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715610f8857610f88610ee8565b604052919050565b600067ffffffffffffffff821115610faa57610faa610ee8565b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01660200190565b600060208284031215610fe857600080fd5b813567ffffffffffffffff811115610fff57600080fd5b8201601f8101841361101057600080fd5b803561102361101e82610f90565b610f41565b81815285602083850101111561103857600080fd5b81602084016020830137600091810160200191909152949350505050565b60005b83811015611071578181015183820152602001611059565b50506000910152565b6020815260008251806020840152611099816040850160208701611056565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160400192915050565b600080604083850312156110de57600080fd5b50508035926020909101359150565b73ffffffffffffffffffffffffffffffffffffffff8116811461065957600080fd5b60006020828403121561112157600080fd5b81356105d9816110ed565b6000806040838503121561113f57600080fd5b505080516020909101519092909150565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8381526020810183905260608101600683106111c4577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b826040830152949350505050565b6000602082840312156111e457600080fd5b815167ffffffffffffffff8111156111fb57600080fd5b8201601f8101841361120c57600080fd5b805161121a61101e82610f90565b81815285602083850101111561122f57600080fd5b611240826020830160208601611056565b95945050505050565b6000602080838503121561125c57600080fd5b825167ffffffffffffffff8082111561127457600080fd5b818501915085601f83011261128857600080fd5b81518181111561129a5761129a610ee8565b8060051b91506112ab848301610f41565b81815291830184019184810190888411156112c557600080fd5b938501935b838510156112e3578451825293850193908501906112ca565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60006020828403121561133057600080fd5b815180151581146105d957600080fd5b805163ffffffff8116811461135457600080fd5b919050565b805161ffff8116811461135457600080fd5b805160ff8116811461135457600080fd5b80516003811061135457600080fd5b6000610120828403121561139e57600080fd5b6113a6610f17565b825181526113b660208401611340565b60208201526113c760408401611359565b60408201526113d860608401611359565b6060820152608083015160808201526113f360a08401611359565b60a082015261140460c08401611359565b60c082015261141560e0840161136b565b60e082015261010061142881850161137c565b908201529392505050565b60006020828403121561144557600080fd5b81516105d9816110ed56fea2646970667358221220bc9cf4c70c59d35fb7059eee7ada1ef513c01c4d80b5d455b72085f7639154a864736f6c63430008110033";

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

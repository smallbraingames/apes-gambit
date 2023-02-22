/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  BRKillOutOfBoundsPiecesSystem,
  BRKillOutOfBoundsPiecesSystemInterface,
} from "../BRKillOutOfBoundsPiecesSystem";

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
  "0x60806040523480156200001157600080fd5b50604051620016943803806200169483398101604081905262000034916200022c565b818162000041336200010f565b6001600160a01b03811615620000585780620000bd565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000097573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bd91906200026b565b600080546001600160a01b03199081166001600160a01b0393841690811790925560018054909116928516928317905562000105919062000183602090811b6200030a17901c565b5050505062000292565b600062000126620001ef60201b6200039b1760201c565b80546040519192506001600160a01b03808516929116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b7ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a8780546001600160a01b039384166001600160a01b0319918216179091557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a868054929093169116179055565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6001600160a01b03811681146200022957600080fd5b50565b600080604083850312156200024057600080fd5b82516200024d8162000213565b6020840151909250620002608162000213565b809150509250929050565b6000602082840312156200027e57600080fd5b81516200028b8162000213565b9392505050565b6113f280620002a26000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780633e991df31461007a5780638da5cb5b1461008d578063f2fde38b146100ba575b600080fd5b61006461005f366004610dca565b6100cf565b6040516100719190610ee1565b60405180910390f35b610064610088366004610ef4565b610217565b610095610249565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610071565b6100cd6100c8366004610f0d565b61028e565b005b60606000828060200190518101906100e79190610f43565b600080549192509061012f9073ffffffffffffffffffffffffffffffffffffffff167f4c5443efce5b9ecc79a1896dd0de307031c10094a3b3fc9a5d2b086c5b792de06103bf565b60008054919250906101779073ffffffffffffffffffffffffffffffffffffffff167f3e4e98a8b24cd1e4f79528ef3f1cf7edfe0dbe0043563a44641446b8716086b46103bf565b60008054919250906101bf9073ffffffffffffffffffffffffffffffffffffffff167f023253b2241a10d36b8c9af452236123ad9f4644f2ef4963970b2c4b77c42db56103bf565b905060016101cd848661050f565b610100015160028111156101e3576101e3610f5c565b0361020e5760015461020e9073ffffffffffffffffffffffffffffffffffffffff16848484886106b4565b50505050919050565b60606102438260405160200161022f91815260200190565b6040516020818303038152906040526100cf565b92915050565b60006102897f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1633146102fe576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61030781610775565b50565b7ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805473ffffffffffffffffffffffffffffffffffffffff9384167fffffffffffffffffffffffff0000000000000000000000000000000000000000918216179091557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a868054929093169116179055565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa15801561042f573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526104759190810190610f8b565b905080516000036104e6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f742072656769737465726564000000000000000000000000000000604482015260640160405180910390fd5b610507816000815181106104fc576104fc611031565b602002602001015190565b949350505050565b61055c6040805161012081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c0810182905260e081018290529061010082015290565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa1580156105c7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105eb9190611060565b610621576040517f82203a4100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905260009073ffffffffffffffffffffffffffffffffffffffff851690630ff4c9169060240161012060405180830381865afa158015610690573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061050791906110cd565b6000806106c38787868661077e565b9150915060005b8181101561076b578573ffffffffffffffffffffffffffffffffffffffff16634cc8221584838151811061070057610700611031565b60200260200101516040518263ffffffff1660e01b815260040161072691815260200190565b600060405180830381600087803b15801561074057600080fd5b505af1158015610754573d6000803e3d6000fd5b505050508080610763906111a4565b9150506106ca565b5050505050505050565b610307816108ec565b606060008061078d8785610998565b90506000815167ffffffffffffffff8111156107ab576107ab610d22565b6040519080825280602002602001820160405280156107d4578160200160208202803683370190505b5090506000805b83518110156108dd5761088289888a73ffffffffffffffffffffffffffffffffffffffff16630ff4c91688868151811061081757610817611031565b60200260200101516040518263ffffffff1660e01b815260040161083d91815260200190565b6040805180830381865afa158015610859573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061087d91906111ee565b610b81565b6108cb5783818151811061089857610898611031565b60200260200101518383815181106108b2576108b2611031565b6020908102919091010152816108c7816111a4565b9250505b806108d5816111a4565b9150506107db565b50909890975095505050505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405173ffffffffffffffffffffffffffffffffffffffff8481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b604080516002808252606082810190935260009190816020015b604080516060808201835260008083526020830152918101919091528152602001906001900390816109b257905050604080516060810190915290915080600281526020017f33c4aae4b327d551cc4ea42873cd8dcaa61f5bc0f248cf0e6dd3473f9a820d6660001c815260200184604051602001610a3391815260200190565b60405160208183030381529060405281525081600081518110610a5857610a58611031565b6020908102919091018101919091526040805160608101825260008082527f023253b2241a10d36b8c9af452236123ad9f4644f2ef4963970b2c4b77c42db5828501528251908152928301825290810191909152815182906001908110610ac157610ac1611031565b60209081029190910101526040517f687485a600000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff85169063687485a690610b1e908490600401611249565b600060405180830381865afa158015610b3b573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526105079190810190610f8b565b6000610b8d8484610c70565b6000610b99858561050f565b90506000610bb4826040015183606001518460000151610cd3565b905060008160030b856000015160030b13158015610c055750610bf7827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff61131f565b60030b856000015160030b12155b905060008260030b866020015160030b13158015610c565750610c48837fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff61131f565b60030b866020015160030b12155b9050818015610c625750805b9450505050505b9392505050565b6000610c7c838361050f565b905060018161010001516002811115610c9757610c97610f5c565b14610cce576040517f9c594b6100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b505050565b600080610ce08342611346565b90506000610cee8583611359565b90508561ffff168161ffff1610610d0a57600092505050610c69565b610d1481876113a1565b61ffff169695505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051610120810167ffffffffffffffff81118282101715610d7557610d75610d22565b60405290565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715610dc257610dc2610d22565b604052919050565b60006020808385031215610ddd57600080fd5b823567ffffffffffffffff80821115610df557600080fd5b818501915085601f830112610e0957600080fd5b813581811115610e1b57610e1b610d22565b610e4b847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601610d7b565b91508082528684828501011115610e6157600080fd5b8084840185840137600090820190930192909252509392505050565b6000815180845260005b81811015610ea357602081850181015186830182015201610e87565b5060006020828601015260207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f83011685010191505092915050565b602081526000610c696020830184610e7d565b600060208284031215610f0657600080fd5b5035919050565b600060208284031215610f1f57600080fd5b813573ffffffffffffffffffffffffffffffffffffffff81168114610c6957600080fd5b600060208284031215610f5557600080fd5b5051919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60006020808385031215610f9e57600080fd5b825167ffffffffffffffff80821115610fb657600080fd5b818501915085601f830112610fca57600080fd5b815181811115610fdc57610fdc610d22565b8060051b9150610fed848301610d7b565b818152918301840191848101908884111561100757600080fd5b938501935b838510156110255784518252938501939085019061100c565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60006020828403121561107257600080fd5b81518015158114610c6957600080fd5b805163ffffffff8116811461109657600080fd5b919050565b805161ffff8116811461109657600080fd5b805160ff8116811461109657600080fd5b80516003811061109657600080fd5b600061012082840312156110e057600080fd5b6110e8610d51565b825181526110f860208401611082565b60208201526111096040840161109b565b604082015261111a6060840161109b565b60608201526080830151608082015261113560a0840161109b565b60a082015261114660c0840161109b565b60c082015261115760e084016110ad565b60e082015261010061116a8185016110be565b908201529392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036111d5576111d5611175565b5060010190565b8051600381900b811461109657600080fd5b60006040828403121561120057600080fd5b6040516040810181811067ffffffffffffffff8211171561122357611223610d22565b60405261122f836111dc565b815261123d602084016111dc565b60208201529392505050565b60006020808301818452808551808352604092508286019150828160051b8701018488016000805b84811015611310577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc08a8503018652825160608151600681106112db577f4e487b710000000000000000000000000000000000000000000000000000000085526021600452602485fd5b8652818a01518a87015290880151888601829052906112fc81870183610e7d565b978a01979550505091870191600101611271565b50919998505050505050505050565b60008260030b8260030b028060030b915080821461133f5761133f611175565b5092915050565b8181038181111561024357610243611175565b600061ffff80841680611395577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b92169190910492915050565b61ffff82811682821603908082111561133f5761133f61117556fea264697066735822122023517617fe13cf5d5d149abb620ee34e4eccb3b8434685a9c1d136db321d867b64736f6c63430008110033";

type BRKillOutOfBoundsPiecesSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BRKillOutOfBoundsPiecesSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BRKillOutOfBoundsPiecesSystem__factory extends ContractFactory {
  constructor(...args: BRKillOutOfBoundsPiecesSystemConstructorParams) {
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
  ): Promise<BRKillOutOfBoundsPiecesSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<BRKillOutOfBoundsPiecesSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): BRKillOutOfBoundsPiecesSystem {
    return super.attach(address) as BRKillOutOfBoundsPiecesSystem;
  }
  override connect(signer: Signer): BRKillOutOfBoundsPiecesSystem__factory {
    return super.connect(signer) as BRKillOutOfBoundsPiecesSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BRKillOutOfBoundsPiecesSystemInterface {
    return new utils.Interface(_abi) as BRKillOutOfBoundsPiecesSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BRKillOutOfBoundsPiecesSystem {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as BRKillOutOfBoundsPiecesSystem;
  }
}

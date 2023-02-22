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
  "0x60806040523480156200001157600080fd5b506040516200127e3803806200127e83398101604081905262000034916200022c565b818162000041336200010f565b6001600160a01b03811615620000585780620000bd565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000097573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bd91906200026b565b600080546001600160a01b03199081166001600160a01b0393841690811790925560018054909116928516928317905562000105919062000183602090811b620006f717901c565b5050505062000292565b600062000126620001ef60201b620007881760201c565b80546040519192506001600160a01b03808516929116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b7ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a8780546001600160a01b039384166001600160a01b0319918216179091557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a868054929093169116179055565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6001600160a01b03811681146200022957600080fd5b50565b600080604083850312156200024057600080fd5b82516200024d8162000213565b6020840151909250620002608162000213565b809150509250929050565b6000602082840312156200027e57600080fd5b81516200028b8162000213565b9392505050565b610fdc80620002a26000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780633e991df31461007a5780638da5cb5b1461008d578063f2fde38b146100ba575b600080fd5b61006461005f366004610c31565b6100cf565b6040516100719190610cd5565b60405180910390f35b610064610088366004610d26565b610604565b610095610636565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610071565b6100cd6100c8366004610d3f565b61067b565b005b60606000828060200190518101906100e79190610d7c565b600080549192509061012f9073ffffffffffffffffffffffffffffffffffffffff167f33c4aae4b327d551cc4ea42873cd8dcaa61f5bc0f248cf0e6dd3473f9a820d666107ac565b60008054919250906101779073ffffffffffffffffffffffffffffffffffffffff167f3e4e98a8b24cd1e4f79528ef3f1cf7edfe0dbe0043563a44641446b8716086b46107ac565b60008054919250906101bf9073ffffffffffffffffffffffffffffffffffffffff167fc4351b56c4cd08a217ed0cd7583fb7b8c9b1bf5e79db10cb324b32a4fe5416ff6108fc565b60008054919250906102079073ffffffffffffffffffffffffffffffffffffffff167f023253b2241a10d36b8c9af452236123ad9f4644f2ef4963970b2c4b77c42db56107ac565b600080549192509061024f9073ffffffffffffffffffffffffffffffffffffffff167f52421b68e3cf0b4ddf63c1e76add9d0e18a22b2144367451769083243b41d1c36107ac565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810188905290915060009073ffffffffffffffffffffffffffffffffffffffff871690630ff4c91690602401602060405180830381865afa1580156102c0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102e49190610d7c565b6040517f14b63f5700000000000000000000000000000000000000000000000000000000815290915073ffffffffffffffffffffffffffffffffffffffff8516906314b63f579061033e908a908590600090600401610d95565b6000604051808303816000875af115801561035d573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526103a39190810190610de8565b506040517f4cc822150000000000000000000000000000000000000000000000000000000081526004810188905273ffffffffffffffffffffffffffffffffffffffff871690634cc8221590602401600060405180830381600087803b15801561040c57600080fd5b505af1158015610420573d6000803e3d6000fd5b50506040517f4cc82215000000000000000000000000000000000000000000000000000000008152600481018a905273ffffffffffffffffffffffffffffffffffffffff88169250634cc822159150602401600060405180830381600087803b15801561048c57600080fd5b505af11580156104a0573d6000803e3d6000fd5b505050506104b083838984610935565b600080546104f49073ffffffffffffffffffffffffffffffffffffffff167f66187145093415ec582e1f831f4ab9cd5c382f164a9f3593d2defc665e76007d6108fc565b6040517f6318c82d000000000000000000000000000000000000000000000000000000008152600481018a905290915073ffffffffffffffffffffffffffffffffffffffff861690636318c82d90602401600060405180830381600087803b15801561055f57600080fd5b505af1158015610573573d6000803e3d6000fd5b50506040517f6318c82d000000000000000000000000000000000000000000000000000000008152600481018b905273ffffffffffffffffffffffffffffffffffffffff84169250636318c82d9150602401600060405180830381600087803b1580156105df57600080fd5b505af11580156105f3573d6000803e3d6000fd5b505050505050505050505050919050565b60606106308260405160200161061c91815260200190565b6040516020818303038152906040526100cf565b92915050565b60006106767f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1633146106eb576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6106f481610abd565b50565b7ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805473ffffffffffffffffffffffffffffffffffffffff9384167fffffffffffffffffffffffff0000000000000000000000000000000000000000918216179091557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a868054929093169116179055565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa15801561081c573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526108629190810190610e5f565b905080516000036108d3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f742072656769737465726564000000000000000000000000000000604482015260640160405180910390fd5b6108f4816000815181106108e9576108e9610f05565b602002602001015190565b949350505050565b600080610929847f017c816a964927a00e050edd780dcf113ca2756dfa9e9fda94a05c140d9317b06107ac565b90506108f481846107ac565b6040517f0ff4c91600000000000000000000000000000000000000000000000000000000815260048101839052600090610a339073ffffffffffffffffffffffffffffffffffffffff871690630ff4c916906024016040805180830381865afa1580156109a6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109ca9190610f4b565b80516020918201516040805160e093841b818601529190921b6024820152602881018690527f52421b68e3cf0b4ddf63c1e76add9d0e18a22b2144367451769083243b41d1c3604880830191909152825180830390910181526068909101909152805191012090565b6040517f4cc822150000000000000000000000000000000000000000000000000000000081526004810182905290915073ffffffffffffffffffffffffffffffffffffffff851690634cc8221590602401600060405180830381600087803b158015610a9e57600080fd5b505af1158015610ab2573d6000803e3d6000fd5b505050505050505050565b6106f4817f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405173ffffffffffffffffffffffffffffffffffffffff8481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715610be357610be3610b6d565b604052919050565b600067ffffffffffffffff821115610c0557610c05610b6d565b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01660200190565b600060208284031215610c4357600080fd5b813567ffffffffffffffff811115610c5a57600080fd5b8201601f81018413610c6b57600080fd5b8035610c7e610c7982610beb565b610b9c565b818152856020838501011115610c9357600080fd5b81602084016020830137600091810160200191909152949350505050565b60005b83811015610ccc578181015183820152602001610cb4565b50506000910152565b6020815260008251806020840152610cf4816040850160208701610cb1565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160400192915050565b600060208284031215610d3857600080fd5b5035919050565b600060208284031215610d5157600080fd5b813573ffffffffffffffffffffffffffffffffffffffff81168114610d7557600080fd5b9392505050565b600060208284031215610d8e57600080fd5b5051919050565b838152602081018390526060810160068310610dda577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b826040830152949350505050565b600060208284031215610dfa57600080fd5b815167ffffffffffffffff811115610e1157600080fd5b8201601f81018413610e2257600080fd5b8051610e30610c7982610beb565b818152856020838501011115610e4557600080fd5b610e56826020830160208601610cb1565b95945050505050565b60006020808385031215610e7257600080fd5b825167ffffffffffffffff80821115610e8a57600080fd5b818501915085601f830112610e9e57600080fd5b815181811115610eb057610eb0610b6d565b8060051b9150610ec1848301610b9c565b8181529183018401918481019088841115610edb57600080fd5b938501935b83851015610ef957845182529385019390850190610ee0565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b8051600381900b8114610f4657600080fd5b919050565b600060408284031215610f5d57600080fd5b6040516040810181811067ffffffffffffffff82111715610f8057610f80610b6d565b604052610f8c83610f34565b8152610f9a60208401610f34565b6020820152939250505056fea264697066735822122018b6ade5d90319542b7f025cc3f109e08d267044527549c144553c592793b17164736f6c63430008110033";

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

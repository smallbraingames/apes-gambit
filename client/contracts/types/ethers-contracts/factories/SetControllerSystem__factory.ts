/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  SetControllerSystem,
  SetControllerSystemInterface,
} from "../SetControllerSystem";

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
    name: "AlreadyHasController",
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
        name: "entity",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "controllers",
        type: "address[]",
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
  "0x60806040523480156200001157600080fd5b506040516200120e3803806200120e83398101604081905262000034916200022c565b818162000041336200010f565b6001600160a01b03811615620000585780620000bd565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000097573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bd91906200026b565b600080546001600160a01b03199081166001600160a01b0393841690811790925560018054909116928516928317905562000105919062000183602090811b620003d217901c565b5050505062000292565b600062000126620001ef60201b620004631760201c565b80546040519192506001600160a01b03808516929116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b7ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a8780546001600160a01b039384166001600160a01b0319918216179091557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a868054929093169116179055565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6001600160a01b03811681146200022957600080fd5b50565b600080604083850312156200024057600080fd5b82516200024d8162000213565b6020840151909250620002608162000213565b809150509250929050565b6000602082840312156200027e57600080fd5b81516200028b8162000213565b9392505050565b610f6c80620002a26000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780638da5cb5b1461007a578063d6f6d8b3146100a7578063f2fde38b146100ba575b600080fd5b61006461005f366004610a6f565b6100cf565b6040516100719190610b22565b60405180910390f35b6100826102dc565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610071565b6100646100b5366004610bd4565b610321565b6100cd6100c8366004610c7f565b610356565b005b6060600080838060200190518101906100e89190610c9c565b60008054929450909250906101339073ffffffffffffffffffffffffffffffffffffffff167f3aa78a206fc67ba4c2dbdbfa4f9637a0b391d7db261dacc2eb5d96f7b5693d97610487565b600080549192509061017b9073ffffffffffffffffffffffffffffffffffffffff167f1f26ebf637805df90fe5cf9a282dd66905185d55ff65696a9171e1a656152d39610487565b90506101888285336105d7565b610192818561061d565b6000835167ffffffffffffffff8111156101ae576101ae6109f1565b6040519080825280602002602001820160405280156101d7578160200160208202803683370190505b50905060005b845181101561024b5761021c8582815181106101fb576101fb610d33565b602002602001015173ffffffffffffffffffffffffffffffffffffffff1690565b82828151811061022e5761022e610d33565b60209081029190910101528061024381610d62565b9150506101dd565b506040517f946aadc600000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff83169063946aadc6906102a09088908590600401610dc1565b600060405180830381600087803b1580156102ba57600080fd5b505af11580156102ce573d6000803e3d6000fd5b505050505050505050919050565b600061031c7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b606061034d8383604051602001610339929190610e0f565b6040516020818303038152906040526100cf565b90505b92915050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1633146103c6576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6103cf81610665565b50565b7ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805473ffffffffffffffffffffffffffffffffffffffff9384167fffffffffffffffffffffffff0000000000000000000000000000000000000000918216179091557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a868054929093169116179055565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa1580156104f7573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405261053d9190810190610e66565b905080516000036105ae576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f742072656769737465726564000000000000000000000000000000604482015260640160405180910390fd5b6105cf816000815181106105c4576105c4610d33565b602002602001015190565b949350505050565b6105e283838361066e565b610618576040517f30cd747100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b505050565b600061062983836107ea565b1115610661576040517f1c6ceb3900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5050565b6103cf81610945565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810183905260009073ffffffffffffffffffffffffffffffffffffffff85169063cccf7a8e90602401602060405180830381865afa1580156106dc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107009190610ef7565b61070c575060006107e3565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810184905260009073ffffffffffffffffffffffffffffffffffffffff861690630ff4c91690602401602060405180830381865afa15801561077a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061079e9190610f19565b90508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146107dd5760009150506107e3565b60019150505b9392505050565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905260009073ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa158015610858573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061087c9190610ef7565b61088857506000610350565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905260009073ffffffffffffffffffffffffffffffffffffffff851690630ff4c91690602401600060405180830381865afa1580156108f6573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405261093c9190810190610e66565b51949350505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405173ffffffffffffffffffffffffffffffffffffffff8481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715610a6757610a676109f1565b604052919050565b60006020808385031215610a8257600080fd5b823567ffffffffffffffff80821115610a9a57600080fd5b818501915085601f830112610aae57600080fd5b813581811115610ac057610ac06109f1565b610af0847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601610a20565b91508082528684828501011115610b0657600080fd5b8084840185840137600090820190930192909252509392505050565b600060208083528351808285015260005b81811015610b4f57858101830151858201604001528201610b33565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b600067ffffffffffffffff821115610ba857610ba86109f1565b5060051b60200190565b73ffffffffffffffffffffffffffffffffffffffff811681146103cf57600080fd5b60008060408385031215610be757600080fd5b8235915060208084013567ffffffffffffffff811115610c0657600080fd5b8401601f81018613610c1757600080fd5b8035610c2a610c2582610b8e565b610a20565b81815260059190911b82018301908381019088831115610c4957600080fd5b928401925b82841015610c70578335610c6181610bb2565b82529284019290840190610c4e565b80955050505050509250929050565b600060208284031215610c9157600080fd5b81356107e381610bb2565b60008060408385031215610caf57600080fd5b8251915060208084015167ffffffffffffffff811115610cce57600080fd5b8401601f81018613610cdf57600080fd5b8051610ced610c2582610b8e565b81815260059190911b82018301908381019088831115610d0c57600080fd5b928401925b82841015610c70578351610d2481610bb2565b82529284019290840190610d11565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610dba577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b5060010190565b6000604082018483526020604081850152818551808452606086019150828701935060005b81811015610e0257845183529383019391830191600101610de6565b5090979650505050505050565b6000604082018483526020604081850152818551808452606086019150828701935060005b81811015610e0257845173ffffffffffffffffffffffffffffffffffffffff1683529383019391830191600101610e34565b60006020808385031215610e7957600080fd5b825167ffffffffffffffff811115610e9057600080fd5b8301601f81018513610ea157600080fd5b8051610eaf610c2582610b8e565b81815260059190911b82018301908381019087831115610ece57600080fd5b928401925b82841015610eec57835182529284019290840190610ed3565b979650505050505050565b600060208284031215610f0957600080fd5b815180151581146107e357600080fd5b600060208284031215610f2b57600080fd5b81516107e381610bb256fea2646970667358221220298f633c50615e2b3080103f9dd3dfd5e2638d27806198e578621aed22880b8f64736f6c63430008110033";

type SetControllerSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SetControllerSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SetControllerSystem__factory extends ContractFactory {
  constructor(...args: SetControllerSystemConstructorParams) {
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
  ): Promise<SetControllerSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<SetControllerSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): SetControllerSystem {
    return super.attach(address) as SetControllerSystem;
  }
  override connect(signer: Signer): SetControllerSystem__factory {
    return super.connect(signer) as SetControllerSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SetControllerSystemInterface {
    return new utils.Interface(_abi) as SetControllerSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SetControllerSystem {
    return new Contract(address, _abi, signerOrProvider) as SetControllerSystem;
  }
}

/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { LibQuery, LibQueryInterface } from "../LibQuery";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "array",
        type: "uint256[]",
      },
    ],
    name: "arrayToList",
    outputs: [
      {
        internalType: "LinkedList",
        name: "list",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "LinkedList",
        name: "list",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "length",
        type: "uint256",
      },
    ],
    name: "listToArray",
    outputs: [
      {
        internalType: "uint256[]",
        name: "array",
        type: "uint256[]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

const _bytecode =
  "0x61047f61003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100405760003560e01c80635c35f12f14610045578063e87f3be91461006e575b600080fd5b61005861005336600461024a565b61008f565b604051610065919061026c565b60405180910390f35b61008161007c3660046102df565b610168565b604051908152602001610065565b60608167ffffffffffffffff8111156100aa576100aa6102b0565b6040519080825280602002602001820160405280156100d3578160200160208202803683370190505b509050811561016257600169ffffffffffffffffffff606085901c1660005b821561015e5760006101168360408051808201909152600080825260208201525090565b9050806000015185838151811061012f5761012f6103bb565b602090810291909101015281610144816103ea565b60b089901c949094015180151595509392506100f2915050565b5050505b92915050565b76200000000000000000000000000000000000000000000060005b82518110156101df576101cb6101c460405180604001604052808685815181106101af576101af6103bb565b60200260200101518152602001600081525090565b83906101e5565b9150806101d7816103ea565b915050610183565b50919050565b6000808360501b60b01c116001811461020a578260101b8360601b8517179150610243565b828460b01c8560a01b60b01c01528260101b7fffffffffffffffffffffffffffffffffffffffff00000000000000000000000085161791505b5092915050565b6000806040838503121561025d57600080fd5b50508035926020909101359150565b6020808252825182820181905260009190848201906040850190845b818110156102a457835183529284019291840191600101610288565b50909695505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600060208083850312156102f257600080fd5b823567ffffffffffffffff8082111561030a57600080fd5b818501915085601f83011261031e57600080fd5b813581811115610330576103306102b0565b8060051b6040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0603f83011681018181108582111715610373576103736102b0565b60405291825284820192508381018501918883111561039157600080fd5b938501935b828510156103af57843584529385019392850192610396565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610442577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b506001019056fea2646970667358221220d45b1c87b5a757481d5f5cba1e2ddc37d71e285716bf38cb565eadae74ef3a4564736f6c63430008110033";

type LibQueryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LibQueryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LibQuery__factory extends ContractFactory {
  constructor(...args: LibQueryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<LibQuery> {
    return super.deploy(overrides || {}) as Promise<LibQuery>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): LibQuery {
    return super.attach(address) as LibQuery;
  }
  override connect(signer: Signer): LibQuery__factory {
    return super.connect(signer) as LibQuery__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LibQueryInterface {
    return new utils.Interface(_abi) as LibQueryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LibQuery {
    return new Contract(address, _abi, signerOrProvider) as LibQuery;
  }
}

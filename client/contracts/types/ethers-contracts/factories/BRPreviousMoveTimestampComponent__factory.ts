/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  BRPreviousMoveTimestampComponent,
  BRPreviousMoveTimestampComponentInterface,
} from "../BRPreviousMoveTimestampComponent";

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
        name: "value",
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
        name: "value",
        type: "uint256",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
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
        name: "indexer",
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
        internalType: "uint256",
        name: "value",
        type: "uint256",
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
        name: "newOwner",
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
        name: "",
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
  "0x60806040523480156200001157600080fd5b5060405162002a5938038062002a59833981016040819052620000349162000232565b600180546001600160a01b0319163390811782556000908152600260205260409020805460ff191690911790557f6f6c09948e327abfd3c44b7965920048be367af522273db94a5172d20538b9ac60048190558190818181816001600160a01b03821615620000a857620000a8826200014e565b5050604051620000b89062000216565b604051809103906000f080158015620000d5573d6000803e3d6000fd5b50600580546001600160a01b0319166001600160a01b0392909216919091179055604051620001049062000224565b604051809103906000f08015801562000121573d6000803e3d6000fd5b50600680546001600160a01b0319166001600160a01b039290921691909117905550620002649350505050565b6001546001600160a01b031633146200019a5760405162461bcd60e51b815260206004820152600a60248201526927a7262cafa7aba722a960b11b604482015260640160405180910390fd5b600080546001600160a01b0319166001600160a01b03831690811790915560048054604051630f30347760e41b81523092810192909252602482015263f303477090604401600060405180830381600087803b158015620001fa57600080fd5b505af11580156200020f573d6000803e3d6000fd5b5050505050565b6105bb8062001e9c83390190565b610602806200245783390190565b6000602082840312156200024557600080fd5b81516001600160a01b03811681146200025d57600080fd5b9392505050565b611c2880620002746000396000f3fe608060405234801561001057600080fd5b50600436106101515760003560e01c80638b282947116100cd578063b8bc073d11610081578063cccf7a8e11610066578063cccf7a8e14610300578063f2fde38b14610313578063fbdfa1ea1461032657600080fd5b8063b8bc073d146102cd578063bf4fe57e146102ed57600080fd5b80639d2c76b4116100b25780639d2c76b41461029e578063af640d0f146102b1578063b361be46146102ba57600080fd5b80638b2829471461026d5780638da5cb5b1461028057600080fd5b80634cc82215116101245780636b122fe0116101095780636b122fe01461021157806375c0669c14610227578063861eb9051461023a57600080fd5b80634cc82215146101eb5780634fef6a38146101fe57600080fd5b80630ff4c916146101565780631ab06ee51461017c57806330b67baa1461019157806331b933b9146101d6575b600080fd5b610169610164366004611448565b610339565b6040519081526020015b60405180910390f35b61018f61018a366004611461565b61035f565b005b6000546101b19073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610173565b6101de61038e565b6040516101739190611483565b61018f6101f9366004611448565b610449565b61018f61020c3660046114c7565b6104d3565b6102196105a3565b604051610173929190611590565b61018f6102353660046114c7565b61068f565b61025d6102483660046114c7565b60026020526000908152604090205460ff1681565b6040519015158152602001610173565b61018f61027b36600461178c565b61077f565b60015473ffffffffffffffffffffffffffffffffffffffff166101b1565b61018f6102ac3660046114c7565b610802565b61016960045481565b6101de6102c83660046117d3565b61093c565b6102e06102db366004611448565b610a00565b6040516101739190611810565b61018f6102fb3660046114c7565b610aa2565b61025d61030e366004611448565b610b6f565b61018f6103213660046114c7565b610c03565b6101de610334366004611448565b610d59565b60008061034583610a00565b8060200190518101906103589190611823565b9392505050565b61038a828260405160200161037691815260200190565b60405160208183030381529060405261077f565b5050565b600554604080517f410d59cc000000000000000000000000000000000000000000000000000000008152905160609273ffffffffffffffffffffffffffffffffffffffff169163410d59cc9160048083019260009291908290030181865afa1580156103fe573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052610444919081019061183c565b905090565b3360009081526002602052604090205460ff166104c7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600b60248201527f4f4e4c595f57524954455200000000000000000000000000000000000000000060448201526064015b60405180910390fd5b6104d081610d85565b50565b60015473ffffffffffffffffffffffffffffffffffffffff163314610554576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f4f4e4c595f4f574e45520000000000000000000000000000000000000000000060448201526064016104be565b73ffffffffffffffffffffffffffffffffffffffff16600090815260026020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001179055565b604080516001808252818301909252606091829190816020015b60608152602001906001900390816105bd575050604080516001808252818301909252919350602080830190803683370190505090506040518060400160405280600581526020017f76616c75650000000000000000000000000000000000000000000000000000008152508260008151811061063c5761063c6118e2565b6020026020010181905250600d8160008151811061065c5761065c6118e2565b6020026020010190602181111561067557610675611561565b9081602181111561068857610688611561565b9052509091565b3360009081526002602052604090205460ff16610708576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600b60248201527f4f4e4c595f57524954455200000000000000000000000000000000000000000060448201526064016104be565b600780546001810182556000919091527fa66cc928b5edb82af9bd49922954155ab7b0942694bea4ce44661d9a8736c6880180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b3360009081526002602052604090205460ff166107f8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600b60248201527f4f4e4c595f57524954455200000000000000000000000000000000000000000060448201526064016104be565b61038a8282611044565b60015473ffffffffffffffffffffffffffffffffffffffff163314610883576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f4f4e4c595f4f574e45520000000000000000000000000000000000000000000060448201526064016104be565b600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff8316908117909155600480546040517ff30347700000000000000000000000000000000000000000000000000000000081523092810192909252602482015263f3034770906044015b600060405180830381600087803b15801561092157600080fd5b505af1158015610935573d6000803e3d6000fd5b5050505050565b600654815160208301206040517f796c5e94000000000000000000000000000000000000000000000000000000008152600481019190915260609173ffffffffffffffffffffffffffffffffffffffff169063796c5e9490602401600060405180830381865afa1580156109b4573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526109fa919081019061183c565b92915050565b6000818152600360205260409020805460609190610a1d90611911565b80601f0160208091040260200160405190810160405280929190818152602001828054610a4990611911565b8015610a965780601f10610a6b57610100808354040283529160200191610a96565b820191906000526020600020905b815481529060010190602001808311610a7957829003601f168201915b50505050509050919050565b60015473ffffffffffffffffffffffffffffffffffffffff163314610b23576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f4f4e4c595f4f574e45520000000000000000000000000000000000000000000060448201526064016104be565b73ffffffffffffffffffffffffffffffffffffffff16600090815260026020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00169055565b6005546040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810183905260009173ffffffffffffffffffffffffffffffffffffffff169063cccf7a8e90602401602060405180830381865afa158015610bdf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109fa9190611964565b60015473ffffffffffffffffffffffffffffffffffffffff163314610c84576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f4f4e4c595f4f574e45520000000000000000000000000000000000000000000060448201526064016104be565b60015460405173ffffffffffffffffffffffffffffffffffffffff8084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a33360009081526002602052604080822080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00908116909155600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff959095169485178155938352912080549091169091179055565b60606109fa82604051602001610d7191815260200190565b60405160208183030381529060405261093c565b60065460008281526003602052604090819020905173ffffffffffffffffffffffffffffffffffffffff909216916385edea1391610dc291611986565b60405190819003812060e083901b7fffffffff000000000000000000000000000000000000000000000000000000001682526004820152602401602060405180830381865afa158015610e19573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e3d9190611823565b600003610e475750565b60065460008281526003602052604090819020905173ffffffffffffffffffffffffffffffffffffffff90921691636526db7a91610e8491611986565b60405190819003812060e083901b7fffffffff00000000000000000000000000000000000000000000000000000000168252600482015260248101849052604401600060405180830381600087803b158015610edf57600080fd5b505af1158015610ef3573d6000803e3d6000fd5b50506005546040517f4cc822150000000000000000000000000000000000000000000000000000000081526004810185905273ffffffffffffffffffffffffffffffffffffffff9091169250634cc822159150602401600060405180830381600087803b158015610f6357600080fd5b505af1158015610f77573d6000803e3d6000fd5b50505050610f84816112e5565b60005b60075481101561038a5760078181548110610fa457610fa46118e2565b6000918252602090912001546040517f4cc822150000000000000000000000000000000000000000000000000000000081526004810184905273ffffffffffffffffffffffffffffffffffffffff90911690634cc8221590602401600060405180830381600087803b15801561101957600080fd5b505af115801561102d573d6000803e3d6000fd5b50505050808061103c90611a1a565b915050610f87565b6005546040517f1003e2d20000000000000000000000000000000000000000000000000000000081526004810184905273ffffffffffffffffffffffffffffffffffffffff90911690631003e2d290602401600060405180830381600087803b1580156110b057600080fd5b505af11580156110c4573d6000803e3d6000fd5b505060065460008581526003602052604090819020905173ffffffffffffffffffffffffffffffffffffffff9092169350636526db7a925061110591611986565b60405190819003812060e083901b7fffffffff00000000000000000000000000000000000000000000000000000000168252600482015260248101859052604401600060405180830381600087803b15801561116057600080fd5b505af1158015611174573d6000803e3d6000fd5b5050600654835160208501206040517f771602f700000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff909216935063771602f792506111de918690600401918252602082015260400190565b600060405180830381600087803b1580156111f857600080fd5b505af115801561120c573d6000803e3d6000fd5b5050505061121a8282611353565b60005b6007548110156112e0576007818154811061123a5761123a6118e2565b6000918252602090912001546040517f0216b83800000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff90911690630216b8389061129b9086908690600401611a79565b600060405180830381600087803b1580156112b557600080fd5b505af11580156112c9573d6000803e3d6000fd5b5050505080806112d890611a1a565b91505061121d565b505050565b60008181526003602052604081206112fc916113fa565b6000546040517f0de3b7b50000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff90911690630de3b7b590602401610907565b600082815260036020526040902061136b8282611ad8565b506000546040517fcfd3c57f00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff9091169063cfd3c57f906113c49085908590600401611a79565b600060405180830381600087803b1580156113de57600080fd5b505af11580156113f2573d6000803e3d6000fd5b505050505050565b50805461140690611911565b6000825580601f10611416575050565b601f0160209004906000526020600020908101906104d091905b808211156114445760008155600101611430565b5090565b60006020828403121561145a57600080fd5b5035919050565b6000806040838503121561147457600080fd5b50508035926020909101359150565b6020808252825182820181905260009190848201906040850190845b818110156114bb5783518352928401929184019160010161149f565b50909695505050505050565b6000602082840312156114d957600080fd5b813573ffffffffffffffffffffffffffffffffffffffff8116811461035857600080fd5b6000815180845260005b8181101561152357602081850181015186830182015201611507565b5060006020828601015260207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f83011685010191505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b6000604082016040835280855180835260608501915060608160051b8601019250602080880160005b83811015611605577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa08887030185526115f38683516114fd565b955093820193908201906001016115b9565b50508584038187015286518085528782019482019350915060005b8281101561167357845160228110611661577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b84529381019392810192600101611620565b5091979650505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff811182821017156116f6576116f6611680565b604052919050565b600082601f83011261170f57600080fd5b813567ffffffffffffffff81111561172957611729611680565b61175a60207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116016116af565b81815284602083860101111561176f57600080fd5b816020850160208301376000918101602001919091529392505050565b6000806040838503121561179f57600080fd5b82359150602083013567ffffffffffffffff8111156117bd57600080fd5b6117c9858286016116fe565b9150509250929050565b6000602082840312156117e557600080fd5b813567ffffffffffffffff8111156117fc57600080fd5b611808848285016116fe565b949350505050565b60208152600061035860208301846114fd565b60006020828403121561183557600080fd5b5051919050565b6000602080838503121561184f57600080fd5b825167ffffffffffffffff8082111561186757600080fd5b818501915085601f83011261187b57600080fd5b81518181111561188d5761188d611680565b8060051b915061189e8483016116af565b81815291830184019184810190888411156118b857600080fd5b938501935b838510156118d6578451825293850193908501906118bd565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600181811c9082168061192557607f821691505b60208210810361195e577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b60006020828403121561197657600080fd5b8151801515811461035857600080fd5b600080835461199481611911565b600182811680156119ac57600181146119df57611a0e565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0084168752821515830287019450611a0e565b8760005260208060002060005b85811015611a055781548a8201529084019082016119ec565b50505082870194505b50929695505050505050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611a72577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b5060010190565b82815260406020820152600061180860408301846114fd565b601f8211156112e057600081815260208120601f850160051c81016020861015611ab95750805b601f850160051c820191505b818110156113f257828155600101611ac5565b815167ffffffffffffffff811115611af257611af2611680565b611b0681611b008454611911565b84611a92565b602080601f831160018114611b595760008415611b235750858301515b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600386901b1c1916600185901b1785556113f2565b6000858152602081207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08616915b82811015611ba657888601518255948401946001909101908401611b87565b5085821015611be257878501517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600388901b60f8161c191681555b5050505050600190811b0190555056fea2646970667358221220c5489b33d1863c9099c7ae5bee36e78d11814db52009880c513e74b460fa4d3664736f6c63430008110033608060405234801561001057600080fd5b50600080546001600160a01b03191633179055610589806100326000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c80638e7cb6e1116100505780638e7cb6e1146100bd578063949d225d146100e7578063cccf7a8e146100f857600080fd5b80631003e2d214610077578063410d59cc1461008c5780634cc82215146100aa575b600080fd5b61008a610085366004610458565b61011b565b005b6100946101f5565b6040516100a19190610471565b60405180910390f35b61008a6100b8366004610458565b61024d565b6100d06100cb366004610458565b6103c1565b6040805192151583526020830191909152016100a1565b6001546040519081526020016100a1565b61010b610106366004610458565b6103f2565b60405190151581526020016100a1565b60005473ffffffffffffffffffffffffffffffffffffffff1633146101a1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f4f4e4c595f4f574e45520000000000000000000000000000000000000000000060448201526064015b60405180910390fd5b6101aa816103f2565b6101f2576001805460008381526002602052604081208290558183018355919091527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6018190555b50565b6060600180548060200260200160405190810160405280929190818152602001828054801561024357602002820191906000526020600020905b81548152602001906001019080831161022f575b5050505050905090565b60005473ffffffffffffffffffffffffffffffffffffffff1633146102ce576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f4f4e4c595f4f574e4552000000000000000000000000000000000000000000006044820152606401610198565b6102d7816103f2565b156101f257600180546102eb9082906104b5565b815481106102fb576102fb6104f5565b9060005260206000200154600160026000848152602001908152602001600020548154811061032c5761032c6104f5565b60009182526020808320909101929092558281526002918290526040812054600180549193929184908110610363576103636104f5565b9060005260206000200154815260200190815260200160002081905550600260008281526020019081526020016000206000905560018054806103a8576103a8610524565b6001900381819060005260206000200160009055905550565b6000806103cd836103f2565b6103dc57506000928392509050565b5050600090815260026020526040902054600191565b600154600090810361040657506000919050565b600082815260026020526040812054900361044357816001600081548110610430576104306104f5565b9060005260206000200154149050919050565b50600090815260026020526040902054151590565b60006020828403121561046a57600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156104a95783518352928401929184019160010161048d565b50909695505050505050565b818103818111156104ef577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fdfea2646970667358221220b5b456212a11997ccd601470c77cc96a71f468957b5522e79a3a9c1efe5555c064736f6c63430008110033608060405234801561001057600080fd5b50600080546001600160a01b031916331790556105d0806100326000396000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c8063796c5e9411610050578063796c5e941461009457806385edea13146100bd578063a0265ff8146100eb57600080fd5b80636526db7a1461006c578063771602f714610081575b600080fd5b61007f61007a366004610483565b61010e565b005b61007f61008f366004610483565b6102c6565b6100a76100a23660046104a5565b61038e565b6040516100b491906104be565b60405180910390f35b6100dd6100cb3660046104a5565b60009081526001602052604090205490565b6040519081526020016100b4565b6100fe6100f9366004610483565b6103f0565b60405190151581526020016100b4565b60005473ffffffffffffffffffffffffffffffffffffffff163314610194576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f4f4e4c595f4f574e45520000000000000000000000000000000000000000000060448201526064015b60405180910390fd5b61019e82826103f0565b156102c2576000828152600160208190526040909120805490916101c191610502565b815481106101d1576101d161053c565b600091825260208083209091015484835260018252604080842060028452818520868652909352909220548154811061020c5761020c61053c565b6000918252602080832090910192909255838152600282526040808220848352808452818320548684526001855291832085845293819052835491939092918490811061025b5761025b61053c565b60009182526020808320909101548352828101939093526040918201812093909355848352600282528083208484528252808320839055848352600190915290208054806102ab576102ab61056b565b600190038181906000526020600020016000905590555b5050565b60005473ffffffffffffffffffffffffffffffffffffffff163314610347576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f4f4e4c595f4f574e455200000000000000000000000000000000000000000000604482015260640161018b565b61035182826103f0565b6102c25760009182526001602081815260408085208054600284528287208688528452918620829055838352928101835591845290922090910155565b6000818152600160209081526040918290208054835181840281018401909452808452606093928301828280156103e457602002820191906000526020600020905b8154815260200190600101908083116103d0575b50505050509050919050565b600082815260016020526040812054810361040d5750600061047d565b6000838152600260209081526040808320858452909152812054900361045f576000838152600160205260408120805484929061044c5761044c61053c565b906000526020600020015414905061047d565b50600082815260026020908152604080832084845290915290205415155b92915050565b6000806040838503121561049657600080fd5b50508035926020909101359150565b6000602082840312156104b757600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156104f6578351835292840192918401916001016104da565b50909695505050505050565b8181038181111561047d577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fdfea2646970667358221220684c9604d505135bc2456dd0f73243ed1e0045e69d943e1775bb4ed31337e5f264736f6c63430008110033";

type BRPreviousMoveTimestampComponentConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BRPreviousMoveTimestampComponentConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BRPreviousMoveTimestampComponent__factory extends ContractFactory {
  constructor(...args: BRPreviousMoveTimestampComponentConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    world: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<BRPreviousMoveTimestampComponent> {
    return super.deploy(
      world,
      overrides || {}
    ) as Promise<BRPreviousMoveTimestampComponent>;
  }
  override getDeployTransaction(
    world: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(world, overrides || {});
  }
  override attach(address: string): BRPreviousMoveTimestampComponent {
    return super.attach(address) as BRPreviousMoveTimestampComponent;
  }
  override connect(signer: Signer): BRPreviousMoveTimestampComponent__factory {
    return super.connect(signer) as BRPreviousMoveTimestampComponent__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BRPreviousMoveTimestampComponentInterface {
    return new utils.Interface(
      _abi
    ) as BRPreviousMoveTimestampComponentInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BRPreviousMoveTimestampComponent {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as BRPreviousMoveTimestampComponent;
  }
}

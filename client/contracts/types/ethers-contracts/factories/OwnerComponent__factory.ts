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
        internalType: "address",
        name: "value",
        type: "address",
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
  "0x60806040523480156200001157600080fd5b5060405162002aad38038062002aad833981016040819052620000349162000232565b600180546001600160a01b0319163390811782556000908152600260205260409020805460ff191690911790557f3aa78a206fc67ba4c2dbdbfa4f9637a0b391d7db261dacc2eb5d96f7b5693d9760048190558190818181816001600160a01b03821615620000a857620000a8826200014e565b5050604051620000b89062000216565b604051809103906000f080158015620000d5573d6000803e3d6000fd5b50600580546001600160a01b0319166001600160a01b0392909216919091179055604051620001049062000224565b604051809103906000f08015801562000121573d6000803e3d6000fd5b50600680546001600160a01b0319166001600160a01b039290921691909117905550620002649350505050565b6001546001600160a01b031633146200019a5760405162461bcd60e51b815260206004820152600a60248201526927a7262cafa7aba722a960b11b604482015260640160405180910390fd5b600080546001600160a01b0319166001600160a01b03831690811790915560048054604051630f30347760e41b81523092810192909252602482015263f303477090604401600060405180830381600087803b158015620001fa57600080fd5b505af11580156200020f573d6000803e3d6000fd5b5050505050565b6105bb8062001ef083390190565b61060280620024ab83390190565b6000602082840312156200024557600080fd5b81516001600160a01b03811681146200025d57600080fd5b9392505050565b611c7c80620002746000396000f3fe608060405234801561001057600080fd5b50600436106101515760003560e01c8063861eb905116100cd578063b361be4611610081578063bf4fe57e11610066578063bf4fe57e14610300578063cccf7a8e14610313578063f2fde38b1461032657600080fd5b8063b361be46146102cd578063b8bc073d146102e057600080fd5b80638da5cb5b116100b25780638da5cb5b146102855780639d2c76b4146102a3578063af640d0f146102b657600080fd5b8063861eb9051461023f5780638b2829471461027257600080fd5b80633e1b5e0d116101245780634fef6a38116101095780634fef6a38146102035780636b122fe01461021657806375c0669c1461022c57600080fd5b80633e1b5e0d146101dd5780634cc82215146101f057600080fd5b80630ff4c916146101565780632f30c6f61461019357806330b67baa146101a857806331b933b9146101c8575b600080fd5b610169610164366004611468565b610339565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020015b60405180910390f35b6101a66101a13660046114a3565b61035f565b005b6000546101699073ffffffffffffffffffffffffffffffffffffffff1681565b6101d061039e565b60405161018a91906114d3565b6101d06101eb366004611517565b610459565b6101a66101fe366004611468565b61049b565b6101a6610211366004611517565b610525565b61021e6105f5565b60405161018a9291906115c7565b6101a661023a366004611517565b6106e1565b61026261024d366004611517565b60026020526000908152604090205460ff1681565b604051901515815260200161018a565b6101a66102803660046117c3565b6107d1565b60015473ffffffffffffffffffffffffffffffffffffffff16610169565b6101a66102b1366004611517565b610854565b6102bf60045481565b60405190815260200161018a565b6101d06102db36600461180a565b61098e565b6102f36102ee366004611468565b610a4c565b60405161018a9190611847565b6101a661030e366004611517565b610aee565b610262610321366004611468565b610bbb565b6101a6610334366004611517565b610c4f565b60008061034583610a4c565b806020019051810190610358919061185a565b9392505050565b6040805173ffffffffffffffffffffffffffffffffffffffff8316602082015261039a918491016040516020818303038152906040526107d1565b5050565b600554604080517f410d59cc000000000000000000000000000000000000000000000000000000008152905160609273ffffffffffffffffffffffffffffffffffffffff169163410d59cc9160048083019260009291908290030181865afa15801561040e573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526104549190810190611877565b905090565b6040805173ffffffffffffffffffffffffffffffffffffffff83166020820152606091610495910160405160208183030381529060405261098e565b92915050565b3360009081526002602052604090205460ff16610519576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600b60248201527f4f4e4c595f57524954455200000000000000000000000000000000000000000060448201526064015b60405180910390fd5b61052281610da5565b50565b60015473ffffffffffffffffffffffffffffffffffffffff1633146105a6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f4f4e4c595f4f574e4552000000000000000000000000000000000000000000006044820152606401610510565b73ffffffffffffffffffffffffffffffffffffffff16600090815260026020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001179055565b604080516001808252818301909252606091829190816020015b606081526020019060019003908161060f575050604080516001808252818301909252919350602080830190803683370190505090506040518060400160405280600581526020017f76616c75650000000000000000000000000000000000000000000000000000008152508260008151811061068e5761068e61191d565b6020026020010181905250600d816000815181106106ae576106ae61191d565b602002602001019060218111156106c7576106c7611598565b908160218111156106da576106da611598565b9052509091565b3360009081526002602052604090205460ff1661075a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600b60248201527f4f4e4c595f5752495445520000000000000000000000000000000000000000006044820152606401610510565b600780546001810182556000919091527fa66cc928b5edb82af9bd49922954155ab7b0942694bea4ce44661d9a8736c6880180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b3360009081526002602052604090205460ff1661084a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600b60248201527f4f4e4c595f5752495445520000000000000000000000000000000000000000006044820152606401610510565b61039a8282611064565b60015473ffffffffffffffffffffffffffffffffffffffff1633146108d5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f4f4e4c595f4f574e4552000000000000000000000000000000000000000000006044820152606401610510565b600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff8316908117909155600480546040517ff30347700000000000000000000000000000000000000000000000000000000081523092810192909252602482015263f3034770906044015b600060405180830381600087803b15801561097357600080fd5b505af1158015610987573d6000803e3d6000fd5b5050505050565b600654815160208301206040517f796c5e94000000000000000000000000000000000000000000000000000000008152600481019190915260609173ffffffffffffffffffffffffffffffffffffffff169063796c5e9490602401600060405180830381865afa158015610a06573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526104959190810190611877565b6000818152600360205260409020805460609190610a699061194c565b80601f0160208091040260200160405190810160405280929190818152602001828054610a959061194c565b8015610ae25780601f10610ab757610100808354040283529160200191610ae2565b820191906000526020600020905b815481529060010190602001808311610ac557829003601f168201915b50505050509050919050565b60015473ffffffffffffffffffffffffffffffffffffffff163314610b6f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f4f4e4c595f4f574e4552000000000000000000000000000000000000000000006044820152606401610510565b73ffffffffffffffffffffffffffffffffffffffff16600090815260026020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00169055565b6005546040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810183905260009173ffffffffffffffffffffffffffffffffffffffff169063cccf7a8e90602401602060405180830381865afa158015610c2b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610495919061199f565b60015473ffffffffffffffffffffffffffffffffffffffff163314610cd0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f4f4e4c595f4f574e4552000000000000000000000000000000000000000000006044820152606401610510565b60015460405173ffffffffffffffffffffffffffffffffffffffff8084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a33360009081526002602052604080822080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00908116909155600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff959095169485178155938352912080549091169091179055565b60065460008281526003602052604090819020905173ffffffffffffffffffffffffffffffffffffffff909216916385edea1391610de2916119c1565b60405190819003812060e083901b7fffffffff000000000000000000000000000000000000000000000000000000001682526004820152602401602060405180830381865afa158015610e39573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e5d9190611a55565b600003610e675750565b60065460008281526003602052604090819020905173ffffffffffffffffffffffffffffffffffffffff90921691636526db7a91610ea4916119c1565b60405190819003812060e083901b7fffffffff00000000000000000000000000000000000000000000000000000000168252600482015260248101849052604401600060405180830381600087803b158015610eff57600080fd5b505af1158015610f13573d6000803e3d6000fd5b50506005546040517f4cc822150000000000000000000000000000000000000000000000000000000081526004810185905273ffffffffffffffffffffffffffffffffffffffff9091169250634cc822159150602401600060405180830381600087803b158015610f8357600080fd5b505af1158015610f97573d6000803e3d6000fd5b50505050610fa481611305565b60005b60075481101561039a5760078181548110610fc457610fc461191d565b6000918252602090912001546040517f4cc822150000000000000000000000000000000000000000000000000000000081526004810184905273ffffffffffffffffffffffffffffffffffffffff90911690634cc8221590602401600060405180830381600087803b15801561103957600080fd5b505af115801561104d573d6000803e3d6000fd5b50505050808061105c90611a6e565b915050610fa7565b6005546040517f1003e2d20000000000000000000000000000000000000000000000000000000081526004810184905273ffffffffffffffffffffffffffffffffffffffff90911690631003e2d290602401600060405180830381600087803b1580156110d057600080fd5b505af11580156110e4573d6000803e3d6000fd5b505060065460008581526003602052604090819020905173ffffffffffffffffffffffffffffffffffffffff9092169350636526db7a9250611125916119c1565b60405190819003812060e083901b7fffffffff00000000000000000000000000000000000000000000000000000000168252600482015260248101859052604401600060405180830381600087803b15801561118057600080fd5b505af1158015611194573d6000803e3d6000fd5b5050600654835160208501206040517f771602f700000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff909216935063771602f792506111fe918690600401918252602082015260400190565b600060405180830381600087803b15801561121857600080fd5b505af115801561122c573d6000803e3d6000fd5b5050505061123a8282611373565b60005b600754811015611300576007818154811061125a5761125a61191d565b6000918252602090912001546040517f0216b83800000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff90911690630216b838906112bb9086908690600401611acd565b600060405180830381600087803b1580156112d557600080fd5b505af11580156112e9573d6000803e3d6000fd5b5050505080806112f890611a6e565b91505061123d565b505050565b600081815260036020526040812061131c9161141a565b6000546040517f0de3b7b50000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff90911690630de3b7b590602401610959565b600082815260036020526040902061138b8282611b2c565b506000546040517fcfd3c57f00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff9091169063cfd3c57f906113e49085908590600401611acd565b600060405180830381600087803b1580156113fe57600080fd5b505af1158015611412573d6000803e3d6000fd5b505050505050565b5080546114269061194c565b6000825580601f10611436575050565b601f01602090049060005260206000209081019061052291905b808211156114645760008155600101611450565b5090565b60006020828403121561147a57600080fd5b5035919050565b73ffffffffffffffffffffffffffffffffffffffff8116811461052257600080fd5b600080604083850312156114b657600080fd5b8235915060208301356114c881611481565b809150509250929050565b6020808252825182820181905260009190848201906040850190845b8181101561150b578351835292840192918401916001016114ef565b50909695505050505050565b60006020828403121561152957600080fd5b813561035881611481565b6000815180845260005b8181101561155a5760208185018101518683018201520161153e565b5060006020828601015260207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f83011685010191505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b6000604082016040835280855180835260608501915060608160051b8601019250602080880160005b8381101561163c577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa088870301855261162a868351611534565b955093820193908201906001016115f0565b50508584038187015286518085528782019482019350915060005b828110156116aa57845160228110611698577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b84529381019392810192600101611657565b5091979650505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff8111828210171561172d5761172d6116b7565b604052919050565b600082601f83011261174657600080fd5b813567ffffffffffffffff811115611760576117606116b7565b61179160207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116016116e6565b8181528460208386010111156117a657600080fd5b816020850160208301376000918101602001919091529392505050565b600080604083850312156117d657600080fd5b82359150602083013567ffffffffffffffff8111156117f457600080fd5b61180085828601611735565b9150509250929050565b60006020828403121561181c57600080fd5b813567ffffffffffffffff81111561183357600080fd5b61183f84828501611735565b949350505050565b6020815260006103586020830184611534565b60006020828403121561186c57600080fd5b815161035881611481565b6000602080838503121561188a57600080fd5b825167ffffffffffffffff808211156118a257600080fd5b818501915085601f8301126118b657600080fd5b8151818111156118c8576118c86116b7565b8060051b91506118d98483016116e6565b81815291830184019184810190888411156118f357600080fd5b938501935b83851015611911578451825293850193908501906118f8565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600181811c9082168061196057607f821691505b602082108103611999577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b6000602082840312156119b157600080fd5b8151801515811461035857600080fd5b60008083546119cf8161194c565b600182811680156119e75760018114611a1a57611a49565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0084168752821515830287019450611a49565b8760005260208060002060005b85811015611a405781548a820152908401908201611a27565b50505082870194505b50929695505050505050565b600060208284031215611a6757600080fd5b5051919050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611ac6577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b5060010190565b82815260406020820152600061183f6040830184611534565b601f82111561130057600081815260208120601f850160051c81016020861015611b0d5750805b601f850160051c820191505b8181101561141257828155600101611b19565b815167ffffffffffffffff811115611b4657611b466116b7565b611b5a81611b54845461194c565b84611ae6565b602080601f831160018114611bad5760008415611b775750858301515b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600386901b1c1916600185901b178555611412565b6000858152602081207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08616915b82811015611bfa57888601518255948401946001909101908401611bdb565b5085821015611c3657878501517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600388901b60f8161c191681555b5050505050600190811b0190555056fea2646970667358221220ee88b265161db3dbbda0896f0e4ac26c96eced57d3c633ad3112b56223eb8ee364736f6c63430008110033608060405234801561001057600080fd5b50600080546001600160a01b03191633179055610589806100326000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c80638e7cb6e1116100505780638e7cb6e1146100bd578063949d225d146100e7578063cccf7a8e146100f857600080fd5b80631003e2d214610077578063410d59cc1461008c5780634cc82215146100aa575b600080fd5b61008a610085366004610458565b61011b565b005b6100946101f5565b6040516100a19190610471565b60405180910390f35b61008a6100b8366004610458565b61024d565b6100d06100cb366004610458565b6103c1565b6040805192151583526020830191909152016100a1565b6001546040519081526020016100a1565b61010b610106366004610458565b6103f2565b60405190151581526020016100a1565b60005473ffffffffffffffffffffffffffffffffffffffff1633146101a1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f4f4e4c595f4f574e45520000000000000000000000000000000000000000000060448201526064015b60405180910390fd5b6101aa816103f2565b6101f2576001805460008381526002602052604081208290558183018355919091527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6018190555b50565b6060600180548060200260200160405190810160405280929190818152602001828054801561024357602002820191906000526020600020905b81548152602001906001019080831161022f575b5050505050905090565b60005473ffffffffffffffffffffffffffffffffffffffff1633146102ce576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f4f4e4c595f4f574e4552000000000000000000000000000000000000000000006044820152606401610198565b6102d7816103f2565b156101f257600180546102eb9082906104b5565b815481106102fb576102fb6104f5565b9060005260206000200154600160026000848152602001908152602001600020548154811061032c5761032c6104f5565b60009182526020808320909101929092558281526002918290526040812054600180549193929184908110610363576103636104f5565b9060005260206000200154815260200190815260200160002081905550600260008281526020019081526020016000206000905560018054806103a8576103a8610524565b6001900381819060005260206000200160009055905550565b6000806103cd836103f2565b6103dc57506000928392509050565b5050600090815260026020526040902054600191565b600154600090810361040657506000919050565b600082815260026020526040812054900361044357816001600081548110610430576104306104f5565b9060005260206000200154149050919050565b50600090815260026020526040902054151590565b60006020828403121561046a57600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156104a95783518352928401929184019160010161048d565b50909695505050505050565b818103818111156104ef577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fdfea2646970667358221220b5b456212a11997ccd601470c77cc96a71f468957b5522e79a3a9c1efe5555c064736f6c63430008110033608060405234801561001057600080fd5b50600080546001600160a01b031916331790556105d0806100326000396000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c8063796c5e9411610050578063796c5e941461009457806385edea13146100bd578063a0265ff8146100eb57600080fd5b80636526db7a1461006c578063771602f714610081575b600080fd5b61007f61007a366004610483565b61010e565b005b61007f61008f366004610483565b6102c6565b6100a76100a23660046104a5565b61038e565b6040516100b491906104be565b60405180910390f35b6100dd6100cb3660046104a5565b60009081526001602052604090205490565b6040519081526020016100b4565b6100fe6100f9366004610483565b6103f0565b60405190151581526020016100b4565b60005473ffffffffffffffffffffffffffffffffffffffff163314610194576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f4f4e4c595f4f574e45520000000000000000000000000000000000000000000060448201526064015b60405180910390fd5b61019e82826103f0565b156102c2576000828152600160208190526040909120805490916101c191610502565b815481106101d1576101d161053c565b600091825260208083209091015484835260018252604080842060028452818520868652909352909220548154811061020c5761020c61053c565b6000918252602080832090910192909255838152600282526040808220848352808452818320548684526001855291832085845293819052835491939092918490811061025b5761025b61053c565b60009182526020808320909101548352828101939093526040918201812093909355848352600282528083208484528252808320839055848352600190915290208054806102ab576102ab61056b565b600190038181906000526020600020016000905590555b5050565b60005473ffffffffffffffffffffffffffffffffffffffff163314610347576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f4f4e4c595f4f574e455200000000000000000000000000000000000000000000604482015260640161018b565b61035182826103f0565b6102c25760009182526001602081815260408085208054600284528287208688528452918620829055838352928101835591845290922090910155565b6000818152600160209081526040918290208054835181840281018401909452808452606093928301828280156103e457602002820191906000526020600020905b8154815260200190600101908083116103d0575b50505050509050919050565b600082815260016020526040812054810361040d5750600061047d565b6000838152600260209081526040808320858452909152812054900361045f576000838152600160205260408120805484929061044c5761044c61053c565b906000526020600020015414905061047d565b50600082815260026020908152604080832084845290915290205415155b92915050565b6000806040838503121561049657600080fd5b50508035926020909101359150565b6000602082840312156104b757600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156104f6578351835292840192918401916001016104da565b50909695505050505050565b8181038181111561047d577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fdfea2646970667358221220684c9604d505135bc2456dd0f73243ed1e0045e69d943e1775bb4ed31337e5f264736f6c63430008110033";

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
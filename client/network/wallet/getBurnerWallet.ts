import { Wallet } from "ethers";

const INSECURE_LOCALSTORAGE_BURNER_PK_KEY = "insecure_burner_private_key";

const getBurnerWallet = (): Wallet => {
  let privateKey = localStorage.getItem(INSECURE_LOCALSTORAGE_BURNER_PK_KEY);
  if (!privateKey) {
    privateKey = Wallet.createRandom().privateKey;
    localStorage.setItem(INSECURE_LOCALSTORAGE_BURNER_PK_KEY, privateKey);
  }
  return new Wallet(privateKey);
};

export default getBurnerWallet;

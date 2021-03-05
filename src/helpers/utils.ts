import { PublicWalletItem } from "../../generated/definitions/PublicWalletItem";
import { PublicCreditCard } from "../../generated/definitions/PublicCreditCard";
import { Wallet } from "../../generated/definitions/Wallet";

export function renderPAN(walletItem: PublicWalletItem): string {
  return PublicCreditCard.is(walletItem)
    ? ` | *${walletItem.masked_pan}`
    : `| ${walletItem.type}`;
}

export function filterWallet(
  wallet: Wallet,
  hpan: string
): ReadonlyArray<PublicWalletItem> {
  return wallet.data.filter((item: PublicWalletItem) => item.hpan === hpan);
}

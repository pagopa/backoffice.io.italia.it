import { PublicWalletItem } from "../../generated/definitions/PublicWalletItem";
import { PublicCreditCard } from "../../generated/definitions/PublicCreditCard";

export function renderPAN(walletItem: PublicWalletItem): string {
  return PublicCreditCard.is(walletItem)
    ? ` | *${walletItem.masked_pan}`
    : `| ${walletItem.type}`;
}

import { Deposit, Withdraw } from './generated/schema';
import { Deposited, Withdrawn } from './generated/DaiContract/DaiContract';

export function handleDeposited(event: Deposited): void {
    const depositedId = event.transaction.hash.toHex();

    let depositedEntry = Deposit.load(depositedId);
    if (depositedEntry == null) {
        depositedEntry = new Deposit(depositedId);
    }

    depositedEntry.amount = event.params.amount;
    depositedEntry.sender = event.params.sender;
    depositedEntry.assetAddress = event.address;

    depositedEntry.save()
}

export function handleWithdrawn(event: Withdrawn): void {
    const withdrawnId = event.transaction.hash.toHex();

    let withdrawnEntry = Withdraw.load(withdrawnId);
    if (withdrawnEntry == null) {
        withdrawnEntry = new Withdraw(withdrawnId);
    }

    withdrawnEntry.amount = event.params.amount;
    withdrawnEntry.sender = event.params.sender;
    withdrawnEntry.assetAddress = event.address;

    withdrawnEntry.save()
}

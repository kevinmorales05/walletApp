import { useCallback, useState } from 'react';
import { TransactionType } from '../reactRedux';
import { accountServices } from '../services';

export interface Hook {
  getBalance: () => void;
  getTransactions: () => void;
  balance: string;
  transactions: TransactionType[];
  fetchingBalance: boolean;
  fetchingTransactions: boolean;
}

export function useAccount(): Hook {
  const [balance, setBalance] = useState<string>('0.00');
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [fetchingBalance, setFetchingBalance] = useState<boolean>(false);
  const [fetchingTransactions, setFetchingTransactions] = useState<boolean>(false);

  const getBalance = useCallback(async (): Promise<any> => {
    setFetchingBalance(true);
    const data = await accountServices.getBalance();
    setBalance(data.amount.amount);
    setFetchingBalance(false);
  }, []);

  const getTransactions = useCallback(async (): Promise<any> => {
    setFetchingTransactions(true);
    const data = await accountServices.getTransactions();

    const formattedData: TransactionType[] = data.data.data.map((item: any): TransactionType => ({
      amount: Number(item.amount.amount),
      date: item.bookingDateTime,
      id: item.transactionId,
      status: item.status,
      type: item.propietaryBankTransactionCode.code
    }));

    formattedData.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
    setTransactions(formattedData);
    setFetchingTransactions(false);
  }, []);

  return {
    getBalance,
    getTransactions,
    balance,
    transactions,
    fetchingBalance,
    fetchingTransactions
  };
}

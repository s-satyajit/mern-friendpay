import { createContext, useContext, useState, useEffect } from "react";
import useApiClient from "@/hooks/useApiClient";

export const MoneyContext = createContext();

export const MoneyProvider = ({ children }) => {
  const api = useApiClient();
  const { loading, error, makeRequest } = api;
  const [friends, setFriends] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const fetchFriends = async () => {
    try {
      const friendData = await makeRequest("GET", "/friends");
      setFriends(friendData);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const transactionData = await makeRequest("GET", "/transactions");
      setTransactions(transactionData);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const addTransaction = async (transaction) => {
    try {
      const newTransaction = await makeRequest(
        "POST",
        "/transactions",
        transaction
      );
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        newTransaction,
      ]);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  useEffect(() => {
    fetchFriends();
    fetchTransactions();
  }, []);

  return (
    <MoneyContext.Provider
      value={{
        friends,
        transactions,
        loading,
        error,
        fetchFriends,
        fetchTransactions,
        addTransaction,
      }}
    >
      {children}
    </MoneyContext.Provider>
  );
};

export const useMoneyContext = () => {
    return useContext(MoneyContext);
}

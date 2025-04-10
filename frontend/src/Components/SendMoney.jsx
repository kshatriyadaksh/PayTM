import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleTransfer = async () => {
    if (!amount || amount <= 0) {
      setMessage("Please enter a valid amount.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/v1/account/transfer",
        {
          to: id,
          amount,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      setMessage("Transfer successful!");
    } catch (error) {
      console.error("Transfer error:", error);
      setMessage(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-6 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-center">Send Money</h2>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-2xl text-white">{name?.[0]?.toUpperCase()}</span>
            </div>
            <h3 className="text-2xl font-semibold">{name}</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="amount" className="text-sm font-medium">
                Amount (in Rs)
              </label>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
              />
            </div>

            <button
              onClick={handleTransfer}
              disabled={loading}
              className="w-full h-10 bg-green-500 text-white rounded-md font-medium hover:bg-green-600 transition-colors"
            >
              {loading ? "Transferring..." : "Initiate Transfer"}
            </button>

            {message && (
              <div className="text-center text-sm text-red-500 mt-2">{message}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

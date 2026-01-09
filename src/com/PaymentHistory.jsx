import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

function PaymentHistory() {
  const { user } = useUser();
  const [payments, setPayments] = useState([]);
const url=import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!user) return;

    fetch(`${url}/api/pay/history/${user.id}`)
      .then(res => res.json())
      .then(data => setPayments(data));
  }, [user]);

  return (
    <div className="max-w-xl mx-auto mt-6">
      <h2 className="text-lg font-bold mb-3">Payment History</h2>

      {payments.length === 0 ? (
        <p className="text-gray-500">No payments yet</p>
      ) : (
        payments.map(p => (
          <div
            key={p.id}
            className="border rounded-lg p-3 mb-2 flex justify-between"
          >
            <div>
              <p className="text-sm">
                Ref: <b>{p.referenceCode}</b>
              </p>
              <p className="text-xs text-gray-500">
                UTR: {p.txnId}
              </p>
            </div>

            <span
              className={`text-sm font-medium ${
                p.status === "APPROVED"
                  ? "text-green-600"
                  : "text-orange-500"
              }`}
            >
              {p.status}
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default PaymentHistory;

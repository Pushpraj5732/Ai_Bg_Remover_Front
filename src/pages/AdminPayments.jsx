import { useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";

function AdminPayments() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [payments, setPayments] = useState([]);
  const url=import.meta.env.VITE_BACKEND_URL;
  const fetchPayments = async () => {
    const token = await getToken();

    const res = await fetch(`${url}/api/admin/pending`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    setPayments(data);
  };

  useEffect(() => {
    if (isLoaded && user?.publicMetadata?.role === "admin") {
      fetchPayments();
    }
  }, [isLoaded]);

  // ✅ JSX conditions AFTER hooks
  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  if (user?.publicMetadata?.role !== "admin") {
    return <h2>Access Denied ❌</h2>;
  }

  return (
    <div>
      <h2>Admin – Pending Payments</h2>

      {payments.length === 0 ? (
        <p>No pending payments</p>
      ) : (
        payments.map(p => (
          <div key={p.id}>
            {p.txnId} – ₹{p.amount}
            <button onClick={() => approvePayment(p.id)}>
              Approve
            </button>
          </div>
        ))
      )}
    </div>
  );

  async function approvePayment(id) {
    const token = await getToken();

    await fetch(
      `${url}/admin/verify/id/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Payment approved");
    fetchPayments();
  }
}

export default AdminPayments;

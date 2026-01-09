import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

function generateReference() {
  return "BG-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

function BuyCredits() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [txnId, setTxnId] = useState("");
  const [referenceCode, setReferenceCode] = useState("");
  const url=import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (open) {
      setReferenceCode(generateReference());
    }
  }, [open]);

  const submitPayment = async () => {
    if (txnId.length < 12) {
      alert("Enter valid UTR");
      return;
    }

    await fetch(`${url}/api/pay/manual`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clerkUserId: user.id,
        txnId,
        referenceCode,
        amount: 100
      })
    });

    alert("Payment submitted. Wait for verification.");
    setOpen(false);
    setTxnId("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-green-600 text-white px-4 py-2 rounded-full"
      >
        Buy Credits
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96 space-y-4">

            <h2 className="text-lg font-bold">Pay ₹100 for 10 Credits</h2>

            {/* Reference Code */}
            <div className="bg-gray-100 p-3 rounded text-center">
              <p className="text-sm text-gray-600">Reference Code</p>
              <p className="font-bold text-lg">{referenceCode}</p>
              <p className="text-xs text-gray-500">
                Add this in UPI note while paying
              </p>
            </div>

            {/* UPI */}
            <a
              href={`upi://pay?pa=pdchavda0905@oksbi-&pn=BGRemover&am=100&cu=INR&tn=${referenceCode}`}
              className="block bg-green-600 text-white text-center py-2 rounded"
            >
              Pay via UPI App
            </a>

            {/* UTR */}
            <input
              value={txnId}
              onChange={(e) => setTxnId(e.target.value)}
              placeholder="Enter UTR"
              className="w-full border p-2 rounded"
            />

            <button
              onClick={submitPayment}
              className="w-full bg-black text-white py-2 rounded"
            >
              Submit Payment
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default BuyCredits;

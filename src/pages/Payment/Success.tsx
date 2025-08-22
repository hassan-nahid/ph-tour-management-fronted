import { useSearchParams } from "react-router";

const Success = () => {
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get("transactionId");
  const message = searchParams.get("message");
  const amount = searchParams.get("amount");
  const status = searchParams.get("status");

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <h1 className="text-2xl font-bold text-green-600">{message || "Payment Success"}</h1>
      <div className=" rounded shadow p-6 mt-4">
        <p><strong>Transaction ID:</strong> {transactionId}</p>
        <p><strong>Amount:</strong> {amount} ৳</p>
        <p><strong>Status:</strong> {status}</p>
      </div>
    </div>
  );
};
export default Success
"use client";
import { useSearchParams } from "next/navigation";
import PaymentWrapper from "../components/PaymentMethod";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const subscriptionId = searchParams.get('subscriptionId');

  if (!subscriptionId) {
    return <div>Invalid subscription ID</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <PaymentWrapper subscriptionId={subscriptionId} />
    </div>
  );
} 
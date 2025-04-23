"use client";
import { useParams } from "next/navigation";
import PaymentWrapper from "../components/PaymentMethod";

export default function PaymentPage() {
  const { subscriptionId } = useParams();

  if (!subscriptionId) {
    return <div>Invalid subscription ID</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <PaymentWrapper subscriptionId={subscriptionId as string} />
    </div>
  );
} 
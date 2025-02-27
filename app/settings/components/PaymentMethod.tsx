"use client";
import {
  useStripe,
  useElements,
  CardElement,
  Elements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useCreateSubscription } from "@/service/subscriptions/subscription";
import { useUserContext } from "@/app/contexts/userContext";
import Image from "next/image";
import { Logo } from "@/assets/images";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

interface PaymentFormProps {
  subscriptionId: string;
}

interface PaymentMethodCard {
  last4: string;
  brand: string;
  expirationMonth: number;
  expirationYear: number;
}

interface PaymentMethod {
  id: string;
  paymentMethodId: string;
  card: PaymentMethodCard;
  isDefaultPaymentMethod: boolean;
}

const PaymentForm = ({ subscriptionId }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const createSubscriptionMutation = useCreateSubscription();
  const { user } = useUserContext();

  const handleExistingPaymentMethod = async (paymentMethodId: string) => {
    setLoading(true);
    try {
      await createSubscriptionMutation.mutateAsync({
        subscriptionConfigId: subscriptionId,
        paymentMethodId,
      });
      toast.success("Subscription created successfully");
      router.push("/settings");
    } catch (error) {
      toast.error("Failed to process subscription");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (!stripe || !elements) {
        throw new Error("Stripe has not loaded yet.");
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error("Card Element not found.");
      }

      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        throw new Error(error.message);
      }

      await createSubscriptionMutation.mutateAsync({
        subscriptionConfigId: subscriptionId,
        paymentMethodId: paymentMethod.id,
      });

      toast.success("Subscription created successfully");
      router.push("/settings");
    } catch (error) {
      toast.error("Failed to process subscription");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center">
        <Image src={Logo} alt="logo" width={100} height={100} />
      </div>

      {/* Show existing payment methods if available */}
      {user?.paymentMethods && user.paymentMethods.length > 0 && (
        <div className="mb-8 space-y-4">
          <h3 className="text-lg font-medium text-[#272728]">Saved Cards</h3>
          <div className="space-y-3">
            {user.paymentMethods.map((pm: PaymentMethod) => (
              <div
                key={pm.id}
                className="flex items-center justify-between rounded-lg border border-[#e8e6ea] p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="text-sm text-[#555e67]">
                    {pm.card.brand.toUpperCase()} •••• {pm.card.last4}
                  </div>
                  <div className="text-sm text-[#555e67]">
                    Expires {pm.card.expirationMonth}/{pm.card.expirationYear}
                  </div>
                  {pm.isDefaultPaymentMethod && (
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                      Default
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleExistingPaymentMethod(pm.paymentMethodId)}
                  disabled={loading}
                  className="rounded-lg bg-[#131313] px-4 py-2 text-sm text-white disabled:bg-gray-400"
                >
                  {loading ? "Processing..." : "Use this card"}
                </button>
              </div>
            ))}
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or add a new card</span>
            </div>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-[#e8e6ea] bg-white p-6"
      >
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-[#272728]">
            Add Payment Method
          </h3>
          <p className="text-sm text-[#555e67]">
            Enter your card details to complete subscription
          </p>
        </div>

        <div className="rounded-lg border border-[#e8e6ea] p-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#272728",
                  "::placeholder": {
                    color: "#555e67",
                  },
                },
              },
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-[50px] w-full items-center justify-center gap-1.5 rounded-xl bg-[#131313] px-5 py-3 text-center text-base font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {loading ? "Processing..." : "Complete Subscription"}
        </button>
      </form>
    </div>
  );
};

interface PaymentWrapperProps {
  subscriptionId: string;
}

const PaymentWrapper = ({ subscriptionId }: PaymentWrapperProps) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm subscriptionId={subscriptionId} />
    </Elements>
  );
};

export default PaymentWrapper;

"use client"
import { useUserContext } from "@/app/contexts/userContext";
import React, { useState } from "react";
import { useTopUpCredit } from "@/service/subscriptions/subscription";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Credits = () => {
  const { user } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const [creditAmount, setCreditAmount] = useState(10);
  
  const { mutate: topUpCredit, isPending } = useTopUpCredit();

  const handleTopUp = () => {
    topUpCredit({ amount: creditAmount });
    setIsOpen(false);
  };

  return (
    <div className="rounded-xl bg-white border border-[#e8e6ea] p-4 flex flex-col items-center w-full max-w-xs mx-auto shadow-sm">
      <div className="text-2xl font-bold text-[#272728] mb-2">{user?.credit?.credit ?? 0} credits</div>
      <div className="w-full h-4 bg-gray-100 rounded mb-1" />
      <div className="w-full h-4 bg-gray-100 rounded mb-4" />
      <button
        className="w-full bg-[#131313] text-white rounded-lg py-2 font-semibold text-base hover:bg-[#272728] transition mb-1"
        onClick={() => setIsOpen(true)}
        disabled={isPending}
      >
        {isPending ? 'Processing...' : 'TOP-UP'}
      </button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Top Up Credits</DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            value={creditAmount}
            onChange={(e) => setCreditAmount(Number(e.target.value))}
            className="outline-none"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleTopUp} disabled={isPending}>
              {isPending ? 'Processing...' : 'Confirm'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Credits;

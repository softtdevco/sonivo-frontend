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
    <div className="-mt-[11px] border-t-2 border-[#dadada] pt-6">
      <p className="text-base font-normal text-[#555e67]">Available Credits</p>
      <div className="mt-6 inline-flex h-[99px] items-center justify-start gap-6 rounded-xl border border-[#e8e6ea] bg-white p-4 w-full">
        <div className="inline-flex h-[67px] justify-between w-full">
          <div className="inline-flex h-[67px] flex-col justify-start gap-3">
            <div className="inline-flex h-8 items-center gap-2">
              <div className="text-[32px] font-bold leading-loose text-[#272728]">
                {user?.credit?.credit}
              </div>
              <div className="text-base font-normal leading-tight text-[#555e67]">
                Credits
              </div>
            </div>
            <div className="text-sm font-normal leading-[23px] text-[#555e67]">
              Approx. 23 mins of transcriptions, 32 mins of calls, 21 mins of
              live calls left
            </div>
          </div>
        </div>
        <div 
          className="inline-flex h-[50px] w-[205px] items-center justify-center gap-1.5 rounded-xl border bg-neutral-400/10 px-5 py-3 text-center text-base font-medium leading-[14.40px] text-[#131313] cursor-pointer" 
          onClick={() => setIsOpen(true)}
        >
          {isPending ? 'Processing...' : 'Top up'}
        </div>
      </div>

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

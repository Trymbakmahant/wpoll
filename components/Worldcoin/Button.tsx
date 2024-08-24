"use client"; // for Next.js app router
import {
  IDKitWidget,
  VerificationLevel,
  ISuccessResult,
} from "@worldcoin/idkit";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { useWorldcoinVerification } from "@/hooks/useWorldcoinVerification";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { showToast } from "@/helper/toasthelper";

interface WorldIDWidgetProps {
  active: boolean;
  action: string;

  setWorldcoinVerified: React.Dispatch<React.SetStateAction<boolean>>;
}
interface WorldIDWidgetFofSignupProps {
  active: boolean;
  action: string;
  setProof: React.Dispatch<React.SetStateAction<any>>;
  setWorldcoinVerified: React.Dispatch<React.SetStateAction<boolean>>;
}

const WorldIDWidget = ({
  active,
  action,

  setWorldcoinVerified,
}: WorldIDWidgetProps) => {
  const { verify } = useWorldcoinVerification();
  const handleVerify = async (proof: ISuccessResult) => {
    try {
      const response = await fetch("/api/verifyWorldID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...proof,
          action,
        }),
      });

      const result = await response.json();

      if (result.success) {
        showToast("success", <p>Worldcoin Verification Completed </p>);
        console.log("Verification succeeded:", result.data);
      } else {
        showToast(
          "error",
          <p>
            Hey We are getting error when verifying your WorldID please Reado{" "}
          </p>
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const onSuccess = () => {
    setWorldcoinVerified(true);
  };
  const stingvar = "sdjofsjd";
  return (
    <div className="">
      <IDKitWidget
        app_id={`app_${process.env.NEXT_PUBLIC_WORLD_ID_API}`} // obtained from the Developer Portal
        action={action} // obtained from the Developer Portal
        onSuccess={onSuccess} // callback when the modal is closed
        handleVerify={handleVerify} // callback when the proof is received
        verification_level={VerificationLevel.Orb}
      >
        {({ open }) => (
          // This is the button that will open the IDKit modal
          <Button
            variant="outline"
            className="flex w-full h-11 gap-2"
            onClick={open}
          >
            <Avatar className="w-8 h-8">
              <AvatarImage src={"/worldcoin.png"} alt="worldcoin" />
              <AvatarFallback>W</AvatarFallback>
            </Avatar>
            Verify with World ID
          </Button>
        )}
      </IDKitWidget>
    </div>
  );
};

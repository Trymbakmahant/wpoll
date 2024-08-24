"use client";
import { useState } from "react";
import axios from "axios";
interface VerificationData {
  nullifier_hash: string;
  merkle_root: string;
  proof: string;
  verification_level: string;
}

export const useWorldcoinVerification = () => {
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const verify = async (
    proofData: VerificationData,
    action: string,
    signal: string
  ) => {
    debugger;
    setLoading(true);
    setError(null);

    const ourdata = {
      ...proofData,
      action: action,
      signal_hash: signal,
    };

    const apiUrl = `https://developer.worldcoin.org/api/v2/verify/app_${process.env.NEXT_PUBLIC_WORLD_ID_API}`; // Adjust this URL based on your API endpoint

    console.log("apiURL", apiUrl);
    console.log("proof", ourdata);

    try {
      const response = await axios.post(apiUrl, ourdata, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      if (response.status !== 200) {
        throw new Error("Verification failed");
      }

      setVerificationResult(response.data);
    } catch (err: any) {
      console.log(err);
      setError(err.message || "An error occurred during verification");
    } finally {
      setLoading(false);
    }
  };

  return { verify, verificationResult, error, loading };
};

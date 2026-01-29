"use client";

import { useRouter } from "next/navigation";
import styles from "./EstimateNavbar.module.css";
import { ArrowLeft } from "lucide-react";
import { useEstimateStore } from "@/store/useEstimateStore";


type Props = {
  customerName?: string;
};

export default function EstimateNavbar({ customerName }: Props) {
  const router = useRouter();
  const { userInfo } = useEstimateStore();


  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        {/* Left */}
        <button
          className={styles.back}
          onClick={() => router.push("/")}
          aria-label="Back to home"
        >
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </button>

        {/* Right */}
        <div className={styles.booking}>
          Booking for{" "}
          <span className={styles.name}>
            {userInfo?.name || "you"}
          </span>
        </div>
      </div>
    </header>
  );
}

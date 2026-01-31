"use client";

import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./EstimateModal.module.css";
import { X, User, Mail, MapPin, ArrowRight } from "lucide-react";
import { useEstimateInit } from "@/queries/estimate/useEstimateInit";
import { useEstimateStore } from "@/store/useEstimateStore";


type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function EstimateModal({ isOpen, onClose }: Props) {
  const router = useRouter();
  const { mutate, isPending  } = useEstimateInit();

  const [form, setForm] = useState({
    name: "",
    email: "",
    pincode: "",
  });

  const [error, setError] = useState<string | null>(null);
  const { setUserInfo } = useEstimateStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);



  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    mutate(form, {
      onSuccess: (res) => {
        if (res.data.success === true) {
          setUserInfo(form);
          onClose();
          router.push("/estimate-service");
        } else {
          setError(res.message);
        }
      },
      onError: () => {
        setError("Something went wrong. Please try again.");
      },
    });
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.close} onClick={onClose}>
          <X size={18} />
        </button>

        <h2>Let’s get started</h2>
        <p className={styles.sub}>
          Where should we send your custom estimate?
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.fieldLabel}>
            FULL NAME
            <div className={styles.inputWrap}>
              <User size={16} />
              <input
                name="name"
                placeholder="Jane Doe"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          </label>

          <label className={styles.fieldLabel}>
            EMAIL ADDRESS
            <div className={styles.inputWrap}>
              <Mail size={16} />
              <input
                name="email"
                type="email"
                placeholder="jane@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </label>

          <label className={styles.fieldLabel}>
            ZIP CODE
            <div className={styles.inputWrap}>
              <MapPin size={16} />
              <input
                name="pincode"
                placeholder="94105"
                value={form.pincode}
                onChange={handleChange}
                required
              />
            </div>
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.submit} disabled={isPending }>
            {isPending  ? "Checking..." : "Next Step"}
            {!isPending  && <ArrowRight size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
}

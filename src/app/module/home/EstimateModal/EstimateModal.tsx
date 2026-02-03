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

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    pincode: "",
  });

  const { setUserInfo } = useEstimateStore();
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

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

  useEffect(() => {
    if (!isOpen) {
      setForm({
        name: "",
        email: "",
        pincode: "",
      });

      setErrors({
        name: "",
        email: "",
        pincode: "",
      });

      setInfoMessage(null);
    }
  }, [isOpen]);



if (!isOpen) return null;

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  if (name === "pincode" && !/^[0-9-]*$/.test(value)) return;

  setForm({ ...form, [name]: value });

  setErrors((prev) => ({
    ...prev,
    [name]: "",
  }));
};



const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const newErrors = {
    name: "",
    email: "",
    pincode: "",
  };

  if (form.name.trim().length < 2) {
    newErrors.name = "Please enter your full name.";
  }

  if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    newErrors.email = "Please enter a valid email address.";
  }

  if (!/^\d{5}(-\d{4})?$/.test(form.pincode)) {
    newErrors.pincode = "Please enter a valid US ZIP code.";
  }

  setErrors(newErrors);

  // Stop submit if any error exists
  if (newErrors.name || newErrors.email || newErrors.pincode) return;

  setInfoMessage(null);

  mutate(form, {
    onSuccess: (res) => {
      if (res.data?.success === true) {
        setUserInfo(form);
        onClose();
        router.push("/estimate-service");
      }
      else if (res.data?.success === false) {
        setInfoMessage(
          "Sorry-We're not in your area yet, but we're expanding soon!"
        );
      } 
      else {
        alert(res.message || "Something went wrong.");
      }
    },
    onError: () => {
      alert("Unable to connect right now. Please try again.");
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
              />
              

            </div>
            {errors.name && (
                <p className={styles.error}>{errors.name}</p>
              )}
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
              />
              

            </div>
            {errors.email && (
                <p className={styles.error}>{errors.email}</p>
              )}
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
                inputMode="text"
                maxLength={10}
              />
             
            </div>
             {errors.pincode && (
                <p className={styles.error}>{errors.pincode}</p>
              )}
          </label>

          {infoMessage && (
            <p className={styles.info}>{infoMessage}</p>
          )}

          <button type="submit" className={styles.submit} disabled={isPending }>
            {isPending  ? "Checking..." : "Next Step"}
            {!isPending  && <ArrowRight size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
}

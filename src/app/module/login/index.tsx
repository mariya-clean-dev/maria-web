"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, LucideMail, ArrowRight, ArrowLeft, ShieldCheck } from "lucide-react";
import OtpInput from "react-otp-input";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useGetOtp } from "@/queries/authentication/useGetOtp";
import { useVerifyOtp } from "@/queries/authentication/useVerifyOtp";
import useCustomToast from "@/hooks/use-custom-toast";
import { useRouter } from "nextjs-toploader/app";

const emailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});
const otpSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  otp: z.string().length(6, { message: "OTP must be exactly 6 digits." }),
});

type EmailFormValues = z.infer<typeof emailSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;

/* ── Inline SVG icons ── */
const BubbleIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg viewBox="0 0 40 40" fill="none" style={style}>
    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
    <circle cx="14" cy="13" r="3.5" fill="currentColor" opacity="0.12"/>
    <circle cx="12" cy="11" r="1.8" fill="white" opacity="0.55"/>
  </svg>
);

const SprayIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg viewBox="0 0 60 80" fill="none" style={style}>
    <rect x="22" y="28" width="22" height="40" rx="5" fill="currentColor" opacity="0.8"/>
    <rect x="14" y="18" width="14" height="16" rx="3" fill="currentColor" opacity="0.6"/>
    <rect x="10" y="14" width="18" height="6" rx="3" fill="currentColor" opacity="0.45"/>
    <rect x="36" y="20" width="12" height="4" rx="2" fill="currentColor" opacity="0.55"/>
    <circle cx="49" cy="14" r="2" fill="currentColor" opacity="0.35"/>
    <circle cx="53" cy="10" r="1.4" fill="currentColor" opacity="0.25"/>
    <circle cx="57" cy="7" r="0.9" fill="currentColor" opacity="0.18"/>
  </svg>
);

const SpongeIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg viewBox="0 0 70 50" fill="none" style={style}>
    <rect x="4" y="8" width="62" height="34" rx="9" fill="currentColor" opacity="0.75"/>
    <circle cx="18" cy="20" r="3" fill="white" opacity="0.28"/>
    <circle cx="32" cy="15" r="2" fill="white" opacity="0.22"/>
    <circle cx="44" cy="22" r="3.5" fill="white" opacity="0.28"/>
    <circle cx="56" cy="17" r="2.5" fill="white" opacity="0.22"/>
    <circle cx="25" cy="30" r="2" fill="white" opacity="0.18"/>
    <circle cx="40" cy="34" r="3" fill="white" opacity="0.22"/>
    <rect x="4" y="33" width="62" height="9" rx="4" fill="currentColor" opacity="0.45"/>
  </svg>
);

/* ── Stepper ── */
function LoginStepper({ step }: { step: 1 | 2 }) {
  return (
    <div className="flex items-center justify-center mb-7">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <motion.div
            style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "#17A5C6", color: "white",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700,
              boxShadow: "0 0 0 4px rgba(23,165,198,0.18)",
            }}
            animate={{ scale: step === 1 ? [1, 1.07, 1] : 1 }}
            transition={{ duration: 1.8, repeat: step === 1 ? Infinity : 0 }}
          >
            {step >= 2 ? "✓" : "1"}
          </motion.div>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#0c6e85" }}>Email</span>
        </div>

        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          {[0, 1, 2, 3].map((i) => (
            <motion.div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "#17A5C6" }}
              animate={{ opacity: step >= 2 ? 1 : [0.15, 0.7, 0.15], scale: step >= 2 ? 1 : [0.8, 1.1, 0.8] }}
              transition={{ duration: 1.2, delay: i * 0.18, repeat: step < 2 ? Infinity : 0 }}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <motion.div
            style={{
              width: 28, height: 28, borderRadius: "50%",
              background: step === 2 ? "#17A5C6" : "transparent",
              color: step === 2 ? "white" : "#b0bec5",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700,
              border: step === 2 ? "none" : "2px solid #cfe8f0",
              boxShadow: step === 2 ? "0 0 0 4px rgba(23,165,198,0.18)" : "none",
            }}
            animate={{ scale: step === 2 ? [1, 1.07, 1] : 1 }}
            transition={{ duration: 1.8, repeat: step === 2 ? Infinity : 0 }}
          >
            2
          </motion.div>
          <span style={{ fontSize: 13, fontWeight: 600, color: step === 2 ? "#0c6e85" : "#b0bec5" }}>Verify</span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════
   MAIN PAGE
══════════════════════════════════ */
export default function LoginPage() {
  const router = useRouter();
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");

  const { success, showError } = useCustomToast();
  const getOtpMutation = useGetOtp();
  const verifyOtpMutation = useVerifyOtp();

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });
  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { email: "", otp: "" },
  });

  useEffect(() => { if (email) otpForm.setValue("email", email); }, [email, otpForm]);
  useEffect(() => { otpForm.setValue("otp", otp); }, [otp, otpForm]);

  const handleGetOtp = async (values: EmailFormValues) => {
    setEmail(values.email);
    await getOtpMutation.mutateAsync({ email: values.email }, {
      onSuccess: (data) => {
        if (data?.message === "Not A Registered User") {
          showError("This email is not registered.");
          setOtpSent(false);
        } else {
          setOtpSent(true);
          toast.success("OTP sent to your email");
        }
      },
      onError: (error) => showError(error),
    });
  };

  const handleVerifyOtp = async (values: OtpFormValues) => {
    await verifyOtpMutation.mutateAsync({ email: values.email, otp: values.otp }, {
      onSuccess: (data) => {
        success("Login successful!");
        sessionStorage.setItem("maria_access_token", data.access_token);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        router.push("/");
      },
      onError: (error) => showError(error),
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .lp-root {
          font-family: 'Nunito', sans-serif;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          /* soft aqua-white gradient — feels fresh and clean */
          background:
            radial-gradient(ellipse 110% 80% at 15% 20%, rgba(23,165,198,0.13) 0%, transparent 55%),
            radial-gradient(ellipse 90% 70% at 85% 80%, rgba(14,143,171,0.11) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 55% 5%,  rgba(31,192,224,0.08) 0%, transparent 45%),
            linear-gradient(160deg, #edfbff 0%, #f5fdff 30%, #fff 55%, #f0fafd 80%, #e8f8fd 100%);
        }

        /* ── Organic blob shapes in bg ── */
        .lp-blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(1px);
        }

        /* ── Card ── */
        .lp-card {
          position: relative;
          z-index: 20;
          width: 100%;
          max-width: 430px;
          margin: 0 16px;
        }

        .lp-accent {
          height: 4px;
          border-radius: 20px 20px 0 0;
          background: linear-gradient(90deg, #0e8fab, #17A5C6, #5ed6ec, #17A5C6, #0e8fab);
          background-size: 250% 100%;
          animation: lp-bar 5s linear infinite;
        }
        @keyframes lp-bar {
          0%   { background-position: 0%   50%; }
          100% { background-position: 250% 50%; }
        }

        .lp-body {
          background: rgba(255,255,255,0.94);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(179,234,245,0.55);
          border-top: none;
          border-radius: 0 0 26px 26px;
          padding: 36px 36px 32px;
          box-shadow:
            0 4px 6px rgba(23,165,198,0.06),
            0 20px 60px rgba(23,165,198,0.13),
            0 40px 100px rgba(14,100,130,0.10);
        }

        /* ── Divider ── */
        .lp-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 20px 0;
        }
        .lp-divider::before, .lp-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, #cfe8f0);
        }
        .lp-divider::after { background: linear-gradient(to left, transparent, #cfe8f0); }

        /* ── Input ── */
        .lp-input {
          width: 100%;
          height: 50px;
          border: 1.5px solid #c8eaf3;
          border-radius: 13px;
          background: #f6fdff;
          font-size: 14.5px;
          color: #0c5a6e;
          padding-left: 46px;
          font-family: 'Nunito', sans-serif;
          font-weight: 500;
          transition: all 0.22s ease;
          outline: none;
        }
        .lp-input:focus {
          border-color: #17A5C6;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(23,165,198,0.12);
        }
        .lp-input::placeholder { color: #a8d8e8; font-weight: 400; }

        /* ── OTP ── */
        .lp-otp-wrap input {
          width: 44px !important;
          height: 48px !important;
          border-radius: 11px !important;
          border: 1.5px solid #c8eaf3 !important;
          background: #f6fdff !important;
          font-size: 19px !important;
          font-weight: 800 !important;
          color: #0c5a6e !important;
          text-align: center !important;
          outline: none !important;
          transition: all 0.22s !important;
          font-family: 'Nunito', sans-serif !important;
        }
        .lp-otp-wrap input:focus {
          border-color: #17A5C6 !important;
          background: #fff !important;
          box-shadow: 0 0 0 4px rgba(23,165,198,0.12) !important;
        }

        /* ── Primary button ── */
        .lp-btn-primary {
          width: 100%;
          height: 50px;
          border: none;
          border-radius: 14px;
          background: linear-gradient(135deg, #17A5C6 0%, #0e8fab 100%);
          color: white;
          font-family: 'Nunito', sans-serif;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: 0.2px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.22s ease;
          box-shadow: 0 4px 18px rgba(23,165,198,0.38), 0 1px 3px rgba(14,143,171,0.2);
        }
        .lp-btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(23,165,198,0.48), 0 2px 6px rgba(14,143,171,0.25);
        }
        .lp-btn-primary:active:not(:disabled) { transform: translateY(0); }
        .lp-btn-primary:disabled { opacity: 0.58; cursor: not-allowed; }

        /* ── Secure pill ── */
        .lp-secure-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 12px;
          background: linear-gradient(135deg, #e8f9fd, #d4f2f9);
          border: 1px solid rgba(23,165,198,0.25);
          border-radius: 999px;
          font-size: 11.5px;
          font-weight: 700;
          color: #0c7a93;
          letter-spacing: 0.2px;
        }

        /* ── Floating decorations ── */
        .lp-floats {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 5;
        }
        .lp-float {
          position: absolute;
        }

        /* ── Back link ── */
        .lp-back {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
          font-weight: 600;
          color: #9eadb5;
          text-decoration: none;
          transition: color 0.2s;
          font-family: 'Nunito', sans-serif;
        }
        .lp-back:hover { color: #17A5C6; }

        /* ── Tagline ── */
        .lp-tagline {
          text-align: center;
          margin-top: 18px;
          font-size: 12px;
          font-weight: 600;
          color: #9fb8c0;
          letter-spacing: 0.3px;
        }

        @media (max-width: 480px) {
          .lp-body { padding: 28px 22px 26px; }
          .lp-otp-wrap input { width: 40px !important; height: 44px !important; }
        }
      `}</style>

      <div className="lp-root">

        {/* ── Organic background blobs ── */}
        {[
          { w: 480, h: 420, left: "-8%",  top: "-12%", c: "rgba(23,165,198,0.09)",  delay: 0,   dur: 14 },
          { w: 360, h: 360, left: "72%",  top: "-5%",  c: "rgba(14,143,171,0.08)",  delay: 2,   dur: 17 },
          { w: 420, h: 380, left: "-5%",  top: "60%",  c: "rgba(31,192,224,0.07)",  delay: 1,   dur: 15 },
          { w: 500, h: 440, left: "65%",  top: "55%",  c: "rgba(23,165,198,0.08)",  delay: 3,   dur: 18 },
          { w: 280, h: 260, left: "38%",  top: "2%",   c: "rgba(94,214,236,0.07)",  delay: 1.5, dur: 12 },
        ].map((b, i) => (
          <motion.div
            key={i}
            className="lp-blob"
            style={{ width: b.w, height: b.h, left: b.left, top: b.top, background: b.c }}
            animate={{ scale: [1, 1.06, 0.97, 1], x: [0, 10, -6, 0], y: [0, -8, 5, 0] }}
            transition={{ duration: b.dur, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* ── Floating cleaning icons ── */}
        <div className="lp-floats">
          {/* bubbles */}
          {[
            { size: 72,  left: "4%",   top: "8%",  delay: 0,   dur: 9  },
            { size: 48,  left: "88%",  top: "12%", delay: 1.3, dur: 8  },
            { size: 56,  left: "6%",   top: "72%", delay: 0.7, dur: 10 },
            { size: 38,  left: "90%",  top: "65%", delay: 0.4, dur: 7  },
            { size: 28,  left: "78%",  top: "42%", delay: 1.8, dur: 8  },
            { size: 22,  left: "18%",  top: "40%", delay: 2.2, dur: 6  },
            { size: 44,  left: "50%",  top: "88%", delay: 0.9, dur: 11 },
            { size: 32,  left: "35%",  top: "4%",  delay: 1.6, dur: 9  },
          ].map((b, i) => (
            <motion.div key={`b${i}`} className="lp-float"
              style={{ left: b.left, top: b.top, width: b.size, height: b.size, color: "#17A5C6" }}
              animate={{ y: [0, -14, 0], opacity: [0.22, 0.42, 0.22], rotate: [0, i%2===0?4:-4, 0] }}
              transition={{ duration: b.dur, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
            >
              <BubbleIcon style={{ width: "100%", height: "100%" }} />
            </motion.div>
          ))}

          {/* spray bottles */}
          {[
            { size: 44, left: "92%", top: "3%",  delay: 0.5, dur: 10 },
            { size: 36, left: "3%",  top: "28%", delay: 2.0, dur: 12 },
          ].map((s, i) => (
            <motion.div key={`s${i}`} className="lp-float"
              style={{ left: s.left, top: s.top, width: s.size, height: s.size, color: "#0e8fab" }}
              animate={{ y: [0, -10, 0], opacity: [0.18, 0.32, 0.18], rotate: [0, i%2===0?3:-3, 0] }}
              transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
            >
              <SprayIcon style={{ width: "100%", height: "100%" }} />
            </motion.div>
          ))}

          {/* sponges */}
          {[
            { size: 58, left: "80%", top: "74%", delay: 1.1, dur: 11 },
            { size: 44, left: "10%", top: "88%", delay: 0.3, dur: 9  },
          ].map((sp, i) => (
            <motion.div key={`sp${i}`} className="lp-float"
              style={{ left: sp.left, top: sp.top, width: sp.size, height: sp.size, color: "#17A5C6" }}
              animate={{ y: [0, -12, 0], opacity: [0.16, 0.28, 0.16], rotate: [0, i%2===0?3:-3, 0] }}
              transition={{ duration: sp.dur, delay: sp.delay, repeat: Infinity, ease: "easeInOut" }}
            >
              <SpongeIcon style={{ width: "100%", height: "100%" }} />
            </motion.div>
          ))}

          {/* sparkle dots */}
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div key={`dot${i}`}
              style={{
                position: "absolute",
                left: `${(i * 17 + 5) % 94}%`,
                top: `${(i * 23 + 7) % 91}%`,
                width: i % 4 === 0 ? 5 : i % 3 === 0 ? 3.5 : 2.5,
                height: i % 4 === 0 ? 5 : i % 3 === 0 ? 3.5 : 2.5,
                borderRadius: "50%",
                background: i % 3 === 0 ? "#17A5C6" : i % 2 === 0 ? "#5ed6ec" : "#b3eaf5",
              }}
              animate={{ opacity: [0, i % 2 === 0 ? 0.55 : 0.35, 0], scale: [0.4, 1.3, 0.4] }}
              transition={{ duration: 3 + (i % 5), delay: i * 0.32, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>

        {/* ══ LOGIN CARD ══ */}
        <motion.div
          className="lp-card"
          initial={{ opacity: 0, y: 36, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* animated top bar */}
          <div className="lp-accent" />

          <div className="lp-body">

            {/* Logo + secure pill */}
            <motion.div
              className="flex flex-col items-center"
              style={{ marginBottom: 20 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Image
                src="/footerlogo.png"
                alt="Clean by Maria"
                width={150}
                height={52}
                className="h-auto"
                style={{ marginBottom: 12 }}
              />
              <div className="lp-secure-pill">
                <ShieldCheck size={11} />
                Secure Login
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div
              className="text-center"
              style={{ marginBottom: 22 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h1 style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: 28,
                fontWeight: 800,
                color: "#0d3d4d",
                lineHeight: 1.25,
                marginBottom: 7,
              }}>
                {otpSent ? "Check your inbox" : "Welcome back"}
              </h1>
              <p style={{ fontSize: 13.5, color: "#7fa9b5", fontWeight: 500, lineHeight: 1.5 }}>
                {otpSent
                  ? <><span style={{ color: "#17A5C6", fontWeight: 700 }}>{email}</span> — enter the 6-digit code we sent</>
                  : "Sign in to manage your bookings"
                }
              </p>
            </motion.div>

            {/* Stepper */}
            <LoginStepper step={otpSent ? 2 : 1} />

            {/* Forms */}
            <AnimatePresence mode="wait">
              {!otpSent ? (
                <motion.div key="email"
                  initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 18 }} transition={{ duration: 0.28 }}
                >
                  <Form {...emailForm}>
                    <form onSubmit={emailForm.handleSubmit(handleGetOtp)} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      <FormField control={emailForm.control} name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel style={{ fontSize: 13, fontWeight: 700, color: "#3d7a8a", display: "block", marginBottom: 7 }}>
                              Email address
                            </FormLabel>
                            <FormControl>
                              <div style={{ position: "relative" }}>
                                <LucideMail
                                  size={17}
                                  style={{ position: "absolute", left: 15, top: "50%", transform: "translateY(-50%)", color: "#17A5C6" }}
                                />
                                <input {...field} type="email" placeholder="you@example.com" className="lp-input" />
                              </div>
                            </FormControl>
                            <FormMessage style={{ fontSize: 12, marginTop: 5 }} />
                          </FormItem>
                        )}
                      />
                      <button type="submit" disabled={getOtpMutation.isPending} className="lp-btn-primary">
                        {getOtpMutation.isPending
                          ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Sending…</>
                          : <>Get OTP <ArrowRight size={16} /></>}
                      </button>
                    </form>
                  </Form>
                </motion.div>
              ) : (
                <motion.div key="otp"
                  initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.28 }}
                >
                  <Form {...otpForm}>
                    <form onSubmit={otpForm.handleSubmit(handleVerifyOtp)} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      <FormField control={otpForm.control} name="email"
                        render={({ field }) => (
                          <FormItem className="hidden">
                            <FormControl><input type="email" {...field} disabled /></FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField control={otpForm.control} name="otp"
                        render={() => (
                          <FormItem>
                            <FormLabel style={{ fontSize: 13, fontWeight: 700, color: "#3d7a8a", display: "block", marginBottom: 10 }}>
                              Verification code
                            </FormLabel>
                            <FormControl>
                              <div className="lp-otp-wrap">
                                <OtpInput
                                  value={otp} onChange={setOtp} numInputs={6}
                                  renderSeparator={<span style={{ width: 6 }} />}
                                  renderInput={(props) => <input {...props} />}
                                  containerStyle={{ display: "flex", justifyContent: "space-between", width: "100%" }}
                                />
                              </div>
                            </FormControl>
                            <FormMessage style={{ fontSize: 12, marginTop: 5 }} />
                          </FormItem>
                        )}
                      />
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <button type="button"
                          onClick={() => getOtpMutation.mutate({ email }, {
                            onSuccess: () => success("OTP resent"),
                            onError: (e) => showError(e),
                          })}
                          disabled={getOtpMutation.isPending}
                          style={{ fontSize: 13, fontWeight: 700, color: "#17A5C6", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, opacity: getOtpMutation.isPending ? 0.5 : 1 }}
                        >
                          {getOtpMutation.isPending
                            ? <><Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> Sending…</>
                            : "↻ Resend code"}
                        </button>
                        <button type="button"
                          onClick={() => { setOtpSent(false); setOtp(""); }}
                          style={{ fontSize: 13, fontWeight: 600, color: "#9eadb5", background: "none", border: "none", cursor: "pointer" }}
                        >
                          ← Change email
                        </button>
                      </div>
                      <button type="submit" disabled={verifyOtpMutation.isPending || otp.length !== 6} className="lp-btn-primary">
                        {verifyOtpMutation.isPending
                          ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Verifying…</>
                          : <><ShieldCheck size={16} /> Verify & Sign In</>}
                      </button>
                    </form>
                  </Form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Divider + back link */}
            <div className="lp-divider">
              <span style={{ fontSize: 11, color: "#c5dde5", fontWeight: 600, whiteSpace: "nowrap" }}>or</span>
            </div>

            <div style={{ textAlign: "center" }}>
              <Link href="/" className="lp-back">
                <ArrowLeft size={14} />
                Back to Home
              </Link>
            </div>
          </div>

          {/* Tagline */}
          <motion.p
            className="lp-tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
          >
            ✦ Professional cleaning, trusted since day one
          </motion.p>
        </motion.div>

      </div>

      {/* spin keyframe for Loader2 */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}
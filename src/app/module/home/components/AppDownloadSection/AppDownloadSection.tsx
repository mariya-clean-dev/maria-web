"use client";

import Image from "next/image";
import styles from "./AppDownloadSection.module.css";
import { motion } from "framer-motion";
import { CalendarPlus, Clock, CreditCard, MessageCircle, Sparkles } from "lucide-react";

export default function AppDownloadSection() {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>

        {/* Background Image */}
        <Image
          src="/adsection/bg.png"
          alt="background"
          fill
          className={styles.bg}
          priority
        />

        <div className={styles.content}>

          {/* LEFT */}
          <motion.div
            className={styles.left}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.badge}>
            <Sparkles size={14} />
            NOW AVAILABLE
            </span>
            <h2 className={styles.heading}>
              Book Your Home <span>Cleaning</span> in Seconds
            </h2>

            <p className={styles.desc}>
              Schedule cleaning, manage bookings, track your cleaner, and stay updated — all from one simple app.
            </p>

            <div className={styles.features}>
            <div className={styles.featureItem}>
                <CalendarPlus size={16} />
                <p>Easy Booking</p>
            </div>

            <div className={styles.featureItem}>
                <Clock size={16} />
                <p>Schedule Tracking</p>
            </div>

            <div className={styles.featureItem}>
                <MessageCircle size={16} />
                <p>Seamless Communication</p>
            </div>

            <div className={styles.featureItem}>
                <CreditCard size={16} />
                <p>Secure Payments</p>
            </div>
            </div>

            {/* Store buttons */}
            <div className={styles.storeButtons}>

            {/* Apple */}
            <a 
                href="https://apps.apple.com/in/app/clean-by-maria/id6746816134" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.storeBtn}
            >
                <img 
                src="/adsection/Apple.svg" 
                alt="Apple" 
                className={styles.storeIcon}
                />
                <div>
                <span className={styles.small}>Download on the</span>
                <p>App Store</p>
                </div>
            </a>

            {/* Google */}
            <a 
                href="https://play.google.com/store/apps/details?id=com.maria.cleaning.admin" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.storeBtn}
            >
                <img 
                src="/adsection/Playstore.svg" 
                alt="Google Play" 
                className={styles.storeIcon}
                />
                <div>
                <span className={styles.small}>GET IT ON</span>
                <p>Google Play</p>
                </div>
            </a>

            </div>

            {/* Rating */}
            {/* <div className={styles.rating}>
              <div className={styles.stars}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <LucideStar key={i} size={16} />
                ))}
              </div>
              <p>
                <span>4.8</span> | 10k+ downloads
              </p>
            </div> */}
          </motion.div>

          {/* RIGHT */}
          <motion.div
            className={styles.right}
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src="/adsection/phone.png"
              alt="app preview"
              width={420}
              height={600}
              className={styles.phone}
              priority
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
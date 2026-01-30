"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";
import { useRouter, usePathname } from "next/navigation";


export default function Footer(){

  const router = useRouter();
const pathname = usePathname();

const handleFooterNavigation = (
  e: React.MouseEvent<HTMLAnchorElement>,
  sectionId: string
) => {
  e.preventDefault();

  // Navigate with hash
  router.push(`/#${sectionId}`);

  // Clean URL + smooth scroll
  setTimeout(() => {
    window.history.replaceState(null, "", "/");

    document
      .getElementById(sectionId)
      ?.scrollIntoView({ behavior: "smooth" });
  }, 50);
};


  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        {/* Top grid */}
        <div className={styles.topGrid}>
          {/* Brand */}
          <div className={styles.brand}>
            <Image
              src="/footerlogo.png"
              alt="Clean by Maria"
              width={200}
              height={80}
              priority
            />
            <h3>
              Making homes happier,
              <br /> one clean at a time.
            </h3>
          </div>

          {/* Service Area */}
          <div className={styles.column}>
            <h4>SERVICE AREA</h4>
            <ul>
              <li>Contra Costa County</li>
              <li>East Bay</li>
              <li>San Francisco</li>
              <li>North Bay</li>
            </ul>
          </div>

          {/* Company */}
          <div className={styles.column}>
            <h4>COMPANY</h4>
            <ul>
              <li><Link href="/" onClick={(e) => handleFooterNavigation(e, "about")}>About</Link></li>
              <li><Link href="/" onClick={(e) => handleFooterNavigation(e, "services")}>Services</Link></li>
              <li><Link href="/" onClick={(e) => handleFooterNavigation(e, "pricing")}>Pricing</Link></li>
              <li><Link href="/" onClick={(e) => handleFooterNavigation(e, "reviews")}>Reviews</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div className={styles.column}>
            <h4>SOCIAL</h4>
            <ul>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Bottom */}
        <div className={styles.bottom}>
          <div className={styles.contact}>
            <span>info@cleanmaria.com</span>
            <span>925-539-2941</span>
          </div>

          <p className={styles.copy}>
            © {new Date().getFullYear()} Clean by Maria.Designed and Developed by <a href="https://palqar.com/about"><span>Palqar Technologies</span></a>
          </p>
        </div>
      </div>
    </footer>
  );
}

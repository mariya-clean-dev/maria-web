/* eslint-disable react/no-unescaped-entities */

import React from 'react';
import Link from 'next/link';

import styles from '../Legal.module.css';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className={styles.legalWrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Terms of <span>Service</span></h1>
        <p className={styles.date}>Last Updated: June 4, 2025</p>

        <div>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Account Creation and Use</h2>
            <p className={styles.text}>
              <strong>Account Registration:</strong> When you book a cleaning service with Clean Maria,
              an account will be automatically created using the information you provide (email, name,
              phone, service address). You agree to provide accurate and updated information.
            </p>
            <p className={styles.text}>
              <strong>Account Security:</strong> You are responsible for maintaining your account
              confidentiality and agree to notify us immediately of unauthorized use.
            </p>
            <p className={styles.text}>
              <strong>Eligibility:</strong> By using the service, you confirm that you are at least 18
              years old and legally able to enter into agreements.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>2. Services Offered</h2>
            <p className={styles.text}>
              <strong>Description:</strong> Clean Maria is a platform for booking professional cleaning
              services including residential, deep, and commercial cleaning.
            </p>
            <p className={styles.text}>
              <strong>Service Providers:</strong> We connect you with independent cleaners. Clean Maria
              is not responsible for the actual cleaning performed.
            </p>
            <p className={styles.text}>
              <strong>Booking Process:</strong> Bookings can be made via our website and are subject to
              availability.
            </p>
            <p className={styles.text}>
              <strong>Changes and Cancellations:</strong> Cancellations must be made at least 24 hours
              in advance to avoid a fee.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>3. Payments and Billing</h2>
            <p className={styles.text}>
              <strong>Pricing:</strong> Prices vary based on service type and may change over time.
            </p>
            <p className={styles.text}>
              <strong>Payment:</strong> Payments are securely processed through third-party gateways.
            </p>
            <p className={styles.text}>
              <strong>Taxes:</strong> Applicable taxes will be added during checkout.
            </p>
            <p className={styles.text}>
              <strong>Refunds:</strong> Refunds follow our cancellation policy and are not issued for
              completed services.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>4. User Responsibilities and Conduct</h2>
            <p className={styles.text}>You agree to:</p>
            <ul className={styles.list}>
              <li>Provide accurate property and contact details</li>
              <li>Ensure safe and timely access to your property</li>
              <li>Maintain a safe environment for Cleaners</li>
              <li>Not use the service unlawfully or impersonate others</li>
              <li>Not contact Cleaners directly for services outside Clean Maria</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>5. Intellectual Property</h2>
            <p className={styles.text}>
              All original content, branding, and features are owned by Clean Maria and its licensors.
              Use of trademarks without written consent is prohibited.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>6. Disclaimer of Warranties</h2>
            <p className={styles.text}>
              The service is provided "as is" and "as available". We make no warranties regarding
              availability, reliability, or results of services by independent Cleaners.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>7. Limitation of Liability</h2>
            <p className={styles.text}>
              Clean Maria and its affiliates are not liable for indirect or incidental damages. Our
              liability in the event of property damage is limited to the cost of repair or replacement
              up to a maximum of INR [insert amount], if covered under the Cleaner's insurance.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>8. Indemnification</h2>
            <p className={styles.text}>
              You agree to indemnify and hold harmless Clean Maria and its agents against claims or
              liabilities arising from your use of the service or breach of these terms.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>9. Governing Law</h2>
            <p className={styles.text}>
              These terms are governed by the laws of California, USA. If any provision is invalid, the
              rest will remain in effect.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>10. Changes to Terms</h2>
            <p className={styles.text}>
              We may update these terms at any time. Material changes will be announced 30 days in
              advance. Continued use of the service constitutes acceptance.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>11. Contact Us</h2>
            <p className={styles.text}>
              If you have any questions about these Terms, please contact us at:
              <br />
              <strong>Email:</strong> info@cleanmaria.com
            </p>
          </section>
        </div>

        <div className={styles.redirectCard}>
          <div className={styles.redirectText}>
            Looking for our Privacy Policy?
            <span>Learn how we protect and handle your personal information.</span>
          </div>
          <Link href="/privacy" className={styles.redirectButton}>
            View Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;

// app/privacy/page.tsx
import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-sm text-gray-600 mb-8">
        Last Updated: June 4, 2025
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p className="text-gray-700 leading-relaxed">
          Welcome to [Your Website Name] ("we," "us," or "our"). This Privacy Policy describes how we collect, use, and disclose your personal information when you visit, use our services, or make a purchase from [Your Website Name] (the "Site").
          We are committed to protecting your privacy and handling your data in an open and transparent manner. By using our Site, you agree to the collection and use of information in accordance with this policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          We collect various types of information from and about you, including personal information, to provide and improve our services.
        </p>
        <h3 className="text-xl font-semibold mb-2">A. Information You Provide to Us Directly:</h3>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4">
          <li><strong>Account Registration:</strong> When you create an account, we collect your name, email address, and a password.</li>
          <li><strong>Purchases:</strong> When you make a purchase, we collect your name, billing address, shipping address, email address, phone number, and payment information (processed securely by third-party payment processors like [e.g., Stripe, PayPal]).</li>
          <li><strong>Communications:</strong> When you contact us via forms, email, or live chat, we collect your name, email address, and the content of your message.</li>
          <li><strong>Newsletter Subscriptions:</strong> If you subscribe to our newsletter, we collect your email address and optionally your name.</li>
          <li><strong>User-Generated Content:</strong> If you submit reviews, comments, or other content, we collect the content itself and your associated identifier (e.g., username).</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2">B. Information We Collect Automatically (e.g., via Cookies and Tracking Technologies):</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          When you visit our Site, we automatically collect certain information about your device and your interaction with our Site. This information is primarily used for security, operation, internal analytics, and reporting.
        </p>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4">
          <li><strong>Device Information:</strong> Your IP address, browser type, operating system, device type, and screen resolution.</li>
          <li><strong>Usage Information:</strong> Pages visited, links clicked, time spent on pages, referral sources, and search queries.</li>
          <li><strong>Location Information:</strong> General geographic location derived from your IP address.</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2">C. Information We Collect from Third Parties:</h3>
        <p className="text-gray-700 leading-relaxed">
          We may receive information about you from third-party sources, such as:
        </p>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed">
          <li><strong>Payment Processors:</strong> Confirmation of payment and limited transaction details.</li>
          <li><strong>Analytics Providers:</strong> Data about user behavior and demographics (e.g., Google Analytics).</li>
          <li><strong>Advertising Partners:</strong> Data about your interactions with our ads on other platforms (e.g., Google Ads, Facebook Ads).</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          We use the information we collect for various purposes, including:
        </p>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed">
          <li>To **Provide and Maintain Services:** Operate our website, process transactions, and fulfill orders.</li>
          <li>To **Improve User Experience:** Personalize content, offer tailored products, and enhance site functionality.</li>
          <li>For **Communication:** Send transactional emails, respond to inquiries, and provide customer support.</li>
          <li>For **Marketing and Promotions:** Send newsletters and promotional offers (with your consent where required). You can opt-out at any time via the unsubscribe link in our emails.</li>
          <li>For **Analytics and Research:** Analyze trends, usage, and activities to improve our services.</li>
          <li>For **Security and Fraud Prevention:** Detect and prevent fraudulent or unauthorized activity.</li>
          <li>For **Legal Compliance:** Comply with applicable laws, regulations, and legal requests.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. How We Share Your Information</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          We may share your personal information with third parties in the following circumstances:
        </p>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed">
          <li><strong>Service Providers:</strong> With third-party vendors who perform services on our behalf (e.g., payment processing, hosting, analytics, email delivery, customer support). These providers are obligated to protect your information.</li>
          <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, your information may be transferred.</li>
          <li><strong>With Your Consent:</strong> When we have your explicit permission.</li>
          <li><strong>For Legal Reasons:</strong> To comply with laws, regulations, legal processes, or governmental requests, or to protect our rights, property, or safety.</li>
          <li><strong>Aggregated or Anonymized Data:</strong> We may share data that cannot directly identify you for research, analytics, or marketing.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Cookies and Tracking Technologies</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          We use cookies and similar tracking technologies (like web beacons and pixels) to track activity on our Site and hold certain information.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>How We Use Them:</strong>
        </p>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4">
          <li>**Essential functionality:** To make our website work properly (e.g., shopping cart, user login).</li>
          <li>**Performance and analytics:** To understand how users interact with our site and improve performance (e.g., Google Analytics).</li>
          <li>**Advertising and targeting:** To deliver relevant ads and measure campaign effectiveness (e.g., Facebook Pixel).</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          <strong>Your Choices Regarding Cookies:</strong> Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies. However, if you choose to decline cookies, you may not be able to use some portions of our Site.
          [**Optional: If you use a cookie consent banner, mention it here. E.g., "Upon your first visit, you will be presented with a cookie consent banner, allowing you to manage your preferences."**]
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
        <p className="text-gray-700 leading-relaxed">
          We implement reasonable security measures to protect the personal information we collect from unauthorized access, use, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
        <p className="text-gray-700 leading-relaxed">
          We retain your personal information for as long as necessary to fulfill the purposes for which we collected it, including for legal, accounting, or reporting requirements.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Your Data Protection Rights</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Depending on your location and applicable data protection laws, you may have the following rights regarding your personal information:
        </p>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed">
          <li>**Right to Access:** Request copies of your personal data.</li>
          <li>**Right to Rectification:** Request corrections to inaccurate or incomplete information.</li>
          <li>**Right to Erasure (Right to be Forgotten):** Request deletion of your personal data under certain conditions.</li>
          <li>**Right to Restrict Processing:** Request restriction of processing your personal data under certain conditions.</li>
          <li>**Right to Object to Processing:** Object to certain data processing activities (e.g., for direct marketing).</li>
          <li>**Right to Data Portability:** Request transfer of your data to another organization or directly to you.</li>
          <li>**Right to Withdraw Consent:** Withdraw consent if processing is based on consent.</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-4">
          To exercise any of these rights, please contact us using the details below. We may require specific information to confirm your identity.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">9. International Data Transfers (If Applicable)</h2>
        <p className="text-gray-700 leading-relaxed">
          If you are located outside of India and provide personal information to us, please be aware that your personal information may be transferred to, stored, and processed in India, where our servers are located and our central database is operated. Data protection laws in India may be different from those in your country of residence. By using our Site or providing us with your information, you consent to such transfer, storage, and processing.
        </p>
        <p className="text-gray-700 leading-relaxed mt-2">
          For users in the European Economic Area (EEA) or UK, we implement appropriate safeguards such as Standard Contractual Clauses (SCCs) approved by the European Commission or UK ICO, or rely on adequacy decisions, for international data transfers.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">10. Children's Privacy</h2>
        <p className="text-gray-700 leading-relaxed">
          Our Site is not intended for individuals under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us. If we become aware that we have collected information from a child without parental consent, we will take steps to remove that information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">11. Links to Other Websites</h2>
        <p className="text-gray-700 leading-relaxed">
          Our Site may contain links to other websites not operated by us. We advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">12. Changes to This Privacy Policy</h2>
        <p className="text-gray-700 leading-relaxed">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">13. Contact Us</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          If you have any questions about this Privacy Policy, your data, or would like to exercise any of your data protection rights, please contact us:
        </p>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed">
          <li><strong>By email:</strong> [Your Email Address, e.g., privacy@[yourwebsitename].com]</li>
          <li><strong>By visiting this page on our website:</strong> [Link to your contact page, e.g., https://www.yourwebsitename.com/contact]</li>
          <li><strong>By mail:</strong>
            <address className="not-italic mt-2">
              [Your Company Name]<br/>
              [Your Street Address]<br/>
              [Your City, State/Province, Postal Code, Country, e.g., Kozhikode, Kerala, 673001, India]
            </address>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
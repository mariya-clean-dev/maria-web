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
          Welcome to Clean Maria ("we," "us," or "our"). This Privacy Policy describes how we collect, use, and disclose your personal information when you visit, use our cleaning service booking site, https://cleanmaria.com/ (the "Site").
          We are committed to protecting your privacy and handling your data in an open and transparent manner. By using our Site and booking our services, you agree to the collection and use of information in accordance with this policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          We collect various types of information from and about you to provide and facilitate our cleaning services.
        </p>
        <h3 className="text-xl font-semibold mb-2">A. Information You Provide to Us Directly:</h3>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4">
          <li><strong>Booking a Service & Account Creation:</strong> When you book a cleaning service, we collect necessary information to fulfill your service request and automatically create an account for you. This includes your name, service address, email address, phone number, and payment information (processed securely by third-party payment processors).</li>
          <li><strong>Communications:</strong> When you contact us via email or phone calls, we collect your name, contact information, and the content of your communication to respond to your inquiries and provide customer support.</li>
          {/* Removed Newsletter Subscriptions and User-Generated Content as per user's description. If you add these later, re-include. */}
        </ul>
        <h3 className="text-xl font-semibold mb-2">B. Operational Information We Collect Automatically:</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          When you visit our Site, our web servers automatically collect limited operational data that is strictly necessary for the security and proper functioning of the Site. This information does not personally identify you or track your Browse activity across other websites.
        </p>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4">
          <li><strong>Technical Data:</strong> Your IP address, browser type, operating system, and the date/time of your visit. This data is used for debugging, security, and to ensure the reliable delivery of our website.</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2">C. Information We Collect from Third Parties:</h3>
        <p className="text-gray-700 leading-relaxed">
          We may receive limited information about you from third-party sources directly related to the provision of our services:
        </p>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed">
          <li><strong>Payment Processors:</strong> We receive confirmation of payment from our payment processors, along with limited transaction details, to confirm your booking.</li>
          {/* Removed Analytics Providers and Advertising Partners based on "no cookies or tracking" */}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          We use the information we collect for the following purposes:
        </p>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed">
          <li>To **Provide and Fulfill Services:** To process your cleaning service bookings, manage your account, and deliver the requested services.</li>
          <li>For **Communication:** To send you booking confirmations, service reminders, updates, and to respond to your inquiries via email or phone.</li>
          <li>For **Security and Fraud Prevention:** To detect, prevent, and address fraudulent or unauthorized activity and to protect the security and integrity of our Site and our users.</li>
          <li>For **Legal Compliance:** To comply with applicable laws, regulations, legal processes, or governmental requests.</li>
          {/* Removed "Improve User Experience" and "Analytics and Research" and "Marketing and Promotions" as they imply data collection not mentioned by user. */}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. How We Share Your Information</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          We may share your personal information with third parties only when necessary to provide our services, in the following circumstances:
        </p>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed">
          <li><strong>With Service Providers:</strong> We engage third-party service providers to perform functions on our behalf, such as payment processing and potentially scheduling/operational software if applicable. These providers only have access to personal information needed to perform their functions and are contractually obligated to maintain the confidentiality and security of your information.</li>
          <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, asset sale, or other business transaction, your personal information may be transferred as part of that transaction.</li>
          <li><strong>For Legal Reasons:</strong> We may disclose your information if required to do so by law or in the good faith belief that such action is necessary to:
            <ul className="list-disc list-inside ml-5">
              <li>Comply with a legal obligation.</li>
              <li>Protect and defend our rights or property.</li>
              <li>Prevent or investigate possible wrongdoing in connection with the Site.</li>
              <li>Protect the personal safety of users of the Site or the public.</li>
              <li>Protect against legal liability.</li>
            </ul>
          </li>
          {/* Removed "With Your Consent" if no mechanism for consent, "With Affiliates" if not applicable, and "Aggregated or Anonymized Data" if no analytics. */}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Cookies and Tracking Technologies</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Clean Maria does not use cookies for analytics, advertising, or tracking purposes. We only use **strictly necessary cookies** (also known as essential or functional cookies) that are absolutely required for the core functionality of our cleaning service booking site.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>How We Use Them:</strong>
        </p>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4">
          <li>**Essential functionality:** To enable features like remembering your service selections during a booking session, maintaining your login session, and ensuring the secure processing of your service requests.</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          These essential cookies do not store any personal information beyond what is necessary for the website to function correctly. Since they are strictly necessary for the provision of our services, explicit consent is generally not required for their use. You cannot disable these cookies through our site, as doing so would prevent the website from functioning properly.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
        <p className="text-gray-700 leading-relaxed">
          We implement reasonable security measures to protect the personal information we collect from unauthorized access, use, disclosure, alteration, or destruction. However, please be aware that no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
        <p className="text-gray-700 leading-relaxed">
          We retain your personal information for as long as necessary to fulfill the purposes for which we collected it, including for the purposes of satisfying any legal, accounting, or reporting requirements related to your service bookings.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Your Data Protection Rights</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Depending on your location and applicable data protection laws, you may have the following rights regarding your personal information:
        </p>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed">
          <li>**Right to Access:** You have the right to request copies of your personal data we hold.</li>
          <li>**Right to Rectification:** You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
          <li>**Right to Erasure (Right to be Forgotten):** You have the right to request that we erase your personal data under certain conditions.</li>
          <li>**Right to Restrict Processing:** You have the right to request that we restrict the processing of your personal data under certain conditions.</li>
          <li>**Right to Object to Processing:** You have the right to object to our processing of your personal data under certain conditions (e.g., if we were to engage in direct marketing you didn't consent to).</li>
          <li>**Right to Data Portability:** You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
          <li>**Right to Withdraw Consent:** If we are relying on your consent to process your personal information, you have the right to withdraw that consent at any time.</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-4">
          To exercise any of these rights, please contact us using the contact details provided below. We may require specific information from you to help us confirm your identity and process your request.
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
          Our Site is not intended for individuals under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us. If we become aware that we have collected information from a child without verification of parental consent, we will take steps to remove that information from our servers.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">11. Links to Other Websites</h2>
        <p className="text-gray-700 leading-relaxed">
          Our Site may contain links to other websites that are not operated by us (e.g., payment processor sites). If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">12. Changes to This Privacy Policy</h2>
        <p className="text-gray-700 leading-relaxed">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">13. Contact Us</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          If you have any questions about this Privacy Policy, your data, or would like to exercise any of your data protection rights, please contact us:
        </p>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed">
          <li><strong>By email:</strong> info@cleanmaria.com</li>
          <li><strong>By visiting this page on our website:</strong> <a href="https://cleanmaria.com/" className="text-blue-600 hover:underline">https://cleanmaria.com/</a></li>
          <li><strong>By mail:</strong>
            <address className="not-italic mt-2">
              Clean Maria<br/>
            </address>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
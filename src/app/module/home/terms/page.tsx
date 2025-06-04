/* eslint-disable react/no-unescaped-entities */

import React from 'react';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="text-sm text-gray-600 mb-8">Last Updated: June 4, 2025</p>

      <div className="space-y-6 text-gray-800 text-base">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Account Creation and Use</h2>
          <p>
            <strong>Account Registration:</strong> When you book a cleaning service with Clean Maria,
            an account will be automatically created using the information you provide (email, name,
            phone, service address). You agree to provide accurate and updated information.
          </p>
          <p>
            <strong>Account Security:</strong> You are responsible for maintaining your account
            confidentiality and agree to notify us immediately of unauthorized use.
          </p>
          <p>
            <strong>Eligibility:</strong> By using the service, you confirm that you are at least 18
            years old and legally able to enter into agreements.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. Services Offered</h2>
          <p>
            <strong>Description:</strong> Clean Maria is a platform for booking professional cleaning
            services including residential, deep, and commercial cleaning.
          </p>
          <p>
            <strong>Service Providers:</strong> We connect you with independent cleaners. Clean Maria
            is not responsible for the actual cleaning performed.
          </p>
          <p>
            <strong>Booking Process:</strong> Bookings can be made via our website and are subject to
            availability.
          </p>
          <p>
            <strong>Changes and Cancellations:</strong> Cancellations must be made at least 24 hours
            in advance to avoid a fee.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Payments and Billing</h2>
          <p>
            <strong>Pricing:</strong> Prices vary based on service type and may change over time.
          </p>
          <p>
            <strong>Payment:</strong> Payments are securely processed through third-party gateways.
          </p>
          <p>
            <strong>Taxes:</strong> Applicable taxes will be added during checkout.
          </p>
          <p>
            <strong>Refunds:</strong> Refunds follow our cancellation policy and are not issued for
            completed services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. User Responsibilities and Conduct</h2>
          <p>You agree to:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Provide accurate property and contact details</li>
            <li>Ensure safe and timely access to your property</li>
            <li>Maintain a safe environment for Cleaners</li>
            <li>Not use the service unlawfully or impersonate others</li>
            <li>Not contact Cleaners directly for services outside Clean Maria</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. Intellectual Property</h2>
          <p>
            All original content, branding, and features are owned by Clean Maria and its licensors.
            Use of trademarks without written consent is prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">6. Disclaimer of Warranties</h2>
          <p>
            The service is provided "as is" and "as available". We make no warranties regarding
            availability, reliability, or results of services by independent Cleaners.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">7. Limitation of Liability</h2>
          <p>
            Clean Maria and its affiliates are not liable for indirect or incidental damages. Our
            liability in the event of property damage is limited to the cost of repair or replacement
            up to a maximum of INR [insert amount], if covered under the Cleaner's insurance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">8. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Clean Maria and its agents against claims or
            liabilities arising from your use of the service or breach of these terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">9. Governing Law</h2>
          <p>
            These terms are governed by the laws of California, USA. If any provision is invalid, the
            rest will remain in effect.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">10. Changes to Terms</h2>
          <p>
            We may update these terms at any time. Material changes will be announced 30 days in
            advance. Continued use of the service constitutes acceptance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">11. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
            <br />
            <strong>Email:</strong> info@cleanmaria.com
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfServicePage;

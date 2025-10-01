import React from 'react';
import { useThemeTrigger } from '../../ThemeTrigger';
import './TermsAndConditionsPage.css';

const TermsAndConditionsPage = () => {
  const { darkMode } = useThemeTrigger();

  return (
    <div className={`terms-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="terms-content">
        <header className="terms-header">
          <h1>Terms and Conditions</h1>
          <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>
        </header>

        <section className="terms-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using this website, you accept and agree to be bound by the terms 
            and provision of this agreement. Your use of our services indicates your acceptance 
            of these terms and conditions.
          </p>
        </section>

        <section className="terms-section">
          <h2>2. User Responsibilities</h2>
          <p>
            You agree to use this website only for lawful purposes and in a way that does not 
            infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.
          </p>
          <ul>
            <li>You must not engage in any fraudulent, abusive, or illegal activity</li>
            <li>You must not attempt to gain unauthorized access to our systems</li>
            <li>You are responsible for maintaining the confidentiality of your account information</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>3. Intellectual Property</h2>
          <p>
            All content included on this website, such as text, graphics, logos, images, and 
            software, is the property of our company or its content suppliers and protected by 
            international copyright laws.
          </p>
        </section>

        <section className="terms-section">
          <h2>4. Limitation of Liability</h2>
          <p>
            We shall not be liable for any indirect, incidental, special, consequential, or 
            punitive damages resulting from your access to or use of, or inability to access 
            or use, the website.
          </p>
        </section>

        <section className="terms-section">
          <h2>5. Privacy Policy</h2>
          <p>
            Your use of our website is also governed by our Privacy Policy, which explains how 
            we collect, use, and protect your personal information.
          </p>
        </section>

        <section className="terms-section">
          <h2>6. Modifications to Terms</h2>
          <p>
            We reserve the right to modify these terms and conditions at any time. We will 
            notify users of any changes by posting the new terms on this page.
          </p>
        </section>

        <section className="terms-section">
          <h2>7. Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of 
            [Your Country/State], without regard to its conflict of law provisions.
          </p>
        </section>

        <section className="terms-section">
          <h2>8. Contact Information</h2>
          <p>
            If you have any questions about these Terms and Conditions, please contact us at:
            <br />
            Email: legal@yourcompany.com
            <br />
            Address: [Your Company Address]
          </p>
        </section>

        <div className="terms-acknowledgement">
          <p>
            By continuing to use our services, you acknowledge that you have read, understood, 
            and agree to be bound by these Terms and Conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
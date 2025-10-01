import React from 'react';
import { useThemeTrigger } from '../../ThemeTrigger';
import './PrivacyPolicyPage.css';

const PrivacyPolicyPage = () => {
  const { darkMode } = useThemeTrigger();

  return (
    <div className={`privacy-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="privacy-content">
        <header className="privacy-header">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>
          <p className="policy-summary">
            We are committed to protecting your privacy. This policy explains how we collect, use, 
            and safeguard your information when you use our services.
          </p>
        </header>

        <section className="privacy-section">
          <h2>1. Information We Collect</h2>
          <div className="info-category">
            <h3>Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide to us, including:</p>
            <ul>
              <li>Name and contact information (email, phone number)</li>
              <li>Account credentials and preferences</li>
              <li>Payment information for premium services</li>
              <li>Communication preferences</li>
            </ul>
          </div>

          <div className="info-category">
            <h3>Automatically Collected Information</h3>
            <p>When you use our services, we automatically collect:</p>
            <ul>
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Usage data and analytics</li>
              <li>Cookies and similar technologies</li>
            </ul>
          </div>
        </section>

        <section className="privacy-section">
          <h2>2. How We Use Your Information</h2>
          <p>We use your information for the following purposes:</p>
          <div className="usage-grid">
            <div className="usage-item">
              <h4>Service Delivery</h4>
              <p>To provide and maintain our services, process transactions, and manage your account.</p>
            </div>
            <div className="usage-item">
              <h4>Communication</h4>
              <p>To send important updates, security alerts, and support messages.</p>
            </div>
            <div className="usage-item">
              <h4>Improvement</h4>
              <p>To analyze usage patterns and improve our services and user experience.</p>
            </div>
            <div className="usage-item">
              <h4>Security</h4>
              <p>To protect against fraudulent activities and ensure service security.</p>
            </div>
          </div>
        </section>

        <section className="privacy-section">
          <h2>3. Data Sharing and Disclosure</h2>
          <p>We may share your information in the following circumstances:</p>
          <ul>
            <li><strong>Service Providers:</strong> With trusted third-party vendors who assist in operating our services</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
            <li><strong>Consent:</strong> With your explicit consent for specific purposes</li>
          </ul>
          
          <div className="data-protection">
            <h3>International Data Transfers</h3>
            <p>
              Your information may be transferred to and processed in countries other than your own. 
              We ensure appropriate safeguards are in place to protect your data.
            </p>
          </div>
        </section>

        <section className="privacy-section">
          <h2>4. Data Retention</h2>
          <p>
            We retain your personal information only for as long as necessary to fulfill the purposes 
            outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements.
          </p>
          <div className="retention-info">
            <p><strong>Account Data:</strong> Retained while your account is active plus 2 years</p>
            <p><strong>Analytics Data:</strong> Retained for 3 years in aggregated form</p>
            <p><strong>Legal Requirements:</strong> Retained as required by applicable laws</p>
          </div>
        </section>

        <section className="privacy-section">
          <h2>5. Your Rights and Choices</h2>
          <div className="rights-grid">
            <div className="right-item">
              <h4>Access & Portability</h4>
              <p>Request access to and export of your personal data</p>
            </div>
            <div className="right-item">
              <h4>Correction</h4>
              <p>Update or correct inaccurate information</p>
            </div>
            <div className="right-item">
              <h4>Deletion</h4>
              <p>Request deletion of your personal data</p>
            </div>
            <div className="right-item">
              <h4>Opt-Out</h4>
              <p>Opt-out of marketing communications and certain data processing</p>
            </div>
            <div className="right-item">
              <h4>Restriction</h4>
              <p>Request restriction of processing in certain circumstances</p>
            </div>
            <div className="right-item">
              <h4>Objection</h4>
              <p>Object to processing based on legitimate interests</p>
            </div>
          </div>
          
          <div className="contact-rights">
            <p>
              To exercise any of these rights, please contact us at{' '}
              <a href="mailto:privacy@yourcompany.com">privacy@yourcompany.com</a>
            </p>
          </div>
        </section>

        <section className="privacy-section">
          <h2>6. Cookies and Tracking Technologies</h2>
          <p>We use cookies and similar technologies to:</p>
          <ul>
            <li>Remember your preferences and settings</li>
            <li>Analyze site traffic and usage patterns</li>
            <li>Deliver personalized content and ads</li>
            <li>Provide social media features</li>
          </ul>
          
          <div className="cookie-controls">
            <h3>Cookie Management</h3>
            <p>
              You can control cookies through your browser settings. However, disabling cookies 
              may affect your ability to use certain features of our services.
            </p>
          </div>
        </section>

        <section className="privacy-section">
          <h2>7. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal 
            information against unauthorized access, alteration, disclosure, or destruction.
          </p>
          <div className="security-features">
            <h3>Security Measures Include:</h3>
            <ul>
              <li>SSL/TLS encryption for data in transit</li>
              <li>Regular security assessments and audits</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Employee training on data protection</li>
            </ul>
          </div>
        </section>

        <section className="privacy-section">
          <h2>8. Children's Privacy</h2>
          <p>
            Our services are not intended for children under 13 years of age. We do not knowingly 
            collect personal information from children under 13. If you believe we have collected 
            information from a child, please contact us immediately.
          </p>
        </section>

        <section className="privacy-section">
          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes 
            by posting the new policy on this page and updating the "Last Updated" date. 
            Significant changes will be communicated through email or prominent notices on our services.
          </p>
        </section>

        <section className="privacy-section">
          <h2>10. Contact Us</h2>
          <div className="contact-info">
            <p><strong>Data Protection Officer:</strong></p>
            <p>Email: <a href="mailto:dpo@yourcompany.com">dpo@yourcompany.com</a></p>
            <p>Phone: +1 (555) 123-4567</p>
            <br />
            <p><strong>Mailing Address:</strong></p>
            <p>Your Company Name</p>
            <p>123 Privacy Street</p>
            <p>Data Protection City, DC 12345</p>
            <p>United States</p>
          </div>
        </section>

        <div className="policy-footer">
          <p>
            This Privacy Policy is effective as of the last updated date. By using our services, 
            you acknowledge that you have read and understood this Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
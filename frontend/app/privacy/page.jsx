import LegalLayout, { LegalSection } from "@/components/LegalLayout";

export const metadata = {
  title: "Privacy Notice — Project BMO",
  description:
    "How the Project BMO website collects, uses, and protects personal data, in line with the Philippine Data Privacy Act of 2012.",
};

const UPDATED = "October 2, 2026";
const INSTITUTION = "FEU Roosevelt";

export default function PrivacyPage() {
  return (
    <LegalLayout eyebrow="Legal" title="Privacy Notice" updated={UPDATED}>
      <LegalSection title="1. Who we are">
        <p>
          Project BMO is a BSIT capstone research prototype by Team SHIELD at {INSTITUTION}. This
          notice explains how this <strong>website</strong> handles personal data under the Data
          Privacy Act of 2012 (Republic Act No. 10173). The team&apos;s monitored contact email has
          not yet been provided; publish one before this notice is used for live requests.
        </p>
      </LegalSection>

      <LegalSection title="2. What we collect">
        <p>
          <strong>When you create an account:</strong>
        </p>
        <ul>
          <li>Email address and password, with passwords handled by Supabase Authentication</li>
          <li>First name, last name, and phone number</li>
          <li>Selected role and FSL display preferences, such as Deaf/HoH mode</li>
        </ul>
        <p>
          <strong>When you submit a pilot demonstration request:</strong>
        </p>
        <ul>
          <li>Institution or office name and full address</li>
          <li>Contact name, official email, and phone number</li>
          <li>Any notes you choose to write</li>
        </ul>
        <p>
          <strong>Automatically:</strong> Supabase Authentication keeps a session in browser storage
          so you stay signed in. Hosting and database providers may process standard technical logs,
          such as IP address and request time, according to their settings and policies.
        </p>
        <p>We do not sell personal data or use advertising trackers.</p>
      </LegalSection>

      <LegalSection title="3. Why we use it">
        <ul>
          <li>To create and secure your account and let you sign in</li>
          <li>To respond to pilot demonstration requests and schedule evaluations</li>
          <li>To contact you about your request or account</li>
          <li>To maintain and improve the prototype for capstone research</li>
        </ul>
        <p>
          Registration and pilot-request forms explain the relevant use when you submit your
          information. Confirm the team&apos;s lawful basis and consent process with the institution
          before public launch.
        </p>
      </LegalSection>

      <LegalSection title="4. Who else handles your data">
        <ul>
          <li>
            <strong>Supabase</strong> provides database and authentication services. The configured
            project region has not been confirmed for this notice.
          </li>
          <li>
            <strong>Website hosting:</strong> the production hosting provider has not been confirmed.
          </li>
          <li>
            <strong>Google Fonts:</strong> the site loads the Material Symbols icon font from
            Google&apos;s servers.
          </li>
        </ul>
        <p>
          Confirm the service regions and provider arrangements before publication. Depending on
          those settings, data may be stored or processed outside the Philippines. We do not
          otherwise share data unless the law requires it.
        </p>
      </LegalSection>

      <LegalSection title="5. About the kiosk">
        <p>
          The kiosk is designed to perform sign recognition on-device. The website is separate from
          the kiosk and does not access camera data. Confirm this description against the final
          kiosk system before deployment.
        </p>
      </LegalSection>

      <LegalSection title="6. How long we keep it">
        <p>
          The team has not yet established a confirmed retention schedule for account data or pilot
          requests. Set and publish the applicable retention periods before collecting data in a
          public deployment.
        </p>
      </LegalSection>

      <LegalSection title="7. How we protect it">
        <p>
          Production connections should use HTTPS. Supabase Authentication handles passwords, and
          row-level security restricts access to pilot requests: visitors can submit requests but
          cannot read other people&apos;s data through the public client. No system is perfectly
          secure. Confirm the team&apos;s incident-response and notification process with the
          institution before launch.
        </p>
      </LegalSection>

      <LegalSection title="8. Your rights">
        <p>Under the Data Privacy Act, you may have the right to:</p>
        <ul>
          <li>Be informed about how your data is processed</li>
          <li>Access the personal data held about you</li>
          <li>Object to processing or withdraw consent, where applicable</li>
          <li>Correct inaccurate data</li>
          <li>Request erasure or blocking of data, where applicable</li>
          <li>Request a copy of your data in a common format</li>
          <li>Seek damages or file a complaint as provided by law</li>
        </ul>
        <p>
          The team has not yet provided a monitored contact email for privacy requests. You may
          also contact the{" "}
          <a href="https://privacy.gov.ph" target="_blank" rel="noopener noreferrer">
            National Privacy Commission
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="9. Children">
        <p>
          This site is not directed at children under 18. If you are under 18, please use it with a
          parent or guardian, who should provide any required consent on your behalf.
        </p>
      </LegalSection>

      <LegalSection title="10. Changes">
        <p>
          We may update this notice as the project evolves. The date at the top shows the latest
          version.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
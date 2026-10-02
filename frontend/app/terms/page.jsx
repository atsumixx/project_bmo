import Link from "next/link";
import LegalLayout, { LegalSection } from "@/components/LegalLayout";

export const metadata = {
  title: "Terms of Use — Project BMO",
  description: "Terms for using the Project BMO capstone research website and prototype.",
};

const UPDATED = "October 2, 2026";

export default function TermsPage() {
  return (
    <LegalLayout eyebrow="Legal" title="Terms of Use" updated={UPDATED}>
      <LegalSection title="1. A research prototype">
        <p>
          Project BMO is a BSIT capstone research prototype. It is under evaluation and is not a
          commercial product. Features, accuracy, and availability may change or be withdrawn
          without notice.
        </p>
      </LegalSection>

      <LegalSection title="2. Not for critical communication">
        <p>
          Sign recognition and translation can be wrong. Do not rely on Project BMO alone for
          medical, legal, emergency, or other high-stakes communication. Where accuracy matters,
          use a qualified human interpreter.
        </p>
      </LegalSection>

      <LegalSection title="3. Your account">
        <ul>
          <li>Give accurate information and keep your password private.</li>
          <li>You are responsible for activity under your account.</li>
          <li>Tell the team if you think your account has been accessed without permission.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Acceptable use">
        <p>You agree not to:</p>
        <ul>
          <li>Try to break, probe, or overload the site or its database</li>
          <li>Submit false, harmful, or spam requests</li>
          <li>Access other people&apos;s data or accounts</li>
          <li>Use the project to harass or discriminate against others</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Pilot requests">
        <p>
          A pilot request expresses interest only. It is not a purchase, a contract, or a guarantee
          of a demonstration. Requests are subject to project review, fit, and scheduling.
        </p>
      </LegalSection>

      <LegalSection title="6. Intellectual property">
        <p>
          Project BMO materials are associated with Team SHIELD and FEU Roosevelt. Ownership and
          reuse permissions are subject to the institution&apos;s intellectual-property policy;
          please obtain permission before reusing project materials.
        </p>
      </LegalSection>

      <LegalSection title="7. Disclaimer and liability">
        <p>
          The site and prototype are provided &ldquo;as is&rdquo; without warranties of any kind.
          To the extent the law allows, Team SHIELD and its institution are not liable for losses
          arising from use of, or inability to use, the site or prototype.
        </p>
      </LegalSection>

      <LegalSection title="8. Privacy">
        <p>
          How the website handles personal data is explained in our{" "}
          <Link href="/privacy">Privacy Notice</Link>.
        </p>
      </LegalSection>

      <LegalSection title="9. Governing law and changes">
        <p>
          These terms are governed by the laws of the Republic of the Philippines. We may update
          them as the project evolves, and continued use means you accept the updated version.
          Questions: the team contact email has not yet been provided and must be published before
          launch.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
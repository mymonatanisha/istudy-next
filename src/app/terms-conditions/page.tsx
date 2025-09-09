import Link from 'next/link';

export default function TermsConditionsPage() {
  return (
    <main className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Effective Date</h2>
          <p>Effective Date: 27/05/2025</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Welcome</h2>
          <p>
            Welcome to <strong>EnamNotes.com</strong>, a platform built to empower beginners and students in their journey to master coding skills.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Agreement to Terms</h2>
          <p>
            By accessing and using our website, you agree to comply with and be bound by the following terms and conditions. If you disagree with any part of these terms, please do not use the site.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium">1. Use of the Website</h3>
          <p>
            You agree to use this website only for lawful educational purposes and in a way that does not infringe the rights or restrict the use of others.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium">2. Content Ownership</h3>
          <p>
            All content on this site, including articles, videos, infographics, and tutorials, is owned by EnamNotes unless otherwise stated. You may reference the material with proper credit, but redistribution without permission is prohibited.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium">3. User Accounts</h3>
          <p>
            Some features (e.g., enrolling in courses) may require account creation. You agree to provide accurate information and to keep your credentials secure.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium">4. Limitation of Liability</h3>
          <p>
            We aim to provide accurate, up-to-date content. However, EnamNotes is not responsible for any decisions made based on the content, including coding errors or business outcomes.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium">5. External Links</h3>
          <p>
            Our website may link to third-party tools (e.g., GitHub, YouTube). We are not responsible for the content or privacy practices of external sites.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium">6. Modification of Terms</h3>
          <p>
            We reserve the right to change these terms at any time. You’ll be notified of significant changes via email or on this page.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Contact Us</h2>
          <p className="mb-2">If you have any questions or concerns about these Terms and Conditions, please contact us at:</p>
          <ul className="list-disc pl-5">
            <li>
              Email:{' '}
              <Link href="mailto:md.enamul19@gmail.com" target="_blank" rel="noopener noreferrer">
                md.enamul19@gmail.com
              </Link>
            </li>
          </ul>
          <p className="mt-2">
            <Link href="#" target="_blank" rel="noopener noreferrer">
              Dhaka, Bangladesh
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

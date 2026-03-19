import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8">
        <div className="container">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-sm mt-2 opacity-90">Last updated: February 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12">
        <div className="max-w-3xl prose prose-invert">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="text-foreground/80 mb-4">
              AV Bathrooms & Kitchens ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
            <p className="text-foreground/80">
              Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our Services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold mb-3">2.1 Information You Provide Directly</h3>
            <p className="text-foreground/80 mb-4">
              We collect information you voluntarily provide when you:
            </p>
            <ul className="list-disc list-inside text-foreground/80 space-y-2 mb-4">
              <li>Request a quote or estimate</li>
              <li>Fill out contact forms</li>
              <li>Use our Price Calculator tool</li>
              <li>Subscribe to our mailing list</li>
              <li>Contact us via phone, email, or WhatsApp</li>
              <li>Leave testimonials or reviews</li>
            </ul>
            <p className="text-foreground/80 mb-4">
              This information may include: name, email address, phone number, home address, project details, and preferences.
            </p>

            <h3 className="text-xl font-semibold mb-3">2.2 Information Collected Automatically</h3>
            <p className="text-foreground/80 mb-4">
              When you visit our website, we automatically collect certain information, including:
            </p>
            <ul className="list-disc list-inside text-foreground/80 space-y-2">
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>IP address</li>
              <li>Pages visited and time spent on each page</li>
              <li>Referral source</li>
              <li>Device information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
            <p className="text-foreground/80 mb-4">
              We use the information we collect for various purposes:
            </p>
            <ul className="list-disc list-inside text-foreground/80 space-y-2">
              <li>To provide quotes and estimates for bathroom and kitchen services</li>
              <li>To respond to your inquiries and customer service requests</li>
              <li>To send promotional emails and marketing communications (with your consent)</li>
              <li>To improve our website and services</li>
              <li>To analyze website usage and trends</li>
              <li>To comply with legal obligations</li>
              <li>To prevent fraud and enhance security</li>
              <li>To contact you about updates to our services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. How We Share Your Information</h2>
            <p className="text-foreground/80 mb-4">
              We do not sell, trade, or rent your personal information to third parties. However, we may share your information with:
            </p>
            <ul className="list-disc list-inside text-foreground/80 space-y-2 mb-4">
              <li>Our team members and contractors who need the information to provide services</li>
              <li>Service providers who assist us in operating our website and conducting our business</li>
              <li>Legal authorities if required by law</li>
              <li>Business partners with your consent</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
            <p className="text-foreground/80 mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is completely secure.
            </p>
            <p className="text-foreground/80">
              While we strive to protect your personal information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Your Rights and Choices</h2>
            <p className="text-foreground/80 mb-4">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside text-foreground/80 space-y-2">
              <li><strong>Access:</strong> You can request access to your personal data</li>
              <li><strong>Correction:</strong> You can request correction of inaccurate data</li>
              <li><strong>Deletion:</strong> You can request deletion of your data</li>
              <li><strong>Opt-out:</strong> You can opt out of marketing communications at any time</li>
              <li><strong>Portability:</strong> You can request a copy of your data in a portable format</li>
            </ul>
            <p className="text-foreground/80 mt-4">
              To exercise these rights, please contact us at info@avbathrooms.co.uk or call +44 7404 023083.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Cookies and Tracking Technologies</h2>
            <p className="text-foreground/80 mb-4">
              Our website may use cookies and similar tracking technologies to enhance your experience. Cookies are small files stored on your device that help us remember your preferences and analyze website usage.
            </p>
            <p className="text-foreground/80">
              You can control cookie settings through your browser preferences. Disabling cookies may affect the functionality of our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Third-Party Links</h2>
            <p className="text-foreground/80">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">9. Children's Privacy</h2>
            <p className="text-foreground/80">
              Our Services are not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">10. Changes to This Privacy Policy</h2>
            <p className="text-foreground/80">
              We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by updating the "Last updated" date at the top of this page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
            <p className="text-foreground/80 mb-4">
              If you have questions about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <div className="bg-card p-6 rounded-lg border border-border">
              <p className="font-semibold mb-2">AV Bathrooms & Kitchens</p>
              <p className="text-foreground/80">12 Hanson Street</p>
              <p className="text-foreground/80">Glasgow G31 2JW</p>
              <p className="text-foreground/80">United Kingdom</p>
              <p className="mt-4">
                <a href="mailto:info@avbathrooms.co.uk" className="text-primary hover:underline">
                  info@avbathrooms.co.uk
                </a>
              </p>
              <p className="mt-2">
                <a href="tel:+447404023083" className="text-primary hover:underline">
                  +44 7404 023083
                </a>
              </p>
            </div>
          </section>

          <section className="mt-12 pt-8 border-t border-border">
            <p className="text-foreground/80 text-sm mb-6">
              By using our website and services, you acknowledge that you have read and understood this Privacy Policy.
            </p>
            <Link href="/">
              <Button variant="default">Back to Home</Button>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}

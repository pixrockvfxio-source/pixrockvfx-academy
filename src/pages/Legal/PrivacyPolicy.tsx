import { Seo } from '@/components/Seo/Seo';
import { PageHero } from '@/components/ui/PageHero';
import { LegalBody } from './LegalBody';
import { siteConfig, mailtoLink } from '@/config/site';

export default function PrivacyPolicy() {
  const mail = mailtoLink('Privacy enquiry');

  return (
    <>
      <Seo
        title="Privacy Policy"
        description={`How ${siteConfig.name} collects, uses and protects the personal information you share through this website.`}
        path="/privacy-policy"
      />

      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="This template describes how we handle the information you send us. Review it with your legal adviser before publishing."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Privacy Policy' }]}
      />

      <LegalBody>
        <h2>What we collect</h2>
        <p>
          When you submit an enquiry we collect the details you choose to give us: your name, phone number, email
          address, the course you are interested in, and optionally your qualification, city, preferred contact method
          and message.
        </p>
        <p>
          When you submit an enquiry we also record the date and time, your IP address and your browser's user-agent
          string. These are kept for security and abuse prevention — they let us identify automated submissions — and
          are not used for advertising, profiling or tracking you across sites.
        </p>
        <p>
          This website does not set advertising cookies. Any analytics or third-party embeds — such as a map or a
          hosted showreel video — are loaded only where that feature is enabled, and those providers apply their own
          privacy terms.
        </p>

        <h2>Why we collect it</h2>
        <p>
          We use your details for one purpose: to respond to your enquiry and to talk with you about our programmes,
          batch timings and admissions. We do not sell, rent or trade personal information.
        </p>

        <h2>Where it is stored</h2>
        <p>
          Enquiries are stored in a database on our own hosting, and a notification is emailed to our admissions team
          so that we can respond. Your details are not shared with any third party for marketing.
        </p>

        <h2>How long we keep it</h2>
        <p>
          Enquiry records are retained only for as long as they are useful to the admissions conversation, and are
          deleted on request.
        </p>

        <h2>Your choices</h2>
        <p>
          You may ask us at any time to tell you what information we hold about you, to correct it, or to delete it.
          You may also ask us to stop contacting you, and we will.
        </p>

        <h2>Security</h2>
        <p>
          Enquiries submitted through this site are transmitted over HTTPS. No credentials, payment details or
          sensitive personal data are collected by this website.
        </p>

        <h2>Contact</h2>
        <p>
          For any question about this policy, {mail ? <a href={mail}>email us</a> : 'contact the academy'} and we will
          respond.
        </p>

        <p className="text-sm">
          <em>
            This page is a starting template supplied with the website build. It is not legal advice — please have it
            reviewed and adapted to the jurisdiction the academy operates in before launch.
          </em>
        </p>
      </LegalBody>
    </>
  );
}

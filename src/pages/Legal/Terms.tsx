import { Seo } from '@/components/Seo/Seo';
import { PageHero } from '@/components/ui/PageHero';
import { LegalBody } from './LegalBody';
import { siteConfig } from '@/config/site';

export default function Terms() {
  return (
    <>
      <Seo
        title="Terms & Conditions"
        description={`The terms that apply to the use of the ${siteConfig.name} website and to enrolment enquiries made through it.`}
        path="/terms"
      />

      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        description="This template covers use of the website and the basis on which course information is published. Review it with your legal adviser before publishing."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Terms & Conditions' }]}
      />

      <LegalBody>
        <h2>Use of this website</h2>
        <p>
          By using this website you agree to use it lawfully and not to attempt to disrupt, probe or misuse the
          service. The design, text, layout and code of this site belong to {siteConfig.name} unless stated otherwise.
        </p>

        <h2>Course information</h2>
        <p>
          Course structure, duration, module content, software coverage and batch timings are published in good faith
          and may change as the curriculum is updated or as tool availability changes. The details confirmed to you at
          admission take precedence over anything published here.
        </p>

        <h2>No guarantee of employment</h2>
        <p>
          We provide training, mentoring, portfolio guidance, interview preparation and placement assistance as
          described on our Careers page. We do not guarantee employment, placement, salary or any specific career
          outcome, and no statement on this website should be read as such a commitment. Placement assistance is
          subject to the eligibility conditions set out in your enrollment agreement.
        </p>

        <h2>Student work</h2>
        <p>
          Any work shown in the student gallery is published with the artist’s permission and remains the work of that
          artist. Please do not reproduce it without consent.
        </p>

        <h2>Fees</h2>
        <p>
          Fees are not published on this website. They are confirmed to you in writing during admission, inclusive of
          GST, together with any instalment options and what each course includes. Instalment facilities, where
          available, are provided by a third-party finance partner on that partner’s terms. Only the figures confirmed
          to you in writing apply.
        </p>

        <h2>Enquiries</h2>
        <p>
          Submitting an enquiry does not create an enrolment or reserve a seat. Admission is confirmed only through the
          academy’s formal admissions process.
        </p>

        <h2>External links</h2>
        <p>
          This site may link to third-party websites and services. We are not responsible for their content, terms or
          privacy practices.
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

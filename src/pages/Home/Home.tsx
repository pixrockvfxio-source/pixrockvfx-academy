import { Seo, organisationJsonLd } from '@/components/Seo/Seo';
import { Hero } from '@/components/Hero/Hero';
import { AboutIntro } from '@/components/sections/AboutIntro';
import { WhyUs } from '@/components/sections/WhyUs';
import { TrainingApproach } from '@/components/sections/TrainingApproach';
import { CoursesPreview } from '@/components/sections/CoursesPreview';
import { LearningJourney } from '@/components/sections/LearningJourney';
import { SoftwareTools } from '@/components/sections/SoftwareTools';
import { StudentWorkPreview } from '@/components/sections/StudentWorkPreview';
import { CareerSupport } from '@/components/sections/CareerSupport';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/CTASection/CTASection';

export default function Home() {
  return (
    <>
      <Seo
        title="PixRock Academy | VFX Training Inside a Working Studio"
        description="PixRock Academy is the training arm of PixRock, a TPN Gold+ certified VFX studio in Coimbatore. Courses in roto, prep, compositing and matchmove, taught by working artists. First intake April 2027."
        path="/"
        jsonLd={organisationJsonLd()}
      />

      <Hero />
      <AboutIntro />
      <WhyUs />
      <CoursesPreview />
      <TrainingApproach />
      <LearningJourney />
      <SoftwareTools />
      <StudentWorkPreview />
      <CareerSupport />
      <TestimonialsSection />

      <CTASection
        title="Come and see the facility"
        description="Bring your family, meet the faculty and ask us anything. There is no obligation, and we would rather you saw the place before you decide."
        primaryLabel="Book a visit"
      />
    </>
  );
}

import { Seo, organisationJsonLd } from '@/components/Seo/Seo';
import { Hero } from '@/components/Hero/Hero';
import { AboutIntro } from '@/components/sections/AboutIntro';
import { WhyUs } from '@/components/sections/WhyUs';
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
        title="PixRock VFX Academy | Professional VFX Training"
        description="Learn VFX. Create worlds. Build your career. Industry-focused training in roto, paint, matchmove, compositing, 3D, animation and motion graphics — taught on real plates with studio-style reviews."
        path="/"
        jsonLd={organisationJsonLd()}
      />

      <Hero />
      <AboutIntro />
      <WhyUs />
      <CoursesPreview />
      <LearningJourney />
      <SoftwareTools />
      <StudentWorkPreview />
      <CareerSupport />
      <TestimonialsSection />

      <CTASection
        title="Ready to start your VFX journey?"
        description="Tell us where you are now and what you want to build. A counsellor will map out the programme that actually fits — including telling you if none of them do."
      />
    </>
  );
}

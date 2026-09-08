import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RootLayout } from '@/layouts/RootLayout';
import Home from '@/pages/Home/Home';

/**
 * Route table.
 *
 * Home is bundled eagerly because it is the landing page for most visitors;
 * every other page is code-split so the initial download stays small. The
 * <Suspense> boundary lives in RootLayout.
 */
const About = lazy(() => import('@/pages/About/About'));
const Courses = lazy(() => import('@/pages/Courses/Courses'));
const CourseDetails = lazy(() => import('@/pages/CourseDetails/CourseDetails'));
const StudentWork = lazy(() => import('@/pages/StudentWork/StudentWork'));
const Careers = lazy(() => import('@/pages/Careers/Careers'));
const Contact = lazy(() => import('@/pages/Contact/Contact'));
const Enquiry = lazy(() => import('@/pages/Enquiry/Enquiry'));
const PrivacyPolicy = lazy(() => import('@/pages/Legal/PrivacyPolicy'));
const Terms = lazy(() => import('@/pages/Legal/Terms'));
const NotFound = lazy(() => import('@/pages/NotFound/NotFound'));

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/:slug" element={<CourseDetails />} />
        <Route path="student-work" element={<StudentWork />} />
        <Route path="careers" element={<Careers />} />
        <Route path="contact" element={<Contact />} />
        <Route path="enquiry" element={<Enquiry />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<Terms />} />

        {/* Legacy / convenience aliases */}
        <Route path="admissions" element={<Navigate to="/enquiry" replace />} />
        <Route path="portfolio" element={<Navigate to="/student-work" replace />} />

        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

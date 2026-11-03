import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/about/AboutPage.jsx";
import IAFSMPage from "./pages/IAFSMPage.jsx";
import CampusConnectPage from "./pages/CampusConnectPage.jsx";
import PublicationPage from "./pages/publication/PublicationPage.jsx";
import AdminLayout from "./admin/AdminLayout.jsx";
import IndustryInsightPage from "./pages/IndustryInsightsPage.jsx";
import TalentConnectPage from "./pages/TalentConnectPage.jsx";
import ContactUsPage from "./pages/ContactUsPage.jsx";
import MemberShipPage from "./pages/membership/MemberShipPage.jsx";
import MemberDetails from "./pages/membership/member-directory/MemberDetails.jsx";
import TechnologyProvidersPage from "./pages/membership/TechnologyProvidersPage.jsx";
import SystemIntegratorsPage from "./pages/membership/SystemIntegratorsPage.jsx";
import MemberDirectory from "./pages/membership/member-directory/MemberDirectory.jsx";
import RequestFormPage from "./pages/RequestForms/RequestFormPage.jsx";
import LearnMorePage from "./pages/LearnMorePage.jsx";
import EventsPage from "./pages/event/EventsPage.jsx";
import EventDetailsPage from "./pages/event/EventDetailsPage.jsx";
import ExecutiveCouncilPage from "./pages/about/executive-council/ExecutiveCouncilPage.jsx";
import PastPresidentsPage from "./pages/about/past-presidents/PastPresidentsPage.jsx";
import AimsObjectivesPage from "./pages/about/aims-objectives/AimsObjectivesPage.jsx";

import ArticleDetailsPage from "./pages/publication/ArticleDetailsPage.jsx";
import NewsDetailsPage from "./pages/publication/news/NewsDetailsPage.jsx";
import ArticlesPage from "./pages/publication/ArticlesPage.jsx";
import NewsPage from "./pages/publication/news/NewsPage.jsx";

// Helper to scroll to top automatically on route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

// Public Layout Wrapper with Header & Footer
function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans selection:bg-[#0B1B2B] selection:text-white">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Website Routes */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <HomePage />
            </PublicLayout>
          }
        />
        <Route
          path="/home"
          element={
            <PublicLayout>
              <HomePage />
            </PublicLayout>
          }
        />

        {/* /about */}
        <Route
          path="/about"
          element={
            <PublicLayout>
              <AboutPage />
            </PublicLayout>
          }
        />
        <Route
          path="/about-us"
          element={
            <PublicLayout>
              <AboutPage />
            </PublicLayout>
          }
        />

        <Route
          path="/membership"
          element={
            <PublicLayout>
              <MemberShipPage />
            </PublicLayout>
          }
        />

        <Route
          path="/membership/technology-providers"
          element={
            <PublicLayout>
              <TechnologyProvidersPage />
            </PublicLayout>
          }
        />

        <Route
          path="/membership/system-integrators"
          element={
            <PublicLayout>
              <SystemIntegratorsPage />
            </PublicLayout>
          }
        />

        <Route
          path="/industry-insight"
          element={
            <PublicLayout>
              <IndustryInsightPage />
            </PublicLayout>
          }
        />
        <Route
          path="/talent-connect"
          element={
            <PublicLayout>
              <TalentConnectPage />
            </PublicLayout>
          }
        />

        {/* /iafsm and alias /ifsm */}
        <Route
          path="/iafsm"
          element={
            <PublicLayout>
              <IAFSMPage />
            </PublicLayout>
          }
        />
        <Route
          path="/ifsm"
          element={
            <PublicLayout>
              <IAFSMPage />
            </PublicLayout>
          }
        />

        {/* /campus-connect */}
        <Route
          path="/campus-connect"
          element={
            <PublicLayout>
              <CampusConnectPage />
            </PublicLayout>
          }
        />

        {/* /events /event */}
        <Route
          path="/events"
          element={
            <PublicLayout>
              <EventsPage />
            </PublicLayout>
          }
        />
        <Route
          path="/event"
          element={
            <PublicLayout>
              <EventsPage />
            </PublicLayout>
          }
        />

        {/* Event Details */}
        <Route
          path="/event/:slug"
          element={
            <PublicLayout>
              <EventDetailsPage />
            </PublicLayout>
          }
        />

        {/* /publication and alias /publications */}
        <Route
          path="/publication"
          element={
            <PublicLayout>
              <PublicationPage />
            </PublicLayout>
          }
        />
        <Route
          path="/publications"
          element={
            <PublicLayout>
              <PublicationPage />
            </PublicLayout>
          }
        />

        <Route
          path="/publication/articles"
          element={
            <PublicLayout>
              <ArticlesPage />
            </PublicLayout>
          }
        />

        <Route
          path="/publication/:slug"
          element={
            <PublicLayout>
              <ArticleDetailsPage />
            </PublicLayout>
          }
        />
        {/* News */}

        <Route
          path="/publication/news"
          element={
            <PublicLayout>
              <NewsPage />
            </PublicLayout>
          }
        />

        <Route
          path="/publication/news/:slug"
          element={
            <PublicLayout>
              <NewsDetailsPage />
            </PublicLayout>
          }
        />

        {/* /contact-us /contact-us */}
        <Route
          path="/contact-us"
          element={
            <PublicLayout>
              <ContactUsPage />
            </PublicLayout>
          }
        />

        {/* /membership-directory /membership-directory */}

        <Route
          path="/membership/member-directory"
          element={
            <PublicLayout>
              <MemberDirectory />
            </PublicLayout>
          }
        />

        <Route
          path="/membership/member-directory/:slug"
          element={
            <PublicLayout>
              <MemberDetails />
            </PublicLayout>
          }
        />

        <Route
          path="/request-form/:type"
          element={
            <PublicLayout>
              <RequestFormPage />
            </PublicLayout>
          }
        />

        <Route
          path="/learn-more"
          element={
            <PublicLayout>
              <LearnMorePage />
            </PublicLayout>
          }
        />

        <Route
          path="/about/executive-council"
          element={
            <PublicLayout>
              <ExecutiveCouncilPage />
            </PublicLayout>
          }
        />
        <Route
          path="/about/past-presidents"
          element={
            <PublicLayout>
              <PastPresidentsPage />
            </PublicLayout>
          }
        />
        <Route
          path="/about/aims-objectives"
          element={
            <PublicLayout>
              <AimsObjectivesPage />
            </PublicLayout>
          }
        />

        {/* Admin CMS Routes */}
        <Route path="/admin" element={<AdminLayout />} />
        <Route path="/admin/:tab" element={<AdminLayout />} />

        {/* Fallback Catch-all Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

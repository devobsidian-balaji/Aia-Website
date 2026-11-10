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
import GeneralInquiryPopup from "./components/GeneralInquiryPopup.jsx";
import AdminLogin from "./admin/AdminLogin.jsx";
import ProtectedAdminRoute from "./admin/ProtectedAdminRoute.jsx";
import AdminLoginRoute from "./admin/AdminLoginRoute.jsx";

// Helper to scroll to top automatically on route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

const handleInquirySubmit = async (formData) => {
  const API_URL = (
    import.meta.env.VITE_API_URL || "http://localhost:5000/api"
  ).replace(/\/$/, "");

  const endpoint = `${API_URL}/enquiries`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    // Read response as text first
    const responseText = await response.text();

    let result;

    try {
      result = JSON.parse(responseText);
    } catch {
      console.error("Non-JSON API Response:", responseText);
      console.error("API Endpoint:", endpoint);

      throw new Error(
        `Server returned HTML instead of JSON. Check API endpoint: ${endpoint}`
      );
    }

    if (!response.ok || result.success === false) {
      throw new Error(
        result.message || "Inquiry submission failed."
      );
    }

    return result;
  } catch (error) {
    console.error("Inquiry API Error:", error);
    throw error;
  }
};

// Public Layout Wrapper with Header & Footer
function PublicLayout({ children }) {

  const location = useLocation();

  const hideHeaderFooter =
    location.pathname.replace(/\/+$/, "") ===
    "/request-form/membership";

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans selection:bg-[#0B1B2B] selection:text-white">
      {!hideHeaderFooter && <Navbar />}
      <div className="flex-1">{children}</div>
      {!hideHeaderFooter && <Footer />}
       {/* General Inquiry Popup */}
      <GeneralInquiryPopup onSubmit={handleInquirySubmit} />
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
          path="/technology-providers-signup"
          element={
            <PublicLayout>
              <TechnologyProvidersPage />
            </PublicLayout>
          }
        />

        <Route
          path="/system-integrators-signup"
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
          path="/events"
          element={
            <PublicLayout>
              <EventsPage />
            </PublicLayout>
          }
        />

        {/* Event Details */}
        <Route
          path="/events/:slug"
          element={
            <PublicLayout>
              <EventDetailsPage />
            </PublicLayout>
          }
        />

        {/* /publication and alias /publications */}
        {/* <Route
          path="/publication"
          element={
            <PublicLayout>
              <PublicationPage />
            </PublicLayout>
          }
        /> */}
        {/* <Route
          path="/publications"
          element={
            <PublicLayout>
              <PublicationPage />
            </PublicLayout>
          }
        /> */}

        <Route
          path="/publication/articles"
          element={
            <PublicLayout>
              <ArticlesPage />
            </PublicLayout>
          }
        />

        <Route
          path="/publication/articles/:slug"
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
        {/* <Route path="/admin" element={<AdminLayout />} />
        <Route path="/admin/:tab" element={<AdminLayout />} /> */}

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLoginRoute />} />

        {/* Protected Admin CMS */}
        <Route path="/admin" element={<ProtectedAdminRoute />}>
        {/* <Route path="/admin/dashboard" element={<AdminLayout />} /> */}
        <Route
        index
        element={<Navigate to="/admin/dashboard" replace />}
        />
        <Route path="/admin/:tab" element={<AdminLayout />} /></Route>

        {/* Fallback Catch-all Route */}
         <Route path=":tab" element={<AdminLayout />} />
      </Routes>
    </BrowserRouter>
    
  );
}

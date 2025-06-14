import { useEffect } from 'react'; // Import useEffect
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { NotificationButton } from './components/layout/NotificationButton';
import { HomePage } from './pages/HomePage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { EventsPage } from './pages/EventsPage';
import { MyEventsPage } from './pages/MyEventsPage';
import { EventDetailsPage } from './pages/EventDetailsPage';
import { CreateEventPage } from './pages/CreateEventPage';
import { EventTypePage } from './pages/EventTypePage';
import { WeddingServicesPage } from './pages/WeddingServicesPage';
import { WeddingPlacesPage } from './pages/WeddingPlacesPage';
import { EngagementServicesPage } from './pages/EngagementServicesPage';
import { EngagementPlacesPage } from './pages/EngagementPlacesPage';
import { BirthdayServicesPage } from './pages/BirthdayServicesPage';
import { BirthdayPlacesPage } from './pages/BirthdayPlacesPage';
import { GraduationServicesPage } from './pages/GraduationServicesPage';
import { GraduationPlacesPage } from './pages/GraduationPlacesPage';
import { PartyServicesPage } from './pages/PartyServicesPage';
import { PartyPlacesPage } from './pages/PartyPlacesPage';
import { SeminarServicesPage } from './pages/SeminarServicesPage';
import { SeminarPlacesPage } from './pages/SeminarPlacesPage';
import { WorkshopServicesPage } from './pages/WorkshopServicesPage';
import { WorkshopPlacesPage } from './pages/WorkshopPlacesPage';
import { OtherServicesPage } from './pages/OtherServicesPage';
import { OtherPlacesPage } from './pages/OtherPlacesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { FAQPage } from './pages/FAQPage';
import { SupportPage } from './pages/SupportPage';
import { BusinessRegistrationPage } from './pages/BusinessRegistrationPage';
import { ConfirmBookingPage } from './pages/ConfirmBookingPage';
import { PaymentPage } from './pages/PaymentPage';
import { ChatBot } from './components/chat/ChatBot';
import { InvitationPage } from './pages/InvitationPage';
import { GuestListPage } from './pages/GuestListPage';
import { GuestQRCodePage } from './pages/GuestQRCodePage';
import { EventQRCodePage } from './pages/EventQRCodePage';
import { EventGalleryPage } from './pages/EventGalleryPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AuthCallback } from './pages/auth/callback';
import { setAuthToken } from './services/api'; // Import setAuthToken
import { PrivateRoute } from './components/auth/PrivateRoute'; // Import PrivateRoute

export function App() {
  useEffect(() => {
    // Check for token in localStorage on app load
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      // You might want to add a call here to verify the token with the backend
      // and fetch user data if the token is valid, e.g., getCurrentUser()
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900">
        <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <Navbar />
        <NotificationButton />
        <div className="relative flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/my-events" element={<MyEventsPage />} />
            <Route path="/events/:id" element={<EventDetailsPage />} />
            <Route path="/events/create" element={<CreateEventPage />} />
            <Route path="/events/create/type" element={<EventTypePage />} />
            <Route path="/events/create/wedding/services" element={<WeddingServicesPage />} />
            <Route path="/events/create/wedding/places" element={<WeddingPlacesPage />} />
            <Route path="/events/create/engagement/services" element={<EngagementServicesPage />} />
            <Route path="/events/create/engagement/places" element={<EngagementPlacesPage />} />
            <Route path="/events/create/birthday/services" element={<BirthdayServicesPage />} />
            <Route path="/events/create/birthday/places" element={<BirthdayPlacesPage />} />
            <Route path="/events/create/graduation/services" element={<GraduationServicesPage />} />
            <Route path="/events/create/graduation/places" element={<GraduationPlacesPage />} />
            <Route path="/events/create/party/services" element={<PartyServicesPage />} />
            <Route path="/events/create/party/places" element={<PartyPlacesPage />} />
            <Route path="/events/create/seminar/services" element={<SeminarServicesPage />} />
            <Route path="/events/create/seminar/places" element={<SeminarPlacesPage />} />
            <Route path="/events/create/workshop/services" element={<WorkshopServicesPage />} />
            <Route path="/events/create/workshop/places" element={<WorkshopPlacesPage />} />
            <Route path="/events/create/other/services" element={<OtherServicesPage />} />
            <Route path="/events/create/other/places" element={<OtherPlacesPage />} />
            <Route path="/events/gallery" element={<EventGalleryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/business/register" element={<BusinessRegistrationPage />} />
            <Route path="/wedding/confirm-booking" element={<ConfirmBookingPage />} />
            <Route path="/engagement/confirm-booking" element={<ConfirmBookingPage />} />
            <Route path="/birthday/confirm-booking" element={<ConfirmBookingPage />} />
            <Route path="/graduation/confirm-booking" element={<ConfirmBookingPage />} />
            <Route path="/party/confirm-booking" element={<ConfirmBookingPage />} />
            <Route path="/seminar/confirm-booking" element={<ConfirmBookingPage />} />
            <Route path="/workshop/confirm-booking" element={<ConfirmBookingPage />} />
            <Route path="/other/confirm-booking" element={<ConfirmBookingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/invitation" element={<InvitationPage />} />
            <Route path="/invitation/list" element={<GuestListPage />} />
            <Route path="/invitation/individual-qr" element={<GuestQRCodePage />} />
            <Route path="/invitation/event-qr" element={<EventQRCodePage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          </Routes>
        </div>
        <Footer />
        <ChatBot />
      </div>
    </Router>
  );
}
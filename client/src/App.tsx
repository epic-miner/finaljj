import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import StudySpaces from "@/pages/StudySpaces";
import StudySpaceDetails from "@/pages/StudySpaceDetails";
import MyBookings from "@/pages/MyBookings";
import AboutPage from "@/pages/AboutPage";
import AdminDashboard from "@/pages/Admin";
import AdminLogin from "@/pages/AdminLogin";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AdminAuthProvider } from "@/hooks/use-admin-auth";
import { AdminProtectedRoute } from "@/lib/admin-protected-route";

function UserRouter() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/study-spaces" component={StudySpaces} />
          <Route path="/study-spaces/:id" component={StudySpaceDetails} />
          <Route path="/my-bookings" component={MyBookings} />
          <Route path="/about" component={AboutPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function AdminRouter() {
  return (
    <Switch>
      <Route path="/admin/login" component={AdminLogin} />
      <AdminProtectedRoute path="/admin" component={AdminDashboard} />
    </Switch>
  );
}

function Router() {
  const [location] = useLocation();
  
  if (location.startsWith("/admin")) {
    return <AdminRouter />;
  }
  
  return <UserRouter />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminAuthProvider>
        <Router />
        <Toaster />
      </AdminAuthProvider>
    </QueryClientProvider>
  );
}

export default App;

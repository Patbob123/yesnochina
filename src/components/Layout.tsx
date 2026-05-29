import { Outlet } from 'react-router';
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
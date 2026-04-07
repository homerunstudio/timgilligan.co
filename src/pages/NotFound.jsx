import { ArrowLeft } from '@phosphor-icons/react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { ThemeProvider } from '../context/ThemeContext';

export default function NotFound() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-bg-primary">

        <Nav />

        <div className="flex-1 flex flex-col items-center justify-center px-2.5 text-center">
          <h1 className="type-display text-text-primary">404</h1>
          <p className="type-body text-text-primary mt-3">Sorry, this page does not exist!</p>
          <div className="mt-8">
            <Button href="/">
              Return home
              
            </Button>
          </div>
        </div>

        <Footer />

      </div>
    </ThemeProvider>
  );
}

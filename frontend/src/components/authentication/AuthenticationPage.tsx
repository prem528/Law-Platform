 
import { Scale } from 'lucide-react';
import AuthCard from './AuthCard';

const AuthenticationPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray- to-gray-100">
      {/* Header */}
      <header className="w-full py-4 px-6 md:px-10">
        <div className="container max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
             <Scale className="h-8 w-8 text-legal" />
            <h1 className="text-xl md:text-2xl font-bold text-legal">Legal Connect</h1>
          </div>
          <div>
            <a href="#" className="text-sm text-legal-light hover:text-legal hidden md:inline">Need Help?</a>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row py-6 px-4 md:px-10 container max-w-7xl mx-auto">
        <div className="md:w-1/2 flex flex-col justify-center items-center md:items-start mb-8 md:mb-0 md:pr-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-legal mb-4 text-center md:text-left">
            Connect with Legal Professionals
          </h1>
          <p className="text-lg text-gray-600 mb-6 text-center md:text-left">
            Join our platform to streamline client-lawyer collaboration, document management, and legal consultations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="font-medium text-legal">For Clients</h3>
              <p className="text-sm text-gray-600">Access legal advice and track your cases</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="font-medium text-legal">For Lawyers</h3>
              <p className="text-sm text-gray-600">Manage clients and grow your practice</p>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center items-center">
          <div className="w-full max-w-md">
            <AuthCard />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-4 px-6 border-t border-gray-200 bg-white/50">
        <div className="container max-w-7xl mx-auto text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Legal Connect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AuthenticationPage;

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import RegisterForm from '../form/RegisterForm';

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 bg-hero-pattern">
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
            Join Legal Connect
          </h1>
          <p className="text-lg text-gray-600 mb-6 text-center md:text-left">
            Create your account to start collaborating with legal professionals and manage your cases efficiently.
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
          <Card className="w-full max-w-md mx-auto auth-card-gradient animate-fade-in">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold text-legal">Create Account</CardTitle>
              <CardDescription>
                Register to access the platform
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <RegisterForm />
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center text-muted-foreground">
                <p>Already have an account? <Link to="/login" className="text-legal hover:underline">Login</Link></p>
              </div>
            </CardFooter>
          </Card>
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

export default Register;

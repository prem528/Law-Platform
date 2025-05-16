import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoginForm from '../form/LoginForm';

const Login = () => {
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
            Welcome Back
          </h1>
          <p className="text-lg text-gray-600 mb-6 text-center md:text-left">
            Log in to your account to access your legal dashboard, documents, and consultations.
          </p>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-gray-100 shadow-sm w-full max-w-md">
            <h3 className="font-medium text-legal">Secure Access</h3>
            <p className="text-sm text-gray-600">All communication is encrypted and secure</p>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center items-center">
          <Card className="w-full max-w-md mx-auto auth-card-gradient animate-fade-in">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold text-legal">Sign In</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <LoginForm />
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center text-muted-foreground">
                <p>Don't have an account? <Link to="/register" className="text-legal hover:underline">Register</Link></p>
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

export default Login;

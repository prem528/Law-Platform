import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
 

const AuthCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <Card className="auth-card py-4 w-full max-w-md mx-auto auth-card-gradient animate-fade-in">
      <CardHeader className=" text-center">
        <CardTitle className="text-2xl font-bold text-blue-800">Legal Connect</CardTitle>
        <CardDescription>
          Login or create an account to access the platform
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="login" onValueChange={setActiveTab} className="w-full px-2">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login" className="rounded-t-lg">Login</TabsTrigger>
            <TabsTrigger value="register" className="rounded-t-lg">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="p-6 pt-2">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register" className="p-6 pt-2">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-center text-muted-foreground">
          {activeTab === 'login' ? (
            <p>Don't have an account? <button onClick={() => setActiveTab('register')} className="text-legal hover:underline">Register</button></p>
          ) : (
            <p>Already have an account? <button onClick={() => setActiveTab('login')} className="text-legal hover:underline">Login</button></p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AuthCard;

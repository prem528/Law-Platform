import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

import DocumentUpload from "./DocumentUpload";
import { Checkbox } from "@/components/ui/checkbox";
 

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Case title must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  address: z.string().optional(),
  agreeTos: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
});

const CaseForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [caseId, setCaseId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      agreeTos: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, you would submit this data to your backend
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a mock case ID
      const newCaseId = `CASE-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
      setCaseId(newCaseId);
      
      toast({
        title: "Case submitted successfully",
        description: `Your case reference number is ${newCaseId}`,
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your case.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoHome = () => {
    navigate('/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        onClick={handleGoHome} 
        className="mb-6 text-legal-secondary hover:text-legal-primary"
      >
        ← Back to Dashboard
      </Button>
      
      <Card className="border-0 shadow-lg overflow-hidden">
        <div className="h-2 bg-legal-primary w-full"></div>
        <CardHeader>
          <CardTitle className="text-2xl text-legal-primary">Submit a New Case</CardTitle>
          <CardDescription>
            Please provide all the details about your case and upload any relevant documents.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!caseId ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-medium">Case Details</h2>
                  
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Case Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Property Dispute with Neighbor" {...field} />
                        </FormControl>
                        <FormDescription>
                          A brief title describing your legal matter.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please provide details about your case..." 
                            className="min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Include all relevant details and information about your case.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <h2 className="text-lg font-medium">Personal Information</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john.doe@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="(123) 456-7890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main St, Anytown, ST 12345" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <h2 className="text-lg font-medium">Documentation</h2>
                  <div className="bg-gray-50 rounded-md p-4 border border-gray-100">
                    <p className="text-sm text-gray-700 mb-3">
                      Please upload any relevant documents that will help us understand your case better.
                    </p>
                    {/* We'll use a placeholder caseId until we've submitted the form */}
                    <DocumentUpload
                      caseId="temp-id" 
                      onUploadComplete={() => {
                        toast({
                          title: "Document uploaded",
                          description: "Your document has been uploaded successfully.",
                        });
                      }} 
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="agreeTos"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange} 
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I agree to the terms of service and privacy policy.
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-legal-primary hover:bg-legal-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Case"}
                </Button>
              </form>
            </Form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="mx-auto bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-medium">Case Submitted Successfully!</h3>
              <p className="text-gray-600">Your case reference number is:</p>
              <p className="text-legal-primary font-mono text-lg font-bold bg-gray-50 py-2 rounded">{caseId}</p>
              <p className="text-gray-600 text-sm mt-4">
                We'll review your case and be in touch shortly. Please keep your reference number handy for future correspondence.
              </p>
              <div className="pt-4">
                <Button
                  onClick={handleGoHome}
                  className="bg-legal-secondary hover:bg-legal-secondary/90"
                >
                  Return to Dashboard
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CaseForm;

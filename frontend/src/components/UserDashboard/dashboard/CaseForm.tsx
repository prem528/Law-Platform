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
import { Checkbox } from "@/components/ui/checkbox";
import API from "../../../../api/axios";
import { ChevronLeft } from "lucide-react";


interface SubmitCaseResponse {
  case: {
    id: string;
    title: string;
    type: string;
    description: string;
  };
  message: string;
}


const formSchema = z.object({
  title: z.string().min(5, {
    message: "Case title must be at least 5 characters.",
  }),
  type: z.string().min(5, {
    message: "Case title must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),

  agreeTos: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
});

const CaseForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [caseId, setCaseId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { toast } = useToast();
  const navigate = useNavigate();


  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "",
      agreeTos: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
  
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("type", values.type);
      formData.append("description", values.description);
      if (selectedFile) {
        formData.append("file", selectedFile);
      }
  
      const res = await API.post<SubmitCaseResponse>("/cases/submit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      toast({
        title: "Case Submitted",
        description: `Your case '${res.data.case.title}' has been successfully submitted.`,
      });
  
      setCaseId(res.data.case.id); // For confirmation message
      form.reset();
      setSelectedFile(null);
    } catch (error) {
      console.error("Case submission failed", error);
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
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
    <div className="lg:max-w-3xl lg:mx-auto lg:px-4">
      <Button
        variant="ghost"
        onClick={handleGoHome}
        className="mb-6 text-white bg-blue-400 hover:text-white hover:bg-blue-500"
      >
        <ChevronLeft className=" h-4 w-4"/>
        Back to Dashboard
      </Button>

      <Card className="border-0 shadow-lg overflow-hidden pb-8">
        <div className="h-4 bg-blue-200 w-full "></div>
        <CardHeader>
          <CardTitle className="text-2xl text-blue-900">Submit a New Case</CardTitle>
          <CardDescription>
            Please provide all the details about your case and upload any relevant documents.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!caseId ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  {/* <h2 className="text-lg font-medium">Case Details</h2> */}

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
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type of Case</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Property Dispute" {...field} />
                        </FormControl>
                        <FormDescription>
                          Give proper case title.
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

                <div className="space-y-2">
                  <h2 className="text-lg font-medium">Documentation</h2>
                  <div className="bg-gray-50 rounded-md p-4 border border-gray-100">
                    <p className="text-sm text-gray-700 mb-3">
                      Please upload any relevant documents that will help us understand your case better.
                    </p>

                     {/* Documents Attachments */}
                    <div className="space-y-2">
                      <FormLabel>Attach a Document</FormLabel>
                      <input
                        type="file"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            setSelectedFile(e.target.files[0]);
                          }
                        }}
                        className="block w-full text-sm text-gray-700 file:border file:border-gray-500 file:px-4 file:py-1 file:mr-3 file:rounded file:bg-blue-200"
                        accept=".pdf,.doc,.docx,.jpg,.png"
                      />
                    </div>
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
                  className="w-full bg-blue-500 hover:bg-legal-primary/90"
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
                  className="bg-blue-400 hover:bg-blue-500"
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

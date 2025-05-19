import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AssignCaseButtonProps {
  onAssign: () => void;
  disabled: boolean;
  isAssigning?: boolean;
}

const AssignCaseButton = ({ 
  onAssign, 
  disabled, 
  isAssigning = false 
}: AssignCaseButtonProps) => {
  const { toast } = useToast();

  const handleClick = () => {
    onAssign();
    toast({
      title: "Case assigned successfully",
      description: "The lawyer has been notified of this assignment."
    });
  };

  return (
    <Button 
      onClick={handleClick}
      disabled={disabled || isAssigning}
      className="w-full bg-blue-600 hover:bg-blue-700"
    >
      {isAssigning ? "Assigning..." : "Assign Case"}
    </Button>
  );
};

export default AssignCaseButton;

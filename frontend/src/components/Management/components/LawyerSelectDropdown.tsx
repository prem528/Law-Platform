import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import type { Lawyer } from "@/lib/types";
  
  interface LawyerSelectDropdownProps {
    lawyers: Lawyer[];
    selectedLawyerId: string | null;
    onSelect: (lawyerId: string) => void;
  }
  
  const LawyerSelectDropdown = ({
    lawyers,
    selectedLawyerId,
    onSelect,
  }: LawyerSelectDropdownProps) => {
    const handleValueChange = (value: string) => {
      onSelect(value);
    };
  
    return (
      <Select value={selectedLawyerId || undefined} onValueChange={handleValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a lawyer" />
        </SelectTrigger>
        <SelectContent>
          {lawyers.map((lawyer) => (
            <SelectItem key={lawyer.id} value={lawyer.id}>
              {lawyer.name} ({lawyer.specialization}, {`${lawyer.experience} YOE`}, {lawyer.caseLoad} cases)
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };
  
  export default LawyerSelectDropdown;
  
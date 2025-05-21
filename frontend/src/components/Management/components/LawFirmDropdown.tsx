import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { lawFirms } from "@/lib/data";
  import type { LawFirm } from "@/lib/types";
  
  interface LawFirmDropdownProps {
    lawfirms: LawFirm[];
    firmId: string | null;
    onSelect: (lawyerId: string) => void;
  }
  
  const LawFirmDropdown = ({
    lawfirms,
    firmId,
    onSelect,
  }: LawFirmDropdownProps) => {
    const handleValueChange = (value: string) => {
      onSelect(value);
    };
  
    return (
      <Select value={firmId || undefined} onValueChange={handleValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a Law Firm " />
        </SelectTrigger>
        <SelectContent>
          {lawFirms.map((firm) => (
            <SelectItem key={firm.id} value={firm.id}>
              {firm.name} ({firm.specializationAreas}, {firm.totalLawyers}, {firm.totalCases} cases)
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };
  
  export default LawFirmDropdown;
  
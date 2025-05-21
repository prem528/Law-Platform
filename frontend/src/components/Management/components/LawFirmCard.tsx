import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { LawFirm } from "@/lib/types";

interface LawyerProfileCardProps {
    lawFirm: LawFirm;
    isSelected?: boolean;
    onSelect?: (lawyerId: string) => void;
}

const LawFirmCard = ({
    lawFirm,
    isSelected = false,
    onSelect
}: LawyerProfileCardProps) => {

    const handleClick = () => {
        if (onSelect) {
            onSelect(lawFirm.id);
        }
    };

    return (
        <Card
            className={`py-4 transition-all cursor-pointer ${isSelected ? 'ring-2 ring-law-blue-600 shadow-lg' : 'hover:shadow-md'}`}
            onClick={handleClick}
        >
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar className="h-12 w-12">
                    <AvatarImage src={lawFirm.logo || ''} alt={lawFirm.name} />
                    <AvatarFallback className="bg-law-blue-200 text-law-blue-700">
                        {lawFirm.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-lg">{lawFirm.name}</CardTitle>
                    <div className="flex items-center">
                        <div className="flex flex-wrap gap-1">
                            {lawFirm.specializationAreas.map((area, index) => (
                                <Badge key={index} className="bg-law-blue-100 text-law-blue-800 hover:bg-law-blue-200">
                                    {area}
                                </Badge>
                            ))}
                        </div>

                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex flex-col">
                        <span className="text-gray-500">Email</span>
                        <span>{lawFirm.email}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500">Phone</span>
                        <span>{lawFirm.phone || 'Not provided'}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500">Experience</span>
                        <span>{lawFirm.totalLawyers} Lawyers</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500">Total Cases</span>
                        <span className="font-medium">{lawFirm.totalCases}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default LawFirmCard;

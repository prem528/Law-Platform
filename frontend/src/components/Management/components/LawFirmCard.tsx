import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { LawFirm } from "@/lib/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface LawFirmCardProps {
  lawFirm: LawFirm;
  isSelected?: boolean;
  onSelect?: (lawFirmId: string) => void;
}

const LawFirmCard = ({
  lawFirm,
  isSelected = false,
  onSelect
}: LawFirmCardProps) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect(lawFirm.id);
    }
  };

  return (
    <Card
      className={`py-3 sm:py-4 transition-all cursor-pointer border border-gray-200 rounded-lg shadow-sm hover:shadow-md ${
        isSelected ? 'ring-2 ring-law-blue-600 shadow-lg' : ''
      }`}
      onClick={handleClick}
    >
      {/* Header with logo and name */}
      <CardHeader className="flex flex-row items-center gap-3 sm:gap-4 pb-2 px-3 sm:px-4">
        <Avatar className="h-12 w-12 sm:h-14 sm:w-14">
          <AvatarImage src={lawFirm.logo || ""} alt={lawFirm.name} />
          <AvatarFallback className="bg-blue-200 text-blue-700 text-sm sm:text-base">
            {lawFirm.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <CardTitle className="text-base sm:text-lg font-semibold truncate">{lawFirm.name}</CardTitle>
          <div className="flex flex-wrap gap-1 mt-1">
            {lawFirm.specializationAreas.map((area, index) => (
              <Badge
                key={index}
                className="bg-blue-100 text-blue-800 text-[10px] sm:text-xs"
              >
                {area}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>

      {/* Content Details */}
      <CardContent className="text-xs sm:text-sm text-gray-700 space-y-2 mt-2 px-3 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
          <div>
            <span className="font-medium text-gray-400">Email:</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={`mailto:${lawFirm.email}`}
                    className="truncate max-w-[140px] sm:max-w-[180px] block text-blue-600 hover:underline"
                    title={lawFirm.email}
                  >
                    {lawFirm.email.length > 20
                      ? `${lawFirm.email.slice(0, 20)}...`
                      : lawFirm.email}
                  </a>
                </TooltipTrigger>
                <TooltipContent>{lawFirm.email}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div>
            <span className="font-medium text-gray-400">Phone:</span>
            <div className="truncate">{lawFirm.phone || "Not provided"}</div>
          </div>
          <div>
            <span className="font-medium text-gray-400">Address:</span>
            <div>{lawFirm.address}</div>
          </div>
          <div>
            <span className="font-medium text-gray-400">Website:</span>
            <div className="truncate">
              {lawFirm.website ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={lawFirm.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="truncate max-w-[140px] sm:max-w-[180px] block text-blue-600 hover:underline"
                        title={lawFirm.website}
                      >
                        {lawFirm.website.length > 20
                          ? `${lawFirm.website.slice(0, 20)}...`
                          : lawFirm.website}
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>{lawFirm.website}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                "Not provided"
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-2 border-t mt-2">
          <div className="ml-2 sm:ml-4">
            <span className="font-medium text-gray-400">Established:</span>
            <div>{lawFirm.establishedYear || "N/A"}</div>
          </div>
          <div>
            <span className="font-medium text-gray-400">Rating:</span>
            <div>{lawFirm.rating ? `${lawFirm.rating} / 5` : "Not rated"}</div>
          </div>
          <div className="ml-2 sm:ml-4">
            <span className="font-medium text-gray-400">Lawyers:</span>
            <div>{lawFirm.totalLawyers}</div>
          </div>
          <div>
            <span className="font-medium text-gray-400">Total Cases:</span>
            <div>{lawFirm.totalCases}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LawFirmCard;

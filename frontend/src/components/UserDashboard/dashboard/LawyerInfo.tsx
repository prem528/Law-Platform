import { User } from "lucide-react";

interface Lawyer {
  name: string;
  email: string;
}

interface LawyerInfoProps {
  lawyer?: Lawyer;
}

const LawyerInfo = ({ lawyer }: LawyerInfoProps) => {
  if (!lawyer) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <User className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              No lawyer has been assigned to this case yet.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
      <p className="text-xs uppercase tracking-wider text-gray-500 mb-2 font-semibold">
        Assigned Legal Counsel
      </p>
      <div className="flex items-center">
        <div className="rounded-full bg-legal-primary w-10 h-10 flex items-center justify-center text-white font-bold">
          {lawyer.name.charAt(0)}
        </div>
        <div className="ml-3">
          <h4 className="text-base font-semibold text-gray-900">{lawyer.name}</h4>
          <p className="text-sm text-gray-600">{lawyer.email}</p>
        </div>
      </div>
    </div>
  );
};

export default LawyerInfo;

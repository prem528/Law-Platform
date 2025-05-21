
export interface Lawyer {
    id: string;
    name: string;
    email: string;
    specialization: string;
    caseLoad: number;
    avatar?: string;
    phone?: string;
    experience?: number;
  }
  
  export interface LawFirm {
    id: string;
    name: string;
    logo?: string;
    email: string;
    phone: string;
    website?: string;
    address: string;
    specializationAreas: string[];
    totalLawyers: number;
    totalCases: number;
    rating?: number; // Optional average rating (out of 5)
    establishedYear?: number;
  }
  
  export interface Case {
    id: string;
    title: string;
    clientName: string;
    description: string;
    status: 'unassigned' | 'assigned' | 'in-progress' | 'closed';
    priority: 'low' | 'medium' | 'high';
    dateCreated: string;
    assignedTo?: string;
    dueDate?: string;
    documents?: string[];
    type: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    role: 'lawyer' | 'manager';
  }
  
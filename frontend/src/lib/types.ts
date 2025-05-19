
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
  
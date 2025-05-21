import type{ Case, Lawyer, LawFirm, User } from './types';

// Mock Lawyers
export const lawyers: Lawyer[] = [
  {
    id: '1',
    name: 'Jane Smith',
    email: 'jane.smith@lawfirm.com',
    specialization: 'Corporate Law',
    caseLoad: 5,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    phone: '(555) 123-4567',
    experience: 8
  },
  {
    id: '2',
    name: 'Michael Johnson',
    email: 'michael@law.com',
    specialization: 'Criminal Law',
    caseLoad: 3,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    phone: '(555) 234-5678',
    experience: 12
  },
  {
    id: '3',
    name: 'Sarah Williams',
    email: 'sarah.@lawfirm.com',
    specialization: 'Family Law',
    caseLoad: 7,
    avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
    phone: '(555) 345-6789',
    experience: 5
  },
  {
    id: '4',
    name: 'Robert Davis',
    email: 'robertdavis@lawfirm.com',
    specialization: 'Real Estate Law',
    caseLoad: 4,
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    phone: '(555) 456-7890',
    experience: 15
  }
];

// Law Firms Mock Data
export const lawFirms: LawFirm[] = [
  {
    id: "lf001",
    name: "Justice Partners LLP",
    logo: "https://via.placeholder.com/80x80.png?text=JP",
    email: "law@justicek.com",
    phone: "(+91) 123-4567",
    website: "https://justicepartners.com",
    address: "101 Main building, New Delhi, 110090",
    specializationAreas: ["Criminal Law", "Family Law", "Property Law"],
    totalLawyers: 12,
    totalCases: 120,
    rating: 4.7,
    establishedYear: 2010
  },
  {
    id: "lf002",
    name: "Global Legal Associates",
    email: "info@globallegal.com",
    phone: "(+91) 987-6543",
    address: "ABC H.no 396, New Delhi, 110030 ",
    specializationAreas: ["Corporate Law", "International Law"],
    totalLawyers: 18,
    totalCases: 300,
    rating: 4.9,
    establishedYear: 2005
  }
];


// Mock Cases
export const cases: Case[] = [
  {
    id: '101',
    title: 'Smith vs. Johnson Property Dispute',
    clientName: 'Adam Smith',
    description: 'Dispute over property boundaries with neighboring landowner.',
    status: 'unassigned',
    priority: 'medium',
    dateCreated: '2023-05-12',
    dueDate: '2023-06-15',
    type: 'Property Law'
  },
  {
    id: '102',
    title: 'Martinez Incorporation',
    clientName: 'Elena Martinez',
    description: 'Assistance with forming a new LLC for tech startup.',
    status: 'assigned',
    assignedTo: '1',
    priority: 'high',
    dateCreated: '2023-05-10',
    dueDate: '2023-06-01',
    type: 'Corporate Law'
  },
  {
    id: '103',
    title: 'Thompson Divorce Proceedings',
    clientName: 'James Thompson',
    description: 'Divorce filing with complex asset division.',
    status: 'in-progress',
    assignedTo: '3',
    priority: 'high',
    dateCreated: '2023-05-05',
    dueDate: '2023-07-10',
    type: 'Family Law'
  },
  {
    id: '104',
    title: 'Wilson DUI Defense',
    clientName: 'Thomas Wilson',
    description: 'Client charged with DUI, first offense.',
    status: 'assigned',
    assignedTo: '2',
    priority: 'medium',
    dateCreated: '2023-05-14',
    dueDate: '2023-06-20',
    type: 'Criminal Law'
  },
  {
    id: '105',
    title: 'Brown Estate Planning',
    clientName: 'Margaret Brown',
    description: 'Comprehensive estate planning for high net worth individual.',
    status: 'unassigned',
    priority: 'low',
    dateCreated: '2023-05-15',
    type: 'Estate Planning'
  },
  {
    id: '106',
    title: 'Garcia Trademark Application',
    clientName: 'Carlos Garcia',
    description: 'Filing for trademark protection for new product line.',
    status: 'unassigned',
    priority: 'medium',
    dateCreated: '2023-05-13',
    dueDate: '2023-06-30',
    type: 'Intellectual Property'
  }
];

// Mock current user (for testing purposes)
export const currentUser: User = {
  id: 'admin1',
  name: 'Admin User',
  email: 'admin@lawfirm.com',
  role: 'manager'
};

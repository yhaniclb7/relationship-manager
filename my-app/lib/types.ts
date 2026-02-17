export interface Contact {
  id: string;
  name: string;
  role: string;
  company: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  priority: 'high' | 'medium' | 'low';
  status: 'active' | 'need-to-foster' | 'dormant' | 'archived';
  source: string;
  lastContact: string | null;
  nextFollowUp: string | null;
  notes: string;
  tags: string[];
  createdAt: string;
  context?: string;
  value?: string;
}

export const priorityColors = {
  high: 'bg-red-500/10 text-red-400 border-red-500/20',
  medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  low: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
};

export const statusColors = {
  active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'need-to-foster': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  dormant: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
  archived: 'bg-zinc-700/30 text-zinc-500 border-zinc-600/30',
};

export const statusLabels = {
  active: 'Active',
  'need-to-foster': 'Need to Foster',
  dormant: 'Dormant',
  archived: 'Archived',
};

export const priorityLabels = {
  high: 'High',
  medium: 'Medium', 
  low: 'Low',
};

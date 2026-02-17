'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search, Calendar, Mail, Phone, Linkedin, MoreHorizontal, Clock } from 'lucide-react';
import { useContacts } from '@/lib/hooks';
import { Contact, priorityColors, statusColors, statusLabels, priorityLabels } from '@/lib/types';
import { ContactForm } from '@/components/contact-form';
import { ContactDetail } from '@/components/contact-detail';

function ContactCard({ contact, onClick }: { contact: Contact; onClick: () => void }) {
  const initials = contact.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  
  const isOverdue = contact.nextFollowUp && contact.nextFollowUp < new Date().toISOString().split('T')[0];
  
  return (
    <Card 
      className="cursor-pointer hover:border-zinc-600 transition-all bg-zinc-900/50 border-zinc-800 group"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10 bg-zinc-800">
            <AvatarFallback className="bg-zinc-800 text-zinc-300 text-sm font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-medium text-zinc-100 truncate">{contact.name}</h3>
                <p className="text-sm text-zinc-500 truncate">{contact.role} {contact.company && `• ${contact.company}`}</p>
              </div>
              <Badge variant="outline" className={`text-xs ${priorityColors[contact.priority]}`}>
                {priorityLabels[contact.priority]}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2 mt-3">
              <Badge variant="outline" className={`text-xs ${statusColors[contact.status]}`}>
                {statusLabels[contact.status]}
              </Badge>
              
              {contact.nextFollowUp && (
                <div className={`flex items-center gap-1 text-xs ${isOverdue ? 'text-red-400' : 'text-zinc-500'}`}>
                  <Clock className="h-3 w-3" />
                  {isOverdue ? 'Overdue' : new Date(contact.nextFollowUp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              )}
            </div>
            
            {contact.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {contact.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-xs px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded">
                    {tag}
                  </span>
                ))}
                {contact.tags.length > 3 && (
                  <span className="text-xs text-zinc-500">+{contact.tags.length - 3}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatCard({ title, value, subtitle }: { title: string; value: number; subtitle?: string }) {
  return (
    <Card className="bg-zinc-900/50 border-zinc-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-zinc-400">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-zinc-100">{value}</div>
        {subtitle && <p className="text-xs text-zinc-500 mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const { contacts, loaded, addContact, updateContact, deleteContact, getStats, getFollowUpsDue } = useContacts();
  const [search, setSearch] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  if (!loaded) return null;

  const stats = getStats();
  const followUpsDue = getFollowUpsDue();
  
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.company.toLowerCase().includes(search.toLowerCase()) ||
      contact.role.toLowerCase().includes(search.toLowerCase()) ||
      contact.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'high') return matchesSearch && contact.priority === 'high';
    if (activeTab === 'foster') return matchesSearch && contact.status === 'need-to-foster';
    if (activeTab === 'followup') return matchesSearch && contact.nextFollowUp && contact.nextFollowUp <= new Date().toISOString().split('T')[0];
    return matchesSearch;
  });

  const handleSaveContact = (contact: Omit<Contact, 'id' | 'createdAt'>) => {
    addContact(contact);
    setIsAddOpen(false);
  };

  const handleUpdateContact = (id: string, updates: Partial<Contact>) => {
    updateContact(id, updates);
    if (selectedContact?.id === id) {
      setSelectedContact({ ...selectedContact, ...updates });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-zinc-100">Relationship Manager</h1>
              <p className="text-sm text-zinc-500">Track your network. Close deals. Build legacy.</p>
            </div>
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Contact
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Contact</DialogTitle>
                </DialogHeader>
                <ContactForm onSave={handleSaveContact} onCancel={() => setIsAddOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard title="Total Contacts" value={stats.total} />
          <StatCard title="High Priority" value={stats.highPriority} subtitle="Requires attention" />
          <StatCard title="Need to Foster" value={stats.needToFoster} subtitle="Develop relationship" />
          <StatCard title="Follow-ups Due" value={stats.followUpsDue} subtitle={followUpsDue.length > 0 ? 'Action required' : 'All caught up'} />
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              placeholder="Search contacts, companies, tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="bg-zinc-900 border border-zinc-800">
            <TabsTrigger value="all" className="data-[state=active]:bg-zinc-800">All Contacts</TabsTrigger>
            <TabsTrigger value="high" className="data-[state=active]:bg-zinc-800">High Priority</TabsTrigger>
            <TabsTrigger value="foster" className="data-[state=active]:bg-zinc-800">Need to Foster</TabsTrigger>
            <TabsTrigger value="followup" className="data-[state=active]:bg-zinc-800">
              Follow-ups {stats.followUpsDue > 0 && `(${stats.followUpsDue})`}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Contact Grid */}
        {filteredContacts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-500">No contacts found.</p>
            <Button variant="outline" className="mt-4" onClick={() => setIsAddOpen(true)}>
              Add your first contact
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredContacts.map(contact => (
              <ContactCard 
                key={contact.id} 
                contact={contact} 
                onClick={() => setSelectedContact(contact)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Contact Detail Modal */}
      <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedContact && (
            <ContactDetail 
              contact={selectedContact} 
              onUpdate={(updates) => handleUpdateContact(selectedContact.id, updates)}
              onDelete={() => {
                deleteContact(selectedContact.id);
                setSelectedContact(null);
              }}
              onClose={() => setSelectedContact(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Contact, priorityColors, statusColors, statusLabels, priorityLabels } from '@/lib/types';
import { Mail, Phone, Linkedin, Calendar, Clock, Building2, User, Tag, Edit2, Trash2, X, CheckCircle } from 'lucide-react';
import { ContactForm } from './contact-form';

interface ContactDetailProps {
  contact: Contact;
  onUpdate: (updates: Partial<Contact>) => void;
  onDelete: () => void;
  onClose: () => void;
}

export function ContactDetail({ contact, onUpdate, onDelete, onClose }: ContactDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const initials = contact.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const isOverdue = contact.nextFollowUp && contact.nextFollowUp < new Date().toISOString().split('T')[0];

  const handleMarkContacted = () => {
    const today = new Date().toISOString().split('T')[0];
    onUpdate({ 
      lastContact: today,
      nextFollowUp: ''
    });
  };

  const handleSetFollowUp = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    onUpdate({ nextFollowUp: date.toISOString().split('T')[0] });
  };

  if (isEditing) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Edit Contact</h2>
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <ContactForm 
          contact={contact}
          onSave={(updates) => {
            onUpdate(updates);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 bg-zinc-800">
            <AvatarFallback className="bg-zinc-800 text-zinc-300 text-xl font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold text-zinc-100">{contact.name}</h2>
            <p className="text-zinc-500">{contact.role} {contact.company && `at ${contact.company}`}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className={priorityColors[contact.priority]}>
                {priorityLabels[contact.priority]} Priority
              </Badge>
              <Badge variant="outline" className={statusColors[contact.status]}>
                {statusLabels[contact.status]}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            <Edit2 className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button variant="outline" size="sm" className="text-red-400 hover:text-red-300" onClick={() => setShowDeleteConfirm(true)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <p className="text-sm text-red-400 mb-3">Are you sure you want to delete this contact? This action cannot be undone.</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
            <Button variant="destructive" size="sm" onClick={onDelete}>Delete</Button>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-800">
        <h3 className="text-sm font-medium text-zinc-400 mb-3">Quick Actions</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleMarkContacted}>
            <CheckCircle className="h-4 w-4 mr-1" />
            Mark Contacted Today
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleSetFollowUp(7)}>
            <Clock className="h-4 w-4 mr-1" />
            Follow up in 7 days
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleSetFollowUp(14)}>
            <Clock className="h-4 w-4 mr-1" />
            Follow up in 14 days
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleSetFollowUp(30)}>
            <Clock className="h-4 w-4 mr-1" />
            Follow up in 30 days
          </Button>
        </div>
      </div>

      <Separator className="bg-zinc-800" />

      {/* Contact Info */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-zinc-400">Contact Information</h3>
        
        {contact.email && (
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-zinc-500" />
            <a href={`mailto:${contact.email}`} className="text-zinc-300 hover:text-zinc-100">
              {contact.email}
            </a>
          </div>
        )}
        
        {contact.phone && (
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-zinc-500" />
            <a href={`tel:${contact.phone}`} className="text-zinc-300 hover:text-zinc-100">
              {contact.phone}
            </a>
          </div>
        )}
        
        {contact.linkedin && (
          <div className="flex items-center gap-3">
            <Linkedin className="h-4 w-4 text-zinc-500" />
            <a href={contact.linkedin.startsWith('http') ? contact.linkedin : `https://${contact.linkedin}`} 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-zinc-300 hover:text-zinc-100">
              LinkedIn Profile
            </a>
          </div>
        )}

        <div className="flex items-center gap-3">
          <Building2 className="h-4 w-4 text-zinc-500" />
          <span className="text-zinc-300">Source: {contact.source || 'Not specified'}</span>
        </div>
      </div>

      <Separator className="bg-zinc-800" />

      {/* Timeline */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-zinc-400">Timeline</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-950 rounded-lg p-3 border border-zinc-800">
            <div className="flex items-center gap-2 text-zinc-500 text-sm mb-1">
              <Calendar className="h-4 w-4" />
              Last Contact
            </div>
            <p className="text-zinc-100">
              {contact.lastContact ? new Date(contact.lastContact).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Never'}
            </p>
          </div>
          
          <div className={`rounded-lg p-3 border ${isOverdue ? 'bg-red-500/10 border-red-500/20' : 'bg-zinc-950 border-zinc-800'}`}>
            <div className={`flex items-center gap-2 text-sm mb-1 ${isOverdue ? 'text-red-400' : 'text-zinc-500'}`}>
              <Clock className="h-4 w-4" />
              Next Follow-up
            </div>
            <p className={isOverdue ? 'text-red-400 font-medium' : 'text-zinc-100'}>
              {contact.nextFollowUp ? new Date(contact.nextFollowUp).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Not scheduled'}
              {isOverdue && ' (Overdue)'}
            </p>
          </div>
        </div>
      </div>

      {contact.context && (
        <>
          <Separator className="bg-zinc-800" />
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-zinc-400">Context & Value</h3>
            <p className="text-zinc-300 text-sm">{contact.context}</p>
          </div>
        </>
      )}

      <Separator className="bg-zinc-800" />

      {/* Notes */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-zinc-400">Notes</h3>
        <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-800">
          <p className="text-zinc-300 text-sm whitespace-pre-wrap">{contact.notes || 'No notes added yet.'}</p>
        </div>
      </div>

      {/* Tags */}
      {contact.tags.length > 0 && (
        <>
          <Separator className="bg-zinc-800" />
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-zinc-400">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {contact.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-1 bg-zinc-800 text-zinc-400 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

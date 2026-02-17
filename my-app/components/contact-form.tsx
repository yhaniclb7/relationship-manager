'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Contact, priorityLabels, statusLabels } from '@/lib/types';

interface ContactFormProps {
  contact?: Contact;
  onSave: (contact: Omit<Contact, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export function ContactForm({ contact, onSave, onCancel }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: contact?.name || '',
    role: contact?.role || '',
    company: contact?.company || '',
    email: contact?.email || '',
    phone: contact?.phone || '',
    linkedin: contact?.linkedin || '',
    priority: contact?.priority || 'medium',
    status: contact?.status || 'active',
    source: contact?.source || '',
    lastContact: contact?.lastContact || '',
    nextFollowUp: contact?.nextFollowUp || '',
    notes: contact?.notes || '',
    tags: contact?.tags?.join(', ') || '',
    context: contact?.context || '',
    value: contact?.value || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            placeholder="Full name"
            required
            className="bg-zinc-950 border-zinc-800"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={e => setFormData({ ...formData, company: e.target.value })}
            placeholder="Company name"
            className="bg-zinc-950 border-zinc-800"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Input
            id="role"
            value={formData.role}
            onChange={e => setFormData({ ...formData, role: e.target.value })}
            placeholder="Job title"
            className="bg-zinc-950 border-zinc-800"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="source">Source</Label>
          <Input
            id="source"
            value={formData.source}
            onChange={e => setFormData({ ...formData, source: e.target.value })}
            placeholder="How did you meet?"
            className="bg-zinc-950 border-zinc-800"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          placeholder="email@example.com"
          className="bg-zinc-950 border-zinc-800"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+1 (XXX) XXX-XXXX"
            className="bg-zinc-950 border-zinc-800"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={formData.linkedin}
            onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
            placeholder="linkedin.com/in/..."
            className="bg-zinc-950 border-zinc-800"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <Select 
            value={formData.priority} 
            onValueChange={value => setFormData({ ...formData, priority: value as any })}
          >
            <SelectTrigger className="bg-zinc-950 border-zinc-800">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800">
              <SelectItem value="high">{priorityLabels.high}</SelectItem>
              <SelectItem value="medium">{priorityLabels.medium}</SelectItem>
              <SelectItem value="low">{priorityLabels.low}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select 
            value={formData.status} 
            onValueChange={value => setFormData({ ...formData, status: value as any })}
          >
            <SelectTrigger className="bg-zinc-950 border-zinc-800">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800">
              <SelectItem value="active">{statusLabels.active}</SelectItem>
              <SelectItem value="need-to-foster">{statusLabels['need-to-foster']}</SelectItem>
              <SelectItem value="dormant">{statusLabels.dormant}</SelectItem>
              <SelectItem value="archived">{statusLabels.archived}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="lastContact">Last Contact</Label>
          <Input
            id="lastContact"
            type="date"
            value={formData.lastContact}
            onChange={e => setFormData({ ...formData, lastContact: e.target.value })}
            className="bg-zinc-950 border-zinc-800"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nextFollowUp">Next Follow-up</Label>
          <Input
            id="nextFollowUp"
            type="date"
            value={formData.nextFollowUp}
            onChange={e => setFormData({ ...formData, nextFollowUp: e.target.value })}
            className="bg-zinc-950 border-zinc-800"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="context">Context/Value</Label>
        <Input
          id="context"
          value={formData.context}
          onChange={e => setFormData({ ...formData, context: e.target.value })}
          placeholder="Why is this relationship important?"
          className="bg-zinc-950 border-zinc-800"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input
          id="tags"
          value={formData.tags}
          onChange={e => setFormData({ ...formData, tags: e.target.value })}
          placeholder="VC, AI, Personal, Priority..."
          className="bg-zinc-950 border-zinc-800"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={e => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Conversation notes, follow-up items, reminders..."
          rows={4}
          className="bg-zinc-950 border-zinc-800 resize-none"
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {contact ? 'Update Contact' : 'Add Contact'}
        </Button>
      </div>
    </form>
  );
}

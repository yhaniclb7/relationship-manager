'use client';

import { useState, useEffect } from 'react';
import { Contact } from './types';

const STORAGE_KEY = 'rm_contacts_v1';

export const sampleContacts: Contact[] = [
  {
    id: '1',
    name: 'Raj Shah',
    role: 'Managing Partner',
    company: 'Shield Capital',
    email: 'raj@shieldcapital.com',
    priority: 'high',
    status: 'active',
    source: 'Waypoint Ventures',
    lastContact: '2026-02-12',
    nextFollowUp: '2026-02-19',
    notes: 'Met for coffee. Interested in AI defense tech. Portfolio includes Airspace Intelligence, Apex, Code Metal. Follow up on portco intros.',
    tags: ['VC', 'Defense Tech', 'Priority'],
    createdAt: '2026-02-12',
    context: 'Potential co-investor in AI firm',
    value: 'Strategic'
  },
  {
    id: '2', 
    name: 'Alexa Chiriac',
    role: 'Girlfriend',
    company: 'Personal',
    phone: '+1 (XXX) XXX-XXXX',
    priority: 'high',
    status: 'active',
    source: 'Personal',
    lastContact: '2026-02-14',
    nextFollowUp: '2026-02-21',
    notes: "Valentine's Day virtual dinner. Based in Montreal. Long distance relationship.",
    tags: ['Personal', 'Priority'],
    createdAt: '2025-01-01',
    context: 'Long-term relationship'
  },
  {
    id: '3',
    name: 'Alex Gill',
    role: 'Best Friend',
    company: 'Personal',
    priority: 'high',
    status: 'active',
    source: 'High School',
    lastContact: '2026-02-15',
    nextFollowUp: '2026-03-01',
    notes: 'Best friend since high school. Regular catch-up calls.',
    tags: ['Personal', 'Inner Circle'],
    createdAt: '2010-01-01',
    context: 'Lifelong friend'
  },
  {
    id: '4',
    name: 'Christo',
    role: 'Co-Founder',
    company: 'Pathway Automation',
    priority: 'high',
    status: 'active',
    source: 'Kellogg EMBA',
    lastContact: '2026-02-16',
    nextFollowUp: '2026-02-18',
    notes: 'Kellogg EMBA classmate. Co-founding AI automation agency. $50k/mo goal.',
    tags: ['AI', 'Co-Founder', 'Kellogg'],
    createdAt: '2025-01-01',
    context: 'AI firm co-founder'
  },
  {
    id: '5',
    name: 'John Richmond',
    role: 'Contact',
    company: 'TBD',
    priority: 'medium',
    status: 'need-to-foster',
    source: 'Network',
    lastContact: null,
    nextFollowUp: '2026-02-24',
    notes: 'Priority outreach target. Need to establish connection.',
    tags: ['Priority Outreach'],
    createdAt: '2026-02-15',
    context: 'Bi-weekly scan target'
  },
  {
    id: '6',
    name: 'Andrew Shen',
    role: 'Contact',
    company: 'TBD',
    priority: 'medium',
    status: 'need-to-foster',
    source: 'Network',
    lastContact: null,
    nextFollowUp: '2026-02-24',
    notes: 'Priority outreach target.',
    tags: ['Priority Outreach'],
    createdAt: '2026-02-15',
    context: 'Bi-weekly scan target'
  },
  {
    id: '7',
    name: 'Ami Patel',
    role: 'Contact',
    company: 'TBD',
    priority: 'medium',
    status: 'need-to-foster',
    source: 'Network',
    lastContact: null,
    nextFollowUp: '2026-02-24',
    notes: 'Priority outreach target.',
    tags: ['Priority Outreach'],
    createdAt: '2026-02-15',
    context: 'Bi-weekly scan target'
  },
  {
    id: '8',
    name: 'Paul Kwan',
    role: 'Contact',
    company: 'TBD',
    priority: 'medium',
    status: 'need-to-foster',
    source: 'Network',
    lastContact: null,
    nextFollowUp: '2026-02-24',
    notes: 'Priority outreach target.',
    tags: ['Priority Outreach'],
    createdAt: '2026-02-15',
    context: 'Bi-weekly scan target'
  }
];

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setContacts(parsed);
      } catch {
        setContacts(sampleContacts);
      }
    } else {
      setContacts(sampleContacts);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    }
  }, [contacts, loaded]);

  const addContact = (contact: Omit<Contact, 'id' | 'createdAt'>) => {
    const newContact: Contact = {
      ...contact,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setContacts(prev => [newContact, ...prev]);
    return newContact;
  };

  const updateContact = (id: string, updates: Partial<Contact>) => {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteContact = (id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  const getContact = (id: string) => contacts.find(c => c.id === id);

  const getFollowUpsDue = () => {
    const today = new Date().toISOString().split('T')[0];
    return contacts.filter(c => c.nextFollowUp && c.nextFollowUp <= today);
  };

  const getStats = () => {
    const today = new Date().toISOString().split('T')[0];
    return {
      total: contacts.length,
      highPriority: contacts.filter(c => c.priority === 'high').length,
      needToFoster: contacts.filter(c => c.status === 'need-to-foster').length,
      followUpsDue: contacts.filter(c => c.nextFollowUp && c.nextFollowUp <= today).length,
      active: contacts.filter(c => c.status === 'active').length,
    };
  };

  return {
    contacts,
    loaded,
    addContact,
    updateContact,
    deleteContact,
    getContact,
    getFollowUpsDue,
    getStats,
  };
}

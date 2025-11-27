"use client";

import { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

export default function EmployerProfileSettings() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/employer/profile')
      .then(r => r.json())
      .then(data => { setProfile(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/employer/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (data?.success) {
        // Refetch profile from server to ensure DB is updated
        const fresh = await fetch('/api/employer/profile').then(r => r.json());
        setProfile(fresh);
      } else {
        console.error('Failed to save', data);
      }
    } catch (e) { console.error(e); }
    setSaving(false);
  };

  if (loading) return <div>Loading profile...</div>;

  return (
    <div className="space-y-4 max-w-3xl">
      <div>
        <Label htmlFor="companyName">Company Name</Label>
        <Input id="companyName" value={profile.companyName || ''} onChange={e => setProfile({ ...profile, companyName: e.target.value })} />
      </div>

      <div>
        <Label htmlFor="industry">Industry</Label>
        <Input id="industry" value={profile.industry || ''} onChange={e => setProfile({ ...profile, industry: e.target.value })} />
      </div>

      <div>
        <Label htmlFor="website">Website</Label>
        <Input id="website" value={profile.website || ''} onChange={e => setProfile({ ...profile, website: e.target.value })} />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" value={profile.description || ''} onChange={e => setProfile({ ...profile, description: e.target.value })} />
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save Profile'}</Button>
      </div>
    </div>
  );
}

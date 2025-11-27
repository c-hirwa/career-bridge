"use client";

import { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

export default function StudentProfileSettings() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/student/profile')
      .then(r => r.json())
      .then(data => { setProfile(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/student/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (data?.success) {
        // Refetch profile from server to ensure DB is updated
        const fresh = await fetch('/api/student/profile').then(r => r.json());
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
        <Label htmlFor="fullName">Full Name</Label>
        <Input id="fullName" value={profile.fullName || ''} onChange={e => setProfile({ ...profile, fullName: e.target.value })} />
      </div>

      <div>
        <Label htmlFor="university">University</Label>
        <Input id="university" value={profile.university || ''} onChange={e => setProfile({ ...profile, university: e.target.value })} />
      </div>

      <div>
        <Label htmlFor="major">Major</Label>
        <Input id="major" value={profile.major || ''} onChange={e => setProfile({ ...profile, major: e.target.value })} />
      </div>

      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" value={profile.bio || ''} onChange={e => setProfile({ ...profile, bio: e.target.value })} />
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save Profile'}</Button>
      </div>
    </div>
  );
}

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
  const [uploading, setUploading] = useState(false);

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

  const handleUpload = async (file?: File | null) => {
    const f = file;
    if (!f) return;
    setUploading(true);
    try {
      // Read file as Data URL and extract base64
      const reader = new FileReader();
      reader.onload = async () => {
        const result = reader.result as string | null;
        if (!result) {
          setUploading(false);
          return;
        }
        const base64 = result.split(',')[1];

        const res = await fetch('/api/student/upload-resume', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileName: f.name, content: base64 }),
        });

        const data = await res.json();
        if (data?.success && data.url) {
          // Update local profile state and persist via PATCH
          setProfile((p: any) => ({ ...p, resumeUrl: data.url }));
        } else {
          console.error('Upload failed', data);
        }
        setUploading(false);
      };
      reader.onerror = (err) => {
        console.error('File read error', err);
        setUploading(false);
      };
      reader.readAsDataURL(f);
    } catch (e) {
      console.error(e);
      setUploading(false);
    }
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
        <Button onClick={handleSave} disabled={saving || uploading}>{(saving || uploading) ? 'Saving...' : 'Save Profile'}</Button>
      </div>

      <div className="pt-4">
        <Label htmlFor="resume">Resume (PDF)</Label>
        {profile.resumeUrl ? (
          <div className="mb-2">
            <a className="text-sm text-sky-600 underline" href={profile.resumeUrl} target="_blank" rel="noreferrer">View uploaded resume</a>
          </div>
        ) : (
          <div className="mb-2 text-sm text-gray-600">No resume uploaded yet.</div>
        )}

        <input
          id="resume"
          type="file"
          accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={e => handleUpload(e.target.files?.[0] ?? null)}
          className="block"
        />
        <div className="text-xs text-gray-500 mt-1">Accepted: PDF, DOC, DOCX. Max file size: 2MB.</div>
      </div>
    </div>
  );
}

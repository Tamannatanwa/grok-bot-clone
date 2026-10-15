"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Shuffle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialAvatarSeed = "6hch2zqu";

export default function CreateAgentPage() {
  const router = useRouter();
  const [avatarSeed, setAvatarSeed] = useState(initialAvatarSeed);
  const [description, setDescription] = useState("");

  function shuffleAvatar() {
    setAvatarSeed(crypto.randomUUID());
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <main className="create-agent-page">
      <header className="create-agent-heading">
        <h1>Create New Agent</h1>
        <p>Customize your agent and give it a clear purpose.</p>
      </header>

      <form className="create-agent-form" onSubmit={handleSubmit}>
        <div className="create-agent-avatar-area flex flex-col items-center gap-4">
          <img
            className="orbit-agent-avatar size-24 rounded-full border border-border bg-muted object-cover shadow-sm"
            src={`https://api.dicebear.com/10.x/gaze/svg?seed=${encodeURIComponent(avatarSeed)}`}
            alt="Agent avatar"
            width={96}
            height={96}
          />
          <Button
            type="button"
            variant="outline"
            className="create-agent-shuffle"
            onClick={shuffleAvatar}
          >
            <Shuffle aria-hidden="true" />
            Shuffle avatar
          </Button>
        </div>

        <div className="create-agent-field">
          <Label htmlFor="agent-name">Agent name</Label>
          <Input
            id="agent-name"
            name="name"
            placeholder="Enter agent name"
            maxLength={80}
            required
            className="create-agent-input"
          />
        </div>

        <div className="create-agent-field">
          <div className="create-agent-label-row">
            <Label htmlFor="agent-description">Instructions / Description</Label>
            <span>Optional</span>
          </div>
          <Textarea
            id="agent-description"
            name="description"
            placeholder="Describe what this agent should do, its personality, goals, or special instructions..."
            maxLength={1000}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="create-agent-textarea"
          />
          <div className="create-agent-count" aria-live="polite">
            {description.length} / 1000
          </div>
        </div>

        <div className="create-agent-actions">
          <Button type="button" variant="outline" className="create-agent-cancel" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" className="create-agent-submit">
            Create Agent
          </Button>
        </div>
      </form>
    </main>
  );
}

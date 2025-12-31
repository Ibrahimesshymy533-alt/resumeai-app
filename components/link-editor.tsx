"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Link as LinkType } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Trash2 } from "lucide-react"

interface LinkEditorProps {
  link: LinkType | null
  onSave: (link: LinkType | Omit<LinkType, "id">) => void
  onDelete?: () => void
  onClose: () => void
}

const iconOptions = [
  { value: "briefcase", label: "Portfolio" },
  { value: "twitter", label: "Twitter/X" },
  { value: "github", label: "GitHub" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
  { value: "mail", label: "Email" },
  { value: "music", label: "Music" },
  { value: "globe", label: "Website" },
]

export function LinkEditor({ link, onSave, onDelete, onClose }: LinkEditorProps) {
  const [title, setTitle] = useState(link?.title || "")
  const [url, setUrl] = useState(link?.url || "")
  const [icon, setIcon] = useState(link?.icon || "globe")

  useEffect(() => {
    if (link) {
      setTitle(link.title)
      setUrl(link.url)
      setIcon(link.icon)
    }
  }, [link])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (link) {
      onSave({ ...link, title, url, icon })
    } else {
      onSave({ title, url, icon })
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
      <Card className="w-full max-w-md bg-card border-border shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{link ? "Edit Link" : "Add New Link"}</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter link title"
                required
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                required
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">Icon</Label>
              <Select value={icon} onValueChange={setIcon}>
                <SelectTrigger id="icon" className="bg-background/50">
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              {onDelete && (
                <Button type="button" variant="destructive" onClick={onDelete} className="flex-1">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              )}
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                {link ? "Save Changes" : "Add Link"}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}

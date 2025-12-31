"use client"

import { useState } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LinkCard } from "@/components/link-card"
import { LinkEditor } from "@/components/link-editor"
import { ThemeToggle } from "@/components/theme-toggle"
import { Pencil, Plus } from "lucide-react"

export interface Link {
  id: string
  title: string
  url: string
  icon: string
}

export default function LinkInBioPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [links, setLinks] = useState<Link[]>([
    {
      id: "1",
      title: "Portfolio",
      url: "https://example.com/portfolio",
      icon: "briefcase",
    },
    {
      id: "2",
      title: "Twitter/X",
      url: "https://twitter.com/username",
      icon: "twitter",
    },
    {
      id: "3",
      title: "GitHub",
      url: "https://github.com/username",
      icon: "github",
    },
    {
      id: "4",
      title: "LinkedIn",
      url: "https://linkedin.com/in/username",
      icon: "linkedin",
    },
  ])

  const [editingLink, setEditingLink] = useState<Link | null>(null)
  const [isAddingLink, setIsAddingLink] = useState(false)

  const handleAddLink = (link: Omit<Link, "id">) => {
    const newLink = { ...link, id: Date.now().toString() }
    setLinks([...links, newLink])
    setIsAddingLink(false)
  }

  const handleUpdateLink = (link: Link) => {
    setLinks(links.map((l) => (l.id === link.id ? link : l)))
    setEditingLink(null)
  }

  const handleDeleteLink = (id: string) => {
    setLinks(links.filter((l) => l.id !== id))
    setEditingLink(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 transition-colors duration-500">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 py-12 md:py-20">
        {/* Header Controls */}
        <div className="flex justify-end gap-2 mb-8">
          <ThemeToggle />
          <Button
            variant={isEditing ? "default" : "outline"}
            size="icon"
            onClick={() => setIsEditing(!isEditing)}
            className="backdrop-blur-sm bg-card/50 hover:bg-card/80 transition-all"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>

        {/* Profile Section */}
        <div className="text-center mb-12 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl" />
            <Avatar className="w-32 h-32 border-4 border-background/50 shadow-2xl relative">
              <AvatarImage src="/professional-portrait.png" alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold text-balance bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Jane Doe
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto text-pretty leading-relaxed">
              Creative Developer & Designer building beautiful digital experiences
            </p>
          </div>
        </div>

        {/* Links Section */}
        <div className="space-y-4 mb-8">
          {links.map((link, index) => (
            <div
              key={link.id}
              className="animate-in fade-in slide-in-from-bottom-2 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <LinkCard link={link} isEditing={isEditing} onEdit={() => setEditingLink(link)} />
            </div>
          ))}
        </div>

        {/* Add Link Button */}
        {isEditing && !isAddingLink && !editingLink && (
          <Button
            onClick={() => setIsAddingLink(true)}
            variant="outline"
            className="w-full backdrop-blur-sm bg-card/50 hover:bg-card/80 border-dashed border-2 h-16 group animate-in fade-in slide-in-from-bottom-2 duration-500"
          >
            <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
            Add New Link
          </Button>
        )}

        {/* Footer */}
        <div className="text-center mt-16 text-sm text-muted-foreground animate-in fade-in duration-1000 delay-700">
          <p>© 2025 Jane Doe. All rights reserved.</p>
        </div>
      </div>

      {/* Link Editor Modal */}
      {(editingLink || isAddingLink) && (
        <LinkEditor
          link={editingLink}
          onSave={editingLink ? handleUpdateLink : handleAddLink}
          onDelete={editingLink ? () => handleDeleteLink(editingLink.id) : undefined}
          onClose={() => {
            setEditingLink(null)
            setIsAddingLink(false)
          }}
        />
      )}
    </div>
  )
}

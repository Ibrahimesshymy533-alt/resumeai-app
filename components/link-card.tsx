"use client"

import type { Link as LinkType } from "@/app/page"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Briefcase,
  Twitter,
  Github,
  Linkedin,
  Mail,
  Globe,
  Instagram,
  Youtube,
  Music,
  ExternalLink,
  Edit2,
} from "lucide-react"

interface LinkCardProps {
  link: LinkType
  isEditing: boolean
  onEdit: () => void
}

const iconMap = {
  briefcase: Briefcase,
  twitter: Twitter,
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  globe: Globe,
  instagram: Instagram,
  youtube: Youtube,
  music: Music,
}

export function LinkCard({ link, isEditing, onEdit }: LinkCardProps) {
  const Icon = iconMap[link.icon as keyof typeof iconMap] || Globe

  const handleClick = () => {
    if (!isEditing) {
      window.open(link.url, "_blank")
    }
  }

  return (
    <Card
      className="group relative overflow-hidden backdrop-blur-sm bg-card/50 border-border/50 hover:bg-card/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer"
      onClick={handleClick}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative flex items-center justify-between p-6">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-md group-hover:bg-primary/20 transition-colors" />
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Icon className="h-6 w-6 text-foreground" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {link.title}
            </h3>
            <p className="text-sm text-muted-foreground truncate">{link.url}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                onEdit()
              }}
              className="hover:bg-accent/50"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          ) : (
            <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
          )}
        </div>
      </div>
    </Card>
  )
}

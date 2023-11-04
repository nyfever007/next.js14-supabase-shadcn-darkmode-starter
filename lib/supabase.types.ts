export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatarUrl: string | null
          createdAt: string
          email: string
          id: string
          loggedAt: string
          name: string
          provider: string | null
          role: string
          updatedAt: string
        }
        Insert: {
          avatarUrl?: string | null
          createdAt?: string
          email?: string
          id: string
          loggedAt?: string
          name?: string
          provider?: string | null
          role?: string
          updatedAt?: string
        }
        Update: {
          avatarUrl?: string | null
          createdAt?: string
          email?: string
          id?: string
          loggedAt?: string
          name?: string
          provider?: string | null
          role?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

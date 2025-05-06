export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      boosts: {
        Row: {
          amount: number
          created_at: string
          duration_hours: number
          id: string
          listing_id: string
          start_time: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          duration_hours?: number
          id?: string
          listing_id: string
          start_time?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          duration_hours?: number
          id?: string
          listing_id?: string
          start_time?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "boosts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chats: {
        Row: {
          created_at: string
          id: string
          user1: string
          user2: string
        }
        Insert: {
          created_at?: string
          id?: string
          user1: string
          user2: string
        }
        Update: {
          created_at?: string
          id?: string
          user1?: string
          user2?: string
        }
        Relationships: [
          {
            foreignKeyName: "chats_user1_fkey"
            columns: ["user1"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chats_user2_fkey"
            columns: ["user2"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      listings: {
        Row: {
          amenities: string[] | null
          created_at: string
          description: string | null
          expires_at: string
          gender_preference: string | null
          id: string
          images: string[] | null
          is_boosted: boolean
          is_expired: boolean
          location: string
          owner_id: string
          price: number
          room_type: string
          show_only_same_gender: boolean
          tags: string[] | null
          title: string
          type: string
          updated_at: string
          view_count: number
        }
        Insert: {
          amenities?: string[] | null
          created_at?: string
          description?: string | null
          expires_at?: string
          gender_preference?: string | null
          id?: string
          images?: string[] | null
          is_boosted?: boolean
          is_expired?: boolean
          location: string
          owner_id: string
          price: number
          room_type: string
          show_only_same_gender?: boolean
          tags?: string[] | null
          title: string
          type: string
          updated_at?: string
          view_count?: number
        }
        Update: {
          amenities?: string[] | null
          created_at?: string
          description?: string | null
          expires_at?: string
          gender_preference?: string | null
          id?: string
          images?: string[] | null
          is_boosted?: boolean
          is_expired?: boolean
          location?: string
          owner_id?: string
          price?: number
          room_type?: string
          show_only_same_gender?: boolean
          tags?: string[] | null
          title?: string
          type?: string
          updated_at?: string
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "listings_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          chat_id: string
          content: string | null
          created_at: string
          from_user: string
          id: string
          image_url: string | null
          is_contact_shared: boolean
          to_user: string
        }
        Insert: {
          chat_id: string
          content?: string | null
          created_at?: string
          from_user: string
          id?: string
          image_url?: string | null
          is_contact_shared?: boolean
          to_user: string
        }
        Update: {
          chat_id?: string
          content?: string | null
          created_at?: string
          from_user?: string
          id?: string
          image_url?: string | null
          is_contact_shared?: boolean
          to_user?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_from_user_fkey"
            columns: ["from_user"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_to_user_fkey"
            columns: ["to_user"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          gender: string | null
          id: string
          phone_number: string | null
          updated_at: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          gender?: string | null
          id: string
          phone_number?: string | null
          updated_at?: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          gender?: string | null
          id?: string
          phone_number?: string | null
          updated_at?: string
          user_type?: Database["public"]["Enums"]["user_type"]
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string
          id: string
          reason: string
          reported_by: string
          status: string
          target_listing: string | null
          target_user: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          reason: string
          reported_by: string
          status?: string
          target_listing?: string | null
          target_user?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          reason?: string
          reported_by?: string
          status?: string
          target_listing?: string | null
          target_user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_reported_by_fkey"
            columns: ["reported_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_target_user_fkey"
            columns: ["target_user"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          expires_at: string
          id: string
          start_date: string
          tier: string
          user_id: string
        }
        Insert: {
          expires_at: string
          id?: string
          start_date?: string
          tier: string
          user_id: string
        }
        Update: {
          expires_at?: string
          id?: string
          start_date?: string
          tier?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
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
      user_type: "individual" | "business"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_type: ["individual", "business"],
    },
  },
} as const

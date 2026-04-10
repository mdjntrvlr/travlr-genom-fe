import { api } from './api'

export interface AudienceOverlap {
  score: number
  description: string
  shared_segments: string[]
}

export interface PartnershipType {
  type: string
  description: string
  potential: 'High' | 'Medium' | 'Low'
}

export interface CampaignIdea {
  title: string
  concept: string
  format: string
  target_audience: string
  expected_outcome: string
}

export interface TravlrCompatibilityData {
  compatibility_score: number
  compatibility_label: string
  travel_relevance: string
  summary: string
  strengths: string[]
  challenges: string[]
  audience_overlap: AudienceOverlap
  partnership_types: PartnershipType[]
  campaign_ideas: CampaignIdea[]
  destination_opportunities: string[]
  revenue_models: string[]
  quick_wins: string[]
  long_term_plays: string[]
  risk_factors: string[]
  recommendation: string
}

export const getTravlrCompatibilityByUrl = (idOrSlug: string) =>
  api.get<TravlrCompatibilityData>(`/brands/${idOrSlug}/travlr-compatibility`)

export const getTravlrCompatibilityFromBrand = (idOrSlug: string | number) =>
  api.get<TravlrCompatibilityData>(`/brands/${idOrSlug}/travlr-compatibility`)

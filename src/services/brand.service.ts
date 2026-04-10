import { api } from './api'
import type { TravlrCompatibilityData } from './travlrCompatibility.service'

interface ColorPalette {
    primary: string
    secondary: string
    tertiary: string
}

interface Image {
    id: string
    url: string
}

export interface Banner {
    image: Image
}

interface RawData {
    color_palette: ColorPalette
    banner: Banner
    travlr_compatibility?: TravlrCompatibilityData
}

export interface Brand {
    id: string | number
    slug: string
    name: string
    logo: string
    url: string
    raw_data?: RawData
}

export const getBrands = () => {
    return api.get<Brand[]>('/brands')
}

export const getBrandBySlug = (slug: string) => {
    return api.get<Brand>(`/brands/${slug}`)
}

export const updateBrandPrototype = <TResponse = unknown>(
    idOrSlug: string | number,
    payload: Record<string, unknown> = {},
) => {
    return api.post<TResponse>(`/brands/${idOrSlug}/update-prototype`, payload)
}
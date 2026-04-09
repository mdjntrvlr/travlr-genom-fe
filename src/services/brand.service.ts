import { api } from './api'

interface ColorPalette {
    primary: string
    secondary: string
    tertiary: string
}

interface RawData {
    color_palette: ColorPalette
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
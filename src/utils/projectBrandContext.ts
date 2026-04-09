import type { InjectionKey, Ref } from 'vue'
import type { Brand } from '../services'

export interface ProjectBrandContextValue {
  brand: Readonly<Ref<Brand | null>>
  isLoadingBrand: Readonly<Ref<boolean>>
  refreshBrand: () => Promise<void>
  setBrand: (nextBrand: Brand | null) => void
  patchBrand: (partialBrand: Partial<Brand>) => void
}

export const projectBrandContextKey: InjectionKey<ProjectBrandContextValue> = Symbol('projectBrandContext')

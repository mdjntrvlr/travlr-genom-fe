import { ref } from 'vue'
import {
  getTravlrCompatibilityByUrl,
  type TravlrCompatibilityData,
} from '../services/travlrCompatibility.service'

export const useTravlrCompatibility = () => {
  const data = ref<TravlrCompatibilityData | null>(null)
  const loading = ref(false)
  const error = ref('')

  const fetchByUrl = async (idOrSlug: string) => {
    if (!idOrSlug) return

    loading.value = true
    error.value = ''

    try {
      data.value = await getTravlrCompatibilityByUrl(idOrSlug)
    } catch (e) {
      error.value =
        e instanceof Error ? e.message : 'Unable to load compatibility data.'
      data.value = null
    } finally {
      loading.value = false
    }
  }

  const setData = (preloaded: TravlrCompatibilityData | null) => {
    data.value = preloaded
  }

  return { data, loading, error, fetchByUrl, setData }
}

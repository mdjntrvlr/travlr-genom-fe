import { ref, type Ref } from "vue";

import type {
  ReviewState,
  StepItem,
  UploadItem,
} from "../types/brandIntelligence";

const buildDefaultReviewState = (): ReviewState => ({
  brandName: "The Bali Bible",
  domain: "thebalibible.com",
  logoCandidates: [],
  colors: ["#2DCCD3", "#FFFFFF", "#111827", "#1F2937"],
  coreValues: [
    "Authenticity",
    "Local Knowledge",
    "Trust",
    "Editorial",
    "Curation",
    "Insider",
  ],
  brandTones: ["Confident", "Warm", "Editorial", "Playful"],
  brandAesthetics: ["Minimalist", "Contemporary", "Tropical", "Refined"],
  targetMarkets: ["Young Professionals", "Luxury Travelers", "Digital Nomads"],
  industryContexts: ["Hospitality", "Travel Media", "Destination Discovery"],
  brandNarrative:
    "The Bali Bible is a trusted travel companion for modern explorers seeking curated island experiences. It blends insider knowledge with polished editorial storytelling to make discovery feel effortless, aspirational, and deeply connected to local culture.",
});

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() || "/api";

type UnknownRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const normalizeKey = (value: string) => value.replace(/[^a-z0-9]/gi, "").toLowerCase();

const normalizeText = (value: string) => value.trim().replace(/\s+/g, " ");

const uniqueStrings = (values: string[]) => {
  const seen = new Set<string>();

  return values.filter((value) => {
    const normalizedValue = value.toLowerCase();

    if (seen.has(normalizedValue)) {
      return false;
    }

    seen.add(normalizedValue);
    return true;
  });
};

const getCandidateSources = (payload: unknown): UnknownRecord[] => {
  if (!isRecord(payload)) {
    return [];
  }

  const sources = [payload];

  for (const key of [
    "data",
    "result",
    "analysis",
    "brand",
    "brandProfile",
    "brand_profile",
    "profile",
    "report",
  ]) {
    const nestedValue = payload[key];

    if (isRecord(nestedValue)) {
      sources.push(nestedValue);
    }
  }

  return sources;
};

const findDirectValueByAliases = (payload: unknown, aliases: string[]) => {
  const normalizedAliases = new Set(aliases.map(normalizeKey));

  for (const source of getCandidateSources(payload)) {
    for (const [key, value] of Object.entries(source)) {
      if (normalizedAliases.has(normalizeKey(key)) && value != null) {
        return value;
      }
    }
  }

  return undefined;
};

const findValueByAliases = (payload: unknown, aliases: string[]) => {
  const normalizedAliases = new Set(aliases.map(normalizeKey));
  const queue: unknown[] = [payload];
  const visited = new Set<object>();

  while (queue.length) {
    const currentValue = queue.shift();

    if (Array.isArray(currentValue)) {
      queue.push(...currentValue);
      continue;
    }

    if (!isRecord(currentValue)) {
      continue;
    }

    if (visited.has(currentValue)) {
      continue;
    }

    visited.add(currentValue);

    for (const [key, value] of Object.entries(currentValue)) {
      if (normalizedAliases.has(normalizeKey(key)) && value != null) {
        return value;
      }
    }

    queue.push(...Object.values(currentValue));
  }

  return undefined;
};

const extractString = (value: unknown): string => {
  if (typeof value === "string") {
    return normalizeText(value);
  }

  if (typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => extractString(item))
      .filter(Boolean)
      .join(", ");
  }

  if (isRecord(value)) {
    for (const key of ["name", "label", "title", "value", "text", "description"]) {
      const nestedValue = value[key];

      if (typeof nestedValue === "string" || typeof nestedValue === "number") {
        return extractString(nestedValue);
      }
    }
  }

  return "";
};

const normalizeStringList = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return uniqueStrings(
      value
        .flatMap((item) => {
          if (typeof item === "string") {
            return item.split(/\r?\n|[,;|]/);
          }

          const extractedValue = extractString(item);
          return extractedValue ? extractedValue.split(/\r?\n|[,;|]/) : [];
        })
        .map((item) => normalizeText(item))
        .filter(Boolean),
    );
  }

  if (typeof value === "string") {
    return uniqueStrings(
      value
        .split(/\r?\n|[,;|]/)
        .map((item) => normalizeText(item))
        .filter(Boolean),
    );
  }

  const extractedValue = extractString(value);
  return extractedValue ? [extractedValue] : [];
};

const normalizeColorToken = (value: string) => {
  const normalizedValue = normalizeText(value);
  const hexMatch = normalizedValue.match(/#?[0-9a-fA-F]{6}\b/);

  if (hexMatch) {
    return `#${hexMatch[0].replace("#", "").toUpperCase()}`;
  }

  return normalizedValue;
};

const normalizeColorList = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return uniqueStrings(
      value
        .flatMap((item) => {
          if (typeof item === "string") {
            return item.split(/\r?\n|[,;|]/);
          }

          if (isRecord(item)) {
            for (const key of ["hex", "color", "colour", "value", "name"]) {
              const nestedValue = item[key];

              if (typeof nestedValue === "string") {
                return [nestedValue];
              }
            }
          }

          const extractedValue = extractString(item);
          return extractedValue ? [extractedValue] : [];
        })
        .map((item) => normalizeColorToken(item))
        .filter(Boolean),
    );
  }

  if (typeof value === "string") {
    return uniqueStrings(
      value
        .split(/\r?\n|[,;|]/)
        .map((item) => normalizeColorToken(item))
        .filter(Boolean),
    );
  }

  return [];
};

const normalizeUrlToken = (value: string) => normalizeText(value);

const isLikelyImageUrl = (value: string) =>
  /^(https?:)?\/\//i.test(value) ||
  value.startsWith("/") ||
  value.startsWith("data:image/");

const normalizeUrlList = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return uniqueStrings(
      value
        .flatMap((item) => {
          if (typeof item === "string") {
            return [item];
          }

          if (isRecord(item)) {
            for (const key of ["url", "href", "src", "value"]) {
              const nestedValue = item[key];

              if (typeof nestedValue === "string") {
                return [nestedValue];
              }
            }
          }

          const extractedValue = extractString(item);
          return extractedValue ? [extractedValue] : [];
        })
        .map((item) => normalizeUrlToken(item))
        .filter((item) => item && isLikelyImageUrl(item)),
    );
  }

  if (typeof value === "string") {
    const normalizedValue = normalizeUrlToken(value);
    return normalizedValue && isLikelyImageUrl(normalizedValue)
      ? [normalizedValue]
      : [];
  }

  const extractedValue = extractString(value);
  return extractedValue && isLikelyImageUrl(extractedValue)
    ? [normalizeUrlToken(extractedValue)]
    : [];
};

const getLogoCandidates = (payload: unknown) => {
  const aliases = {
    main: ["main_logo", "mainLogo", "logo", "primaryLogo", "primary_logo"],
    invert: ["invert_logo", "invertLogo", "inverseLogo", "inverse_logo"],
    favicon: ["favicon", "favIcon", "icon", "siteIcon", "site_icon"],
  };

  return uniqueStrings([
    ...normalizeUrlList(
      findDirectValueByAliases(payload, aliases.main) ??
        findValueByAliases(payload, aliases.main),
    ),
    ...normalizeUrlList(
      findDirectValueByAliases(payload, aliases.invert) ??
        findValueByAliases(payload, aliases.invert),
    ),
    ...normalizeUrlList(
      findDirectValueByAliases(payload, aliases.favicon) ??
        findValueByAliases(payload, aliases.favicon),
    ),
  ]);
};

export const useBrandIntelligence = (
  uploads: Ref<UploadItem[]>,
  showToast: (message: string, tone: "success" | "error") => void,
) => {
  const currentStep = ref(1);
  const websiteUrl = ref("");
  const websiteUrlError = ref("");
  const submitError = ref("");
  const isSubmitting = ref(false);
  const isColorModalOpen = ref(false);
  const newColorHex = ref("#01B2C9");
  const newColorError = ref("");
  const isCoreValueModalOpen = ref(false);
  const newCoreValue = ref("");
  const newCoreValueError = ref("");
  const reviewState = ref<ReviewState>(buildDefaultReviewState());
  const isBrandToneModalOpen = ref(false);
  const newBrandTone = ref("");
  const newBrandToneError = ref("");
  const isBrandAestheticModalOpen = ref(false);
  const newBrandAesthetic = ref("");
  const newBrandAestheticError = ref("");
  const isTargetMarketModalOpen = ref(false);
  const newTargetMarket = ref("");
  const newTargetMarketError = ref("");
  const isIndustryContextModalOpen = ref(false);
  const newIndustryContext = ref("");
  const newIndustryContextError = ref("");
  const isBrandNarrativeModalOpen = ref(false);
  const brandNarrativeDraft = ref("");
  const brandNarrativeError = ref("");

  const steps: StepItem[] = [
    { number: 1, label: "Brand Extraction" },
    { number: 2, label: "Brand Review" },
    { number: 3, label: "Applications" },
  ];

  const normalizeWebsiteUrl = (rawValue: string) => {
    const trimmedValue = rawValue.trim();

    if (!trimmedValue) {
      return {
        isValid: false,
        value: "",
        message: "Website URL is required.",
      };
    }

    const normalizedValue = /^https?:\/\//i.test(trimmedValue)
      ? trimmedValue
      : `https://${trimmedValue}`;

    try {
      const parsedUrl = new URL(normalizedValue);
      const hasValidProtocol =
        parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
      const hasValidHostname =
        parsedUrl.hostname.includes(".") && !parsedUrl.hostname.startsWith(".");

      if (!hasValidProtocol || !hasValidHostname) {
        return {
          isValid: false,
          value: "",
          message:
            "Enter a valid website URL, for example `https://mastercard.com`.",
        };
      }

      return {
        isValid: true,
        value: parsedUrl.toString(),
        message: "",
      };
    } catch {
      return {
        isValid: false,
        value: "",
        message:
          "Enter a valid website URL, for example `https://mastercard.com`.",
      };
    }
  };

  const validateWebsiteUrl = () => {
    const result = normalizeWebsiteUrl(websiteUrl.value);
    websiteUrlError.value = result.message;

    if (result.isValid) {
      websiteUrl.value = result.value;
    }

    return result;
  };

  const handleWebsiteInput = () => {
    websiteUrlError.value = "";
    submitError.value = "";
  };

  const openColorModal = () => {
    isColorModalOpen.value = true;
    newColorHex.value = "#01B2C9";
    newColorError.value = "";
  };

  const closeColorModal = () => {
    isColorModalOpen.value = false;
    newColorError.value = "";
  };

  const openCoreValueModal = () => {
    isCoreValueModalOpen.value = true;
    newCoreValue.value = "";
    newCoreValueError.value = "";
  };

  const closeCoreValueModal = () => {
    isCoreValueModalOpen.value = false;
    newCoreValue.value = "";
    newCoreValueError.value = "";
  };

  const openBrandToneModal = () => {
    isBrandToneModalOpen.value = true;
    newBrandTone.value = "";
    newBrandToneError.value = "";
  };

  const closeBrandToneModal = () => {
    isBrandToneModalOpen.value = false;
    newBrandTone.value = "";
    newBrandToneError.value = "";
  };

  const openBrandAestheticModal = () => {
    isBrandAestheticModalOpen.value = true;
    newBrandAesthetic.value = "";
    newBrandAestheticError.value = "";
  };

  const closeBrandAestheticModal = () => {
    isBrandAestheticModalOpen.value = false;
    newBrandAesthetic.value = "";
    newBrandAestheticError.value = "";
  };

  const openTargetMarketModal = () => {
    isTargetMarketModalOpen.value = true;
    newTargetMarket.value = "";
    newTargetMarketError.value = "";
  };

  const closeTargetMarketModal = () => {
    isTargetMarketModalOpen.value = false;
    newTargetMarket.value = "";
    newTargetMarketError.value = "";
  };

  const openIndustryContextModal = () => {
    isIndustryContextModalOpen.value = true;
    newIndustryContext.value = "";
    newIndustryContextError.value = "";
  };

  const closeIndustryContextModal = () => {
    isIndustryContextModalOpen.value = false;
    newIndustryContext.value = "";
    newIndustryContextError.value = "";
  };

  const openBrandNarrativeModal = () => {
    isBrandNarrativeModalOpen.value = true;
    brandNarrativeDraft.value = reviewState.value.brandNarrative;
    brandNarrativeError.value = "";
  };

  const closeBrandNarrativeModal = () => {
    isBrandNarrativeModalOpen.value = false;
    brandNarrativeDraft.value = "";
    brandNarrativeError.value = "";
  };

  const handleColorInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    let sanitizedValue = target.value.replace(/[^0-9a-fA-F]/g, "").slice(0, 6);

    if (sanitizedValue) {
      sanitizedValue = `#${sanitizedValue.toUpperCase()}`;
    } else {
      sanitizedValue = "#";
    }

    newColorHex.value = sanitizedValue;
    newColorError.value = "";
  };

  const handleCoreValueInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    newCoreValue.value = target.value;
    newCoreValueError.value = "";
  };

  const handleBrandToneInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    newBrandTone.value = target.value;
    newBrandToneError.value = "";
  };

  const handleBrandAestheticInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    newBrandAesthetic.value = target.value;
    newBrandAestheticError.value = "";
  };

  const handleTargetMarketInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    newTargetMarket.value = target.value;
    newTargetMarketError.value = "";
  };

  const handleIndustryContextInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    newIndustryContext.value = target.value;
    newIndustryContextError.value = "";
  };

  const handleBrandNarrativeInput = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    brandNarrativeDraft.value = target.value;
    brandNarrativeError.value = "";
  };

  const saveCustomColor = () => {
    const normalizedColor = newColorHex.value.trim().toUpperCase();
    const isValidHex = /^#[0-9A-F]{6}$/.test(normalizedColor);

    if (!isValidHex) {
      newColorError.value =
        "Enter a valid 6-digit HEX color, for example #01B2C9.";
      return;
    }

    if (reviewState.value.colors.includes(normalizedColor)) {
      newColorError.value = "That color already exists in the palette.";
      return;
    }

    reviewState.value.colors.push(normalizedColor);
    closeColorModal();
    showToast(`Added ${normalizedColor.toLowerCase()} to palette`, "success");
  };

  const saveCoreValue = () => {
    const normalizedValue = newCoreValue.value.trim().replace(/\s+/g, " ");

    if (!normalizedValue) {
      newCoreValueError.value = "Enter a value before saving.";
      return;
    }

    const alreadyExists = reviewState.value.coreValues.some(
      (value) => value.toLowerCase() === normalizedValue.toLowerCase(),
    );

    if (alreadyExists) {
      newCoreValueError.value = "That value already exists.";
      return;
    }

    reviewState.value.coreValues.push(normalizedValue);
    closeCoreValueModal();
    showToast(`Added ${normalizedValue} to core values`, "success");
  };

  const saveBrandTone = () => {
    const normalizedValue = newBrandTone.value.trim().replace(/\s+/g, " ");

    if (!normalizedValue) {
      newBrandToneError.value = "Enter a value before saving.";
      return;
    }

    const alreadyExists = reviewState.value.brandTones.some(
      (value) => value.toLowerCase() === normalizedValue.toLowerCase(),
    );

    if (alreadyExists) {
      newBrandToneError.value = "That tone already exists.";
      return;
    }

    reviewState.value.brandTones.push(normalizedValue);
    closeBrandToneModal();
    showToast(`Added ${normalizedValue} to brand tone`, "success");
  };

  const saveBrandAesthetic = () => {
    const normalizedValue = newBrandAesthetic.value.trim().replace(/\s+/g, " ");

    if (!normalizedValue) {
      newBrandAestheticError.value = "Enter a value before saving.";
      return;
    }

    const alreadyExists = reviewState.value.brandAesthetics.some(
      (value) => value.toLowerCase() === normalizedValue.toLowerCase(),
    );

    if (alreadyExists) {
      newBrandAestheticError.value = "That aesthetic already exists.";
      return;
    }

    reviewState.value.brandAesthetics.push(normalizedValue);
    closeBrandAestheticModal();
    showToast(`Added ${normalizedValue} to brand aesthetic`, "success");
  };

  const saveTargetMarket = () => {
    const normalizedValue = newTargetMarket.value.trim().replace(/\s+/g, " ");

    if (!normalizedValue) {
      newTargetMarketError.value = "Enter a value before saving.";
      return;
    }

    const alreadyExists = reviewState.value.targetMarkets.some(
      (value) => value.toLowerCase() === normalizedValue.toLowerCase(),
    );

    if (alreadyExists) {
      newTargetMarketError.value = "That target market already exists.";
      return;
    }

    reviewState.value.targetMarkets.push(normalizedValue);
    closeTargetMarketModal();
    showToast(`Added ${normalizedValue} to target market`, "success");
  };

  const saveIndustryContext = () => {
    const normalizedValue = newIndustryContext.value.trim().replace(/\s+/g, " ");

    if (!normalizedValue) {
      newIndustryContextError.value = "Enter a value before saving.";
      return;
    }

    const alreadyExists = reviewState.value.industryContexts.some(
      (value) => value.toLowerCase() === normalizedValue.toLowerCase(),
    );

    if (alreadyExists) {
      newIndustryContextError.value = "That industry context already exists.";
      return;
    }

    reviewState.value.industryContexts.push(normalizedValue);
    closeIndustryContextModal();
    showToast(`Added ${normalizedValue} to industry context`, "success");
  };

  const saveBrandNarrative = () => {
    const normalizedValue = brandNarrativeDraft.value.trim();

    if (!normalizedValue) {
      brandNarrativeError.value = "Enter brand narrative before saving.";
      return;
    }

    reviewState.value.brandNarrative = normalizedValue;
    closeBrandNarrativeModal();
    showToast("Updated brand narrative", "success");
  };

  const saveBrandReview = () => {
    currentStep.value = steps[2]?.number ?? 3;
    showToast("Brand review saved", "success");
  };

  const backToExtraction = () => {
    submitError.value = "";
    currentStep.value = steps[0]?.number ?? 1;
  };

  const backToBrandReview = () => {
    currentStep.value = steps[1]?.number ?? 2;
  };

  const toTitleCase = (value: string) => {
    return value
      .split(/[-.\s]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  };

  const getDomainFromValue = (value: string) => {
    const normalizedValue = /^https?:\/\//i.test(value) ? value : `https://${value}`;

    try {
      return new URL(normalizedValue).hostname.replace(/^www\./i, "");
    } catch {
      return value.replace(/^www\./i, "");
    }
  };

  const buildReviewState = (normalizedUrl: string, payload?: unknown) => {
    const parsedUrl = new URL(normalizedUrl);
    const hostname = parsedUrl.hostname.replace(/^www\./i, "");
    const rootName = hostname.split(".")[0] ?? hostname;
    const defaultReviewState = buildDefaultReviewState();

    const resolvedDomainValue = extractString(
      findDirectValueByAliases(payload, [
        "domain",
        "hostname",
        "website",
        "websiteUrl",
        "website_url",
        "url",
        "siteUrl",
        "site_url",
      ]),
    );
    const resolvedDomain = resolvedDomainValue
      ? getDomainFromValue(resolvedDomainValue)
      : hostname;

    const resolvedBrandName =
      extractString(
        findDirectValueByAliases(payload, [
          "brandName",
          "brand_name",
          "companyName",
          "company_name",
          "company",
          "businessName",
          "business_name",
          "name",
        ]),
      ) || toTitleCase(resolvedDomain.split(".")[0] ?? rootName);

    const colors = normalizeColorList(
      findDirectValueByAliases(payload, [
        "colors",
        "colourPalette",
        "colorPalette",
        "palette",
        "brandColors",
        "brand_colors",
        "primaryColors",
        "primary_colors",
      ]),
    );
    const logoCandidates = getLogoCandidates(payload);
    const coreValues = normalizeStringList(
      findDirectValueByAliases(payload, [
        "coreValues",
        "core_values",
        "values",
        "brandValues",
        "brand_values",
      ]) ??
        findValueByAliases(payload, [
          "coreValues",
          "core_values",
          "brandValues",
          "brand_values",
        ]),
    );
    const brandTones = normalizeStringList(
      findDirectValueByAliases(payload, [
        "brandTones",
        "brand_tones",
        "tone",
        "tones",
        "brandTone",
        "brand_tone",
        "voice",
        "voiceAttributes",
        "voice_attributes",
      ]) ??
        findValueByAliases(payload, [
          "brandTones",
          "brand_tones",
          "brandTone",
          "brand_tone",
          "voice",
          "voiceAttributes",
          "voice_attributes",
        ]),
    );
    const brandAesthetics = normalizeStringList(
      findDirectValueByAliases(payload, [
        "brandAesthetics",
        "brand_aesthetics",
        "aesthetic",
        "aesthetics",
        "visualStyle",
        "visual_style",
        "designStyle",
        "design_style",
      ]) ??
        findValueByAliases(payload, [
          "brandAesthetics",
          "brand_aesthetics",
          "visualStyle",
          "visual_style",
          "designStyle",
          "design_style",
        ]),
    );
    const targetMarkets = normalizeStringList(
      findDirectValueByAliases(payload, [
        "targetMarkets",
        "target_markets",
        "targetAudience",
        "target_audience",
        "audience",
        "audiences",
        "customerSegments",
        "customer_segments",
      ]) ??
        findValueByAliases(payload, [
          "targetMarkets",
          "target_markets",
          "targetAudience",
          "target_audience",
          "customerSegments",
          "customer_segments",
        ]),
    );
    const industryContexts = normalizeStringList(
      findDirectValueByAliases(payload, [
        "industryContexts",
        "industry_contexts",
        "industryContext",
        "industry_context",
        "industry",
        "industries",
        "category",
        "categories",
        "marketContext",
        "market_context",
      ]) ??
        findValueByAliases(payload, [
          "industryContexts",
          "industry_contexts",
          "industryContext",
          "industry_context",
          "marketContext",
          "market_context",
        ]),
    );
    const brandNarrative =
      extractString(
        findDirectValueByAliases(payload, [
          "brandNarrative",
          "brand_narrative",
          "narrative",
          "story",
          "brandStory",
          "brand_story",
          "summary",
          "brandSummary",
          "brand_summary",
          "brandDescription",
          "brand_description",
        ]),
      ) ||
      extractString(
        findValueByAliases(payload, [
          "brandNarrative",
          "brand_narrative",
          "brandStory",
          "brand_story",
          "brandSummary",
          "brand_summary",
          "brandDescription",
          "brand_description",
        ]),
      ) ||
      defaultReviewState.brandNarrative;

    reviewState.value = {
      ...defaultReviewState,
      brandName: resolvedBrandName,
      domain: resolvedDomain,
      logoCandidates,
      colors: colors.length ? colors : defaultReviewState.colors,
      coreValues: coreValues.length ? coreValues : defaultReviewState.coreValues,
      brandTones: brandTones.length
        ? brandTones
        : defaultReviewState.brandTones,
      brandAesthetics: brandAesthetics.length
        ? brandAesthetics
        : defaultReviewState.brandAesthetics,
      targetMarkets: targetMarkets.length
        ? targetMarkets
        : defaultReviewState.targetMarkets,
      industryContexts: industryContexts.length
        ? industryContexts
        : defaultReviewState.industryContexts,
      brandNarrative,
    };
  };

  const removeColor = (color: string) => {
    reviewState.value.colors = reviewState.value.colors.filter(
      (item) => item !== color,
    );
  };

  const removeCoreValue = (value: string) => {
    reviewState.value.coreValues = reviewState.value.coreValues.filter(
      (item) => item !== value,
    );
  };

  const removeBrandTone = (value: string) => {
    reviewState.value.brandTones = reviewState.value.brandTones.filter(
      (item) => item !== value,
    );
  };

  const removeBrandAesthetic = (value: string) => {
    reviewState.value.brandAesthetics = reviewState.value.brandAesthetics.filter(
      (item) => item !== value,
    );
  };

  const removeTargetMarket = (value: string) => {
    reviewState.value.targetMarkets = reviewState.value.targetMarkets.filter(
      (item) => item !== value,
    );
  };

  const removeIndustryContext = (value: string) => {
    reviewState.value.industryContexts = reviewState.value.industryContexts.filter(
      (item) => item !== value,
    );
  };

  const copyColor = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color.toLowerCase());
      showToast(`Copied ${color.toLowerCase()} to clipboard`, "success");
    } catch {
      console.log("Unable to copy color to clipboard:", color);
      showToast("Unable to copy color", "error");
    }
  };

  const submitBrandExtraction = async () => {
    submitError.value = "";

    const validationResult = validateWebsiteUrl();

    if (!validationResult.isValid) {
      return;
    }

    isSubmitting.value = true;

    try {
      const response = await fetch(
        `${API_BASE_URL}/analyze-brand?url=${encodeURIComponent(validationResult.value)}`,
      );

      if (!response.ok) {
        throw new Error("Unable to analyze brand from the provided URL.");
      }

      const data = await response.json();
      console.log("Extract Brand response:", data);
      buildReviewState(validationResult.value, data);
      currentStep.value = 2;
    } catch (error) {
      submitError.value =
        error instanceof Error
          ? error.message === "Failed to fetch"
            ? "Could not reach the local brand analyzer through the Vite proxy."
            : error.message
          : "Something went wrong while analyzing the brand.";
    } finally {
      isSubmitting.value = false;
    }
  };

  return {
    currentStep,
    websiteUrl,
    websiteUrlError,
    submitError,
    isSubmitting,
    isColorModalOpen,
    isCoreValueModalOpen,
    isBrandToneModalOpen,
    isBrandAestheticModalOpen,
    isTargetMarketModalOpen,
    isIndustryContextModalOpen,
    isBrandNarrativeModalOpen,
    newColorHex,
    newColorError,
    newCoreValue,
    newCoreValueError,
    newBrandTone,
    newBrandToneError,
    newBrandAesthetic,
    newBrandAestheticError,
    newTargetMarket,
    newTargetMarketError,
    newIndustryContext,
    newIndustryContextError,
    brandNarrativeDraft,
    brandNarrativeError,
    reviewState,
    steps,
    validateWebsiteUrl,
    handleWebsiteInput,
    openColorModal,
    closeColorModal,
    openCoreValueModal,
    closeCoreValueModal,
    openBrandToneModal,
    closeBrandToneModal,
    openBrandAestheticModal,
    closeBrandAestheticModal,
    openTargetMarketModal,
    closeTargetMarketModal,
    openIndustryContextModal,
    closeIndustryContextModal,
    openBrandNarrativeModal,
    closeBrandNarrativeModal,
    handleColorInput,
    handleCoreValueInput,
    handleBrandToneInput,
    handleBrandAestheticInput,
    handleTargetMarketInput,
    handleIndustryContextInput,
    handleBrandNarrativeInput,
    saveCustomColor,
    saveCoreValue,
    saveBrandTone,
    saveBrandAesthetic,
    saveTargetMarket,
    saveIndustryContext,
    saveBrandNarrative,
    saveBrandReview,
    backToExtraction,
    backToBrandReview,
    removeColor,
    removeCoreValue,
    removeBrandTone,
    removeBrandAesthetic,
    removeTargetMarket,
    removeIndustryContext,
    copyColor,
    submitBrandExtraction,
  };
};

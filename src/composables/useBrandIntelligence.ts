import { ref, type Ref } from "vue";

import type {
  ReviewState,
  StepItem,
  UploadItem,
} from "../types/brandIntelligence";

const buildDefaultReviewState = (): ReviewState => ({
  brandName: "The Bali Bible",
  domain: "thebalibible.com",
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

  const toTitleCase = (value: string) => {
    return value
      .split(/[-.\s]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  };

  const buildReviewState = (normalizedUrl: string) => {
    const parsedUrl = new URL(normalizedUrl);
    const hostname = parsedUrl.hostname.replace(/^www\./i, "");
    const rootName = hostname.split(".")[0] ?? hostname;

    reviewState.value = {
      ...buildDefaultReviewState(),
      brandName: toTitleCase(rootName),
      domain: hostname,
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
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            websiteUrl: validationResult.value,
            uploadedFiles: uploads.value.map((upload) => ({
              name: upload.name,
              status: upload.status,
            })),
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Unable to submit brand extraction request.");
      }

      const data = await response.json();
      console.log("Extract Brand response:", data);
      buildReviewState(validationResult.value);
      currentStep.value = 2;
    } catch (error) {
      submitError.value =
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting the brand extraction request.";
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

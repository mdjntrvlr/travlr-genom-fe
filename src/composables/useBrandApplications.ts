import { computed, ref } from "vue";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.trim() || "/api";
const HOMEPAGE_SECTION_MODULE_TITLE = "Homepage Section";
const HOMEPAGE_HERO_ITEM_LABEL = "Homepage Hero Banner";

type ApplicationItem = {
  label: string;
  actionLabel: string;
  statusLabel: string;
  brief: string;
  isBriefEnabled: boolean;
};

type ApplicationSection = {
  title: string;
  description: string;
  moduleTitle: string;
  items: ApplicationItem[];
};

type ActiveItemPosition = {
  sectionIndex: number;
  itemIndex: number;
};

type GeneratedCopyOption = {
  id: string;
  heroHeading: string;
  subHeading: string;
};

type GeneratedImageSupport = {
  id: string;
  url: string;
};

type GeneratedBannerResult = {
  copyOptions: GeneratedCopyOption[];
  imageSupports: GeneratedImageSupport[];
  imageSizeLabel: string;
};

type UnknownRecord = Record<string, unknown>;

const buildDefaultApplicationSections = (): ApplicationSection[] => [
  {
    title: "WLP Supports & Product Sections",
    description:
      "Generate high-converting headlines, sub-headings, and body copy for homepage carousels and product landing pages, automatically paired with Shutterstock visual assets.",
    moduleTitle: "Homepage Section",
    items: [
      {
        label: "Homepage Hero Banner",
        actionLabel: "Set Brief",
        statusLabel: "",
        brief: "",
        isBriefEnabled: true,
      },
      {
        label: "Supporting Banner",
        actionLabel: "",
        statusLabel: "",
        brief: "",
        isBriefEnabled: true,
      },
    ],
  },
  {
    title: "",
    description: "",
    moduleTitle: "Brand Assets",
    items: [
      {
        label: "Logo Specs",
        actionLabel: "",
        statusLabel: "",
        brief: "",
        isBriefEnabled: false,
      },
    ],
  },
];

const buildFallbackGeneratedBannerResult = (): GeneratedBannerResult => ({
  copyOptions: [
    {
      id: "option-1",
      heroHeading: "Your World, Connected by The Balibible.",
      subHeading:
        "Experience the joy of seamless journeys across the globe with exclusive rewards and benefits curated for the modern traveler.",
    },
    {
      id: "option-2",
      heroHeading: "Travel Better, Every Step of the Way.",
      subHeading:
        "Unlock curated perks, smarter planning tools, and destination insights designed for modern explorers.",
    },
    {
      id: "option-3",
      heroHeading: "Where Every Journey Feels Effortless.",
      subHeading:
        "From inspiration to itinerary, discover experiences tailored to your style with trusted travel guidance.",
    },
  ],
  imageSupports: [
    {
      id: "image-1",
      url: "https://picsum.photos/seed/travlr-banner-1/1440/560",
    },
    {
      id: "image-2",
      url: "https://picsum.photos/seed/travlr-banner-2/1440/560",
    },
  ],
  imageSizeLabel: "1440x560",
});

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const normalizeKey = (value: string) =>
  value.replace(/[^a-z0-9]/gi, "").toLowerCase();

const asNonEmptyString = (value: unknown): string => {
  if (typeof value === "string") {
    const trimmedValue = value.trim();
    return trimmedValue;
  }

  if (typeof value === "number") {
    return String(value);
  }

  return "";
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

const extractCopyOptions = (payload: unknown): GeneratedCopyOption[] => {
  const candidateValue = findValueByAliases(payload, [
    "options",
    "copyOptions",
    "copy_options",
    "variants",
    "copies",
    "banners",
  ]);

  if (!Array.isArray(candidateValue)) {
    return [];
  }

  return candidateValue
    .map((value, index) => {
      if (!isRecord(value)) {
        return null;
      }

      const heroHeading =
        asNonEmptyString(
          findValueByAliases(value, [
            "header",
            "heroHeading",
            "hero_heading",
            "heroHeadline",
            "hero_headline",
            "headline",
            "title",
            "heading",
          ]),
        ) ||
        asNonEmptyString(value.heroHeading) ||
        asNonEmptyString(value.hero_heading);

      const subHeading =
        asNonEmptyString(
          findValueByAliases(value, [
            "subHeader",
            "sub_header",
            "subHeading",
            "sub_heading",
            "subHeadline",
            "sub_headline",
            "subtitle",
            "description",
            "body",
            "copy",
          ]),
        ) ||
        asNonEmptyString(value.subHeading) ||
        asNonEmptyString(value.sub_heading);

      if (!heroHeading && !subHeading) {
        return null;
      }

      return {
        id: `option-${index + 1}`,
        heroHeading: heroHeading || "Hero heading",
        subHeading: subHeading || "Sub heading",
      };
    })
    .filter((value): value is GeneratedCopyOption => value !== null);
};

const extractImageSupports = (payload: unknown): GeneratedImageSupport[] => {
  const candidateValue = findValueByAliases(payload, [
    "imageSupports",
    "image_supports",
    "images",
    "assets",
    "photos",
    "shutterstockImages",
    "shutterstock_images",
  ]);

  if (!Array.isArray(candidateValue)) {
    return [];
  }

  return candidateValue
    .map((value, index) => {
      const directUrl = asNonEmptyString(value);

      if (directUrl) {
        return {
          id: `image-${index + 1}`,
          url: directUrl,
        };
      }

      if (!isRecord(value)) {
        return null;
      }

      const imageUrl =
        asNonEmptyString(
          findValueByAliases(value, [
            "url",
            "imageUrl",
            "image_url",
            "src",
            "assetUrl",
            "asset_url",
            "link",
          ]),
        ) ||
        asNonEmptyString(value.url) ||
        asNonEmptyString(value.imageUrl) ||
        asNonEmptyString(value.image_url);

      if (!imageUrl) {
        return null;
      }

      return {
        id: `image-${index + 1}`,
        url: imageUrl,
      };
    })
    .filter((value): value is GeneratedImageSupport => value !== null);
};

const extractImageSizeLabel = (payload: unknown) =>
  asNonEmptyString(
    findValueByAliases(payload, [
      "imageSize",
      "image_size",
      "resolution",
      "size",
      "dimension",
      "dimensions",
    ]),
  ) || "1440x560";

const copyTextToClipboard = async (value: string) => {
  if (!value.trim()) {
    return;
  }

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    document.execCommand("copy");
  } finally {
    document.body.removeChild(textarea);
  }
};

const getFileExtensionFromType = (mimeType: string) => {
  const derivedExtension = mimeType.split("/")[1]?.split(";")[0]?.toLowerCase();

  if (!derivedExtension) {
    return "jpg";
  }

  return derivedExtension === "jpeg" ? "jpg" : derivedExtension;
};

const getFileExtensionFromUrl = (rawUrl: string) => {
  try {
    const parsedUrl = new URL(rawUrl, window.location.origin);
    const lastSegment = parsedUrl.pathname.split("/").pop() ?? "";
    const match = lastSegment.match(/\.([a-zA-Z0-9]{2,6})$/);

    return match?.[1]?.toLowerCase() || "jpg";
  } catch {
    return "jpg";
  }
};

const triggerDownload = (url: string, fileName: string) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.rel = "noopener noreferrer";
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const buildGeneratedBannerResult = (payload: unknown): GeneratedBannerResult => {
  const fallbackResult = buildFallbackGeneratedBannerResult();
  const copyOptions = extractCopyOptions(payload);
  const imageSupports = extractImageSupports(payload);
  const imageSizeLabel = extractImageSizeLabel(payload);

  return {
    copyOptions: copyOptions.length ? copyOptions : fallbackResult.copyOptions,
    imageSupports: imageSupports.length
      ? imageSupports
      : fallbackResult.imageSupports,
    imageSizeLabel,
  };
};

export const useBrandApplications = (
  showToast: (message: string, tone: "success" | "error") => void,
) => {
  const applicationSections = ref<ApplicationSection[]>(
    buildDefaultApplicationSections(),
  );
  const isBriefModalOpen = ref(false);
  const briefDraft = ref("");
  const activeItemPosition = ref<ActiveItemPosition | null>(null);
  const generatedResultsBySection = ref<Record<number, GeneratedBannerResult>>(
    {},
  );
  const generatingBySection = ref<Record<number, boolean>>({});

  const getActiveItem = () => {
    const position = activeItemPosition.value;

    if (!position) {
      return null;
    }

    return (
      applicationSections.value[position.sectionIndex]?.items[
        position.itemIndex
      ] ?? null
    );
  };

  const briefModalTitle = computed(() => {
    const item = getActiveItem();

    if (item?.actionLabel === "Edit") {
      return "Edit Brief";
    }

    return "Set Brief";
  });

  const openBriefModal = (sectionIndex: number, itemIndex: number) => {
    const item = applicationSections.value[sectionIndex]?.items[itemIndex];

    if (!item || !item.isBriefEnabled) {
      return;
    }

    activeItemPosition.value = { sectionIndex, itemIndex };
    briefDraft.value = item.brief;
    isBriefModalOpen.value = true;
  };

  const closeBriefModal = () => {
    isBriefModalOpen.value = false;
    activeItemPosition.value = null;
    briefDraft.value = "";
  };

  const getSectionBrief = (sectionIndex: number) => {
    const section = applicationSections.value[sectionIndex];

    if (!section) {
      return "";
    }

    return section.items.find((item) => item.brief.trim())?.brief.trim() ?? "";
  };

  const isHomepageSection = (sectionIndex: number) =>
    applicationSections.value[sectionIndex]?.moduleTitle ===
    HOMEPAGE_SECTION_MODULE_TITLE;

  const shouldShowGeneratedHomepageHero = (
    sectionIndex: number,
    itemLabel: string,
  ) =>
    isHomepageSection(sectionIndex) &&
    itemLabel === HOMEPAGE_HERO_ITEM_LABEL &&
    Boolean(generatedResultsBySection.value[sectionIndex]);

  const getSectionGeneration = (sectionIndex: number) =>
    generatedResultsBySection.value[sectionIndex] ?? null;

  const isGeneratingSection = (sectionIndex: number) =>
    Boolean(generatingBySection.value[sectionIndex]);

  const hasGeneratedSection = (sectionIndex: number) =>
    Boolean(generatedResultsBySection.value[sectionIndex]);

  const getGenerateButtonLabel = (sectionIndex: number) => {
    if (isGeneratingSection(sectionIndex)) {
      return "Generating...";
    }

    return hasGeneratedSection(sectionIndex) ? "Reload" : "Generate";
  };

  const generateBanner = async (sectionIndex: number) => {
    const brandId = 1;
    const brief = getSectionBrief(sectionIndex);
    const query = new URLSearchParams({
      brand_id: String(brandId),
      brief,
    });
    const url = `${API_BASE_URL}/create-banner?${query.toString()}`;

    generatingBySection.value[sectionIndex] = true;

    try {
      const response = await fetch(url);
      const contentType = response.headers.get("content-type") ?? "";
      const result = contentType.includes("application/json")
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        console.error("create-banner request failed", {
          status: response.status,
          result,
        });
        return;
      }

      generatedResultsBySection.value[sectionIndex] =
        buildGeneratedBannerResult(result);
      console.log("create-banner result", result);
    } catch (error) {
      console.error("create-banner request error", error);
    } finally {
      generatingBySection.value[sectionIndex] = false;
    }
  };

  const copyGeneratedText = async (value: string) => {
    if (!value.trim()) {
      showToast("Nothing to copy", "error");
      return;
    }

    try {
      await copyTextToClipboard(value);
      showToast("Copied to clipboard", "success");
    } catch (error) {
      console.error("Unable to copy generated text", error);
      showToast("Unable to copy text", "error");
    }
  };

  const removeGeneratedImage = (sectionIndex: number, imageId: string) => {
    const sectionGeneration = getSectionGeneration(sectionIndex);

    if (!sectionGeneration) {
      return;
    }

    generatedResultsBySection.value[sectionIndex] = {
      ...sectionGeneration,
      imageSupports: sectionGeneration.imageSupports.filter(
        (image) => image.id !== imageId,
      ),
    };
  };

  const downloadAllGeneratedImages = async (sectionIndex: number) => {
    const sectionGeneration = getSectionGeneration(sectionIndex);

    if (!sectionGeneration) {
      showToast("No generated images to download", "error");
      return;
    }

    if (!sectionGeneration.imageSupports.length) {
      showToast("No generated images to download", "error");
      return;
    }

    const downloadResults = await Promise.all(
      sectionGeneration.imageSupports.map(async (image, index) => {
        const fallbackExtension = getFileExtensionFromUrl(image.url);
        const fallbackFileName = `homepage-support-${index + 1}.${fallbackExtension}`;

        try {
          const response = await fetch(image.url);

          if (!response.ok) {
            throw new Error(`Image request failed (${response.status})`);
          }

          const blob = await response.blob();
          const objectUrl = URL.createObjectURL(blob);
          const extension = getFileExtensionFromType(blob.type) || fallbackExtension;
          const fileName = `homepage-support-${index + 1}.${extension}`;

          triggerDownload(objectUrl, fileName);
          window.setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
          return true;
        } catch (error) {
          console.error("Unable to download generated image via blob", error);
          triggerDownload(image.url, fallbackFileName);
          return false;
        }
      }),
    );

    const blobDownloadCount = downloadResults.filter(Boolean).length;
    const totalCount = sectionGeneration.imageSupports.length;

    if (blobDownloadCount === totalCount) {
      showToast(
        `Downloading ${totalCount} image${totalCount > 1 ? "s" : ""}`,
        "success",
      );
      return;
    }

    showToast(
      `Downloading ${totalCount} images (some may open in a new tab)`,
      "success",
    );
  };

  const handleBriefInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    briefDraft.value = target.value;
  };

  const saveBrief = () => {
    const normalizedBrief = briefDraft.value.trim();
    const item = getActiveItem();

    if (!item) {
      closeBriefModal();
      return;
    }

    item.brief = normalizedBrief;
    item.statusLabel = normalizedBrief ? "Brief Applied" : "";
    item.actionLabel = normalizedBrief ? "Edit" : "Set Brief";
    closeBriefModal();
  };

  return {
    applicationSections,
    isBriefModalOpen,
    briefDraft,
    briefModalTitle,
    openBriefModal,
    closeBriefModal,
    generateBanner,
    isGeneratingSection,
    hasGeneratedSection,
    getGenerateButtonLabel,
    shouldShowGeneratedHomepageHero,
    getSectionGeneration,
    copyGeneratedText,
    removeGeneratedImage,
    downloadAllGeneratedImages,
    handleBriefInput,
    saveBrief,
  };
};

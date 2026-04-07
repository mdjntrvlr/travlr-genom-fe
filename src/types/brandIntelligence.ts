export type StepItem = {
  number: number;
  label: string;
  active?: boolean;
};

export type UploadItem = {
  id: number;
  name: string;
  label: string;
  progress: number;
  status: "uploading" | "complete";
};

export type ReviewState = {
  brandName: string;
  domain: string;
  colors: string[];
  coreValues: string[];
};

export type ToastState = {
  message: string;
  tone: "success" | "error";
};

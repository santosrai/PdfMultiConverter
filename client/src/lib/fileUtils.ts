export enum FileStatus {
  QUEUED = "queued",
  PROCESSING = "processing",
  COMPLETED = "completed",
  FAILED = "failed",
  CANCELLED = "cancelled",
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  fileData: File;
  status: FileStatus;
  progress: number;
  createdAt: Date;
  error?: string;
  pdfUrl?: string;
  pdfSize?: number;
}

export interface ConvertedFile {
  id: string;
  name: string;
  url: string;
  size: number;
  dateConverted: Date;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 12);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export enum FileType {
  POWERPOINT = "powerpoint",
  WORD = "word",
  PDF = "pdf",
  OTHER = "other"
}

export function getFileTypeFromName(filename: string): FileType {
  const extension = filename.toLowerCase().split('.').pop() || '';
  
  if (['ppt', 'pptx'].includes(extension)) {
    return FileType.POWERPOINT;
  } else if (['doc', 'docx'].includes(extension)) {
    return FileType.WORD;
  } else if (extension === 'pdf') {
    return FileType.PDF;
  } else {
    return FileType.OTHER;
  }
}

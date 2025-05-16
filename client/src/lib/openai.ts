import { apiRequest } from "./queryClient";

export interface TranscriptionResult {
  text: string;
  duration?: number;
}

export interface SummarizationResult {
  summary: string;
}

export const transcribeAudio = async (videoId: number): Promise<TranscriptionResult> => {
  const response = await apiRequest("POST", `/api/videos/${videoId}/transcribe`, {});
  return await response.json();
};

export const summarizeTranscript = async (
  videoId: number, 
  transcript: string
): Promise<SummarizationResult> => {
  const response = await apiRequest(
    "POST", 
    `/api/videos/${videoId}/summarize`, 
    { transcript }
  );
  return await response.json();
};

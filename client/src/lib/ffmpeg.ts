import { apiRequest } from "./queryClient";

export const extractAudio = async (videoId: number): Promise<{ success: boolean }> => {
  const response = await apiRequest("POST", `/api/videos/${videoId}/extract-audio`, {});
  return await response.json();
};

export const checkProcessingStatus = async (videoId: number) => {
  const response = await fetch(`/api/videos/${videoId}/status`, {
    credentials: "include",
  });
  
  if (!response.ok) {
    throw new Error(`Error checking processing status: ${response.statusText}`);
  }
  
  return await response.json();
};

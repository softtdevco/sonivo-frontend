import { LoginResponse } from "@/service/auth/auth";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const handleEncodeData = (data: LoginResponse) => {
  // Encode user data and tokens using base64 before storing in localStorage
  const encodedUser = btoa(JSON.stringify(data.user));
  const encodedAccessToken = btoa(data.access_token);
  const encodedRefreshToken = btoa(data.refresh_token);
  // Store encoded data in localStorage
  localStorage.setItem("user", encodedUser);
  localStorage.setItem("access_token", encodedAccessToken);
  localStorage.setItem("refresh_token", encodedRefreshToken);
}

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    secs.toString().padStart(2, '0')
  ].join(':');
}
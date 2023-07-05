import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getQueryParams(request: Request): URLSearchParams {
  const parsedUrl = new URL(request.url)
  const queryString = parsedUrl.search
  const queryParams = new URLSearchParams(queryString)
  return queryParams
}

export const ApplicationError = {
  ValidationError: 'VALIDATION_ERROR',
  CommonError: 'COMMON_ERROR',
  ServiceError: 'SERVICE_ERROR',
} as const;

export const DEFAULT_STATIC_IMAGES = ['default-avatar.jpg'];
export const STATIC_RESOURCE_FIELDS = ['avatarPath', 'image'];

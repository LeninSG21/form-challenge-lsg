export const REQUEST_STATUS = {
  idle: 'idle',
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected',
} as const;

export type RequestStatusType =
  typeof REQUEST_STATUS[keyof typeof REQUEST_STATUS];

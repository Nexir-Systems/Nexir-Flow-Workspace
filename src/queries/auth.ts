import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changePasswordMock, loginMock, logoutMock, registerMock } from '../api/mock/auth';

export function useLoginMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginMock(email, password),
    onSuccess: () => {
      void qc.invalidateQueries();
    },
  });
}

export function useRegisterMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      registerMock(email, password),
    onSuccess: () => {
      void qc.invalidateQueries();
    },
  });
}

export function useLogoutMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => logoutMock(),
    onSuccess: () => {
      void qc.clear();
    },
  });
}

export function useChangePasswordMutation() {
  return useMutation({
    mutationFn: ({
      email,
      currentPassword,
      newPassword,
    }: {
      email: string;
      currentPassword: string;
      newPassword: string;
    }) => changePasswordMock(email, currentPassword, newPassword),
  });
}

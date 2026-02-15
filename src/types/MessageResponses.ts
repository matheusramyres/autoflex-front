export const messages = {
  204: 'Item removido',
  404: 'Item não encontrado',
  409: 'Indisponivel para remoção ou em uso',
} as const;

export type StatusCode = keyof typeof messages;

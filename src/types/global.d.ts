export {};

declare global {
  interface Window {
    DiscordSDK?: {
      getCurrentUser?: () => Promise<{ id: string; username?: string; discriminator?: string; avatar?: string }>;
    };
  }
}

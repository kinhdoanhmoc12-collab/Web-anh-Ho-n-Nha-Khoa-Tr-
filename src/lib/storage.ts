export interface DownloadLinkConfig {
  resourceId: string;
  userRole: string;
  isPaid: boolean;
}

export function generateSecureDownloadUrl(config: DownloadLinkConfig): {
  allowed: boolean;
  downloadUrl?: string;
  message?: string;
} {
  if (config.isPaid && config.userRole !== "VIP_MEMBER" && config.userRole !== "ADMIN") {
    return {
      allowed: false,
      message: "Tài nguyên này dành riêng cho hội viên VIP. Vui lòng nâng cấp tài khoản!",
    };
  }

  // Generate CDN / Secure signed download link
  const secureUrl = `https://cdn.zunphoto.pro/downloads/${config.resourceId}.zip?token=secure_${Date.now()}`;
  return {
    allowed: true,
    downloadUrl: secureUrl,
  };
}

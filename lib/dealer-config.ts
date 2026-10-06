export const dealerConfig = {
  name: "PREMIUM AUTO ZIMBABWE",
  location: "Harare, Zimbabwe",
  whatsappNumber: "",
  salesEmail: "",
  currency: "US$",
  enquiryMessage: "Hi, I'm interested in this vehicle. Is it still available?",
} as const;

export function buildWhatsAppUrl(message = dealerConfig.enquiryMessage) {
  if (!dealerConfig.whatsappNumber) return "#contact";
  return "https://wa.me/" + dealerConfig.whatsappNumber + "?text=" + encodeURIComponent(message);
}

export function vehicleWhatsAppUrl(vehicleName: string, price: string) {
  return buildWhatsAppUrl(
    "Hi, I'm interested in the " + vehicleName + " listed at " + price + ". Is it still available?"
  );
}

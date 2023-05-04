export const environment = {
  BASE_URL_API : "https://webhotel.click",
  BASE_URL_WEB : "http://localhost:4200",


  QR_MOMO: (orderInfor: string, amount: number) => `https://webhotel.click/api/Momo/momoQR/${orderInfor}&${amount}`
};

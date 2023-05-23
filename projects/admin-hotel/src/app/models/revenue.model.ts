export interface Revenue {
  year: number;
  result: RevenueComponent[]
}
export interface RevenueComponent {
    sumCustomer: number;
    sumReservation: number;
    sumRevenue: number;
}

export interface Varitaion {
  productionValue: number;
  activeProducts: number;
  materialUtilization: number;
}
export interface DashboardSummary {
  totalProductionValue: number;
  activeProducts: number;
  materialUtilization: number;
  variation: Varitaion;
}

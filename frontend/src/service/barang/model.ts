export interface GetBarangPayload {
  page: number;
  pageSize: number;
  search?: string;
}

export interface IDataResponse {
  id: string;
  name: string;
  price: number;
  description: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DataPagination {
  paginatedData: PaginatedDatum[];
  total: number;
  page: number;
  pageSize: number;
}

export interface PaginatedDatum {
  id: string;
  name: string;
  price: number;
  description: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetAllDataResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  status: number;
  message: string;
}

export interface GetDetailDataResponse {
  data: IDataResponse | null;
  status: number;
  message: string;
}

export interface PayloadBarang {
  name: string;
  description: string;
  price: number;
}

// ---

export interface ResponseDashboard {
  data: Data | null;
  status: number;
  message: string;
}

export interface Data {
  totalBarangUser: number;
  totalBarang: number;
  totalUsers: number;
  totalPrice: number;
  topExpensiveBarang: TopExpensiveBarang[];
  topUser: TopUser;
  barangPerUser: BarangPerUser[];
}

export interface BarangPerUser {
  id: string;
  name: string;
  _count: Count;
}

export interface Count {
  barang: number;
}

export interface TopExpensiveBarang {
  id: string;
  name: string;
  price: number;
  description: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TopUser {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  _count: Count;
}

export type MedicineFormValues = {
  name: string;
  stock: number;
  price: number;
};


export type MedicineDeliveryFormValues = {
  order_id: string | null;
  medicine_id: number | null;
  delivery_date: Date | string;
  farm_id: number | null;
  quantity: number;
};

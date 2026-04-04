export type MedicineFormValues = {
  name: string;
  quantity: number;
  unit_id: number;
  price_per_unit: number;
};


export type MedicineDeliveryFormValues = {
  order_id: string | null;
  medicine_id: number | null;
  delivery_date: Date | string;
  farm_id: number | null;
  quantity: number;
  unit_id: number | null;
};

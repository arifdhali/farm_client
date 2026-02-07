interface FeedFormValues {
    name: string;
    quantity: number;
    feed_type: string,
}

export interface addFeed extends FeedFormValues {
    weight: number;
    rate: number;
}
export interface editFeed {
    weight?: number;
    quantity: number;
}

export type totalFeed = {
    feed_type: string;
    total_quantity: number;
    total_weight: number;
}


export type FeedDeliveryFormValues = {
    order_id: string | null;
    feed_id: number | null;
    weight: number;
    delivery_date: Date | string;
    farm_id: number | null;
    quantity: number;
};

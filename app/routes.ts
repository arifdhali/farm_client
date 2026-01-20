import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [


    layout("components/layout/AdminLayout.tsx", [
        index("routes/home.tsx"),
        ...prefix("chicks", [
            route("list", "routes/chicks/List.tsx"),
            route("delivery", "routes/chicks/Delivery.tsx"),
        ]),
        ...prefix("feeds", [
            route("list", "routes/feeds/List.tsx"),
            route("add", "routes/feeds/Add.tsx"),
            route("delivered", "routes/feeds/DeliveredList.tsx"),
        ]),
        ...prefix("farms", [
            route("list", "routes/farms/List.tsx"),
            route("add", "routes/farms/Add.tsx"),
            route(":id/edit", "routes/farms/Edit.tsx"),
            route("lifting", "routes/farms/Lifting.tsx"),
            route("lifting/:id", "routes/farms/SingleLifting.tsx"),
        ]),
        ...prefix("cash", [
            route("list", "routes/cash/List.tsx"),
            route("add", "routes/cash/Add.tsx"),
        ]),
        ...prefix("mortality", [
            route("list", "routes/mortality/List.tsx"),
            route("add", "routes/mortality/Add.tsx"),
        ]),
    ])
] satisfies RouteConfig;

import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [


    route("/reset-password", "auth/ResetPassword.tsx"),

    layout("components/layout/AuthLayout.tsx", [
        route("auth/login", "auth/Login.tsx"),
    ]
    ),
    layout("components/layout/AdminLayout.tsx", [
        route("settings", "routes/Settings.tsx"),
        index("routes/home.tsx"),
        ...prefix("chicks", [
            route("list", "routes/chicks/List.tsx"),
            route("delivery", "routes/chicks/Delivery.tsx"),
        ]),
        ...prefix("feeds", [
            route("list", "routes/feeds/List.tsx"),
            route(":id/edit", "routes/feeds/Edit.tsx"),
            route("add", "routes/feeds/Add.tsx"),
            route("returned", "routes/feeds/Returned.tsx"),
            route("delivery", "routes/feeds/Delivery.tsx"),
        ]),
        ...prefix("farms", [
            route("list", "routes/farms/FarmsList.tsx"),
            route("add", "routes/farms/AddFarms.tsx"),
            route(":id/edit", "routes/farms/Edit.tsx"),
            route("lifting", "routes/farms/Lifting.tsx"),
            route("lifting/add", "routes/farms/AddLifting.tsx"),
            route("lifting/:farm_id", "routes/farms/SingleLifting.tsx"),
        ]),
        ...prefix("customers", [
            route("list", "routes/customers/List.tsx"),
            route("add", "routes/customers/Add.tsx"),
            route(":id/view", "routes/customers/View.tsx"),
        ]),
        ...prefix("cash", [
            route("list", "routes/cash/List.tsx"),
            route("add", "routes/cash/Add.tsx"),
            route("collection", "routes/cash/collections/List.tsx"),
            route("collection/add", "routes/cash/collections/Add.tsx"),
            route("collection/:id/edit", "routes/cash/collections/Edit.tsx"),
        ]),
        ...prefix("medicine", [
            route("Add", "routes/medicine/Add.tsx"),
            route(":id/edit", "routes/medicine/Edit.tsx"),
            route("list", "routes/medicine/List.tsx"),
            route("delivery", "routes/medicine/Delivery.tsx"),
        ]),
        ...prefix("mortality", [
            route("list", "routes/mortality/List.tsx"),
            route("add", "routes/mortality/Add.tsx"),
        ]),
        ...prefix("report", [
            route("farm", "routes/reports/FarmReport.tsx"),
        ]),
    ])
    
] satisfies RouteConfig;

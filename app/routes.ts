import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [


    layout("components/layout/AdminLayout.tsx", [
        index("routes/home.tsx"),
        ...prefix("farms", [
            route("list", "routes/farms/list.tsx"),
            route("add", "routes/farms/add.tsx"),
        ])
    ])
] satisfies RouteConfig;

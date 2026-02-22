import type { MetaArgs } from "react-router";

export function meta({ }: MetaArgs) {
  return [
    { title: "Sohana Farm" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      <h1 className=" text-2xl font-bold">Welcome to <span className="text-primary">{`${import.meta.env.VITE_APP_NAME}`}</span></h1>
    </>
  );
}

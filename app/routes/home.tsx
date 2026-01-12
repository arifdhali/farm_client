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
    <button className="bg-primary">Hello</button>
      <h1>Main page</h1>
    </>
  )
}

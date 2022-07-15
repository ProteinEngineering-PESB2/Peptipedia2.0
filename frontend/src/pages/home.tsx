import Layout from "../components/layout";

import Header from "../components/home/header";
import About from "../components/home/about";
import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";

export default function Home() {
  useHandleSection({ section: "home" });
  useLoadingComponent();

  return (
    <Layout>
      <>
        <Header />
        <About />
      </>
    </Layout>
  );
}

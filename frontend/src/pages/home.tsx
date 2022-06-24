import Layout from "../components/layout";

import Header from "../components/home/header";
import About from "../components/home/about";
import Services from "../components/home/service";
import PeptipediaTeam from "../components/home/team";
import Resource from "../components/home/resources";
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
        <Services />
        <PeptipediaTeam />
        <Resource />
      </>
    </Layout>
  );
}

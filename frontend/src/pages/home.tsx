import { useEffect } from "react";
import Layout from "../components/layout";
import { useAppContext } from "../hooks/useAppContext";

import Header from "../components/home/header";
import About from "../components/home/about";
import Services from "../components/home/service";
import PeptipediaTeam from "../components/home/team";
import Resource from "../components/home/resources";

export default function Home() {
  const { toggleSection } = useAppContext();

  useEffect(() => {
    toggleSection("home");
  }, []);

  return (
    <Layout>
      <>
        <Header />
        <About />
        <Services />
        <PeptipediaTeam />
        <Resource/>
      </>
    </Layout>
  );
}

import PeptipediaTeam from "../components/home/team";
import Layout from "../components/layout";
import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";

export default function Team() {
  useHandleSection({ section: "team" });
  useLoadingComponent();

  return (
    <Layout>
      <>
      <PeptipediaTeam/>
      </>
    </Layout>
  );
}

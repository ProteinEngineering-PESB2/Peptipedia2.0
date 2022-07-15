import Resource from "../components/home/resources";
import Layout from "../components/layout";
import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";

export default function HowToCite() {
  useHandleSection({ section: "how_to_cite" });
  useLoadingComponent();

  return (
    <Layout>
      <>
        <Resource />
      </>
    </Layout>
  );
}

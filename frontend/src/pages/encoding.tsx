import EncodingForm from "../components/encoding/encoding_form";
import Layout from "../components/layout";
import SectionTitle from "../components/section_title";
import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";

export default function Encoding() {
  useHandleSection({ section: "encoding" });
  useLoadingComponent();

  return (
    <Layout>
      <>
        <SectionTitle
          title="Encoding Sequences"
          description="Numerically encodes the amino acid sequences entered, in order to use Machine Learning models."
        />

        <EncodingForm />
      </>
    </Layout>
  );
}

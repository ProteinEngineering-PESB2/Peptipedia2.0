import EncodingForm from "../components/encoding/encoding_form";
import Layout from "../components/layout";
import SectionTitle from "../components/section_title";
import { useHandleSection } from "../hooks/useHandleSection";

export default function Encoding() {
  useHandleSection({ section: "encoding" });

  return (
    <Layout>
      <>
        <SectionTitle title="Encoding Sequences" />

        <EncodingForm />
      </>
    </Layout>
  );
}

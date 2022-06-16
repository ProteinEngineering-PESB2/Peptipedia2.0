import { useState } from "react";
import Layout from "../components/layout";
import PhysichochemicalContent from "../components/physicochemical/physicochemical_content";
import PhysichochemicalForm from "../components/physicochemical/physicochemical_form";
import SectionTitle from "../components/section_title";
import { useHandleSection } from "../hooks/useHandleSection";
import { IDataPhysichochemical } from "../utils/interfaces";

export default function Phisicochemical() {
  const [result, setResult] = useState<IDataPhysichochemical[]>([]);
  useHandleSection({ section: "physicochemical" });

  return (
    <Layout>
      <>
        <SectionTitle title="Physichochemical Properties" />

        <PhysichochemicalForm setResult={setResult} />

        {result.length > 0 && <PhysichochemicalContent result={result} />}
      </>
    </Layout>
  );
}

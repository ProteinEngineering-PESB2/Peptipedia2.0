import AdvancedSearchForm from "../components/advanced_search/advanced_search_form";
import Layout from "../components/layout";
import SectionTitle from "../components/section_title";
import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";

export default function AdvancedSearch() {
  useHandleSection({ section: "advanced-search" });
  useLoadingComponent();

  return (
    <Layout>
      <>
      <SectionTitle title="Advanced Search"/>

      <AdvancedSearchForm/>
      </>
    </Layout>
  );
}

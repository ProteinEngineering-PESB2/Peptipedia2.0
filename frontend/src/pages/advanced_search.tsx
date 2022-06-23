import { useState } from "react";
import AdvancedSearchContent from "../components/advanced_search/advanced_search_content";
import AdvancedSearchForm from "../components/advanced_search/advanced_search_form";
import Layout from "../components/layout";
import SectionTitle from "../components/section_title";
import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";

export default function AdvancedSearch() {
  const [queries, setQueries] = useState<string[]>([]);
  const [queriesWithID, setQueriesWithID] = useState<string[]>([]);
  const [counts, setCounts] = useState<number[]>([]);

  useHandleSection({ section: "advanced-search" });
  useLoadingComponent();

  return (
    <Layout>
      <>
        <SectionTitle title="Advanced Search" />

        <AdvancedSearchForm
          queries={queries}
          setQueries={setQueries}
          queriesWithID={queriesWithID}
          setQueriesWithID={setQueriesWithID}
          counts={counts}
          setCounts={setCounts}
        />

        {queries.length > 0 && (
          <AdvancedSearchContent
            counts={counts}
            queries={queries}
            queriesWithID={queriesWithID}
          />
        )}
      </>
    </Layout>
  );
}

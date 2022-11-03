import { useParams } from "react-router-dom";
import { PageLayout } from "components/common/index";
import { SidebarFilter } from "components/ui/index";

const Categories = () => {
  const { categoriesId } = useParams<{ categoriesId: string }>();

  return (
    <PageLayout>
      <SidebarFilter category={categoriesId} />
    </PageLayout>
  );
};

export default Categories;

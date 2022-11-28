import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb, PageLayout } from "components/common/index";
import { SidebarFilter } from "components/ui/index";
import { ProductsOnCategories } from "components/sections/index";
import { CustomizeDataProvider, PaginationProvider } from "store";

const Categories = () => {
  const { categoriesId } = useParams<{ categoriesId: string }>();
  const [hasChangedCategory, setHasChangedCategory] = useState(false); // used to keep track when user changes category

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // changes hasChangedCategory to trigger changes in ProductsOnCategories and SidebarFilter
  useEffect(() => {
    setHasChangedCategory(true);
  }, [categoriesId]);

  const breadcrumb = categoriesId
    ? [
        { name: "Home", path: "/home" },
        { name: "Categories", path: "/categories" },
        { name: categoriesId, path: "" },
      ]
    : [
        { name: "Home", path: "/home" },
        { name: "Categories", path: "" },
      ];

  return (
    <PageLayout>
      <Breadcrumb breadcrumb={breadcrumb} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <CustomizeDataProvider category={categoriesId}>
          <SidebarFilter
            category={categoriesId}
            hasChangedCategory={hasChangedCategory}
          />
          <PaginationProvider>
            <ProductsOnCategories
              hasChangedCategory={hasChangedCategory}
              setHasChangedCategory={setHasChangedCategory}
            />
          </PaginationProvider>
        </CustomizeDataProvider>
      </div>
    </PageLayout>
  );
};

export default Categories;

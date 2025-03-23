import { useMemo } from "react";
import appData from "../../data/application-types-srb.json";

export const useApplications = () => {
  const { applicationOptions, applicationMap } = useMemo(() => {
    const applicationMap = new Map<number, string>();
    const applicationOptions = appData.categories.flatMap((category) => [
      { value: category.id, label: category.name, parentId: null },
      ...(category.subcategories
        ? category.subcategories.map((sub) => ({
            value: sub.id,
            label: `— ${sub.name}`,
            parentId: category.id,
          }))
        : []),
    ]);

    appData.categories.forEach((category) => {
      applicationMap.set(category.id, category.name);
      category.subcategories?.forEach((sub) => {
        applicationMap.set(sub.id, sub.name);
      });
    });

    return { applicationOptions, applicationMap };
  }, []);

  return { applicationOptions, applicationMap };
};

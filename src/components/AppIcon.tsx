import { MoreCircleRegular } from "@fluentui/react-icons";
import { Tooltip } from "@fluentui/react-components";
import { useTranslation } from "react-i18next"; 
interface AppIconProps {
  item: AppIconTree;
}
export interface AppIconTree {
  name: string;
  path: string;
  more: boolean;
}
function AppIcon(iconItem: AppIconProps) {
    const { t } = useTranslation();
  return (
    <div className="app-icon-pointer app-icon-container">
      <img draggable="false"
        className="app-icon-img"
        src={iconItem.item.path}
        alt={iconItem.item.name}
      />
      <p className="app-icon-name">{iconItem.item.name}</p>
      {iconItem.item.more && (
        <Tooltip content={t("moreIcon")} relationship="label">
          <MoreCircleRegular className="app-icon-more" />
        </Tooltip>
      )}
    </div>
  );
}

export default AppIcon;

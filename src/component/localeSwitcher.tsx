import { useTranslation } from "react-i18next"
import { supportLang } from "../i18n"
import { Select } from "antd";

export default function LocaleSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="...">
      <div className="...">
        <Select
          value={i18n.resolvedLanguage}
          onChange={(e) => i18n.changeLanguage(e)}
          style={{ width: '100%' }}
        >
          {Object.entries(supportLang).map(([code, name]) => (
            <Select.Option value={code} key={code}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </div>
    </div>
  );
}
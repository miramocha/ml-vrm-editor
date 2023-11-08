/* eslint-disable no-unused-vars */
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <ToggleButtonGroup
      type="radio"
      name="language"
      defaultValue={i18n.resolvedLanguage}
      onChange={handleLanguageChange}
    >
      <ToggleButton id={`${Math.random()}-en`} value="en" variant="secondary">
        🇺🇸 English
      </ToggleButton>
      <ToggleButton id={`${Math.random()}-jp`} value="jp" variant="secondary">
        🇯🇵 日本語
      </ToggleButton>
      <ToggleButton id={`${Math.random()}-th`} value="th" variant="secondary">
        🇹🇭 ภาษาไทย
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

import PropTypes from 'prop-types';
import { Tab, Tabs, Stack, Button } from 'react-bootstrap';
import { useTranslation, Trans } from 'react-i18next';
import GltfJsonEditor from './gltfJsonEditor';
import MaterialEditor from './materialEditor';
import TextureBrowser from './textureBrowser';
import GlobalMaterialEditor from './globalMaterialEditor';
import VrmMetadataEditor from './vrmMetadataEditor';
import SettingsEditor from './settingsEditor';

export default function RightTabs({ setHideRightOffcanvas }) {
  const { t, i18n } = useTranslation();

  const handleCloseEditorButtonClick = () => {
    setHideRightOffcanvas(true);
  };

  return (
    <Stack gap={2} key={i18n.resolvedLanguage}>
      <Tabs defaultActiveKey="mToonMaterialsEditorTab" variant="underline" fill>
        <Tab
          eventKey="mToonMaterialsEditorTab"
          title={`MToon Material ${t('editor')}`}
          className="pt-2"
        >
          <MaterialEditor />
        </Tab>
        <Tab
          eventKey="applyGlobalMToonSettingsTab"
          title="Apply Global MToon Settings"
          className="pt-2"
        >
          <GlobalMaterialEditor />
        </Tab>
        <Tab
          eventKey="gltfJsonEditorTab"
          title={`GLTF JSON ${t('editor')}`}
          className="pt-2"
        >
          <GltfJsonEditor />
        </Tab>
        <Tab
          eventKey="metadataEditorTab"
          title={`Metadata ${t('editor')}`}
          className="pt-2"
        >
          <VrmMetadataEditor />
        </Tab>
        <Tab
          eventKey="textureBrowserTab"
          title="Texture Browser"
          className="pt-2"
        >
          <TextureBrowser />
        </Tab>
        <Tab eventKey="settingsEditorTab" title="Settings" className="pt-2">
          <SettingsEditor />
        </Tab>
      </Tabs>
      <Button variant="danger" onClick={handleCloseEditorButtonClick}>
        <Trans i18nKey="close">Close</Trans>
      </Button>
    </Stack>
  );
}
RightTabs.propTypes = {
  setHideRightOffcanvas: PropTypes.func,
};
RightTabs.defaultProps = {
  setHideRightOffcanvas: () => {},
};

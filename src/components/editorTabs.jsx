import PropTypes from 'prop-types';
import { Tab, Tabs } from 'react-bootstrap';
import GltfVrmParser from '../utils/GltfVrmParser';
import GltfJsonEditorTab from './gltfJsonEditorTab';
import GlobalVrmMToonOutlineSettingsForm from './globalVrmMToonOutlineSettingsForm';
import GlobalVrmMToonLightingSettingsForm from './globalVrmMToonLightingSettingsForm';

export default function EditorTabs({ gltfVrmParser }) {
  return (
    <Tabs
      defaultActiveKey="globalMToonOutlineSettingsTab"
      variant="underline"
      fill
    >
      <Tab
        eventKey="globalMToonOutlineSettingsTab"
        title="Global MToon Outline Settings"
      >
        <GlobalVrmMToonOutlineSettingsForm gltfVrmParser={gltfVrmParser} />
      </Tab>
      <Tab
        eventKey="globalMToonLightingSettingsTab"
        title="Global MToon Lighting Settings"
      >
        <GlobalVrmMToonLightingSettingsForm gltfVrmParser={gltfVrmParser} />
      </Tab>
      <Tab eventKey="mToonMaterialsEditorTab" title="MToon Material Editor">
        MATERIAL EDITOR
      </Tab>
      <Tab eventKey="gltfJsonEditorTab" title="GLTF JSON Editor">
        <GltfJsonEditorTab gltfVrmParser={gltfVrmParser} />
      </Tab>
    </Tabs>
  );
}

EditorTabs.propTypes = {
  gltfVrmParser: PropTypes.instanceOf(GltfVrmParser),
};
EditorTabs.defaultProps = {
  gltfVrmParser: null,
};

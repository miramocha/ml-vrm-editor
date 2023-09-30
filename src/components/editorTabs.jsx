import PropTypes from 'prop-types';
import { Tab, Tabs, Accordion } from 'react-bootstrap';
import GltfVrmParser from '../utils/GltfVrmParser';
import GltfJsonEditorTab from './gltfJsonEditorTab';
import GlobalVrmMToonOutlineSettingsForm from './globalVrmMToonOutlineSettingsForm';
import GlobalVrmMToonLightingSettingsForm from './globalVrmMToonLightingSettingsForm';

export default function EditorTabs({ gltfVrmParser }) {
  return (
    <Tabs
      defaultActiveKey="applyGlobalMToonSettingsTab"
      variant="underline"
      fill
    >
      <Tab
        eventKey="applyGlobalMToonSettingsTab"
        title="Apply Global MToon Settings"
      >
        <Accordion alwaysOpen>
          <Accordion.Item defaultActiveKey="outlineSettingsAccordionItem">
            <Accordion.Header>
              <i className="bi bi-pencil-fill me-2" /> Outline Settings
            </Accordion.Header>
            <Accordion.Body eventKey="outlineSettingsAccordionItem">
              <GlobalVrmMToonOutlineSettingsForm
                gltfVrmParser={gltfVrmParser}
              />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="lightingSettingsAccordionItem">
            <Accordion.Header>
              <i className="bi  bi-lightbulb-fill me-2" /> Lighting Settings
            </Accordion.Header>
            <Accordion.Body>
              <GlobalVrmMToonLightingSettingsForm
                gltfVrmParser={gltfVrmParser}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
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

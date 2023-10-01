import { useContext } from 'react';
import { Tab, Tabs, Accordion } from 'react-bootstrap';
import GltfJsonEditor from './gltfJsonEditor';
import GlobalVrmMToonOutlineSettingsForm from './globalVrmMToonOutlineSettingsForm';
import GlobalVrmMToonLightingSettingsForm from './globalVrmMToonLightingSettingsForm';
import MaterialEditor from './materialEditor';
import { GltfVrmParserContext } from '../AppContext';

export default function EditorTabs() {
  const gltfVrmParser = useContext(GltfVrmParserContext);

  return (
    <Tabs defaultActiveKey="mToonMaterialsEditorTab" variant="underline" fill>
      <Tab
        eventKey="mToonMaterialsEditorTab"
        title="MToon Material Editor"
        className="pt-2"
      >
        <MaterialEditor gltfVrmParser={gltfVrmParser} />
      </Tab>
      <Tab
        eventKey="applyGlobalMToonSettingsTab"
        title="Apply Global MToon Settings"
        className="pt-2"
      >
        <Accordion defaultActiveKey="outlineSettingsAccordionItem" alwaysOpen>
          <Accordion.Item eventKey="outlineSettingsAccordionItem">
            <Accordion.Header>
              <i className="bi bi-pencil-fill me-2" /> Outline Settings
            </Accordion.Header>
            <Accordion.Body>
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
      <Tab
        eventKey="gltfJsonEditorTab"
        title="GLTF JSON Editor"
        className="pt-2"
      >
        <GltfJsonEditor gltfVrmParser={gltfVrmParser} />
      </Tab>
    </Tabs>
  );
}

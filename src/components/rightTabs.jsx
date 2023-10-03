import { Tab, Tabs, Accordion } from 'react-bootstrap';
import GltfJsonEditor from './gltfJsonEditor';
import GlobalVrmMToonOutlineSettingsForm from './globalVrmMToonOutlineSettingsForm';
import GlobalVrmMToonLightingSettingsForm from './globalVrmMToonLightingSettingsForm';
import MaterialEditor from './materialEditor';
import TextureBrowser from './textureBrowser';

export default function RightTabs() {
  return (
    <Tabs defaultActiveKey="mToonMaterialsEditorTab" variant="underline" fill>
      <Tab
        eventKey="mToonMaterialsEditorTab"
        title="MToon Material Editor"
        className="pt-2"
      >
        <MaterialEditor />
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
              <GlobalVrmMToonOutlineSettingsForm />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="lightingSettingsAccordionItem">
            <Accordion.Header>
              <i className="bi  bi-lightbulb-fill me-2" /> Lighting Settings
            </Accordion.Header>
            <Accordion.Body>
              <GlobalVrmMToonLightingSettingsForm />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Tab>
      <Tab
        eventKey="gltfJsonEditorTab"
        title="GLTF JSON Editor"
        className="pt-2"
      >
        <GltfJsonEditor />
      </Tab>
      <Tab
        eventKey="metadataEditorTab"
        title="Metadata Editor"
        className="pt-2"
      >
        METADATA EDITOR
      </Tab>
      <Tab
        eventKey="textureBrowserTab"
        title="Texture Browser"
        className="pt-2"
      >
        <TextureBrowser />
      </Tab>
    </Tabs>
  );
}

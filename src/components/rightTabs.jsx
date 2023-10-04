import { Tab, Tabs } from 'react-bootstrap';
import GltfJsonEditor from './gltfJsonEditor';
import MaterialEditor from './materialEditor';
import TextureBrowser from './textureBrowser';
import GlobalMaterialEditor from './globalMaterialEditor';

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
        <GlobalMaterialEditor />
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

import { useEffect, useState, useContext } from 'react';
import { Offcanvas } from 'react-bootstrap';

import defaultVrmPath from './resources/AvatarSampleB.vrm';
import GltfVrmParser from './utils/GltfVrmParser';
import RightTabs from './components/rightTabs';
import TopNavigation from './components/topNavigation';
import ThreeJsVrmRenderer from './components/threeJsVrmRenderer';

import { AppControllerContext, GltfVrmParserContext } from './AppContext';

import VrmImportModal from './components/modals/vrmImportModal';
import ReplaceTextureModal from './components/modals/replaceTextureModal';
import AboutModal from './components/modals/aboutModal';
import AddTextureModal from './components/modals/addTextureModal';
import SelectTextureModal from './components/modals/selectTextureModal';

const REFRESH_FUNCTION_ID = 'app';

export default function App() {
  const [gltfVrmParser, setGltfVrmParser] = useState(null);
  const [hideRightOffcanvas, setHideRightOffcanvas] = useState(false);
  const [replaceTextureModel, setReplaceTextureModel] = useState(null);
  const [editingMaterialModel, setEditingMaterialModel] = useState(null);
  const [editingTextureSlot, setEditingTextureSlot] = useState('main');

  // TO DO: deprecate this?
  const [renderId, setRenderId] = useState(REFRESH_FUNCTION_ID + Math.random());

  // Modals
  const [showVrmImportModal, setShowVrmImportModal] = useState(false);
  const [showReplaceTextureModal, setShowReplaceTextureModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showAddTextureModal, setShowAddTextureModal] = useState(() => {});
  const [showSelectTextureModal, setShowSelectTextureModal] = useState(false);

  const appController = useContext(AppControllerContext);

  const refreshComponent = () => {
    setRenderId(REFRESH_FUNCTION_ID + Math.random());
  };
  appController.setRefreshFunction({
    id: REFRESH_FUNCTION_ID,
    refreshFunction: refreshComponent,
  });

  // Replace Texture Modal
  appController.openReplaceTextureModal = (textureModel) => {
    setReplaceTextureModel(textureModel);
    setShowReplaceTextureModal(true);
  };
  appController.closeReplaceTextureModal = () => {
    setReplaceTextureModel(null);
    setShowReplaceTextureModal(false);
  };

  // Add Texture Modal
  appController.openAddTextureModal = (callback) => {
    appController.addTextureCallback = callback;
    setShowAddTextureModal(true);
  };

  appController.closeAddTextureModal = () => {
    // TODO: FIX THIS
    if (appController.addTextureCallback) {
      appController.addTextureCallback();
      appController.addTextureCallback = null;
    }

    setShowAddTextureModal(false);
  };

  // Select Texture Modal
  appController.openSelectTextureModal = (materialModel, textureSlot) => {
    setEditingMaterialModel(materialModel);
    setEditingTextureSlot(textureSlot);
    setShowSelectTextureModal(true);
  };
  appController.closeSelectTextureModal = () => {
    // setEditingMaterialModel(null);
    // setEditingTextureSlot(null);
    setShowSelectTextureModal(false);
  };

  const handleRightOffcanvasHide = () => {
    setHideRightOffcanvas(true);
  };

  useEffect(() => {
    fetch(defaultVrmPath)
      .then((response) => response.blob())
      .then(async (blob) => {
        const newGltfVrmParser = new GltfVrmParser();
        await newGltfVrmParser.parseFile(new File([blob], 'AvatarSampleB.vrm'));

        setGltfVrmParser(newGltfVrmParser);
        appController.loadVrm(await newGltfVrmParser.buildFile());
      });
  }, []);

  return (
    <GltfVrmParserContext.Provider value={gltfVrmParser}>
      <AppControllerContext.Provider value={appController}>
        <TopNavigation
          key={`${renderId}-1`}
          gltfVrmParser={gltfVrmParser}
          setGltfVrmParser={setGltfVrmParser}
          setHideRightOffcanvas={setHideRightOffcanvas}
          setShowVrmImportModal={setShowVrmImportModal}
          setShowAboutModal={setShowAboutModal}
        />
        <ThreeJsVrmRenderer />
        <Offcanvas
          key={`${renderId}-2`}
          show={!hideRightOffcanvas}
          onHide={handleRightOffcanvasHide}
          placement="end"
          scroll={false}
          backdrop={false}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Editor</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <RightTabs
              setHideRightOffcanvas={setHideRightOffcanvas}
              setGltfVrmParser={setGltfVrmParser}
            />
          </Offcanvas.Body>
        </Offcanvas>
        <VrmImportModal
          showVrmImportModal={showVrmImportModal}
          setShowVrmImportModal={setShowVrmImportModal}
          setGltfVrmParser={setGltfVrmParser}
        />
        <ReplaceTextureModal
          textureModel={replaceTextureModel}
          showReplaceTextureModal={showReplaceTextureModal}
          setShowReplaceTextureModal={setShowReplaceTextureModal}
        />
        <AddTextureModal showAddTextureModal={showAddTextureModal} />
        <SelectTextureModal
          materialModel={editingMaterialModel}
          textureSlot={editingTextureSlot}
          showSelectTextureModal={showSelectTextureModal}
          setShowSelectTextureModal={setShowSelectTextureModal}
        />
        <AboutModal
          showAboutModal={showAboutModal}
          setShowAboutModal={setShowAboutModal}
        />
      </AppControllerContext.Provider>
    </GltfVrmParserContext.Provider>
  );
}

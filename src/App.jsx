import { useEffect, useState, useContext } from 'react';
import { Offcanvas } from 'react-bootstrap';

import defaultVrmPath from './resources/AvatarSampleB.vrm';
import GltfVrmParser from './utils/GltfVrmParser';
import RightTabs from './components/rightTabs';
import TopNavigation from './components/topNavigation';
import ThreeJsVrmRenderer from './components/threeJsVrmRenderer';

import { AppControllerContext, GltfVrmParserContext } from './AppContext';

import VrmImportModal from './components/modals/vrmImportModal';
import AboutModal from './components/modals/aboutModal';
import AddTextureModal from './components/modals/addTextureModal';

const REFRESH_FUNCTION_ID = 'app';

export default function App() {
  const [gltfVrmParser, setGltfVrmParser] = useState(null);
  const [hideRightOffcanvas, setHideRightOffcanvas] = useState(false);
  const [showVrmImportModal, setShowVrmImportModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showAddTextureModal, setShowAddTextureModal] = useState(false);
  const [renderId, setRenderId] = useState(REFRESH_FUNCTION_ID + Math.random());

  const appController = useContext(AppControllerContext);

  const refreshComponent = () => {
    setRenderId(REFRESH_FUNCTION_ID + Math.random());
  };
  appController.setRefreshFunction({
    id: REFRESH_FUNCTION_ID,
    refreshFunction: refreshComponent,
  });
  appController.setSetShowAddTextureModalFunction(setShowAddTextureModal);

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
          key={`${renderId}-3`}
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
        <AddTextureModal
          showAddTextureModal={showAddTextureModal}
          setShowAddTextureModal={setShowAddTextureModal}
        />
        <AboutModal
          showAboutModal={showAboutModal}
          setShowAboutModal={setShowAboutModal}
        />
      </AppControllerContext.Provider>
    </GltfVrmParserContext.Provider>
  );
}

import { useEffect, useState, useContext } from 'react';
import { Offcanvas, Modal, Button, Stack } from 'react-bootstrap';

import defaultVrmPath from './resources/AvatarSampleB.vrm';
import GltfVrmParser from './utils/GltfVrmParser';
import RightTabs from './components/rightTabs';
import TopNavigation from './components/topNavigation';
import MainRender from './components/mainRender';
import { AppControllerContext, GltfVrmParserContext } from './AppContext';
import VrmImport from './components/vrmImport';

const REFRESH_FUNCTION_ID = 'app';

export default function App() {
  const [gltfVrmParser, setGltfVrmParser] = useState(null);
  const [hideRightOffcanvas, setHideRightOffcanvas] = useState(false);
  const [showOpenVrmModal, setShowOpenVrmModal] = useState(false);
  const [renderId, setRenderId] = useState(REFRESH_FUNCTION_ID + Math.random());

  const appController = useContext(AppControllerContext);

  const refreshComponent = () => {
    setRenderId(REFRESH_FUNCTION_ID + Math.random());
  };
  appController.setRefreshFunction({
    id: REFRESH_FUNCTION_ID,
    refreshFunction: refreshComponent,
  });

  const handleRightOffcanvasHide = () => {
    setHideRightOffcanvas(true);
  };

  const handleVrmImportModalHide = () => {
    setShowOpenVrmModal(false);
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
          setShowOpenVrmModal={setShowOpenVrmModal}
        />
        <MainRender />
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
        <Modal
          show={showOpenVrmModal}
          onHide={handleVrmImportModalHide}
          size="sm"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Open VRM</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <VrmImport onFileOpen={handleVrmImportModalHide} />
          </Modal.Body>
          <Modal.Footer>
            <Stack>
              <Button variant="danger" onClick={handleVrmImportModalHide}>
                Cancel
              </Button>
            </Stack>
          </Modal.Footer>
        </Modal>
      </AppControllerContext.Provider>
    </GltfVrmParserContext.Provider>
  );
}

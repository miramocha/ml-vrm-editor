import { useEffect, useState, useContext } from 'react';
import { Offcanvas } from 'react-bootstrap';

import defaultVrmPath from './resources/AvatarSampleB.vrm';
import GltfVrmParser from './utils/GltfVrmParser';
import EditorTabs from './components/editorTabs';
import TextureBrowser from './components/textureBrowser';
import TopNavigation from './components/topNavigation';
import MainRender from './components/mainRender';
import { AppControllerContext, GltfVrmParserContext } from './AppContext';

const REFRESH_FUNCTION_ID = 'app';

export default function App() {
  const [gltfVrmParser, setGltfVrmParser] = useState(null);
  const [hideRightOffcanvas, setHideRightOffcanvas] = useState(false);
  const [hideLeftOffcanvas, setHideLeftOffcanvas] = useState(false);
  const appController = useContext(AppControllerContext);

  const [renderId, setRenderId] = useState(REFRESH_FUNCTION_ID + Math.random());
  const refreshComponent = () => {
    setRenderId(REFRESH_FUNCTION_ID + Math.random());
  };
  appController.setRefreshFunction({
    id: REFRESH_FUNCTION_ID,
    refreshFunction: refreshComponent,
  });

  useEffect(() => {
    fetch(defaultVrmPath)
      .then((response) => response.blob())
      .then(async (blob) => {
        const newGltfVrmParser = new GltfVrmParser();
        await newGltfVrmParser.parseFile(new File([blob], 'AvatarSampleB.vrm'));

        console.log('PARSER:', newGltfVrmParser);

        setGltfVrmParser(newGltfVrmParser);
      });
  }, []);

  const toggleHideRightOffcanvas = () =>
    setHideRightOffcanvas(!hideRightOffcanvas);

  const handleHideRightOffcanvas = () => setHideRightOffcanvas(true);

  const toggleHideLeftOffcanvas = () =>
    setHideLeftOffcanvas(!hideLeftOffcanvas);

  const handleHideLeftOffcanvas = () => setHideLeftOffcanvas(true);

  return (
    <GltfVrmParserContext.Provider value={gltfVrmParser}>
      <AppControllerContext.Provider value={appController}>
        <TopNavigation
          key={`${renderId}-1`}
          gltfVrmParser={gltfVrmParser}
          setGltfVrmParser={setGltfVrmParser}
          toggleHideLeftOffcanvas={toggleHideLeftOffcanvas}
          toggleHideRightOffcanvas={toggleHideRightOffcanvas}
        />
        <Offcanvas
          key={`${renderId}-2`}
          show={!hideLeftOffcanvas}
          onHide={handleHideLeftOffcanvas}
          placement="start"
          scroll={false}
          backdrop={false}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Texture Browser</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <TextureBrowser gltfVrmParser={gltfVrmParser} />
          </Offcanvas.Body>
        </Offcanvas>
        <Offcanvas
          key={`${renderId}-3`}
          show={!hideRightOffcanvas}
          onHide={handleHideRightOffcanvas}
          placement="end"
          scroll={false}
          backdrop={false}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Editor</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <EditorTabs gltfVrmParser={gltfVrmParser} />
          </Offcanvas.Body>
        </Offcanvas>
        <MainRender />
      </AppControllerContext.Provider>
    </GltfVrmParserContext.Provider>
  );
}

import { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';

import './App.css';
import defaultVrmPath from './resources/AvatarSampleB.vrm';
import GltfVrmParser from './utils/GltfVrmParser';
import EditorTabs from './components/editorTabs';
import TextureBrowser from './components/textureBrowser';
import TopNavigation from './components/topNavigation';
import { GltfVrmParserContext } from './AppContext';

export default function App() {
  const [gltfVrmParser, setGltfVrmParser] = useState(null);
  const [hideOffcanvasEditor, setHideOffcanvasEditor] = useState(false);
  const [hideOffcanvasTextureBrowser, setHideOffcanvasTextureBrowser] =
    useState(false);

  // eslint-disable-next-line no-unused-vars
  // const [appRenderId, setAppRenderId] = useState(Math.random());
  // const refreshAppComponent = () => {
  //   const renderId = Math.random();
  //   setAppRenderId(Math.random());
  // };

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

  const toggleHideOffcanvasEditor = () =>
    setHideOffcanvasEditor(!hideOffcanvasEditor);

  const handleHideOffcanvasEditor = () => setHideOffcanvasEditor(true);

  const toggleHideOffcanvasTextureBrowser = () =>
    setHideOffcanvasTextureBrowser(!hideOffcanvasTextureBrowser);

  const handleHideOffcanvasTextureBrowser = () =>
    setHideOffcanvasTextureBrowser(true);

  return (
    <GltfVrmParserContext.Provider value={gltfVrmParser}>
      <TopNavigation
        // key={appRenderId}
        gltfVrmParser={gltfVrmParser}
        setGltfVrmParser={setGltfVrmParser}
        toggleHideOffcanvasTextureBrowser={toggleHideOffcanvasTextureBrowser}
        toggleHideOffcanvasEditor={toggleHideOffcanvasEditor}
      />
      <Offcanvas
        // key={appRenderId}
        show={!hideOffcanvasTextureBrowser}
        onHide={handleHideOffcanvasTextureBrowser}
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
        // key={appRenderId}
        show={!hideOffcanvasEditor}
        onHide={handleHideOffcanvasEditor}
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
    </GltfVrmParserContext.Provider>
  );
}

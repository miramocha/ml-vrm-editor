import { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';

import './App.css';
import defaultVrmPath from './resources/AvatarSampleB.vrm';
import GltfVrmParser from './utils/GltfVrmParser';
import EditorTabs from './components/editorTabs';
import TextureBrowser from './components/textureBrowser';
import TopNavigation from './components/topNavigation';

export default function App() {
  const [gltfVrmParser, setGltfVrmParser] = useState(null);
  const [hideOffcanvasEditor, setHideOffcanvasEditor] = useState(false);
  const [hideOffcanvasTextureBrowser, setHideOffcanvasTextureBrowser] =
    useState(false);

  const [commitId, setCommitId] = useState(Math.random());
  const saveCallback = () => {
    const newCommitId = Math.random();
    console.log('GENERATING NEW COMMIT ID:', newCommitId);
    setCommitId(Math.random());
  };

  useEffect(() => {
    fetch(defaultVrmPath)
      .then((response) => response.blob())
      .then(async (blob) => {
        const newGltfVrmParser = new GltfVrmParser();
        await newGltfVrmParser.parseFile(new File([blob], 'AvatarSampleB.vrm'));

        newGltfVrmParser.saveCallback = saveCallback;

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
    <>
      <TopNavigation
        gltfVrmParser={gltfVrmParser}
        setGltfVrmParser={setGltfVrmParser}
        toggleHideOffcanvasTextureBrowser={toggleHideOffcanvasTextureBrowser}
        toggleHideOffcanvasEditor={toggleHideOffcanvasEditor}
      />
      <Offcanvas
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
        key={commitId}
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
    </>
  );
}

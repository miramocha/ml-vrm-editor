import { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';

import './App.css';
import defaultVrmPath from './resources/AvatarSampleB.vrm';
import GltfVrmParser from './utils/GltfVrmParser';
import EditorTabs from './components/editorTabs';
import TopNavigation from './components/topNavigation';

export default function App() {
  const [gltfVrmParser, setGltfVrmParser] = useState(null);
  const [hideOffcanvasEditor, setHideOffcanvasEditor] = useState(false);

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

  const handleHideOffcanvasEditor = () => setHideOffcanvasEditor(true);

  const toggleHideOffcanvasEditor = () =>
    setHideOffcanvasEditor(!hideOffcanvasEditor);

  return (
    <>
      <TopNavigation
        gltfVrmParser={gltfVrmParser}
        setGltfVrmParser={setGltfVrmParser}
        toggleHideOffcanvasEditor={toggleHideOffcanvasEditor}
      />
      <Offcanvas
        show={!hideOffcanvasEditor}
        placement="end"
        onHide={handleHideOffcanvasEditor}
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

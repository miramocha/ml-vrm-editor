import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import defaultVrmPath from './resources/TestVrm0.vrm';
import GltfVrmParser from './util/GltfVrmParser';

export default function App() {
  const [vrmParser, setVrmParser] = useState(null);

  useEffect(() => {
    fetch(defaultVrmPath)
      .then((response) => response.blob())
      .then((blob) =>
        setVrmParser(new GltfVrmParser(new File([blob], 'TestVrm0'))),
      );
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {JSON.stringify(vrmParser?.json)}
      </header>
    </div>
  );
}

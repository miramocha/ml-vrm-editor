import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Navbar, Container, Stack } from 'react-bootstrap';
import { useTranslation, Trans } from 'react-i18next';
import LanguageSwitcher from './languageSwitcher';

import { GltfVrmParserContext } from '../AppContext';

export default function TopNavigation({
  setHideRightOffcanvas,
  setShowVrmImportModal,
  setShowAboutModal,
}) {
  const { i18n } = useTranslation();
  const gltfVrmParser = useContext(GltfVrmParserContext);

  const handleToggleRightOffCanvasButtonClick = () =>
    setHideRightOffcanvas(false);

  const handleSaveButtonClick = async () => {
    const blobURL = window.URL.createObjectURL(await gltfVrmParser.getFile());
    const tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = blobURL;
    tempLink.setAttribute('download', gltfVrmParser.fileName);
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  };

  const handleLoadButtonClick = () => setShowVrmImportModal(true);

  const handleAboutButtonClick = () => setShowAboutModal(true);

  return (
    <Navbar className="bg-primary" key={i18n.resolvedLanguage}>
      <Container>
        <Navbar.Brand>
          <i className="bi bi-brush me-2 text-light" />
          ML VRM Editor
        </Navbar.Brand>
        <Navbar.Collapse>
          <Stack direction="horizontal" gap={2}>
            <Button variant="outline-light" onClick={handleLoadButtonClick}>
              <i className="bi bi-folder2-open me-2" />
              <Trans i18nKey="load">Load</Trans>
            </Button>
            <Button variant="outline-light" onClick={handleSaveButtonClick}>
              <i className="bi bi-save me-2" />
              <Trans i18nKey="save">Save</Trans>
            </Button>
            <Button variant="outline-light" onClick={handleAboutButtonClick}>
              <i className="bi bi-info-circle me-2" />
              <Trans i18nKey="about">About</Trans>
            </Button>
            <LanguageSwitcher />
          </Stack>
        </Navbar.Collapse>
      </Container>
      <Button
        className="me-2"
        variant="outline-light"
        onClick={handleToggleRightOffCanvasButtonClick}
      >
        <i className="bi bi-arrow-bar-left me-2" />
        <Trans i18nKey="topNavigation.editor">Editor</Trans>
      </Button>
    </Navbar>
  );
}

TopNavigation.propTypes = {
  setHideRightOffcanvas: PropTypes.func,
  setShowVrmImportModal: PropTypes.func,
  setShowAboutModal: PropTypes.func,
};
TopNavigation.defaultProps = {
  setHideRightOffcanvas: () => {},
  setShowVrmImportModal: () => {},
  setShowAboutModal: () => {},
};

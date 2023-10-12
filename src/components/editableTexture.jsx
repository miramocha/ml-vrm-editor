/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import TextureModel from '../models/TextureModel';
import { AppControllerContext } from '../AppContext';

export default function EditableTexture({ textureModel }) {
  const appController = useContext(AppControllerContext);
  const handleEditImageClick = () => {
    appController.openReplaceTextureModal(textureModel);
  };
  return (
    <Card className="mb-2" style={{ aspectRatio: '1/1' }}>
      <Card.Img src={textureModel?.imageSrc} />
      <Card.ImgOverlay>
        <Card.Title>{textureModel?.name}</Card.Title>
        <Button
          variant="primary"
          onClick={handleEditImageClick}
          size="sm"
          style={{ position: 'absolute', bottom: 0, right: 0 }}
        >
          <i className="bi bi-pencil-square" /> Replace
        </Button>
      </Card.ImgOverlay>
    </Card>
  );
}

EditableTexture.propTypes = {
  textureModel: PropTypes.instanceOf(TextureModel),
};
EditableTexture.defaultProps = {
  textureModel: null,
};

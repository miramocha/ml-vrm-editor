/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import TextureModel from '../models/TextureModel';
import { AppControllerContext } from '../AppContext';

export default function EditableTexture({ textureModel }) {
  const appController = useContext(AppControllerContext);
  const handleEditImageClick = () => {
    appController.openEditTextureModal(textureModel);
  };
  return (
    <Card className="mb-2" style={{ aspectRatio: '1/1' }}>
      <Card.Img src={textureModel?.imageSrc} />
      <Card.ImgOverlay>
        <Button
          size="sm"
          variant="primary"
          style={{ position: 'absolute', bottom: '5%', right: '5%' }}
          onClick={handleEditImageClick}
        >
          <i className="bi bi-pencil-square" />
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

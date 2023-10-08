import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Image } from 'react-bootstrap';
import TextureModel from '../models/TextureModel';
import { AppControllerContext } from '../AppContext';

export default function EditableTexture({ textureModel }) {
  const appController = useContext(AppControllerContext);
  const handleEditImageClick = () => {
    appController.openEditTextureModal(textureModel);
  };
  return (
    <Image
      src={textureModel?.imageSrc}
      thumbnail
      onClick={handleEditImageClick}
    />
  );
}

EditableTexture.propTypes = {
  textureModel: PropTypes.instanceOf(TextureModel),
};
EditableTexture.defaultProps = {
  textureModel: null,
};

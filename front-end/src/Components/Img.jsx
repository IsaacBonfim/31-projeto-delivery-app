import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image as CImage, Skeleton } from '@chakra-ui/react';

function Img({ src, ...rest }) {
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
  }, []);

  if (!isLoaded) return <Skeleton />;

  return (
    <CImage
      src={ src }
      { ...rest }
    />
  );
}

Img.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Img;

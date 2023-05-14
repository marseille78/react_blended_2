import { Backdrop } from 'components';

export const Modal = ({ largeImage, onClose }) => {
  const handleClick = e => {
    if (e.target === e.currentTarget) {
      onClose('');
    }
  };
  return (
    <Backdrop onClick={handleClick}>
      <img src={largeImage} alt="" />
    </Backdrop>
  );
};

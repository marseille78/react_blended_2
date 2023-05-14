import { ThreeDots } from 'react-loader-spinner';
import { Backdrop } from 'components';

export const Loader = () => {
  return (
    <Backdrop>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#3f51b5"
        ariaLabel="three-dots-loading"
        wrapperStyle={{ display: 'flex', justifyContent: 'center' }}
        wrapperClassName
        visible={true}
      />
    </Backdrop>
  );
};

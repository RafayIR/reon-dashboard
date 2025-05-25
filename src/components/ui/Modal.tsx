import { type ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal as AntdModal } from 'antd';
import { hideModal } from '../../redux/actions/modalAction';

interface ModalComponentProps {
  title?: string;
  children: ReactNode;
  width?: number;
  footer?: ReactNode | null;
  onOk?: () => void;
  onCancel?: () => void;
  maskClosable?: boolean;
}


const ModalComponent = ({
  title = 'Modal',
  children,
  width = 1000,
  footer = null,
  onOk,
  onCancel,
  maskClosable = true
}: ModalComponentProps) => {
  const dispatch = useDispatch();
  const { isVisible } = useSelector((state: any) => state.modal);

  const handleOk = () => {
    if (onOk) {
      onOk();
    }
    dispatch(hideModal());
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    dispatch(hideModal());
  };

  return (
    <AntdModal
      width={width}
      title={title}
      style={{ top: 50 }}
      open={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={footer}
      maskClosable={maskClosable}
    >
      {children}
    </AntdModal>
  );
};

export default ModalComponent;
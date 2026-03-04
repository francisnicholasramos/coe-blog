import {Modal, ModalBody, ModalContent} from "@heroui/react";
import type { ReactNode } from 'react';

const Dialog = ({isOpen, onClose, children}: 
  {
      isOpen: boolean,
      onClose: () => void,
      children: ReactNode
  }) => {
    const isMobile = window.innerWidth < 768;
    return (
          <Modal isOpen={isOpen} onClose={onClose} placement={isMobile ? 'center' : 'top'}>
              <ModalContent>
                <ModalBody className="flex flex-col p-0">
                    {children}
                </ModalBody>
              </ModalContent>
          </Modal>
    )
}

export default Dialog


import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Modal,
} from "@nextui-org/react";
import { ReactElement } from "react";

interface ModalTemplateProps {
  isOpen: boolean;
  onOpenChange: () => void;
  title?: string;
  children?: ReactElement;
  actionButton?: boolean;
  actionFunction?: () => void;
  closeButton?: boolean;
}

function ModalTemplate({
  isOpen,
  onOpenChange,
  title,
  children,
  actionButton,
  actionFunction,
  closeButton,
}: ModalTemplateProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                pulvinar risus non risus hendrerit venenatis. Pellentesque sit
                amet hendrerit risus, sed porttitor quam.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                pulvinar risus non risus hendrerit venenatis. Pellentesque sit
                amet hendrerit risus, sed porttitor quam.
              </p>
              <p>
                Magna exercitation reprehenderit magna aute tempor cupidatat
                consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi
                consectetur esse laborum eiusmod pariatur proident Lorem eiusmod
                et. Culpa deserunt nostrud ad veniam.
              </p>
            </ModalBody>
            <ModalFooter>
              {closeButton && <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>}
              {actionButton && <Button color="primary" onPress={actionFunction}>
                Action
              </Button>}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ModalTemplate;
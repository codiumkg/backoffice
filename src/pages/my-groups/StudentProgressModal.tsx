import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

interface Props {
  studentId: number;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
}

export default function StudentProgressModal({
  isOpen,
  onOpenChange,
  studentId,
}: Props) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <h1>Статистика успеваемости студента</h1>
            </ModalHeader>
            <ModalBody></ModalBody>
            <ModalFooter>
              <Button onPress={onClose} color="primary">
                ОК
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

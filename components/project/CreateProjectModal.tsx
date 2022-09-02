import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useCreateProject } from "./hook/useCreateProject";

const CreateProjectModal = ({ isOpen, onClose }) => {
  const { register, handleSubmit } = useForm();
  const createProject = useCreateProject();
  const onSubmit = useCallback(
    async (target) => {
      onClose();
      await createProject({
        title: target.title,
        content: target.content,
      });
    },
    [onClose, createProject]
  );
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>プロジェクト新規作成</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <FormControl>
                <FormLabel>プロジェクト名</FormLabel>
                <Input type="text" {...register("title", { required: true })} />
              </FormControl>
              <FormControl mt="8">
                <FormLabel>プロジェクト説明</FormLabel>
                <Textarea {...register("content")} />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                プロジェクト作成
              </Button>
              <Button variant="ghost" onClick={onClose}>
                キャンセル
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateProjectModal;

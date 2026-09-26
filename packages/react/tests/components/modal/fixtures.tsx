import {Button} from "@/components/button";
import {Modal} from "@/components/modal";

export type ModalFixtureProps = {
  defaultOpen?: boolean;
  onBackdropMount?: (node: HTMLDivElement | null) => void;
  onOpenChange?: (open: boolean) => void;
};

export const ModalFixture = ({
  defaultOpen,
  onBackdropMount,
  onOpenChange,
}: ModalFixtureProps = {}) => (
  <Modal defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
    <Button>Open modal</Button>
    <Modal.Backdrop ref={onBackdropMount}>
      <Modal.Container>
        <Modal.Dialog>
          <Modal.CloseTrigger />
          <Modal.Header>
            <Modal.Heading>Welcome</Modal.Heading>
          </Modal.Header>
          <Modal.Body>
            <p>Modal body content</p>
            <Button>Inside action</Button>
          </Modal.Body>
          <Modal.Footer>
            <Button slot="close">Continue</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  </Modal>
);

import React, { useState, useEffect } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useTranslation } from "react-i18next";

type RawModalProps = {
  jsonobj: string;
  state: boolean;
};

export const RawModal: React.FunctionComponent<RawModalProps> = props => {
  const { t } = useTranslation();
  const [modal, setModal] = useState<boolean>(props.state);

  function toggle(): void {
    setModal(!modal);
  }

  useEffect(() => {
    if (props.jsonobj) toggle();
  }, [props.state]);

  return (
    <>
      <Modal isOpen={modal} scrollable={true} fade={false} size="lg">
        <ModalBody>
          <pre className="w-100">{props.jsonobj}</pre>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            {t("Close")}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

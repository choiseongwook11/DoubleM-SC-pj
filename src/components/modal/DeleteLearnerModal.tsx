import React, { useState } from "react";
import styled from "styled-components";
import { useLanguage } from "../../context/LanguageContext";
import ConfirmationModal from "./ConfirmationModal";

interface DeleteLearnerModalProps {
  onClose: () => void;
  onDelete: () => Promise<void>;
}

const DeleteLearnerModal: React.FC<DeleteLearnerModalProps> = ({
  onClose,
  onDelete,
}) => {
  const { selectedLanguage } = useLanguage();
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const handleConfirm = async () => {
    await onDelete(); // 삭제 함수 호출
    setShowConfirmation(true); // 삭제 완료 모달 표시
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false); // 삭제 완료 모달 숨기기
    onClose(); // 전체 모달 닫기
  };

  return (
    <div>
      {!showConfirmation ? (
        <Modal>
          <ModalContent>
            <ModalWrapper>
              <WarningIconWrapper>
                <WarningIcon
                  src={`${process.env.PUBLIC_URL}/img/warningIcon.png`}
                  alt="warning icon"
                />
              </WarningIconWrapper>
              <ReadyModalText>
                <div>
                  {selectedLanguage === "ko"
                    ? "선택한 수강생을 삭제하시겠습니까?"
                    : "Are you sure you want to delete the selected learner?"}
                </div>
                <div style={{ marginBottom: "15px" }}>
                  {selectedLanguage === "ko"
                    ? "(삭제된 수강생은 되돌릴 수 없습니다.)"
                    : "(Deleted learners cannot be restored.)"}
                </div>
                <ReadyModalButton onClick={handleConfirm}>
                  {selectedLanguage === "ko" ? "네" : "OK"}
                </ReadyModalButton>
                <ReadyModalButton onClick={onClose}>
                  {selectedLanguage === "ko" ? "아니요" : "NO"}
                </ReadyModalButton>
              </ReadyModalText>
            </ModalWrapper>
          </ModalContent>
        </Modal>
      ) : (
        <ConfirmationModal onClose={handleCloseConfirmation} />
      )}
    </div>
  );
};

const Modal = styled.div`
  z-index: 5;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 흐린 배경을 위한 투명한 검은색 */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white; /* 모달 배경색 */
  padding: 20px;
  border-radius: 25px;
  width: 25%;
  border: 3px solid #e6e6e6;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WarningIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WarningIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 15px;
`;

const ReadyModalText = styled.div`
  text-align: center;
`;

const ReadyModalButton = styled.button`
  width: 120px;
  height: 3.7vh;
  background-color: #078675;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  margin-top: 3%;
  margin: 5px;

  &:hover {
    cursor: pointer;
    background-color: #067264;
  }
`;

export default DeleteLearnerModal;

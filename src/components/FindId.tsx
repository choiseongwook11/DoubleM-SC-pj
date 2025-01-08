import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import TermsModal from "./modal/TermsModal";
import CheckModal from "./modal/CheckModal";
import { useLanguage } from "../context/LanguageContext";

const FindIdContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FindIdWrapper = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  width: 30%;
  height: 23vh;
  text-align: center;
  @media only screen and (max-width: 768px) {
    background: #fff;
    padding: 20px;
    border-radius: 12px;
    width: 85%;
    height: 35%;
    text-align: center;
  }
  /* 반응형 추가 */
`;

const FindIdTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 1.5rem;
    font-weight: bold;
    color: #078675;
  }

  img:hover {
    cursor: pointer;
  }
`;

const FindIdMain = styled.div`
  margin-top: 30px;
  text-align: left;

  p {
    font-size: 1.1rem;
    margin-bottom: 1%;
  }

  input {
    width: 98%;
    height: 5vh;
    margin-top: 10px;
    font-size: 1.1rem;
    border: 1px solid #078675;
    border-radius: 7px;
    padding-left: 10px;
    outline: none;
    font-family: "Pretendard";
  }
`;

const FindIdButton = styled.div`
  margin-top: 20px;

  button {
    background-color: #078675;
    color: #fff;
    padding: 10px 50px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-family: "Pretendard";
    font-size: 1.1rem;
    transition: 0.2s;

    &:hover {
      background-color: #067264;
    }
  }
`;

interface FindIdProps {
  closeModal: () => void;
}

const FindId: React.FC<FindIdProps> = ({ closeModal }) => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [showCheckModal, setShowCheckModal] = useState<boolean>(false);
  const [showTermsModal, setShowTermsModal] = useState<boolean>(false);

  const { selectedLanguage, changeLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage: string) => {
    changeLanguage(newLanguage); // 언어 변경 함수 호출
  };

  const handleFindId = async () => {
    try {
      const response = await axios.post(
        "https://www.neusenseback.com/api/get/user/findid",
        {
          email: email,
        }
      );

      if (response.data.success) {
        setMessage(response.data.msg);
        setShowCheckModal(true);
      } else {
        setMessage(response.data.msg);
        setShowTermsModal(true);
      }
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      setMessage("API 호출 중 오류가 발생했습니다.");
      setShowTermsModal(true);
    }
  };

  const handleCloseModal = () => {
    closeModal();
  };

  const renderModal = () => {
    if (showCheckModal) {
      return (
        <CheckModal
          closeModal={handleCloseModal}
          checkMessage={"작성된 이메일로 아이디를 발송 하였습니다."}
        />
      );
    } else if (showTermsModal) {
      return (
        <TermsModal
          closeTermsModal={() => setShowTermsModal(false)}
          message={
            selectedLanguage === "ko"
              ? "일치하는 정보가 없습니다"
              : "Sorry, no matching information found :("
          }
        />
      );
    }
    return null;
  };

  return (
    <>
      <FindIdContainer>
        <FindIdWrapper>
          <FindIdTitle>
            <span>{selectedLanguage === "ko" ? "아이디 찾기" : "Find ID"}</span>
            <img
              src={`${process.env.PUBLIC_URL}/img/closeButton.png`}
              alt="모달 닫기"
              onClick={handleCloseModal}
            />
          </FindIdTitle>
          <FindIdMain>
            <p>
              {selectedLanguage === "ko"
                ? "회원가입 당시 사용한 이메일 주소를 입력해 주세요."
                : "Please enter the email address you used when signing up."}
            </p>
            <input
              type="email"
              placeholder={
                selectedLanguage === "ko" ? "이메일 입력" : "Enter your E-mail"
              }
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FindIdMain>
          <FindIdButton>
            <button onClick={handleFindId}>
              {selectedLanguage === "ko" ? "확인" : "Confirm"}
            </button>
          </FindIdButton>
        </FindIdWrapper>
      </FindIdContainer>
      {renderModal()}
    </>
  );
};

export default FindId;

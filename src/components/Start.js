import styled from 'styled-components';
import OrangeButton from './OrangeButton';
import Button from './Button';

const Header = styled.p`
  font-size: 3em;
`;

const MainImg = styled.img`
  width: inherit;
`;

const SubHeader = styled.p`
  font-size: 1.5em;
  color: #777;
`;

export default function Start() {
  return (
    <>
      <Header>개발자 MBTI 조사</Header>
      <MainImg src="/images/main.jpg" alt="main img" />
      <SubHeader>
        개발자가 흔히 접하는 상황에 따라서 MBTI를 알아 봅시다!
      </SubHeader>
      <OrangeButton text="테스트 시작" />
    </>
  );
}

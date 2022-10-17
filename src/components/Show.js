import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import OrangeButton from './OrangeButton';
import { reset } from '../store/modules/mbti';
import { useEffect } from 'react';

const Header = styled.p`
  font-size: 3em;
`;
const Explanation = styled.p`
  font-size: 1.5em;
  color: #777;
`;
const Result = styled.p`
  font-size: 3em;
  color: dodgerblue;
`;
const Additional = styled.p`
  font-size: 2em;
  color: orange;
`;
const AdditionalImg = styled.img`
  width: 500px;
  transform: translateX(-35px);
`;

export default function Show() {
  const result = useSelector((state) => state.mbti.mbtiResult);
  const explanation = useSelector((state) => state.mbti.explanation[result]);
  const dispatch = useDispatch();

  // 마지막 페이지가 나왔을 때 한번만! 참여 인원 + 1
  useEffect(() => {
    async function sendData() {
      // cors 때문에 3001 저렇게 데이터 요청이 가능한 것
      const resInc = await fetch('http://localhost:3001/data/inccounts', {
        method: 'POST',
      });
      if (resInc.status === 200) {
        console.log(await resInc.json());
      } else {
        throw new Error('통신 이상');
      }
    }
    sendData();
  }, []);

  return (
    <>
      <Header>당신의 개발자 MBTI 결과는?</Header>
      <Explanation>{explanation.text}</Explanation>
      <Result>{result}</Result>
      <Additional>재미로 읽어보세요!</Additional>
      <AdditionalImg src={explanation.img} alt="MBTI 팩폭" />
      <OrangeButton text="다시 검사하기" clickEvent={() => dispatch(reset())} />
    </>
  );
}

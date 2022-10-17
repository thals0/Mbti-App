import styled from 'styled-components';
import OrangeButton from './OrangeButton';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { next, init } from '../store/modules/mbti';
import { useEffect, useState } from 'react';

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
  const [counts, setCounts] = useState(0);

  function makeData(survey, explanation) {
    const initData = { survey: [], explanation: {} };
    if (initData.survey.length === 0) {
      for (let i = 0; i < survey.length; i = i + 2) {
        initData.survey.push({
          question: survey[i].QUESTION_TEXT,
          answer: [
            {
              text: survey[i].ANSWER_TEXT,
              result: survey[i].RESULT,
            },
            {
              text: survey[i + 1].ANSWER_TEXT,
              result: survey[i + 1].RESULT,
            },
          ],
        });
      }
      for (let i = 0; i < explanation.length; i++) {
        initData.explanation[explanation[i].MBTI_TYPE] = {
          explanation: explanation[i].EXPLAINATION,
          img: explanation[i].IMG_SRC,
        };
      }
    }
    return initData;
  }

  // counts가 변경될 때 마다 실행
  useEffect(() => {
    async function fetchData() {
      // Counts 값 받아오기
      const resCount = await fetch('http://localhost:3001/data/counts');
      // 통신성공 = 200
      if (resCount.status === 200) {
        const num = await resCount.json();
        // console.log(num);
        if (num[0].counts !== 0) setCounts(num[0].counts);
      } else {
        throw new Error('통신 이상');
      }

      // Survey 값 받아오기
      const resSurvey = await fetch('http://localhost:3001/data/survey');
      if (resSurvey.status === 200) {
        // json -> js data로
        const surveyData = await resSurvey.json();
        // console.log(surveyData);

        // surveyData 값이 유지된채로 explanation 값을 받아오기 위해서 이 위치에 작성
        // Explanation 값 받아오기
        const resExplanation = await fetch(
          'http://localhost:3001/data/explanation'
        );
        if (resExplanation.status === 200) {
          // json -> js data로
          const explanationData = await resExplanation.json();
          // console.log('설명 데이터', explanationData);
          // console.log(makeData(surveyData, explanationData));
          const madeData = makeData(surveyData, explanationData);
          // console.log(madeData);
          dispatch(init(madeData));
        } else {
          throw new Error('통신 이상');
        }
      } else {
        throw new Error('통신 이상');
      }
    }
    fetchData();
  }, []);

  const dispatch = useDispatch();
  return (
    <>
      <Header>개발자 MBTI 조사</Header>
      <MainImg src="/images/main.jpg" alt="main img" />
      <SubHeader>
        개발자가 흔히 접하는 상황에 따라서 MBTI를 알아 봅시다! {'\n\n'} 지금까지{' '}
        {counts} 명이 참여해 주셨습니다!
      </SubHeader>
      <OrangeButton text="테스트 시작" clickEvent={() => dispatch(next())} />
    </>
  );
}

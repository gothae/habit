# habit
2021 캡스톤 디자인 - 널 위한 해빗

# 목적

- 대장용종 환자들의 식습관을 수기작성이 아닌 이미지를 통해 추적 및 분석하고 그에 따른 적절한 맞춤형 솔루션까지 제공한다. 
- 환자들의 일상 생활을 모바일 서비스(웹, 카카오톡)을 통해 분석하고 식습관을 파악하여 솔루션 제공하고 접근성을 높인다.
- 환자 개인별로 신체 정보와 특이사항을 입력하여 환자 맟춤형 솔루션을 제공한다.
- 주기적인 설문을 통해 식단, 식습관뿐 아니라 환자의 몸 상태를 체크 하여 솔루션을 제공한다.

# 기술스택
- AI 모델 
  - ![image](https://user-images.githubusercontent.com/72867880/159123194-dd1a2ab6-ff85-47d4-8aac-7244cc3cd10f.png)
- 서버 
  - ![image](https://user-images.githubusercontent.com/72867880/159123212-5f7ba61c-328b-408f-8b87-9285dd854435.png)
  - ![image](https://user-images.githubusercontent.com/72867880/159123256-35c22955-6296-4ffb-8903-62793a345b31.png)
- 웹
  - ![image](https://user-images.githubusercontent.com/72867880/159123242-93c06a90-69ec-45c6-b35a-36fb8c847172.png)
- DB
  - ![image](https://user-images.githubusercontent.com/72867880/159123273-958c3aa0-0f1f-431b-88de-9dadeb70c723.png)

# 라팩토링 내용
1. 챗봇에서 선택한 음식은 사라지게 수정

2. 웹에서 식단확인할 때 날짜선택하고 검색할때마다 페이지 새로고침되는 것
	-> 비동기방식으로 날짜선택하면 선택한 영역만 변경되게

3. 웹에서 식단 상세정보를 확인할때 새로운페이지로 이동하는 것이 아닌
	popup card형식으로 기존 페이지에서 확인할 수 있도록 (비동기)

4. AI서버로 전송된 식단 사진이 보안상의 이유로 일정시간 후 파기되어 해당 식단사진을 확인할수없었음
	-> 전송된 식단 사진을 다시 AWS S3 서버에 업로드하여 보관

5. 챗봇에서 전송한 사진을 전송시간에 따라 자동으로 날짜 및 식사시간 입력되는 방식 => 사용자가 직접 선택할 수 있게 

6. 한번에 하나의 식단에 대해서만 정보를 입력받을 수 있었던 방식 => 한번에 식단 사진 여러개 전송하여 여러식단에 대한 정보입력 가능


const qnaList = [
  {
    q: '1.하루에 물을 얼마나 마시나요?',
    a: [
      { answer: '500ml 미만 ', solution: '물 섭취가 매우 부족합니다. 충분한 물을 섭취하세요.' },
      { answer: '500ml 이상 1L 미만 ', solution: '물 섭취가 부족한 편입니다. 조금 더 물을 섭취하세요.' },
      { answer: '1L이상 2미만 ', solution: '평소보다 약간의 물 섭취가 더 필요합니다.' },
      { answer: '2L 이상  ', solution: '좋습니다, 충분한 양의 물을 섭취하고 있습니다. ' },
    ]
  },
  {
    q: '2. 아침식사를 주기적으로 하시나요? ',
    a: [
      { answer: '먹지 않는다', solution: '매우 좋지 않은 습관입니다. 아침식사를 반드시 챙겨 먹도록 노력하십시오.  ' },
      { answer: '주에 1-2회 ', solution: '아침식사를 꾸준히 하는 것은 우리 몸의 원활한 에너지를 위해 반드시 필요합니다. 조금 더 자주 아침식사를 하도록 하십시오.' },
      { answer: '주에 3-4회 ', solution: '하지만 아침식사는 앞으로 매일 아침을 먹을 수 있도록 하면 더 좋을 것 같습니다.' },
      { answer: '주에 5-6회', solution: '아주 잘하고 있습니다. 앞으로도 아침식사는 꼭 챙겨 드십시오.' },
    ]
  },
  {
    q: '3. 식사 속도는 어떠신 편인가요?',
    a: [
      { answer: '5분이내로 먹는다 ', solution: '식사속도는 매우 빠릅니다. 음식물을 씹지 않고 넘기게 되면 소화기관에 무리가 가기 때문에 조금 더 꼭꼭 씹어 천천히 드십시오.' },
      { answer: '15분이내로 먹는다 ', solution: '적당한 속도이긴 하지만 조금 더 천천히 음식물을 섭취하는 것도 권장합니다. ' },
      { answer: '30분이내로 먹는다 ', solution: '좋습니다. 천천히 먹으면 포만감도 커져 다이어트 효과도 보실 수 있습니다. ' },
      { answer: '30분이상 먹는다 ', solution: '천천히 먹는 것은 좋지만 조금 더 속도를 내 먹어도 좋을 것 같습니다. ' },
    ]
  },
  {
    q: '4. 단 음식(과자, 초콜릿, 꿀 ,아이스크림, 청량음료, 설탕이 많이 들어있는 음식)을 얼마나 드시나요?',
    a: [
      { answer: '매일 먹는다(주 6-7회)', solution: '위험합니다. 액상과당은 우리 몸의 혈당을 빠르게 올리기 때문에 매일 액상과당을 섭취하고 있는다면 당장 줄이십시오.' },
      { answer: '자주 먹는다(주 4-5회)" ', solution: '환자분은 너무 자주 단 음식을 드시고 있습니다. 횟수를 줄이는 것을 권장 드립니다. ' },
      { answer: '가끔 먹는다 (주 2-3회)', solution: '액상과당은 우리 몸에 치명적인 음식이기 때문에 더 줄일 수 있다면 거의 섭취하지 않는 것을 권장합니다. ' },
      { answer: '거의 먹지 않는다(주 0-1회) ', solution: '매우 좋습니다. 단 음식을 섭취하지 않는 것만으로도 건강에 큰 도움이 됩니다.' },
    ]
  },
  {
    q: '5. 술을 얼마나 자주 드시나요?',
    a: [
      { answer: '매일 먹는다(주 6-7회 이상)', solution: '매우 위험합니다. 잦은 과음은 일상생활에 지장을 줄 수 있습니다.' },
      { answer: '자주 먹는다(주 4-5회 이상)', solution: '환자분의 음주 또한 매주 잦은 편으로 간과 건강을 해칠 수 있습니다. 주의하십시오. ' },
      { answer: '가끔 먹는다 (주 2-3회) ', solution: '횟수 자체는 적은 편이지만, 만약 과음을 한다면 위험할 수 있습니다.' },
      { answer: '거의 먹지 않는다(주 0-1회)', solution: '좋습니다. 과음하지 않도록 유의하시길 바랍니다. ' },
    ]
  },

  {
    q: '6. 주에 운동을 얼마나 하시나요?',
    a: [
      { answer: '거의 하지 않는다(0-1회)', solution: '운동이 부족합니다. 가벼운 산책부터 시작해보는 것을 권장합니다.' },
      { answer: '가끔 한다(주2-3회)', solution: '일상생활에서 충분한 횟수입니다. 앞으로도 꾸준히 하시길 바랍니다.' },
      { answer: '꾸준히 한다(주 4-5회 이상)', solution: '운동을 꾸준히 하시는 것은 좋습니다. 꾸준한 운동은 폐활량증진 뿐만 아니라 건강에도 도움이 됩니다. ' },
      { answer: '매일 한다(주6-7회이상)', solution: '매우 좋습니다. 튼튼한 몸과 체력은 활력의 근원입니다.' }

    ]
  },
  {
    q: '7. 한번 운동을 할 때 얼마정도 하시나요?',
    a: [
      { answer: '30분 미만 ', solution: '30분이상부터 지방연소가 시작되기 때문에 조금 더 하시는 것을 추천합니다. ' },
      { answer: '30분 이상 1시간 미만', solution: '좋습니다. 꾸준함이 가장 좋은 습관입니다. ' },
      { answer: '1시간 이상 2시간 미만', solution: '매우 좋습니다. 운동 후에는 적절한 휴식을 취하는 것을 잊지 마십시오. ' },
      { answer: '2시간 이상', solution: '하지만 운동은 2시간이내로 하는 것을 추천합니다. 휴식 또한 운동의 일부라는 것을 기억하십시오. ' },

    ]
  },
  {
    q: '8. 흡연량은 얼마나 되시나요?',
    a: [
      { answer: '많이 핀다(하루에 한갑 이상)', solution: '폐건강에 매우 치명적입니다. 천천히 줄여 나가는 것을 권장합니다.' },
      { answer: '자주 핀다(하루에 반갑 이상) ', solution: '흡연은 건강을 위해서 조금씩 줄여 보시는 것을  추천합니다. ' },
      { answer: '거의 피지 않는다(하루에 반갑 미만)', solution: '금연할 수 있다면 금연하시는 것을 권장 드립니다. ' },
      { answer: '흡연하지 않는다', solution: '좋습니다. 흡연은 백해무익하다는 것을 기억하십시오. ' },
    ]
  },
  {
    q: '9. 대변에서 피가 묻어 나오거나 혈변을 얼마나 자주 보시나요?',
    a: [
      { answer: '매일 본다(주에 6-7회)', solution: '매우 심각합니다. 당장 병원에 내원해 진료받으십시오. ' },
      { answer: '자주 본다(주에 4-5회)', solution: '증상이 더 심각해진다면 바로 병원에 방문하시길 바랍니다.' },
      { answer: '가끔 본다(주에 2-3회)', solution: '혈변은 자극적인 음식이 원인이 될 수 있기 때문에 조금 더 식습관 개선을 위해 노력하십시오.  ' },
      { answer: '거의 보지 않는다(주에 0-1회)', solution: '좋습니다. 앞으로도 지금과 같은 식습관을 유지하십시오. ' }
    ]
  },
  {
    q: '10. 평소에 배가 많이 아프신 편인가요? ',
    a: [
      { answer: '매일 아프다(주에 6-7회)', solution: '가까운 병원에 내원해 원인을 진찰받는 것을 추천 드립니다.' },
      { answer: '자주 아프다(주에 4-5회', solution: '배가 아픈 것에는 다양한 원인이 있지만 증상이 지속된다면 병원에 내원하시길 바랍니다. ' },
      { answer: '종종 아프다(주에 2-3회)', solution: '복통 또한 심각한 정도는 아니지만 증상 호전을 위해 따뜻한 물 마시기,차가운 음식 먹지 않기 등을 권장 드립니다.' },
      { answer: '거의 아프지 않다(주에 0-1회)', solution: '좋습니다. 현재 식습관에 큰 문제가 없다고 볼 수 있습니다.' },
    ]
  }
]

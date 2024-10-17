// 데이터 샘플 : 아래의 내용으로 반복합니다.
var dataStep스텝단계learningLevel레벨단계 = { // 해당번호로 복사해서 한세트를 만듭니다.
    "1":{
        "q":"<span>삼</span><span>촌</span>이 드디어 결혼을 하신다.", // 질문내용입니다. 빈칸 단어는 한글자에 "<span></span>"이 한쌍 형식으로 넣어주세요. 개행은 <br>로 입력합니다. 
        "e1":"삼춘", // 1번 예제
        "e2":"삼촌", // 2번 예제
        "a":2, // 정답인 예제문항 번호를 적습니다. 
    },
    "2":{
        "q":"엄마는 씻고 자라며 나를 <span>닦</span><span>달</span>하셨다.",
        "e1":"닥달",
        "e2":"닦달",
        "a":2,
    },
    // 같은 형식으로 이어서 출력. ',' 쉼표를 반드시 확인합니다.
}

// 스텝2 러닝 유형 - 레벨2
var dataStep2learningLevel2 = {
    "1":{
        "q":"윤서는 개구리 올챙이 적 생각 못 하고 어른을 만나면 늘 인사를 잘해. 참 예의가 바른 것 같아.",
        "e1":"o",
        "e2":"x",
        "a":2,
    },
    "2":{
        "q":"재주는 곰이 넘고 돈은 주인이 받는다더니, 간식 그릇이 설거지되어 있는 것을 본 엄마께서 기특하다며 동생만 칭찬해 주셨어. 다 내가 한 건데 너무 억울해.",
        "e1":"o",
        "e2":"x",
        "a":1,
    },
    "3":{
        "q":"호미로 막을 것을 가래로 막는다고, 오늘 대청소를 하다가 예전에 잃어버렸던 반지를 찾았어.",
        "e1":"o",
        "e2":"x",
        "a":2,
    },
    "4":{
        "q":"태권도장에서 검은 띠인 오빠를 따라서 송판 격파에 도전했어. 그런데 뱁새가 황새를 따라가면 다리가 찢어진다고, 흰 띠인 나는 손만 아팠어.",
        "e1":"o",
        "e2":"x",
        "a":1,
    },
    "5":{
        "q":"서당 개 삼 년에 풍월을 읊는다더니 집에서 언니가 따라 부르던 아이돌 노래를 매일매일 듣다 보니 나도 덩달아 가사를 외우게 되었어.",
        "e1":"o",
        "e2":"x",
        "a":1,
    },
    "6":{
        "q":"입은 비뚤어져도 말은 바로 하랬다고 소풍가는 날 비가 올 것 같다고 말했더니 정말 비가 와서 취소됐어.",
        "e1":"o",
        "e2":"x",
        "a":2,
    },
    "7":{
        "q":"우리 엄마는 열 손가락 깨물어 안 아픈 손가락이 없다면서 언니랑 나, 동생을 모두 똑같이 사랑한다고 하셨어.",
        "e1":"o",
        "e2":"x",
        "a":1,
    },
    "8":{
        "q":"책을 아무리 많이 가지고 있더라도 읽지 않으면 그 가치를 알 수가 없어. 구슬이 서 말이라도 꿰어야 보배라고 하잖아.",
        "e1":"o",
        "e2":"x",
        "a":1,
    },
    "9":{
        "q":"바자회에서 모자를 팔고 책을 사왔어. 누군가는 내 모자를 잘 쓰겠지? 이게 바로 누이 좋고 매부 좋은 일이지.",
        "e1":"o",
        "e2":"x",
        "a":1,
    },
    "10":{
        "q":"너 춤추는 거 안 좋아하잖아. 친구 따라 강남 간다고 단짝 소은이가 방송 댄스반에 간다고 하니까 너도 같이 따라왔구나. ",
        "e1":"o",
        "e2":"x",
        "a":1,
    },
    "11":{
        "q":"벼 이삭은 익을수록 고개를 숙인다더니 선하는 우리 반 회장이 된 이후에 친구들을 더 잘 도와주고 양보도 더 많이 하더라.",
        "e1":"o",
        "e2":"x",
        "a":1,
    },
    "12":{
        "q":"되로 주고 말로 받는다더니, 아직 삼촌한테 용돈도 안 받았는데 벌써 그 돈으로 무엇을 살지 계획을 다 세워 놓은 거야?",
        "e1":"o",
        "e2":"x",
        "a":2,
    },
    "13":{
        "q":"등굣길에 갑자기 비가 쏟아져서 옷이 다 젖었어. 그런데 또 돌부리에 걸려 넘어져서 무릎도 까졌지 뭐야. 학교 가는 길이 산 넘어 산이었어.",
        "e1":"o",
        "e2":"x",
        "a":1,
    },
    "14":{
        "q":"고양이 목에 방울 달기인 일이라고 자꾸 핑계를 대며 포기하려고 하지 말고, 우리 다른 대안을 찾아보자. 내가 도와줄게.",
        "e1":"o",
        "e2":"x",
        "a":1,
    },        
}
// 스텝2 러닝 유형 - 레벨5
var dataStep2learningLevel5 = {
    "1":{
        "q":"참새가 방앗간을 그저 지나갈 수 있겠어? 나는 물을 무서워 하지만, 친구를 따라서 수영장에 가기로 했어.",
        "e1":"o",
        "e2":"x",
        "a":2,
    },
    "2":{
        "q":"하늘이 무너져도 솟아날 구멍이 있다고, 길을 걸어가는 중에 배가 너무 아팠는데, 마침 근처 공원에 화장실이 보여서 달려갔어.",
        "e1":"o",
        "e2":"x",
        "a":1,
    },
    "3":{
        "q":"호랑이도 제 말 하면 온다더니, 교실에서 선생님 얘기를 하고 있었는데 마침 그때 선생님이 문을 열고 들어오셨어.",
        "e1":"o",
        "e2":"x",
        "a":1,
    },
    "4":{
        "q":"간단한 덧셈도 잘 못하는 동생을 보고 답답해하자, 엄마는 내게 개구리 올챙이 적 생각 못 한다고 하셨어.",
        "e1":"o",
        "e2":"x",
        "a":1,
    },
    "5":{
        "q":"가는 토끼 잡으려다 잡은 토끼 놓친다고 이것저것 배우려고 욕심 부리지 말고 하나만이라도 집중해서 배워 봐.",
        "e1":"o",
        "e2":"x",
        "a":1,
    },
    "6":{
        "q":"여름 방학 캠프 신청이 마감된 줄 알았는데, 내일까지래. 가랑비에 옷 젖는 줄 모른다더니 정말 다행이야.",
        "e1":"o",
        "e2":"x",
        "a":2,
    },
    "7":{
        "q":"백 번 듣는 것이 한 번 보는 것만 못하다고 나한테 빌려간 물건은 제자리에 놓아 달라고 언니에게 늘 얘기하거든. 근데 언니는 매번 다른 곳에 두네.",
        "e1":"o",
        "e2":"x",
        "a":2,
    },
    "8":{
        "q":"친구들이 우리 엄마랑 나는 정말 똑같이 생겼대. 쌍꺼풀 있는 눈도, 동그란 얼굴도 모두 닮았대. 귀에 걸면 귀걸이 코에 걸면 코걸이지.",
        "e1":"o",
        "e2":"x",
        "a":2,
    },
    "9":{
        "q":"앞머리를 너무 짧게 잘랐더니 이상해. 그런데도 우리 아빠는 내가 최고 예쁘대. 그래서 고슴도치도 제 새끼는 함함하다고 하나 봐.",
        "e1":"o",
        "e2":"x",
        "a":1,
    },
    "10":{
        "q":"엄마를 졸라서 풍선을 샀는데, 그만 손잡이를 놓쳐서 풍선이 저 멀리 날아가 버렸어. 닭 쫓던 개 지붕 쳐다보듯 하늘만 바라봤어.",
        "e1":"o",
        "e2":"x",
        "a":1,
    },
    "11":{
        "q":"아이스크림 가게에서 친구랑 같은 아이스크림을 사 먹었어. 그런데 똥 묻은 개가 겨 묻은 개 나무란다고 이상하게 내 것이 친구 것보다 작아 보여.",
        "e1":"o",
        "e2":"x",
        "a":2,
    },
    "12":{
        "q":"보고 못 먹는 것은 그림의 떡이라더니, 우리 부모님은 아직 나에게 스마트폰을 사 줄 생각이 없으셔.",
        "e1":"o",
        "e2":"x",
        "a":1,
    },
    "13":{
        "q":"우리 반 회장 라미는 공부도 잘하고 마음씨도 착해. 그런데 옥에도 티가 있다고 정리 정돈을 안 해서 책상이 항상 지저분해.",
        "e1":"o",
        "e2":"x",
        "a":1,
    },
    "14":{
        "q":"언니가 내 새 옷을 자꾸 입어 보더니 결국 소매가 뜯어졌어. 못 먹는 감 찔러나 본다고 일부러 그런 것 같아.",
        "e1":"o",
        "e2":"x",
        "a":1,
    },        
}

// 스텝2 러닝 유형 - 레벨8
var dataStep2learningLevel8 = {
    "1":{
        "q":"자라 보고 놀란 가슴 솥뚜껑 보고 놀란다고, 아빠의 방귀 소리가 천둥 번개 치는 소리인 줄 알고 너무 놀랐어.",
        "e1":"o",
        "e2":"x",
        "a":1,
    },
    "2":{
        "q":"글짓기 대회에서 최우수상을 받은 사실을 엄마께 어떻게 전할까? 바람 앞의 등불과도 같은 내 신세.",
        "e1":"o",
        "e2":"x",
        "a":2,
    },
    "3":{
        "q":"장난꾸러기 현수가 발을 걸어서 넘어졌어. 무릎이 까져서 속상해 하고 있었는데 미안하다며 반창고를 주네. 병 주고 약 주는 걸까?",
        "e1":"o",
        "e2":"x",
        "a":1,
    },
    "4":{
        "q":"운동회 때 달리기 시합하는 친구를 내가 응원해 주었더니 친구도 나를 응원해 주더라고. 역시 가는 말이 고와야 오는 말이 고운 법이야.",
        "e1":"o",
        "e2":"x",
        "a":1,
    },
    "5":{
        "q":"주스를 마시다가 컵을 깨뜨렸어. 하필 엄마가 아끼시는 그릇인데······. 휴, 앓던 이 빠진 것 같네.",
        "e1":"o",
        "e2":"x",
        "a":2,
    },
    "6":{
        "q":"너 2모둠 아니야? 잘하는 친구들이 3모둠에 모여 있으니깐 이쪽으로 오려고? 그렇게 간에 붙었다 쓸개에 붙었다 하면<br>안 돼.",
        "e1":"o",
        "e2":"x",
        "a":1,
    },
    "7":{
        "q":"사촌이 땅을 사면 배가 아프다고 했던가. 이번 달 급식 우수반이 옆 반이라는 소식에 왠지 억울한 마음이 들었어.",
        "e1":"o",
        "e2":"x",
        "a":1,
    },
    "8":{
        "q":"중학생인 우리 형은 중국어를 배운 지 2년이 지났는데 다람쥐 쳇바퀴 돌듯 여전히 기초반이야. 아직도 자기소개 한마디를 못 해.",
        "e1":"o",
        "e2":"x",
        "a":1,
    },
    "9":{
        "q":"미술 시간에 그림을 거의 다 완성해 가고 있는데, 고양이 목에 방울 달기라고 실수로 물통을 엎는 바람에 그림이 다 번지고 말았어.",
        "e1":"o",
        "e2":"x",
        "a":2,
    },
    "10":{
        "q":"오늘 과학 시간에 모둠별로 발표할 주제를 정했는데, 백지장도 맞들면 낫다고 우리 모둠은 의견이 다 달라서 주제를 정하기가 너무 어려웠어.",
        "e1":"o",
        "e2":"x",
        "a":2,
    },
    "11":{
        "q":"뱁새가 황새를 따라가면 다리가 찢어진다더니 하람이는 채소를 아예 안 먹으면서 내가 시금치를 안 먹었더니 나에게 편식쟁이라고 놀리더라고.",
        "e1":"o",
        "e2":"x",
        "a":2,
    },
    "12":{
        "q":"흐르는 물은 썩지 않는다고 하잖아. 내가 복도에서 친구와 나눈 이야기를 누가 들었을까 봐 괜히 걱정돼.",
        "e1":"o",
        "e2":"x",
        "a":2,
    },
    "13":{
        "q":"언니, 아까 분명히 부탁 들어주면 나한테 캐릭터 연필 준다고 했잖아. 똥 누러 갈 적 마음 다르고 올 적 마음 다르다더니 이제 와서 왜 모른 척해.",
        "e1":"o",
        "e2":"x",
        "a":1,
    },
    "14":{
        "q":"부모님이 일 때문에 늦게 오셔서 옆집 아주머니가 저녁을 챙겨 주셨어. 이래서 먼 사촌보다 가까운 이웃이 낫다고 하나 봐.",
        "e1":"o",
        "e2":"x",
        "a":1,
    },     
}

// 스텝2 러닝 유형 - 레벨10
var dataStep2learningLevel10 = {
    "1":{
        "q":"사공이 많으면 배가 산으로 간다고, 모둠별로 연극 작품을 고르는데 모둠원들이 각자 자기의 의견만 주장해서 결국 작품을 못 정했어.",
        "e1":"o",
        "e2":"x",
        "a":1,
    },
    "2":{
        "q":"예전에는 학교 앞 떡볶이 가게에 손님이 엄청 많았었는데, 달도 차면 기운다고 언제부터인지 한산해.",
        "e1":"o",
        "e2":"x",
        "a":1,
    },
    "3":{
        "q":"소 잃고 외양간 고친다고 생존 수영 수업이 있는 날인데 수영복을 집에 두고 왔어. 그런데 정말 다행히도 수업이 취소되었어.",
        "e1":"o",
        "e2":"x",
        "a":2,
    },
    "4":{
        "q":"공부를 많이 못했는데 벌써 수학 시험을 보는 날이야. 내 모습이 마치 바람 앞의 등불과 같이 느껴져.",
        "e1":"o",
        "e2":"x",
        "a":1,
    },
    "5":{
        "q":"내 동생은 한글을 따로 배우지 않았는데 어느 날부터 한글을 조금씩 읽더라고. 역시 낮말은 새가 듣고 밤말은 쥐가 듣는 법이야.",
        "e1":"o",
        "e2":"x",
        "a":2,
    },
    "6":{
        "q":"똥 누러 갈 적 마음 다르고 올 적 마음 다르다더니 네가 화분을 깨트린 게 들통날까봐 안절부절못하는 거지? 그냥 선생님께 솔직하게 말씀드리자.",
        "e1":"o",
        "e2":"x",
        "a":2,
    },
    "7":{
        "q":"굼벵이도 구르는 재주가 있다더니, 하영이는 운동을 잘 못하지만 그래도 우리 반에서 가장 유연해서 스트레칭은<br>잘해.",
        "e1":"o",
        "e2":"x",
        "a":1,
    },
    "8":{
        "q":"추석에 시골 할머니 댁에 가는데 차가 너무 많이 막혔어. 차들로 꽉 막힌 고속도로 위에 있는 모습이 마치 그물에 걸린 고기 신세 같았어.",
        "e1":"o",
        "e2":"x",
        "a":1,
    },
    "9":{
        "q":"동생이 내 책을 찢어 놓고 테이프로 대충 붙여 놨어. 눈 가리고 아웅 해 봤자 다 이렇게 다 티가 나는데 말이야.",
        "e1":"o",
        "e2":"x",
        "a":1,
    },
    "10":{
        "q":"하늘이 무너져도 솟아날 구멍이 있다고 지금 네가 코딩을 잘한다고 해도 계속 꾸준히 연습해야 까먹지 않고 더 잘할 수 있을 거야.",
        "e1":"o",
        "e2":"x",
        "a":2,
    },
    "11":{
        "q":"내 친구 서준이가 회장이 되었다는 소식을 들었는데 나도 모르게 질투가 났어. 먼 사촌보다 가까운 이웃이 낫다는 말이 정말 맞는 것 같아.",
        "e1":"o",
        "e2":"x",
        "a":2,
    },
    "12":{
        "q":"도현이는 내 생일잔치에 꼭 올 줄 알았는데, 믿는 도끼에 발등 찍힌다고 다른 친구들이랑 놀이동산에 갔더라.",
        "e1":"o",
        "e2":"x",
        "a":1,
    },
    "13":{
        "q":"호미로 막을 것을 가래로 막는다고 하루에 한 장만 풀면 되는 학습지를 계속 미루었더니 열 장을 한꺼번에 풀어야 해.",
        "e1":"o",
        "e2":"x",
        "a":1,
    },
    "14":{
        "q":"급식실에서 싸움이 났어. 분명 시우가 잘못한 일인데, 가재는 게 편이라고 다현이는 같은 반 친구인 시우의 편부터 들더라고.",
        "e1":"o",
        "e2":"x",
        "a":1,
    },    
}
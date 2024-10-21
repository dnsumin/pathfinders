const lever = document.getElementById('lever');
const reels = document.querySelectorAll('.reel img');

let isSpinning = true; // 슬롯이 현재 돌아가고 있는지 상태를 추적
let flickerInterval; // 깜빡임 간격을 저장할 변수



// 레버 클릭 시
lever.addEventListener('mousedown', () => {
    clearInterval(flickerInterval); // 깜빡임 정지
    lever.src = 'pull_2.png'; // 눌린 상태로 바뀜
    if (isSpinning) { // 슬롯이 돌고 있으면 멈추기
        stopReels();
    }
});


lever.addEventListener('mouseleave', () => {
    lever.src = 'pull_1.png'; // 마우스가 레버를 떠날 때도 원래 상태로
    startFlickering(); // 다시 깜빡이기 시작
});

// 슬롯 애니메이션 시작 (동시에 시작)
function startReels() {
    isSpinning = true; // 슬롯이 돌고 있다는 상태로 변경
    reels.forEach((reel) => {
        reel.style.animation = 'spin 0.1s infinite linear'; // 모든 슬롯 애니메이션 동시에 시작
    });
}

// 슬롯 멈추기
function stopReels() {
    isSpinning = false; // 슬롯이 멈춘 상태로 변경

    const randomImageIndex = Math.floor(Math.random() * 8); // 0부터 7까지의 랜덤 값 생성

    reels.forEach((reel, index) => {
        setTimeout(() => {
            reel.style.animation = 'none'; // 애니메이션 중지
    
            // 중앙 위치 계산
            const reelHeight = 304; // .reel의 높이
            const imgHeight = 2160; // 이미지 높이
    
            // 각 슬롯의 9등분된 이미지 높이
            const imageHeightInSlot = imgHeight / 9; // 각 이미지 높이
    
            // 각 슬롯의 중앙 위치 설정
            const centerPosition = (reelHeight - imageHeightInSlot) / 2; // 9등분된 슬롯의 중앙 위치
            
            // 슬롯 멈출 때의 위치 설정
            reel.style.top = `-${(randomImageIndex * imageHeightInSlot) - centerPosition}px`;
        }, index * 500); // 각 슬롯마다 0.5초 시간차를 두고 멈추기
    });
    
    
    setTimeout(() => {
        showAlert(randomImageIndex); // 슬롯 멈춘 후 알림 창 표시
    }, 1500); // 슬롯 멈춘 후 1.5초 후에 팝업 표시
}

// 알림창 띄우기
function showAlert(randomIndex) {
    const alertDiv = document.getElementById('alert');
    alertDiv.style.display = 'flex'; // 알림 창 보이기

    // 기존 메시지 제거
    const existingMessage = document.querySelector('.alert-message');
    if (existingMessage) {
        existingMessage.remove(); // 기존 메시지 삭제
    }

    // 버튼 클릭 이벤트 (0부터 7까지 랜덤 숫자에 따라 사이트 이동)
    document.getElementById('alert-button').onclick = function() {
        const sites = [
            'https://www.naver.com',
            'https://www.google.com',
            'https://www.pusan.ac.kr',
            'https://swedu.pusan.ac.kr',
            'https://www.instagram.com',
            'https://www.pinterest.com',
            'https://map.naver.com',
            'https://papago.naver.com'
        ];
        window.location.href = sites[randomIndex]; // 지정된 웹사이트로 이동
    };

    // 닫기 버튼 클릭 이벤트
    document.getElementById('alert-close').onclick = function() {
        alertDiv.style.display = 'none'; // 알림 창 숨기기
        document.body.style.backgroundColor = 'rgba(255, 255, 255, 1)'; // 화면 밝게
        startReels(); // 슬롯 다시 시작
    };

    // 랜덤 인덱스에 따라 다른 메시지를 표시할 수 있습니다.
    const messages = [
        "축하합니다! 상금을 받으셨습니다!", // 0
        "좋은 하루 되세요!", // 1
        "다시 도전해보세요!", // 2
        "행운이 가득하길!", // 3
        "멋진 보너스가 기다리고 있습니다!", // 4
        "이런! 다시 한 번 시도해 보세요!", // 5
        "축하합니다! 또 다른 기회입니다!", // 6
        "행운을 빕니다!" // 7
    ];

    // 알림창에 표시할 메시지
    const alertMessage = messages[randomIndex];
    const alertMessageElement = document.createElement('div'); // 새로운 div 요소 생성
    alertMessageElement.classList.add('alert-message'); // 클래스 추가
    alertMessageElement.textContent = alertMessage; // 텍스트 설정
    alertDiv.appendChild(alertMessageElement); // 알림 창에 메시지 추가
}

// 페이지가 로드될 때 자동으로 슬롯 애니메이션 시작 및 깜빡임 시작
window.onload = function() {
    startReels(); // 슬롯 애니메이션 시작
    startFlickering(); // 레버 깜빡임 시작
};

// 레버 깜빡임 시작
function startFlickering() {
    flickerInterval = setInterval(flickerLever, 500); // 0.5초 간격으로 깜빡이기
}

// 페이지가 로드될 때 자동으로 깜빡임 시작
window.onload = function() {
    startReels(); // 슬롯 애니메이션 시작
    startFlickering(); // 레버 깜빡임 시작
};

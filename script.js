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
            const imageHeightInSlot = imgHeight / 9; // 각 이미지 높이
            const centerPosition = (reelHeight - imageHeightInSlot) / 2; // 중앙 위치
            
            reel.style.top = `-${(randomImageIndex * imageHeightInSlot) - centerPosition}px`;
        }, index * 500); // 각 슬롯마다 0.5초 시간차를 두고 멈추기
    });

    // 알림창 표시를 2초 후로 설정
    setTimeout(() => {
        showAlert(randomImageIndex); // 2초 후 알림 창 표시
    }, 2500); // 2000ms = 2초
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
            'https://webzinefinders.imweb.me/#s202410207dcae16781c0c',
            'https://webzinefinders.imweb.me/#s20241021cac297ba6d10f ',
            'https://webzinefinders.imweb.me/#s202410211f6b33005203b',
            'https://webzinefinders.imweb.me/#s20241003a372dd44acd70',
            'https://webzinefinders.imweb.me/#s2024102098648c2b37d35',
            'https://webzinefinders.imweb.me/#s202410202f8784893bd24',
            'https://webzinefinders.imweb.me/#s202410206e9c5f0011ba5',
            'https://webzinefinders.imweb.me/#s20241003a372dd44acd70'
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
        "영도에서 취향을 가꾸는 씨씨윗북의 이야기를 들어보세요", // 0
        "영도에서 함께하는 라보드목선의 이야기를 들어보세요", // 1
        "영도에서 함께하는 신기산업의 이야기를 들어보세요", // 2
        "영도에서 일하는 출근러 PAFI의 이야기를 들어보세요", // 3
        "영도에서 취향을 가꾸는 빌라드보나흐의 이야기를 들어보세요", // 4
        "영도에 사람들을 모으는 비결, 피아크의 이야기를 들어보세요", // 5
        "영도에서 함께하는 영도희망21의 이야기를 들어보세요", // 6
        "영도로 출근하는 PAFI의 이야기를 들어보세요" // 7
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

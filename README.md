# Git 기본 명령어 요약

| 구분 | 명령어 | 설명 |
|------|---------|------|
| **설정** | `git config --global user.name "이름"` | 전역 사용자 이름 설정 |
|  | `git config --global user.email "이메일"` | 전역 사용자 이메일 설정 |
| **저장소 초기화** | `git init` | 새로운 저장소 생성 |
|  | `git clone <URL>` | 원격 저장소 복제 |
| **변경사항 추적** | `git status` | 상태 확인 |
|  | `git add .` | 모든 변경 스테이징 |
|  | `git commit -m "메시지"` | 커밋 생성 |
| **브랜치** | `git branch` | 브랜치 목록 |
|  | `git checkout -b <브랜치명>` | 새 브랜치 생성 및 이동 |
|  | `git merge <브랜치명>` | 브랜치 병합 |
| **원격 저장소** | `git remote add origin <URL>` | 원격 저장소 연결 |
|  | `git push -u origin <브랜치>` | 첫 푸시 |
|  | `git pull` | 원격 변경사항 가져오기 |
| **이력 확인** | `git log --oneline` | 간단한 커밋 로그 보기 |
| **복구 및 취소** | `git restore <파일>` | 변경 취소 |
|  | `git reset --hard <커밋ID>` | 특정 커밋으로 되돌리기 |

---

✅ **Tip:**  
- `git status` 로 항상 현재 상태를 확인하세요.  
- `git log --oneline --graph` 으로 브랜치 흐름을 쉽게 볼 수 있습니다.

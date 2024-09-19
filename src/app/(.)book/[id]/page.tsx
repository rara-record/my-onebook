import BookPage from '@/app/book/[id]/page';
import { Modal } from '@/components/ui/modal';

// 현재 레이아웃 내에서 애플리케이션의 다른 부분의 라우트를 로드할 수 있습니다.
// 하지만, 공유 가능한 URL을 클릭하거나 페이지를 새로 고침하여 사진으로 이동하는 경우에는 전체 사진 페이지가 모달 대신 렌더링되어야 합니다.
// 이때는 라우트 가로채기가 발생하지 않습니다.

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Modal>
      <BookPage params={params} />
    </Modal>
  );
}

// 인터셉팅 라우트 페이지 만들기
// 가로채는지 확인하기
// createpotal로 모달만들기
// root에 모달을 렌더링하기
// 뒤로가기 구현하기
// 스타일 구현하기
// 마지막 테스트

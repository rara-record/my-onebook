'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export const Modal = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // ref로 dialog를 참조
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  // useEffect로 dialog가 열리면 스크롤을 맨 위로 올리기
  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({
        top: 0,
      });
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      onClose={onDismiss}
      onClick={(e: React.MouseEvent<HTMLDialogElement>) => {
        // 모달의 배경이 클릭되었다면 -> 뒤로가기
        if ((e.target as any).nodeName === 'DIALOG') {
          router.back();
        }
      }}
      className="w-[80%] max-w-[600px] mt-5 rounded-[5px] border-none backdrop:bg-[rgba(0,0,0,0.7)]"
    >
      {children}
    </dialog>,
    document.getElementById('modal-root') as HTMLElement
  );
};

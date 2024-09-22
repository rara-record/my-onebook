'use server';

import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs/promises';
import { getPlaiceholder } from 'plaiceholder';

/**
 * 원격 이미지 URL을 Base64로 변환하는 함수
 *
 * @param imageUrl 원격 이미지의 URL
 * @returns Base64로 인코딩된 이미지 문자열 또는 에러 발생 시 null
 *
 * 이 함수는 다음과 같은 특징을 가집니다:
 * 1. 원격 이미지를 가져와 Base64로 변환합니다.
 * 2. Next.js의 캐싱 기능을 활용하여 성능을 최적화합니다.
 * 3. 서버 사이드에서 실행되어야 합니다.
 */

export const getRemoteImageBase64 = async (imageUrl: string) => {
  try {
    const res = await fetch(imageUrl, { cache: 'force-cache' });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch image: ${res.status} ${res.statusText}`
      );
    }

    const originalBuffer = Buffer.from(await res.arrayBuffer());
    const resizedBuffer = await sharp(originalBuffer)
      .resize(20)
      .toBuffer();

    const { base64 } = await getPlaiceholder(
      Buffer.from(resizedBuffer)
    );

    return base64;
  } catch (e) {
    if (e instanceof Error) console.error(e.stack);
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsa2yqBwAFCAICLICSyQAAAABJRU5ErkJggg==';
  }
};

/**
 * 로컬(public 폴더) 이미지를 Base64로 변환하는 함수
 *
 * @param imgPath public 폴더 내의 이미지 경로
 * @returns Base64로 인코딩된 이미지 문자열 또는 에러 메시지
 *
 * 1. public 폴더 내의 로컬 이미지 파일을 읽어 Base64로 변환합니다.
 * 2. 파일 시스템에 직접 접근하므로 서버 사이드에서만 실행 가능합니다.
 */
export const getLocalImageBase64 = async (imgPath: string) => {
  try {
    // filepath는 이미지 컴포넌트(/ = public/)에서 정확히 사용되는 파일 주소입니다
    const realFilepath = path.join(process.cwd(), 'public', imgPath);

    const file = await fs.readFile(realFilepath);

    const resizedBuffer = await sharp(file).resize(20).toBuffer();

    const { base64 } = await getPlaiceholder(
      Buffer.from(resizedBuffer)
    );

    return base64;
  } catch (e) {
    if (e instanceof Error) console.error(e.stack);
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsa2yqBwAFCAICLICSyQAAAABJRU5ErkJggg==';
  }
};

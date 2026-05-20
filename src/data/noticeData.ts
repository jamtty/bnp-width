export interface NoticeItem {
  no: number;
  detailId: number;
  title: string;
  date: string;
  views: number;
  content?: string;
  attachment?: { name: string; url: string };
}

export const noticeList: NoticeItem[] = [
  { no: 79, detailId: 93, title: '2026년 6월 20일 토 TCI (기질 및 성격검사) 구매자격 워크숍', date: '2026-04-18', views: 25 },
  { no: 78, detailId: 92, title: '[4월 대면/5월 온라인] 26년 상반기 공개사례발표회 발표/참관 모집', date: '2026-04-16', views: 14 },
  { no: 77, detailId: 91, title: '[공지] 26년 상반기 4,5월 공개사례발표회 일정이 변경되었습니다.', date: '2026-04-04', views: 14 },
  { no: 76, detailId: 90, title: '2026년 상반기 수용전념치료 4주 특강 [4월23일~5월14일]', date: '2026-04-04', views: 17, content: `<p>안녕하세요 위드원상담코칭센터 입니다.</p><p>&nbsp;</p><p>지난 사례개념화 이론 기초/심화 과정이 성공적으로 끝나고 좋은 평이 많았습니다.&nbsp;</p><p>&nbsp;</p><p>4주 특강을 개설하였습니다. 많은 관심 부탁드립니다 ^___^</p><p>&nbsp;</p><p><img src="/upload/editor/20260404160837.png" title="2026?%20?%20??????%20??%20??.png"><br style="clear:both;">&nbsp;</p><p>&nbsp;</p><p>【수용전념치료 특강】&nbsp;</p><p>▷기간: 4월 23일부터 매주 목요일&nbsp;</p><p>▷시간: 오후 6시 30분~9시30분 (3시간씩)</p><p>▷수강료: 32만원 (수련생10% 할인시 288천원)</p><p>신청폼 ▶ <a href="https://forms.gle/RJvVYfYArXMRmXDAA">https://forms.gle/RJvVYfYArXMRmXDAA</a></p><p>&nbsp;</p><div><br></div>` },
  { no: 75, detailId: 89, title: '2026년 4월 TCI (기질 및 성격검사) 구매자격 워크숍', date: '2026-03-30', views: 9 },
  { no: 74, detailId: 88, title: '26년 상반기 MMPI 강의(3월 21일·28일) 진행 취소 안내', date: '2026-03-06', views: 20 },
  { no: 73, detailId: 87, title: '2026년 연간 교육 프로그램 안내', date: '2026-02-20', views: 57 },
  { no: 72, detailId: 86, title: '2026년 상반기 무료 심리상담 (선착순모)', date: '2026-02-14', views: 38 },
  { no: 71, detailId: 85, title: 'll위드원상담코칭센터ll 이유경 교수님의 사례개념화 기초심화 온라인 특강', date: '2026-01-08', views: 42 },
  { no: 70, detailId: 84, title: '2026년 1월 대상관계 집단상담 신촌오프라인', date: '2025-12-29', views: 39 },
];

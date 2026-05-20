export interface DataItem {
  id: number;
  category: string;
  title: string;
  date: string;
  fileExt?: string;
  content?: string;
  attachment?: { name: string; url: string };
}

export const dataList: DataItem[] = [
  { id: 10, category: '교육자료', title: '2024년 EAP 스트레스 관리 워크북', date: '2024.09.05', fileExt: 'PDF' },
  { id: 9, category: '연구자료', title: '기독교 상담의 이론과 실제 (요약)', date: '2024.08.18', fileExt: 'PDF' },
  { id: 8, category: '교육자료', title: '집단상담 운영 가이드', date: '2024.07.20', fileExt: 'PDF' },
  { id: 7, category: '양식', title: '상담 신청서 양식', date: '2024.07.01', fileExt: 'HWP' },
  { id: 6, category: '연구자료', title: '게슈탈트 상담 기법 소개 자료', date: '2024.06.10', fileExt: 'PDF' },
  { id: 5, category: '교육자료', title: '인지행동치료(CBT) 워크시트 모음', date: '2024.05.22', fileExt: 'PDF' },
  { id: 4, category: '양식', title: '슈퍼비전 사례 보고서 양식', date: '2024.04.15', fileExt: 'HWP' },
  { id: 3, category: '연구자료', title: '직장인 심리건강 설문 결과 보고서', date: '2024.03.30', fileExt: 'PDF' },
  { id: 2, category: '교육자료', title: '리더십 코칭 프로그램 안내서', date: '2024.02.14', fileExt: 'PDF' },
  { id: 1, category: '양식', title: '개인정보 수집 및 이용 동의서', date: '2024.01.05', fileExt: 'PDF' },
];

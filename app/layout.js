import './globals.css';

export const metadata = {
  title: 'KS에너지 대구지사',
  description: '노는 공장 지붕과 부지, 확실한 태양광 연금으로 바꿉니다',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
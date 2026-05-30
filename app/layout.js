import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: 'KS에너지 대구지사',
  description: '노는 공장 지붕과 부지, 확실한 태양광 연금으로 바꿉니다',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        {/* 1. 구글 애널리틱스 (GA4) 추적 코드 - 필요 시 사용 가능하도록 기본 세팅 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TRACKING_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TRACKING_ID');
          `}
        </Script>

        {/* 2. 메타 픽셀 (Meta Pixel) 추적 코드 - 사장님 전용 번호 반영 완료 */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '829737423065481');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
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
        {/* ==========================================
            1. 구글 애널리틱스 (GA4) 추적 코드
           ========================================== */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TRACKING_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-C3Z8C9K1KQ');
          `}
        </Script>

        {/* ==========================================
            2. 메타 픽셀 (Meta Pixel) 추적 코드
           ========================================== */}
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
            fbq('init', '829737423065481'); // 사장님 메타 픽셀 ID 확인 및 고정 완료!
            fbq('track', 'PageView');
          `}
        </Script>

        {/* ==========================================
            3. 당근 픽셀 (Karrot Pixel) 추적 코드
           ========================================== */}
        <Script
          src="https://karrot-pixel.business.daangn.com/karrot-pixel.js"
          strategy="afterInteractive"
          // 당근 기본 자바스크립트 엔진 파일을 외부에서 먼저 안전하게 땡겨옵니다.
        />
        <Script id="daangn-pixel" strategy="afterInteractive">
          {`
            window.karrotPixel = window.karrotPixel || [];
            window.karrotPixel.init('1780232417800177001'); // 오늘 발급받으신 당근 고유 ID 매칭!
            window.karrotPixel.track('ViewPage');
          `}
        </Script>
      </head>
      <body>
        {/* 메타 픽셀 noscript 추적용 백업 링크 (넣어두면 브라우저 환경 차단 대비 가능해서 추가했습니다) */}
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=829737423065481&ev=PageView&noscript=1"
          />
        </noscript>

        {children}
      </body>
    </html>
  );
}
import { lazy, Suspense } from "react";
const MultiSiteInsight = lazy(() => import('../components/insights/MultiSIteInsights'));
import { Spin } from "antd";

const InsightsPage = () => {
  return (
    <div className="min-h-screen insight-page-wrapper">
      <div className="container">
        <div className="site-title">
          <h1>
            Insights
          </h1>
        </div>
        <div className="multisite-insight-wrapper mt-4">
          <Suspense fallback={<Spin fullscreen />}>
            <MultiSiteInsight />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default InsightsPage;
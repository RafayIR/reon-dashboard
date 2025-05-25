import MultiSiteInsight from "../components/insights/MultiSIteInsights";

const InsightsPage = () => {

  return (
    <div className="insight-page-wrapper">
      <div className="container">
        <div className="site-title">
          <h1>
            Insights
          </h1>
        </div>
        <div className="multisite-insight-wrapper">
          <MultiSiteInsight />
        </div>
      </div>
    </div>
  )
}

export default InsightsPage;
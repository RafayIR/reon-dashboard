import MultiSiteInsight from "../components/insights/MultiSIteInsights";

const InsightsPage = () => {

  return (
    <>
      <div className="site-title">
        <h1>
          Insights
        </h1>
      </div>
      <div className="multisite-insight-wrapper">
        <MultiSiteInsight />
      </div>
    </>
  )
}

export default InsightsPage;
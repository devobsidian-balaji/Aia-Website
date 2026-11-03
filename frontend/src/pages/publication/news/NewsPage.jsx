import React from 'react'
import SplitFeatureCard from '../../../components/learn-more/SplitFeatureCard'
import NewsCardGrid from '../../../components/publication/news/NewsCardGrid'
import { resourcesData } from '../../../data/resourcesData'

const NewsPage = () => {
  return (
     <main className="min-h-screen bg-white font-sans">
              <SplitFeatureCard
                    eyebrow=""
                    title="News"
                    description=""
                    image="/national-party.png"
                    imageAlt="Smart manufacturing and industrial automation"
                    imagePosition="right"
                    background="dark"
                  />
                  <NewsCardGrid items={resourcesData} columns={4} />
                  </main>
  )
}

export default NewsPage
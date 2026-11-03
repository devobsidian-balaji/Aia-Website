import React from 'react'
import SplitFeatureCard from '../../components/learn-more/SplitFeatureCard'

import { resourcesData } from '../../data/resourcesData'
import ArticleCardGrid from '../../components/publication/ArticleCardGrid'

const ArticlesPage = () => {
  return (
     <main className="min-h-screen bg-white font-sans">
          {/* HERO */}
          <SplitFeatureCard
            eyebrow=""
            title="All Articles"
            description=""
            image="/articles/articles-hero-img.png"
            imageAlt="Smart manufacturing and industrial automation"
            imagePosition="right"
            background="dark"
          />
          <ArticleCardGrid items={resourcesData} columns={4} />
          </main>

  )
}

export default ArticlesPage

import { Article } from "../models/Article.js";
import { News } from "../models/News.js";
import { Event } from "../models/Event.js";
import Member from "../models/Member.js";
import { Publication } from "../models/Publication.js";

const escapeRegex = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const makeSearchConditions = (fields, regex) => ({
  $or: fields.map((field) => ({ [field]: regex })),
});

const articleFields = [
  "title",
  "category",
  "author",
  "introductionTitle",
  "introduction",
  "introductionParagraphs",
  "detailHeroTitle",
  "detailHeroDescription",
  "detailTitle",
  "detailSubtitle",
  "closingTitle",
  "closingParagraphs",
  "closingBullets",
  "contentBlocks.text",
  "contentBlocks.items",
  "sections",
];

const newsFields = [
  ...articleFields,
];

const eventFields = [
  "title",
  "description",
  "category",
  "date",
  "detailPage.hero.eyebrow",
  "detailPage.hero.title",
  "detailPage.hero.subtitle",
  "detailPage.hero.description",
  "detailPage.introduction.eyebrow",
  "detailPage.introduction.title",
  "detailPage.introduction.description",
  "detailPage.introduction.blocks",
  "detailPage.introduction.sections",
  "detailPage.introduction.eventInfo.title",
  "detailPage.introduction.eventInfo.venue",
  "detailPage.introduction.eventInfo.location",
  "detailPage.agenda.eyebrow",
  "detailPage.agenda.title",
  "detailPage.agenda.description",
  "detailPage.agenda.items.time",
  "detailPage.agenda.items.title",
  "detailPage.agenda.items.description",
  "detailPage.contentSections",
];

const memberFields = [
  "name",
  "shortName",
  "category",
  "about",
  "mission",
  "vision",
  "qualityPolicy",
  "qualityObjectives",
  "commitment",
  "services.title",
  "services.description",
  "familyMember.name",
  "familyMember.designation",
  "familyMember.organization",
];

const publicationFields = [
  "title",
  "description",
  "category",
  "author",
  "date",
];

const makeResult = ({
  item,
  type,
  title,
  description,
  category,
  url,
  date,
  image,
}) => ({
  id: item._id,
  type,
  title: title || "",
  description: description || "",
  category: category || "",
  url,
  date: date || "",
  image: image || "",
});

export const globalSearch = async (req, res) => {
  try {
    const query = String(req.query.q || "").trim();

    if (!query) {
      return res.status(200).json({
        success: true,
        query: "",
        total: 0,
        results: [],
      });
    }

    if (query.length < 2) {
      return res.status(200).json({
        success: true,
        query,
        total: 0,
        results: [],
        message: "Please enter at least 2 characters.",
      });
    }

    const safeQuery = escapeRegex(query);
    const regex = new RegExp(safeQuery, "i");

    const [articles, news, events, members, publications] =
      await Promise.all([
        Article.find({
          isActive: true,
          ...makeSearchConditions(articleFields, regex),
        })
          .select(
            "title slug category author introductionParagraphs introduction detailHeroDescription image detailHeroImage publishedAt createdAt"
          )
          .limit(30)
          .lean(),

        News.find({
          isActive: true,
          ...makeSearchConditions(newsFields, regex),
        })
          .select(
            "title slug category author introductionParagraphs introduction detailHeroDescription image detailHeroImage publishedAt createdAt"
          )
          .limit(30)
          .lean(),

        Event.find({
          isActive: true,
          ...makeSearchConditions(eventFields, regex),
        })
          .select(
            "title slug description category date imageUrl detailPage.hero.imageUrl createdAt"
          )
          .limit(30)
          .lean(),

        Member.find({
          isActive: true,
          ...makeSearchConditions(memberFields, regex),
        })
          .select("name shortName slug category about logo createdAt")
          .limit(30)
          .lean(),

        Publication.find({
          isActive: true,
          ...makeSearchConditions(publicationFields, regex),
        })
          .select("title description category author date images link createdAt")
          .limit(30)
          .lean(),
      ]);

    const results = [
      ...articles.map((item) =>
        makeResult({
          item,
          type: "Article",
          title: item.title,
          description:
            item.detailHeroDescription ||
            item.introductionParagraphs?.[0] ||
            item.introduction ||
            "",
          category: item.category,
          url: `/publication/articles/${item.slug}`,
          date: item.publishedAt || item.createdAt,
          image: item.detailHeroImage || item.image,
        })
      ),

      ...news.map((item) =>
        makeResult({
          item,
          type: "News",
          title: item.title,
          description:
            item.detailHeroDescription ||
            item.introductionParagraphs?.[0] ||
            item.introduction ||
            "",
          category: item.category,
          url: `/publication/news/${item.slug}`,
          date: item.publishedAt || item.createdAt,
          image: item.detailHeroImage || item.image,
        })
      ),

      ...events.map((item) =>
        makeResult({
          item,
          type: "Event",
          title: item.title,
          description: item.description,
          category: item.category,
          url: `/events/${item.slug}`,
          date: item.date || item.createdAt,
          image:
            item.detailPage?.hero?.imageUrl ||
            item.imageUrl ||
            "",
        })
      ),

      ...members.map((item) =>
        makeResult({
          item,
          type: "Member",
          title: item.name,
          description: item.about,
          category: item.category,
          url: item.slug
            ? `/membership/member-directory/${item.slug}`
            : "/membership/member-directory",
          date: item.createdAt,
          image: item.logo?.url || "",
        })
      ),

      ...publications.map((item) =>
        makeResult({
          item,
          type: "Publication",
          title: item.title,
          description: item.description,
          category: item.category,
          url: item.link || "/publication/articles",
          date: item.date || item.createdAt,
          image: item.images?.[0] || "",
        })
      ),
    ];

    results.sort((a, b) => {
      const dateA = new Date(a.date).getTime() || 0;
      const dateB = new Date(b.date).getTime() || 0;
      return dateB - dateA;
    });

    const finalResults = results.slice(0, 100);

    return res.status(200).json({
      success: true,
      query,
      total: finalResults.length,
      results: finalResults,
    });
  } catch (error) {
    console.error("[Global Search Error]:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while searching.",
    });
  }
};

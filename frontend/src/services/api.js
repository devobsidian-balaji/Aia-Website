// import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 25000,
// });

// // Automatic fallback interceptor for local development
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response &&
//       [404, 502, 503].includes(error.response.status) &&
//       !originalRequest._retryLocal &&
//       typeof window !== 'undefined' &&
//       (window.location.hostname === 'localhost' ||
//         window.location.hostname === '127.0.0.1')
//     ) {
//       originalRequest._retryLocal = true;
//       originalRequest.baseURL = 'http://localhost:5000/api';

//       try {
//         return await axios(originalRequest);
//       } catch (retryErr) {
//         return Promise.reject(retryErr);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// // =======================
// // BANNER APIS
// // =======================

// export const getBanners = async () => {
//   try {
//     const res = await api.get('/banners');
//     return res.data.data || [];
//   } catch (err) {
//     console.warn('Fallback banners:', err.message);

//     return [
//       {
//         _id: 'default-1',
//         name: 'Hero Smart Manufacturing Engineer',
//         imageUrl: '/hero-engineer.png',
//         isActive: true,
//       },
//     ];
//   }
// };

// export const createBanner = async (data) => {
//   const res = await api.post('/banners', data);
//   return res.data.data || res.data;
// };

// export const updateBanner = async (id, data) => {
//   const res = await api.put(`/banners/${id}`, data);
//   return res.data.data || res.data;
// };

// export const deleteBanner = async (id) => {
//   const res = await api.delete(`/banners/${id}`);
//   return res.data;
// };

// // =======================
// // SERVICE APIS
// // =======================

// export const getServices = async () => {
//   try {
//     const res = await api.get('/services');
//     return res.data.data || [];
//   } catch (err) {
//     console.warn('Fallback services:', err.message);
//     return [];
//   }
// };

// export const createService = async (serviceData) => {
//   const res = await api.post('/services', serviceData);
//   return res.data.data || res.data;
// };

// export const updateService = async (id, serviceData) => {
//   const res = await api.put(`/services/${id}`, serviceData);
//   return res.data.data || res.data;
// };

// export const deleteService = async (id) => {
//   const res = await api.delete(`/services/${id}`);
//   return res.data;
// };

// // =======================
// // ABOUT CONTENT APIS
// // =======================

// export const getAboutContents = async () => {
//   try {
//     const res = await api.get('/about');
//     return res.data.data || [];
//   } catch (err) {
//     console.warn('Fallback about content:', err.message);
//     return [];
//   }
// };

// export const createAboutContent = async (data) => {
//   const res = await api.post('/about', data);
//   return res.data.data || res.data;
// };

// export const updateAboutContent = async (id, data) => {
//   const res = await api.put(`/about/${id}`, data);
//   return res.data.data || res.data;
// };

// export const deleteAboutContent = async (id) => {
//   const res = await api.delete(`/about/${id}`);
//   return res.data;
// };

// // =======================
// // ROADMAP APIS
// // =======================

// export const getRoadmapItems = async () => {
//   try {
//     const res = await api.get('/roadmap');
//     return res.data.data || [];
//   } catch (err) {
//     console.warn('Fallback roadmap:', err.message);
//     return [];
//   }
// };

// export const createRoadmapItem = async (data) => {
//   const res = await api.post('/roadmap', data);
//   return res.data.data || res.data;
// };

// export const updateRoadmapItem = async (id, data) => {
//   const res = await api.put(`/roadmap/${id}`, data);
//   return res.data.data || res.data;
// };

// export const deleteRoadmapItem = async (id) => {
//   const res = await api.delete(`/roadmap/${id}`);
//   return res.data;
// };

// // =======================
// // COUNCIL EXECUTIVE APIS
// // =======================

// export const getCouncilMembers = async () => {
//   try {
//     const res = await api.get('/council');
//     return res.data.data || [];
//   } catch (err) {
//     console.warn('Fallback council:', err.message);
//     return [];
//   }
// };

// export const createCouncilMember = async (data) => {
//   const res = await api.post('/council', data);
//   return res.data.data || res.data;
// };

// export const updateCouncilMember = async (id, data) => {
//   const res = await api.put(`/council/${id}`, data);
//   return res.data.data || res.data;
// };

// export const deleteCouncilMember = async (id) => {
//   const res = await api.delete(`/council/${id}`);
//   return res.data;
// };

// // =======================
// // PAST PRESIDENTS APIS
// // =======================

// export const getPastPresidents = async () => {
//   try {
//     const res = await api.get('/past-presidents');
//     return res.data.data || [];
//   } catch (err) {
//     console.warn('Fallback past presidents:', err.message);
//     return [];
//   }
// };

// export const createPastPresident = async (data) => {
//   const res = await api.post('/past-presidents', data);
//   return res.data.data || res.data;
// };

// export const updatePastPresident = async (id, data) => {
//   const res = await api.put(`/past-presidents/${id}`, data);
//   return res.data.data || res.data;
// };

// export const deletePastPresident = async (id) => {
//   const res = await api.delete(`/past-presidents/${id}`);
//   return res.data;
// };

// // =======================
// // EVENTS APIS
// // =======================

// // Public website — active events only
// export const getEvents = async () => {
//   const res = await api.get('/events');
//   return res.data.data || [];
// };

// // Admin CMS — includes hidden events
// export const getAdminEvents = async () => {
//   const res = await api.get('/events/admin');
//   return res.data.data || [];
// };

// // Public event detail
// export const getEventBySlug = async (slug) => {
//   const res = await api.get(
//     `/events/slug/${encodeURIComponent(slug)}`
//   );

//   return res.data.data || null;
// };

// // Create event — multipart FormData
// export const createEvent = async (data) => {
//   const res = await api.post('/events', data);
//   return res.data.data || res.data;
// };

// // Update event — multipart FormData or JSON
// export const updateEvent = async (id, data) => {
//   const res = await api.put(`/events/${id}`, data);
//   return res.data.data || res.data;
// };

// // Delete event
// export const deleteEvent = async (id) => {
//   const res = await api.delete(`/events/${id}`);
//   return res.data;
// };

// // =======================
// // INITIATIVES APIS
// // =======================

// export const getInitiatives = async () => {
//   try {
//     const res = await api.get('/initiatives');
//     return res.data.data || [];
//   } catch (err) {
//     console.warn('Fallback initiatives:', err.message);
//     return [];
//   }
// };

// export const createInitiative = async (data) => {
//   const res = await api.post('/initiatives', data);
//   return res.data.data || res.data;
// };

// export const updateInitiative = async (id, data) => {
//   const res = await api.put(`/initiatives/${id}`, data);
//   return res.data.data || res.data;
// };

// export const deleteInitiative = async (id) => {
//   const res = await api.delete(`/initiatives/${id}`);
//   return res.data;
// };

// // =======================
// // PILLAR FOOTPRINTS APIS
// // CAMPUS CONNECT
// // =======================

// export const getPillarFootprints = async () => {
//   try {
//     const res = await api.get('/pillar-footprints');
//     return res.data.data || [];
//   } catch (err) {
//     console.warn('Fallback pillar footprints:', err.message);

//     return [
//       {
//         _id: 'fp-1',
//         title: 'Knowledge infrastructure',
//         description:
//           'Comprising curriculum, exercises and teaching learning material.',
//         imageUrl: '/Campusconnect/Knowledge Infrastructure.png',
//         brochureUrl: '#',
//         isHighlighted: false,
//       },
//       {
//         _id: 'fp-2',
//         title: 'Physical infrastructure',
//         description:
//           'Comprising custom-fit workstation hardware and modern software toolkits.',
//         imageUrl: '/Campusconnect/Physical Infrastructure.png',
//         brochureUrl: '#',
//         isHighlighted: true,
//       },
//       {
//         _id: 'fp-3',
//         title: 'Management infrastructure',
//         description:
//           'Comprising project management and evaluations for continuous improvement.',
//         imageUrl: '/Campusconnect/Management Infrastructure.png',
//         brochureUrl: '#',
//         isHighlighted: false,
//       },
//     ];
//   }
// };

// export const createPillarFootprint = async (data) => {
//   const res = await api.post('/pillar-footprints', data);
//   return res.data.data || res.data;
// };

// export const updatePillarFootprint = async (id, data) => {
//   const res = await api.put(`/pillar-footprints/${id}`, data);
//   return res.data.data || res.data;
// };

// export const deletePillarFootprint = async (id) => {
//   const res = await api.delete(`/pillar-footprints/${id}`);
//   return res.data;
// };

// // =======================
// // CAMPUS EVENTS APIS
// // CAMPUS CONNECT
// // =======================

// export const getCampusEvents = async () => {
//   try {
//     const res = await api.get('/campus-events');
//     return res.data.data || [];
//   } catch (err) {
//     console.warn('Fallback campus events:', err.message);

//     return [
//       {
//         _id: 'ce-1',
//         title: 'Educating Events',
//         imageUrl: '/Campusconnect/img_banner_header (2).png',
//         link: '#',
//       },
//       {
//         _id: 'ce-2',
//         title: 'Prominent Industry Partners',
//         imageUrl: '/Campusconnect/img_banner_header (3).png',
//         link: '#',
//       },
//       {
//         _id: 'ce-3',
//         title: 'Informative Courses',
//         imageUrl: '/Campusconnect/img_banner_header (4).png',
//         link: '#',
//       },
//     ];
//   }
// };

// export const createCampusEvent = async (data) => {
//   const res = await api.post('/campus-events', data);
//   return res.data.data || res.data;
// };

// export const updateCampusEvent = async (id, data) => {
//   const res = await api.put(`/campus-events/${id}`, data);
//   return res.data.data || res.data;
// };

// export const deleteCampusEvent = async (id) => {
//   const res = await api.delete(`/campus-events/${id}`);
//   return res.data;
// };

// // ==========================================
// // SHARED PUBLICATION FORM DATA HELPER
// // Used by Articles and News only.
// // ==========================================

// const createPublicationFormData = (data) => {
//   const formData = new FormData();

//   const payload = {
//     ...data,
//   };

//   // Card thumbnail
//   if (data.image instanceof File) {
//     formData.append('image', data.image);
//     payload.image = '';
//   }

//   // Detail hero image
//   if (data.detailHeroImage instanceof File) {
//     formData.append('detailHeroImage', data.detailHeroImage);
//     payload.detailHeroImage = '';
//   }

//   // Content block images
//   if (Array.isArray(data.contentBlocks)) {
//     payload.contentBlocks = data.contentBlocks.map((block, index) => {
//       const updatedBlock = { ...block };

//       if (block.image instanceof File) {
//         formData.append(
//           `contentBlockImage_${index}`,
//           block.image
//         );

//         updatedBlock.image = '';
//       }

//       return updatedBlock;
//     });
//   }

//   // Send remaining fields as JSON
//   formData.append('data', JSON.stringify(payload));

//   return formData;
// };

// // =======================
// // PUBLICATION APIS
// // =======================

// export const getPublications = async () => {
//   try {
//     const res = await api.get('/publications');
//     return res.data.data || [];
//   } catch (err) {
//     console.warn('Fallback publications:', err.message);

//     return [
//       {
//         _id: 'pub-1',
//         title: 'A look at thirty years of pharmaceutical automation',
//         description:
//           'A comprehensive retrospective look at three decades of automation advancement, cleanroom integration, SCADA telemetry, and regulatory compliance standards across Indian pharmaceutical processing and batch formulation units.',
//         images: [
//           'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=900&h=700&fit=crop',
//           'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=900&h=700&fit=crop',
//         ],
//         link: 'https://aia-india.org/publications/pharma-thirty-years',
//         category: 'Whitepapers',
//         date: 'Aug 2026',
//         author: 'AIA Pharma Working Group',
//         order: 1,
//         isActive: true,
//       },
//       {
//         _id: 'pub-2',
//         title: 'A seamless blend of process control and automation in steel',
//         description:
//           'How integrated sensor fusion, metallurgical digital twins, and closed-loop process control revolutionized energy efficiency and continuous casting quality in modern smart steel mills and secondary metallurgy plants.',
//         images: [
//           'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=900&h=700&fit=crop',
//           '/publication-banner.jpg',
//         ],
//         link: 'https://aia-india.org/publications/steel-automation',
//         category: 'Process Automation',
//         date: 'Jul 2026',
//         author: 'Steel & Metallurgy Automation Board',
//         order: 2,
//         isActive: true,
//       },
//       {
//         _id: 'pub-3',
//         title: 'Advanced Batch Digester Solution',
//         description:
//           'Scalable automated control frameworks for pressure cooking vessels, optimal liquor circulation, and temperature profile synchronization across modern pulp, paper, and specialty chemical manufacturing installations.',
//         images: [
//           'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=900&h=700&fit=crop',
//           'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&h=700&fit=crop',
//         ],
//         link: 'https://aia-india.org/publications/batch-digester',
//         category: 'Technical Articles',
//         date: 'Jun 2026',
//         author: 'AIA Process Automation Division',
//         order: 3,
//         isActive: true,
//       },
//       {
//         _id: 'pub-4',
//         title:
//           'Andon Solutions - Harnessing Actionable Information for Automotive Manufacturing',
//         description:
//           'Real-time visual shopfloor management, wireless digital andon paging systems, and root-cause downtime triage designed specifically for tier-1 automotive manufacturing plants and robotic weld shops.',
//         images: [
//           'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=900&h=700&fit=crop',
//           '/hero-engineer.png',
//         ],
//         link: 'https://aia-india.org/publications/andon-automotive',
//         category: 'Case Studies',
//         date: 'May 2026',
//         author: 'Automotive Digitalization Committee',
//         order: 4,
//         isActive: true,
//       },
//       {
//         _id: 'pub-5',
//         title: 'Asset Performance and Reliability in Continuous Processing',
//         description:
//           'Predictive vibration diagnostics, motor current signature analysis (MCSA), and automated health monitoring protocols to eliminate unscheduled outages and maximize asset lifespan in heavy industry.',
//         images: [
//           'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=900&h=700&fit=crop',
//           'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=900&h=700&fit=crop',
//         ],
//         link: 'https://aia-india.org/publications/asset-reliability',
//         category: 'Reports',
//         date: 'Apr 2026',
//         author: 'IIT Delhi CEFC & AIA Experts',
//         order: 5,
//         isActive: true,
//       },
//       {
//         _id: 'pub-6',
//         title: 'Auditing is made easy by smart matrix and digital verification',
//         description:
//           'Transitioning from paper logs to tamper-proof automated SCADA telemetry audits, ISA-95 trace matrices, and verifiable carbon/energy accounting systems in Industry 4.0 environments.',
//         images: [
//           'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&h=700&fit=crop',
//           'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&h=700&fit=crop',
//         ],
//         link: 'https://aia-india.org/publications/smart-matrix-auditing',
//         category: 'Research',
//         date: 'Mar 2026',
//         author: 'Cyber-Physical Systems Guild',
//         order: 6,
//         isActive: true,
//       },
//     ];
//   }
// };

// export const getPublicationById = async (id) => {
//   const res = await api.get(`/publications/${id}`);
//   return res.data.data || res.data;
// };

// export const createPublication = async (data) => {
//   const res = await api.post('/publications', data);
//   return res.data.data || res.data;
// };

// export const updatePublication = async (id, data) => {
//   const res = await api.put(`/publications/${id}`, data);
//   return res.data.data || res.data;
// };

// export const deletePublication = async (id) => {
//   const res = await api.delete(`/publications/${id}`);
//   return res.data;
// };

// // =======================
// // STATS API
// // =======================

// export const getStats = async () => {
//   try {
//     const res = await api.get('/stats');
//     return res.data.data;
//   } catch (err) {
//     return {
//       banners: 1,
//       services: 3,
//       about: 3,
//       roadmap: 3,
//       events: 2,
//       initiatives: 3,
//       footprints: 3,
//       campusEvents: 3,
//       publications: 6,
//     };
//   }
// };

// // ==========================================
// // ARTICLES & NEWS APIS
// // ==========================================

// // =======================
// // ARTICLES
// // =======================

// export const getArticles = async (admin = false) => {
//   const res = await api.get('/articles', {
//     params: admin ? { admin: 'true' } : {},
//   });

//   return res.data.data || [];
// };

// export const getArticleBySlug = async (slug) => {
//   const res = await api.get(
//     `/articles/slug/${encodeURIComponent(slug)}`
//   );

//   return res.data.data || null;
// };

// export const createArticle = async (data) => {
//   const formData = createPublicationFormData(data);

//   const res = await api.post('/articles', formData);

//   return res.data.data || res.data;
// };

// export const updateArticle = async (id, data) => {
//   const formData = createPublicationFormData(data);

//   const res = await api.put(`/articles/${id}`, formData);

//   return res.data.data || res.data;
// };

// export const deleteArticle = async (id) => {
//   const res = await api.delete(`/articles/${id}`);
//   return res.data;
// };

// // =======================
// // NEWS
// // =======================

// export const getNews = async (admin = false) => {
//   const res = await api.get('/news', {
//     params: admin ? { admin: 'true' } : {},
//   });

//   return res.data.data || [];
// };

// export const getNewsBySlug = async (slug) => {
//   const res = await api.get(
//     `/news/slug/${encodeURIComponent(slug)}`
//   );

//   return res.data.data || null;
// };

// export const createNews = async (data) => {
//   const formData = createPublicationFormData(data);

//   const res = await api.post('/news', formData);

//   return res.data.data || res.data;
// };

// export const updateNews = async (id, data) => {
//   const formData = createPublicationFormData(data);

//   const res = await api.put(`/news/${id}`, formData);

//   return res.data.data || res.data;
// };

// export const deleteNews = async (id) => {
//   const res = await api.delete(`/news/${id}`);
//   return res.data;
// };



import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 25000,
});

// ==========================================
// AUTH REQUEST INTERCEPTOR
// Attach admin JWT to API requests
// ==========================================

api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('aia_admin_token');

      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ==========================================
// AUTOMATIC FALLBACK INTERCEPTOR
// Local development
// ==========================================

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      [404, 502, 503].includes(error.response.status) &&
      originalRequest &&
      !originalRequest._retryLocal &&
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1')
    ) {
      originalRequest._retryLocal = true;
      originalRequest.baseURL = 'http://localhost:5000/api';

      try {
        return await axios(originalRequest);
      } catch (retryErr) {
        return Promise.reject(retryErr);
      }
    }

    return Promise.reject(error);
  }
);

// =======================
// BANNER APIS
// =======================

export const getBanners = async () => {
  try {
    const res = await api.get('/banners');
    return res.data.data || [];
  } catch (err) {
    console.warn('Fallback banners:', err.message);

    return [
      {
        _id: 'default-1',
        name: 'Hero Smart Manufacturing Engineer',
        imageUrl: '/hero-engineer.png',
        isActive: true,
      },
    ];
  }
};

export const createBanner = async (data) => {
  const res = await api.post('/banners', data);
  return res.data.data || res.data;
};

export const updateBanner = async (id, data) => {
  const res = await api.put(`/banners/${id}`, data);
  return res.data.data || res.data;
};

export const deleteBanner = async (id) => {
  const res = await api.delete(`/banners/${id}`);
  return res.data;
};

// =======================
// SERVICE APIS
// =======================

export const getServices = async () => {
  try {
    const res = await api.get('/services');
    return res.data.data || [];
  } catch (err) {
    console.warn('Fallback services:', err.message);
    return [];
  }
};

export const createService = async (serviceData) => {
  const res = await api.post('/services', serviceData);
  return res.data.data || res.data;
};

export const updateService = async (id, serviceData) => {
  const res = await api.put(`/services/${id}`, serviceData);
  return res.data.data || res.data;
};

export const deleteService = async (id) => {
  const res = await api.delete(`/services/${id}`);
  return res.data;
};

// =======================
// ABOUT CONTENT APIS
// =======================

export const getAboutContents = async () => {
  try {
    const res = await api.get('/about');
    return res.data.data || [];
  } catch (err) {
    console.warn('Fallback about content:', err.message);
    return [];
  }
};

export const createAboutContent = async (data) => {
  const res = await api.post('/about', data);
  return res.data.data || res.data;
};

export const updateAboutContent = async (id, data) => {
  const res = await api.put(`/about/${id}`, data);
  return res.data.data || res.data;
};

export const deleteAboutContent = async (id) => {
  const res = await api.delete(`/about/${id}`);
  return res.data;
};

// =======================
// ROADMAP APIS
// =======================

export const getRoadmapItems = async () => {
  try {
    const res = await api.get('/roadmap');
    return res.data.data || [];
  } catch (err) {
    console.warn('Fallback roadmap:', err.message);
    return [];
  }
};

export const createRoadmapItem = async (data) => {
  const res = await api.post('/roadmap', data);
  return res.data.data || res.data;
};

export const updateRoadmapItem = async (id, data) => {
  const res = await api.put(`/roadmap/${id}`, data);
  return res.data.data || res.data;
};

export const deleteRoadmapItem = async (id) => {
  const res = await api.delete(`/roadmap/${id}`);
  return res.data;
};

// =======================
// COUNCIL EXECUTIVE APIS
// =======================

export const getCouncilMembers = async () => {
  try {
    const res = await api.get('/council');
    return res.data.data || [];
  } catch (err) {
    console.warn('Fallback council:', err.message);
    return [];
  }
};

export const createCouncilMember = async (data) => {
  const res = await api.post('/council', data);
  return res.data.data || res.data;
};

export const updateCouncilMember = async (id, data) => {
  const res = await api.put(`/council/${id}`, data);
  return res.data.data || res.data;
};

export const deleteCouncilMember = async (id) => {
  const res = await api.delete(`/council/${id}`);
  return res.data;
};

// =======================
// PAST PRESIDENTS APIS
// =======================

// export const getPastPresidents = async () => {
//   try {
//     const res = await api.get('/past-presidents');
//     return res.data.data || [];
//   } catch (err) {
//     console.warn('Fallback past presidents:', err.message);
//     return [];
//   }
// };

// export const createPastPresident = async (data) => {
//   const res = await api.post('/past-presidents', data);
//   return res.data.data || res.data;
// };

// export const updatePastPresident = async (id, data) => {
//   const res = await api.put(`/past-presidents/${id}`, data);
//   return res.data.data || res.data;
// };

// export const deletePastPresident = async (id) => {
//   const res = await api.delete(`/past-presidents/${id}`);
//   return res.data;
// };

export const getPastPresidents = async () => {
  const response = await api.get("/past-presidents");
  return response.data.data || [];
};

export const createPastPresident = async (formData) => {
  const response = await api.post("/past-presidents", formData);
  return response.data;
};

export const updatePastPresident = async (id, formData) => {
  const response = await api.put(
    `/past-presidents/${id}`,
    formData
  );
  return response.data;
};

export const deletePastPresident = async (id) => {
  const response = await api.delete(`/past-presidents/${id}`);
  return response.data;
};

// =======================
// EVENTS APIS
// =======================

// Public website — active events only
export const getEvents = async () => {
  const res = await api.get('/events');
  return res.data.data || [];
};

// Admin CMS — includes hidden events
export const getAdminEvents = async () => {
  const res = await api.get('/events/admin');
  return res.data.data || [];
};

// Public event detail
export const getEventBySlug = async (slug) => {
  const res = await api.get(
    `/events/slug/${encodeURIComponent(slug)}`
  );

  return res.data.data || null;
};

// Create event — multipart FormData
export const createEvent = async (data) => {
  const res = await api.post('/events', data);
  return res.data.data || res.data;
};

// Update event — multipart FormData or JSON
export const updateEvent = async (id, data) => {
  const res = await api.put(`/events/${id}`, data);
  return res.data.data || res.data;
};

// Delete event
export const deleteEvent = async (id) => {
  const res = await api.delete(`/events/${id}`);
  return res.data;
};

// =======================
// INITIATIVES APIS
// =======================

export const getInitiatives = async () => {
  try {
    const res = await api.get('/initiatives');
    return res.data.data || [];
  } catch (err) {
    console.warn('Fallback initiatives:', err.message);
    return [];
  }
};

export const createInitiative = async (data) => {
  const res = await api.post('/initiatives', data);
  return res.data.data || res.data;
};

export const updateInitiative = async (id, data) => {
  const res = await api.put(`/initiatives/${id}`, data);
  return res.data.data || res.data;
};

export const deleteInitiative = async (id) => {
  const res = await api.delete(`/initiatives/${id}`);
  return res.data;
};

// =======================
// PILLAR FOOTPRINTS APIS
// CAMPUS CONNECT
// =======================

export const getPillarFootprints = async () => {
  try {
    const res = await api.get('/pillar-footprints');
    return res.data.data || [];
  } catch (err) {
    console.warn('Fallback pillar footprints:', err.message);

    return [
      {
        _id: 'fp-1',
        title: 'Knowledge infrastructure',
        description:
          'Comprising curriculum, exercises and teaching learning material.',
        imageUrl: '/Campusconnect/Knowledge Infrastructure.png',
        brochureUrl: '#',
        isHighlighted: false,
      },
      {
        _id: 'fp-2',
        title: 'Physical infrastructure',
        description:
          'Comprising custom-fit workstation hardware and modern software toolkits.',
        imageUrl: '/Campusconnect/Physical Infrastructure.png',
        brochureUrl: '#',
        isHighlighted: true,
      },
      {
        _id: 'fp-3',
        title: 'Management infrastructure',
        description:
          'Comprising project management and evaluations for continuous improvement.',
        imageUrl: '/Campusconnect/Management Infrastructure.png',
        brochureUrl: '#',
        isHighlighted: false,
      },
    ];
  }
};

export const createPillarFootprint = async (data) => {
  const res = await api.post('/pillar-footprints', data);
  return res.data.data || res.data;
};

export const updatePillarFootprint = async (id, data) => {
  const res = await api.put(`/pillar-footprints/${id}`, data);
  return res.data.data || res.data;
};

export const deletePillarFootprint = async (id) => {
  const res = await api.delete(`/pillar-footprints/${id}`);
  return res.data;
};

// =======================
// CAMPUS EVENTS APIS
// CAMPUS CONNECT
// =======================

export const getCampusEvents = async () => {
  try {
    const res = await api.get('/campus-events');
    return res.data.data || [];
  } catch (err) {
    console.warn('Fallback campus events:', err.message);

    return [
      {
        _id: 'ce-1',
        title: 'Educating Events',
        imageUrl: '/Campusconnect/img_banner_header (2).png',
        link: '#',
      },
      {
        _id: 'ce-2',
        title: 'Prominent Industry Partners',
        imageUrl: '/Campusconnect/img_banner_header (3).png',
        link: '#',
      },
      {
        _id: 'ce-3',
        title: 'Informative Courses',
        imageUrl: '/Campusconnect/img_banner_header (4).png',
        link: '#',
      },
    ];
  }
};

export const createCampusEvent = async (data) => {
  const res = await api.post('/campus-events', data);
  return res.data.data || res.data;
};

export const updateCampusEvent = async (id, data) => {
  const res = await api.put(`/campus-events/${id}`, data);
  return res.data.data || res.data;
};

export const deleteCampusEvent = async (id) => {
  const res = await api.delete(`/campus-events/${id}`);
  return res.data;
};

// ==========================================
// SHARED PUBLICATION FORM DATA HELPER
// Used by Articles and News only.
// ==========================================

const createPublicationFormData = (data) => {
  const formData = new FormData();

  const payload = {
    ...data,
  };

  // Card thumbnail
  if (data.image instanceof File) {
    formData.append('image', data.image);
    payload.image = '';
  }

  // Detail hero image
  if (data.detailHeroImage instanceof File) {
    formData.append('detailHeroImage', data.detailHeroImage);
    payload.detailHeroImage = '';
  }

  // Content block images
  if (Array.isArray(data.contentBlocks)) {
    payload.contentBlocks = data.contentBlocks.map((block, index) => {
      const updatedBlock = { ...block };

      if (block.image instanceof File) {
        formData.append(
          `contentBlockImage_${index}`,
          block.image
        );

        updatedBlock.image = '';
      }

      return updatedBlock;
    });
  }

  // Send remaining fields as JSON
  formData.append('data', JSON.stringify(payload));

  return formData;
};

// =======================
// PUBLICATION APIS
// =======================

export const getPublications = async () => {
  try {
    const res = await api.get('/publications');
    return res.data.data || [];
  } catch (err) {
    console.warn('Fallback publications:', err.message);

    return [
      {
        _id: 'pub-1',
        title: 'A look at thirty years of pharmaceutical automation',
        description:
          'A comprehensive retrospective look at three decades of automation advancement, cleanroom integration, SCADA telemetry, and regulatory compliance standards across Indian pharmaceutical processing and batch formulation units.',
        images: [
          'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=900&h=700&fit=crop',
          'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=900&h=700&fit=crop',
        ],
        link: 'https://aia-india.org/publications/pharma-thirty-years',
        category: 'Whitepapers',
        date: 'Aug 2026',
        author: 'AIA Pharma Working Group',
        order: 1,
        isActive: true,
      },
      {
        _id: 'pub-2',
        title: 'A seamless blend of process control and automation in steel',
        description:
          'How integrated sensor fusion, metallurgical digital twins, and closed-loop process control revolutionized energy efficiency and continuous casting quality in modern smart steel mills and secondary metallurgy plants.',
        images: [
          'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=900&h=700&fit=crop',
          '/publication-banner.jpg',
        ],
        link: 'https://aia-india.org/publications/steel-automation',
        category: 'Process Automation',
        date: 'Jul 2026',
        author: 'Steel & Metallurgy Automation Board',
        order: 2,
        isActive: true,
      },
      {
        _id: 'pub-3',
        title: 'Advanced Batch Digester Solution',
        description:
          'Scalable automated control frameworks for pressure cooking vessels, optimal liquor circulation, and temperature profile synchronization across modern pulp, paper, and specialty chemical manufacturing installations.',
        images: [
          'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=900&h=700&fit=crop',
          'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&h=700&fit=crop',
        ],
        link: 'https://aia-india.org/publications/batch-digester',
        category: 'Technical Articles',
        date: 'Jun 2026',
        author: 'AIA Process Automation Division',
        order: 3,
        isActive: true,
      },
      {
        _id: 'pub-4',
        title:
          'Andon Solutions - Harnessing Actionable Information for Automotive Manufacturing',
        description:
          'Real-time visual shopfloor management, wireless digital andon paging systems, and root-cause downtime triage designed specifically for tier-1 automotive manufacturing plants and robotic weld shops.',
        images: [
          'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=900&h=700&fit=crop',
          '/hero-engineer.png',
        ],
        link: 'https://aia-india.org/publications/andon-automotive',
        category: 'Case Studies',
        date: 'May 2026',
        author: 'Automotive Digitalization Committee',
        order: 4,
        isActive: true,
      },
      {
        _id: 'pub-5',
        title: 'Asset Performance and Reliability in Continuous Processing',
        description:
          'Predictive vibration diagnostics, motor current signature analysis (MCSA), and automated health monitoring protocols to eliminate unscheduled outages and maximize asset lifespan in heavy industry.',
        images: [
          'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=900&h=700&fit=crop',
          'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=900&h=700&fit=crop',
        ],
        link: 'https://aia-india.org/publications/asset-reliability',
        category: 'Reports',
        date: 'Apr 2026',
        author: 'IIT Delhi CEFC & AIA Experts',
        order: 5,
        isActive: true,
      },
      {
        _id: 'pub-6',
        title: 'Auditing is made easy by smart matrix and digital verification',
        description:
          'Transitioning from paper logs to tamper-proof automated SCADA telemetry audits, ISA-95 trace matrices, and verifiable carbon/energy accounting systems in Industry 4.0 environments.',
        images: [
          'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&h=700&fit=crop',
          'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&h=700&fit=crop',
        ],
        link: 'https://aia-india.org/publications/smart-matrix-auditing',
        category: 'Research',
        date: 'Mar 2026',
        author: 'Cyber-Physical Systems Guild',
        order: 6,
        isActive: true,
      },
    ];
  }
};

export const getPublicationById = async (id) => {
  const res = await api.get(`/publications/${id}`);
  return res.data.data || res.data;
};

export const createPublication = async (data) => {
  const res = await api.post('/publications', data);
  return res.data.data || res.data;
};

export const updatePublication = async (id, data) => {
  const res = await api.put(`/publications/${id}`, data);
  return res.data.data || res.data;
};

export const deletePublication = async (id) => {
  const res = await api.delete(`/publications/${id}`);
  return res.data;
};

// =======================
// STATS API
// =======================

export const getStats = async () => {
  try {
    const res = await api.get('/stats');
    return res.data.data;
  } catch (err) {
    return {
      banners: 1,
      services: 3,
      about: 3,
      roadmap: 3,
      events: 2,
      initiatives: 3,
      footprints: 3,
      campusEvents: 3,
      publications: 6,
    };
  }
};

// ==========================================
// ARTICLES & NEWS APIS
// ==========================================

// =======================
// ARTICLES
// =======================

export const getArticles = async (admin = false) => {
  const res = await api.get('/articles', {
    params: admin ? { admin: 'true' } : {},
  });

  return res.data.data || [];
};

export const getArticleBySlug = async (slug) => {
  const res = await api.get(
    `/articles/slug/${encodeURIComponent(slug)}`
  );

  return res.data.data || null;
};

export const createArticle = async (data) => {
  const formData = createPublicationFormData(data);

  const res = await api.post('/articles', formData);

  return res.data.data || res.data;
};

export const updateArticle = async (id, data) => {
  const formData = createPublicationFormData(data);

  const res = await api.put(`/articles/${id}`, formData);

  return res.data.data || res.data;
};

export const deleteArticle = async (id) => {
  const res = await api.delete(`/articles/${id}`);
  return res.data;
};

// =======================
// NEWS
// =======================

export const getNews = async (admin = false) => {
  const res = await api.get('/news', {
    params: admin ? { admin: 'true' } : {},
  });

  return res.data.data || [];
};

export const getNewsBySlug = async (slug) => {
  const res = await api.get(
    `/news/slug/${encodeURIComponent(slug)}`
  );

  return res.data.data || null;
};

export const createNews = async (data) => {
  const formData = createPublicationFormData(data);

  const res = await api.post('/news', formData);

  return res.data.data || res.data;
};

export const updateNews = async (id, data) => {
  const formData = createPublicationFormData(data);

  const res = await api.put(`/news/${id}`, formData);

  return res.data.data || res.data;
};

export const deleteNews = async (id) => {
  const res = await api.delete(`/news/${id}`);
  return res.data;
};



// whatdoesaia


export const getAdminWhatAia = async () => {
  const { data } = await api.get("/what-aia/admin");
  return data;
};

export const updateWhatAiaSection = async (payload) => {
  const { data } = await api.put("/what-aia", payload);
  return data;
};

export const createWhatAiaCard = async (payload) => {
  const formData = new FormData();

  formData.append("title", payload.title);
  formData.append("description", payload.description);
  formData.append("imageAlt", payload.imageAlt || "");
  formData.append("order", String(payload.order ?? 0));
  formData.append("image", payload.image);

  const { data } = await api.post("/what-aia/cards", formData);

  return data;
};

export const updateWhatAiaCard = async (cardId, payload) => {
  const formData = new FormData();

  if (payload.title !== undefined) {
    formData.append("title", payload.title);
  }

  if (payload.description !== undefined) {
    formData.append("description", payload.description);
  }

  if (payload.imageAlt !== undefined) {
    formData.append("imageAlt", payload.imageAlt);
  }

  if (payload.order !== undefined) {
    formData.append("order", String(payload.order));
  }

  if (payload.isActive !== undefined) {
    formData.append("isActive", String(payload.isActive));
  }

  if (payload.image) {
    formData.append("image", payload.image);
  }

  const { data } = await api.put(
    `/what-aia/cards/${cardId}`,
    formData
  );

  return data;
};

export const deleteWhatAiaCard = async (cardId) => {
  const { data } = await api.delete(
    `/what-aia/cards/${cardId}`
  );

  return data;
};





 
// ==========================================
// MEMBER DIRECTORY CMS APIS
// ==========================================

// ==========================================
// ADMIN - GET ALL MEMBERS
// Includes active and inactive members
// Protected by adminAuth
// ==========================================

export const getAdminMembers = async (params = {}) => {
  const res = await api.get("/members/admin", {
    params,
  });

  return res.data.members || res.data.data || [];
};

// ==========================================
// PUBLIC - GET ACTIVE MEMBERS
// ==========================================

export const getMembers = async () => {
  const res = await api.get("/members", {
    params: {
      status: "active",
    },
  });

  return (
    res.data.members ||
    res.data.data ||
    []
  );
};

// ==========================================
// GET SINGLE MEMBER BY ID
// ==========================================

export const getMemberById = async (id) => {
  const res = await api.get(`/members/${id}`);

  return (
    res.data.member ||
    res.data.data ||
    res.data
  );
};

// ==========================================
// GET MEMBER BY SLUG
// ==========================================

export const getMemberBySlug = async (slug) => {
  const res = await api.get(
    `/members/slug/${encodeURIComponent(slug)}`
  );

  return (
    res.data.member ||
    res.data.data ||
    null
  );
};

// ==========================================
// ADMIN - CREATE MEMBER
// Multipart FormData
// ==========================================

export const createMember = async (formData) => {
  const res = await api.post(
    "/members",
    formData
  );

  return (
    res.data.member ||
    res.data.data ||
    res.data
  );
};

// ==========================================
// ADMIN - UPDATE MEMBER
// Multipart FormData
// ==========================================

export const updateMember = async (id, formData) => {
  const res = await api.put(
    `/members/${id}`,
    formData
  );

  return (
    res.data.member ||
    res.data.data ||
    res.data
  );
};

// ==========================================
// ADMIN - TOGGLE MEMBER STATUS
// Active / Inactive
// ==========================================

export const updateMemberStatus = async (id) => {
  const res = await api.patch(
    `/members/${id}/toggle-status`
  );

  return (
    res.data.member ||
    res.data.data ||
    res.data
  );
};

// ==========================================
// ADMIN - DELETE MEMBER
// ==========================================

export const deleteMember = async (id) => {
  const res = await api.delete(
    `/members/${id}`
  );

  return res.data;
};

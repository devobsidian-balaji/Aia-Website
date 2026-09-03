import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

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
      }
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
export const getPastPresidents = async () => {
  try {
    const res = await api.get('/past-presidents');
    return res.data.data || [];
  } catch (err) {
    console.warn('Fallback past presidents:', err.message);
    return [];
  }
};

export const createPastPresident = async (data) => {
  const res = await api.post('/past-presidents', data);
  return res.data.data || res.data;
};

export const updatePastPresident = async (id, data) => {
  const res = await api.put(`/past-presidents/${id}`, data);
  return res.data.data || res.data;
};

export const deletePastPresident = async (id) => {
  const res = await api.delete(`/past-presidents/${id}`);
  return res.data;
};

// =======================
// EVENT APIS
// =======================
export const getEvents = async () => {
  try {
    const res = await api.get('/events');
    return res.data.data || [];
  } catch (err) {
    console.warn('Fallback events:', err.message);
    return [];
  }
};

export const createEvent = async (data) => {
  const res = await api.post('/events', data);
  return res.data.data || res.data;
};

export const updateEvent = async (id, data) => {
  const res = await api.put(`/events/${id}`, data);
  return res.data.data || res.data;
};

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
// PILLAR FOOTPRINTS APIS (Campus Connect)
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
        description: 'Comprising curriculum, exercises and teaching learning material.',
        imageUrl: '/Campusconnect/Knowledge Infrastructure.png',
        brochureUrl: '#',
        isHighlighted: false,
      },
      {
        _id: 'fp-2',
        title: 'Physical infrastructure',
        description: 'Comprising custom-fit workstation hardware and modern software toolkits.',
        imageUrl: '/Campusconnect/Physical Infrastructure.png',
        brochureUrl: '#',
        isHighlighted: true,
      },
      {
        _id: 'fp-3',
        title: 'Management infrastructure',
        description: 'Comprising project management and evaluations for continuous improvement.',
        imageUrl: '/Campusconnect/Management Infrastructure.png',
        brochureUrl: '#',
        isHighlighted: false,
      }
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
// CAMPUS EVENTS APIS (Campus Connect)
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
      }
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

// =======================
// STATS API
// =======================
export const getStats = async () => {
  try {
    const res = await api.get('/stats');
    return res.data.data;
  } catch (err) {
    return { banners: 1, services: 3, about: 3, roadmap: 3, events: 2, initiatives: 3, footprints: 3, campusEvents: 3 };
  }
};

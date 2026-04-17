import { Profile, SocialLink, Skill, Project, NavItem } from '@/types';

export const PROFILE: Profile = {
  name: 'Наверное Вовчик',
  role: 'Frontend Разработчик',
  location: 'Сочи, Россия',
  email: 'hello@example.com',
  bio: {
    short: 'Создаю современные веб-приложения на React и Next.js',
    full: `Я frontend-разработчик с более чем 3-летним опытом создания сложных веб-приложений. 
    Специализируюсь на React, Next.js и TypeScript. Моя страсть — создавать быстрые, 
    доступные и красивые интерфейсы, которые приносят пользу пользователям.
    
    В свободное время contribyte в open-source проекты и изучаю новые технологии.`,
  },
  experience: '3+ года',
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/Delia264',
    icon: 'github',
  },
  {
    name: 'Telegram',
    url: 'https://t.me/username',
    icon: 'telegram',
  },
  {
    name: 'VK',
    url: 'https://vk.com/callsilence',
    icon: 'vk',
  },
  {
    name: 'Email',
    url: `mailto:${PROFILE.email}`,
    icon: 'email',
  },
];

export const SKILLS: Skill[] = [
  { name: 'Next.js', level: 90, category: 'frontend' },
  { name: 'React', level: 92, category: 'frontend' },
  { name: 'TypeScript', level: 85, category: 'frontend' },
  { name: 'JavaScript', level: 95, category: 'frontend' },
  { name: 'Tailwind CSS', level: 88, category: 'frontend' },
  { name: 'Node.js', level: 70, category: 'backend' },
  { name: 'Git', level: 85, category: 'tools' },
  { name: 'Figma', level: 65, category: 'design' },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'Полнофункциональный интернет-магазин с корзиной, оплатой и админ-панелью',
    fullDescription: `Масштабный проект интернет-магазина с использованием Next.js 14,
    Stripe для платежей и PostgreSQL для хранения данных. Включает каталог товаров,
    корзину, оформление заказов, личный кабинет и админ-панель для управления.`,
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind'],
    liveUrl: 'https://demo-shop.example.com',
    codeUrl: 'https://github.com/username/ecommerce',
    image: '/projects/ecommerce.jpg',
    featured: true,
  },
  {
    id: 2,
    title: 'Task Manager App',
    description: 'Приложение для управления задачами с drag-and-drop и командной работой',
    fullDescription: `Веб-приложение для управления проектами и задачами. Поддерживает
    создание проектов, назначение исполнителей, drag-and-drop перемещение задач между
    статусами, уведомления и аналитику.`,
    technologies: ['React', 'TypeScript', 'Dnd-kit', 'Firebase'],
    liveUrl: 'https://tasks.example.com',
    codeUrl: 'https://github.com/username/task-manager',
    image: '/projects/task-manager.jpg',
    featured: true,
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'Дашборд погоды с интерактивными картами и прогнозами',
    fullDescription: `Приложение показывает текущую погоду и прогноз на 7 дней для любого
    города мира. Использует OpenWeatherMap API, интерактивные карты Mapbox и красивые
    визуализации данных.`,
    technologies: ['Next.js', 'OpenWeatherMap API', 'Mapbox', 'Chart.js'],
    liveUrl: 'https://weather.example.com',
    codeUrl: 'https://github.com/username/weather-app',
    image: '/projects/weather.jpg',
    featured: false,
  },
  {
    id: 4,
    title: 'Blog Platform',
    description: 'Платформа для ведения блога с Markdown-редактором',
    fullDescription: `Платформа для публикации статей с поддержкой Markdown, тегами,
    поиском и комментариями. Включает WYSIWYG редактор, загрузку изображений и SEO-оптимизацию.`,
    technologies: ['Next.js', 'MDX', 'Prisma', 'PostgreSQL'],
    liveUrl: 'https://blog.example.com',
    codeUrl: 'https://github.com/username/blog-platform',
    image: '/projects/blog.png',
    featured: false,
  },
];

export const NAV_ITEMS: NavItem[] = [
  { href: '#home', labelKey: 'nav.home' },
  { href: '#about', labelKey: 'nav.about' },
  { href: '#projects', labelKey: 'nav.projects' },
  { href: '#contacts', labelKey: 'nav.contacts' },
];

export const SITE_CONFIG = {
  url: 'https://username.github.io/portfolio',
  author: 'Иван Иванов',
  themeColor: '#3B82F6',
  ogImage: '/og-image.png',
};

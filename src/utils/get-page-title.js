import defaultSettings from '@/settings'

const title = defaultSettings.title || '青年志愿者服务管理'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}

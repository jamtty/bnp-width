import { useLocation, useNavigate } from 'react-router-dom'

type MenuSection = {
  sectionLabel?: string
  items: { label: string; to: string; icon: string }[]
}

export const sideMenuSections: MenuSection[] = [
  {
    sectionLabel: '운영관리',
    items: [
      { label: '배너 관리', to: '/admin/banner', icon: 'wallpaper' },
    ],
  },
  {
    sectionLabel: '게시판',
    items: [
      { label: '공지사항 관리', to: '/admin/notice', icon: 'campaign' },
      { label: '자료실 관리', to: '/admin/data', icon: 'folder' },
    ],
  },
  {
    sectionLabel: '계정',
    items: [
      { label: '마이페이지', to: '/admin/mypage', icon: 'manage_accounts' },
    ],
  },
]

// 기존 코드와의 하위호환을 위해 sideMenuItems 도 export
export const sideMenuItems = sideMenuSections.flatMap((s) => s.items)

export default function AdminSidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <aside className="adm_sidebar">
      <div className="adm_logo">
        <a href="/" target="_blank" rel="noopener noreferrer">
          헤세드상담코칭연구소
        </a>
      </div>
      <nav className="adm_nav">
        <ul>
          {sideMenuSections.map((section, si) => (
            <li key={si} className="adm_nav_section">
              {section.sectionLabel && (
                <span className="adm_nav_section_label">{section.sectionLabel}</span>
              )}
              <ul>
                {section.items.map((item) => (
                  <li key={item.to}>
                    <a
                      href={item.to}
                      onClick={(e) => { e.preventDefault(); navigate(item.to) }}
                      className={
                        item.to === '/admin'
                          ? location.pathname === '/admin'
                            ? 'active'
                            : ''
                          : location.pathname.startsWith(item.to)
                            ? 'active'
                            : ''
                      }
                    >
                      <span className="material-icons">{item.icon}</span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

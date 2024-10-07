import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type Heading = {
  id: string;
  text: string;
  level: number;
};

const TableOfContents: React.FC = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const location = useLocation();

  useEffect(() => {
    const headingElements: HTMLHeadElement[] = Array.from(
      document.querySelectorAll('.markdown-container h2, .markdown-container h3')
    );
    setHeadings([]);
    const newHeadings = headingElements
      .filter(x => x.id)
      .map(heading => ({
        id: heading.id,
        text: heading.innerText,
        level: heading.tagName === 'H2' ? 2 : 3
      }));
    setHeadings(newHeadings);

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '0px 0px -80% 0px', // 触发高亮时机，80% 出现在视窗时触发
        threshold: 0.1 // 当标题的 10% 出现在视窗中时，触发回调
      }
    );

    headingElements.forEach(heading => {
      observer.observe(heading);
    });

    return () => {
      headingElements.forEach(heading => observer.unobserve(heading));
    };
  }, [location.pathname]);
  if (!headings.length) return null;
  return (
    <nav className="fixed w-52 top-20 right-8">
      <div className="mb-4 text-sm font-bold">目录</div>
      <ul className="pl-1">
        {headings.map(heading => (
          <li
            key={`${location.pathname}-${heading.id}`}
            className={`${heading.level === 3 ? 'pl-8' : 'pl-4'} border-l border-gray-200 pb-2 ${
              activeId === heading.id ? 'border-blue-500' : ''
            }`}
          >
            <a
              href={`#${heading.id}`}
              className={`block hover:text-blue-500 text-xs ${
                activeId === heading.id ? 'text-blue-500 font-bold' : 'text-gray-600'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;

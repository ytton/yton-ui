import CodeShow from 'docs/components/CodeShow';
import { componentsRoutes, RouteItem } from 'docs/router';
import { useNavigate } from 'react-router-dom';
function Overall() {
  const navigate = useNavigate();
  return (
    <div className="px-4 sm:px-0">
      <h1 className="mb-4 text-3xl font-bold text-gray-900">组件总览</h1>
      <p className="mb-8 text-gray-600">
        yton-ui 为 Web 应用提供了丰富的基础 UI 组件，我们还将持续探索企业级应用的最佳 UI 实践
      </p>
      {/* Component sections */}
      <div className="space-y-12">
        {Object.values(
          componentsRoutes.reduce((acc: Record<string, { name: string; children: RouteItem[] }>, item: RouteItem) => {
            if (!acc[item.group]) {
              acc[item.group] = { name: item.group, children: [] };
            }
            acc[item.group].children.push(item);
            return acc;
          }, {})
        ).map(group => (
          <section key={group.name}>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">{group.name}</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {group.children.map(item => (
                <div
                  key={item.title}
                  className="transition-shadow border rounded-lg cursor-pointer hover:shadow-md"
                  onClick={() => navigate(`/components/${item.path}`)}
                >
                  <div className="px-4 py-2 font-medium border-b">{item.title}</div>
                  <div className="p-4" onClick={e => e.stopPropagation()}>
                    <CodeShow onlyPreview noStyle src={`../${item.name}/demo/base.tsx`} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

Overall.meta = {
  toc: false
};
export default Overall;

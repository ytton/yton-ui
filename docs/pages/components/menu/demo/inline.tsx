import { MenuItemType } from '@/components/Menu/types';
import { Icon, Menu } from 'yton-ui';

const App = () => {
  const items: MenuItemType[] = [
    {
      key: '1',
      icon: <Icon icon="mdi:home" />,
      label: '菜单项1'
    },
    {
      key: '2',
      icon: <Icon icon="mdi:account-badge" />,
      label: '菜单项2',
      disabled: true
    },
    {
      key: '3',
      icon: <Icon icon="mdi:zip-disk" />,
      label: '菜单项3',
      children: [
        {
          key: '3-1',
          label: '子菜单项1'
        },
        {
          key: '3-2',
          icon: <Icon icon="mdi:zip-disk" />,
          label: '子菜单项2',
          children: [
            {
              key: '3-2-1',
              label: '子菜单项2-1'
            },
            {
              key: '3-2-2',
              label: '子菜单项2-2',
              children: [
                {
                  key: '3-2-2-1',
                  label: '子菜单项2-2-1'
                },
                {
                  key: '3-2-2-2',
                  label: '子菜单项2-2-2'
                }
              ]
            }
          ]
        },
        {
          key: '3-3',
          label: '子菜单项3'
        }
      ]
    },
    {
      key: '4',
      icon: <Icon icon="mdi:window-shutter" />,
      label: '菜单项3'
    }
  ];
  return (
    <div className="flex">
      <div className="w-[200px]">
        <Menu mode="inline" items={items} />
      </div>
    </div>
  );
};

export default App;

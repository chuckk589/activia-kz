<script>
export default {
  name: 'nav',
  computed: {
    sidebarItems() {
      return [{
        _name: 'CSidebarNav',
        _children: [
          
          {
            _name: 'CSidebarNavItem',
            name: 'Пользователи',
            to: '/users',
            icon: 'cil-speedometer',
          },
          {
            _name: 'CSidebarNavItem',
            name: 'Розыгрыши',
            to: '/lottery',
            icon: 'cil-speedometer',
          },
          // {
          //   _name: 'CSidebarNavItem',
          //   name: 'Победители',
          //   to: '/winners',
          //   icon: 'cil-speedometer',
          // },
          {
            _name: 'CSidebarNavItem',
            name: 'Чеки',
            to: '/checks',
            icon: 'cil-speedometer',
          },
          // {
          //   _name: 'CSidebarNavTitle',
          //   _children: ['Header 1']
          // },
          // {
          //   _name: 'CSidebarNavItem',
          //   name: 'Item',
          //   // to: '/item',
          //   icon: 'cil-drop'
          // },
          // {
          //   _name: 'CSidebarNavTitle',
          //   _children: ['Header 2']
          // },
          // {
          //   _name: 'CSidebarNavDropdown',
          //   name: 'Dropdown',
          //   route: '/dropdown',
          //   icon: 'cil-puzzle',
          //   items: [{
          //     name: 'First item',
          //     // to: '/dropdown/first',
          //     icon: 'cil-puzzle'
          //   },
          //     {
          //       name: 'Second item',
          //       // to: '/dropdown/second',
          //       icon: 'cil-puzzle'
          //     },
          //   ]
          // }
        ]
      }]
    }
  }
}
</script>

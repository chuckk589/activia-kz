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
          {
            _name: 'CSidebarNavItem',
            name: 'Чеки',
            to: '/checks',
            icon: 'cil-speedometer',
          },
          // {
          //   _name: 'CSidebarNavItem',
          //   name: 'ag',
          //   to: '/ag',
          //   icon: 'cil-speedometer',
          // },
        ]
      }]
    }
  }
}
</script>

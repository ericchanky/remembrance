<script>
import { routes } from '../../router'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('route', ['route']),
  },
  render (createElem) {
    return createElem(routes.find(r => r.name === this.route.name).component)
  },
}
</script>

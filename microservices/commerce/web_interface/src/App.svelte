<script>
import Router from 'svelte-spa-router';
import { replace } from 'svelte-spa-router';
import { wrap } from 'svelte-spa-router/wrap';


import Authentication from './routes/Overall/Authentication.svelte'; //public route

const publicroutes = ["/auth"];
const routes = {
  "/auth": Authentication,
  "*": () => replace('/auth'),
};
</script>

<Router {routes} />
<style>

</style>

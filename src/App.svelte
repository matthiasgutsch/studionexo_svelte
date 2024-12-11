<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import CountryList from "./routes/CountryList.svelte";
  import CountryServiceDetail from "./routes/CountryServiceDetail.svelte";
  import "./app.scss";

  export let url = "";
</script>

<Router {url} basepath="">
  <div class="app-container">
    <header class="main-header">
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </header>

    <main class="main-content">
      <Route path="/" component={CountryList} />
      <Route path="/:countrySlug/:serviceSlug" let:params>
        <CountryServiceDetail
          countrySlug={params.countrySlug}
          serviceSlug={params.serviceSlug}
        />
      </Route>
    </main>

    <footer class="main-footer">
      <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
    </footer>
  </div>
</Router>

<style>
  .app-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .main-header {
    padding: 1rem;
    background: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
  }

  .main-content {
    flex: 1;
    padding: 2rem;
  }

  .main-footer {
    padding: 1rem;
    text-align: center;
    background: #f8f9fa;
    border-top: 1px solid #e9ecef;
  }
</style>

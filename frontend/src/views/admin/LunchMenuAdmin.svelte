<script>
    import { user } from '../../stores.js'
    import { onMount } from "svelte"
    import { navigateTo } from "svelte-router-spa"
    import axios from "axios"
    import Icon from 'svelte-awesome'
    import { refresh } from 'svelte-awesome/icons'

    let lunchWeekList = []
    let loading = true

    onMount(async () => {
      try {
        // const response = await axios.get("http://localhost:3000/api/lunch-week")
        const response = await axios.get(`${process.env.API_ROOT}/api/lunch-week`)
        lunchWeekList = response.data
        await new Promise((f) => setTimeout(f, 200))
        loading = false
      } catch(e) {
        console.log(e);
      }
    })

    const openLunchWeekDetails = lunchWeek => {
    const route = `/admin/manage-menus/week-details/${lunchWeek.lunchWeekId}`
    navigateTo(route)
  }
  </script>
  
  <div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/admin/manage-menus">Lunch Menu Administration</a>
        </li>
        <li class="is-active">
          <a href="/#">{$user.schoolName}</a>
        </li>
      </ul>
    </nav>
    <!-- {JSON.stringify(lunchWeekList)} -->
    {#if loading}
    <div class="section">
      <Icon spin data={refresh} scale="3" />
    </div>
    {:else}
    <table class="table">
      <thead>
        <tr>
          <th>Week Of</th>
          <th>Published</th>
        </tr>
      </thead>
      {#each lunchWeekList as lunchWeek}
      <!-- pass down lunchWeek object in to a function caled openLunchWeekDetails-->
      <tr class="has-text-link" style="cursor: pointer" on:click="{openLunchWeekDetails(lunchWeek)}">
        <td>{lunchWeek.weekOf}</td>
        <td>{lunchWeek.isPublished}</td>
      </tr>
      {/each}
    </table>
    {/if}
  </div>
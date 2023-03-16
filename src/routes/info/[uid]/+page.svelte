<script lang="ts">
  import { setContext } from "svelte";
  import { createForm, key } from "svelte-forms-lib";

  import { page } from "$app/stores";

  import { init } from "$lib/shared/forms/u_info/init";
  import { validation } from "$lib/shared/forms/u_info/validation";
  import { submit } from "$lib/shared/forms/u_info/submit";

  
  /** @type {import('./$types').PageData} */
  export let data: any;

  const initialValues = init(data.info);
  const onSubmit = submit($page.params.uid, $page.url.pathname);
  const validationSchema = validation();
  const formProps = { initialValues, onSubmit, validationSchema };
  const { form, errors, handleChange, handleSubmit, handleReset } = createForm(formProps);

  setContext(key, {
    form, errors, handleChange
  });

  $: modified = Boolean($page.url.searchParams.get("modificado"));
  $: if (modified) {
    location.replace($page.url.pathname);
  };
</script>

<form id="info_form" on:submit|preventDefault={handleSubmit} on:reset={handleReset}>
  <h2>Your info</h2>
  
  <div>
    uid: {data.info.uid}
  </div>

  <div>
    <label for="info">info</label>
    <input
      type="text"
      name="info"
      bind:value={$form.info}
      on:change={handleChange}
      on:blur={handleChange}
    >
  </div>

  <div>
    <button type="submit" name="submit_form">
      change
    </button>
  </div>
</form>

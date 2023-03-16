<script lang="ts">

	// /** @type {import('./$types').PageData} */
	// export let data;
  
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import * as api from "$lib/api";


  $: cas_ticket = $page.url.searchParams.get("ticket");
  $: cas_login = Boolean(cas_ticket);


  // const login = async function () {
  
  //   // https://www.google.com/url?q=https%3A%2F%2Fsecure.dst.usb.ve%2Flogin%3Fservice%3Dhttps%253A%252F%252Fwww.sinai.did.usb.ve%252Fsinai%252Fsecurity%252Fscriptcas.php&sa=D&sntz=1&usg=AOvVaw2Z-dKnxEj98V_07GVuGIeW
  //   const dst_verify = `https://secure.dst.usb.ve/proxyValidate?service=http%3A%2F%2Flocalhost:3000%2Flogin&ticket=${cas_ticket}`;
  //   console.log('dst_verify: ', dst_verify)

  //   const res = await api.get(dst_verify, {
  //     // "Content-Type": "text/html;charset=ISO-8859-",

  //     // "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  //     // "Accept-Encoding": "gzip, deflate, br",
  //     // "Accept-Language": "es-419,es;q=0.9,en-US;q=0.8,en;q=0.7",
  //     // "Connection": "keep-alive",
  //     // "Host": "secure.dst.usb.ve",
  //     // "Sec-Fetch-Dest": "document",
  //     // "Sec-Fetch-Mode": "navigate",
  //     // "Sec-Fetch-Site": "none",
  //     // "Sec-Fetch-User": "?1",
  //     // "Upgrade-Insecure-Requests": "1",

  //     // "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36 Edg/110.0.1587.63",
  //     // "Host": "secure.dst.usb.ve",

  //     // "Access-Control-Allow-Origin": "*",
  //     // "Access-Control-Allow-Methos": "GET, POST, OPTIONS, PUT, DELETE",
  //     // "Access-Control-Allow-Headers": "Content-Type, X-Auth-Token, Origin, Authorization",
  //     // rejectUnauthorized: false,
  //     // requestCert: false,//add when working with https sites
  //     // agent: false,//add when working with https sites
  //     // strictSSL: false,

  //     // secureProtocol: "TLSv1_method",
  //     // "Content-Type": "application/xml",
  //     // "Accept": "application/xml",
  //     // "Accept-Charset": "utf-8",
  //    });
  //   // const username = await res.json();
  //   console.log('res from dst cas validate', res);

  //   // const res = await api.post("/api/auth/login/" + email, {}, { email, cas_ticket });

  //   // if (res.ok) {
  //   //   $session.user = await res.clone().json();
      
  //   //   if ($session.user?.professor) {
  //   //     goto(`/sinai/actividades/profesor/${$session.user.email}`);
        
  //   //   } else { // Dean
  //   //     goto("/sinai/actividades");
  //   //   };
  //   // } else {
  //   //   const { message } = await res.clone().json();
  //   //   console.log(message)
  //   // };
  // };
</script>

<h1>Welcome to SvelteKit</h1>

{#if cas_login}  
  <button
    id="cas_login"
    on:click|preventDefault={() => {console.log($page.url.pathname)}}
  >
    verify login
  </button>
{/if}

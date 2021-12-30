<script lang="ts">
    import { goto } from "@sapper/app";
    import { writable } from "svelte/store";
    import md5 from "md5";
    import Cookies from "js-cookie";
    import { onMount } from "svelte";

    const input: any = writable({
        username: "",
        password: "",
    });

    onMount(() => {
        input.username = "";
        input.password = "";
    });

    const error = {
        username: false,
        password: false,
    };

    function login() {
        const username = input.username.trim();
        const password = input.password;

        error.username = input.username === "";
        error.password = input.password === "";

        if (Object.values(error).includes(true)) {
            return;
        }

        fetch("/session/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username,
                password: md5(password),
            }),
        }).then(async (res) => {
            if (res.status == 200) {
                Cookies.set("token", await res.text());
                goto("/dashboard");
            }
        });
    }
</script>

<svelte:head>
    <title>Login</title>
</svelte:head>

<div class="animate-load flex flex-auto items-center justify-center">
    <form class="space-y-2 p-10 bg-gray-300 rounded-lg">
        <div class="text-center text-xl font-bold">Login</div>
        <input
            class="bg-white border-2 block w-full py-2 px-4 rounded-lg focus:outline-none focus:border-gray-700"
            class:border-red-600={error.username}
            bind:value={input.username}
            placeholder="Username" />
        <input
            class="bg-white border-2 block w-full py-2 px-4 rounded-lg focus:outline-none focus:border-gray-700"
            class:border-red-600={error.password}
            type="password"
            bind:value={input.password}
            placeholder="Password" />
        <button
            class="bg-gray-500 hover:bg-gray-600 float-right rounded-lg text-gray-50 py-2 px-4 font-bold focus:outline-none"
            type="button"
            on:click={login}>
            Login
        </button>
    </form>
</div>

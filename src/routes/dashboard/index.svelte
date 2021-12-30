<script lang="ts">
    import Base from "client/component/Base.svelte";
    import SvgItem from "client/svg/Item.svelte";
    import SvgTransaction from "client/svg/Transaction.svelte";
    import SvgUser from "client/svg/User.svelte";
    import { goto } from "@sapper/app";
</script>

<Base pageName="Dashboard">
    <div class="w-full h-4 bg-gray-800"></div>

    <div class="absolute top-1/2 left-1/2 w-200 -mt-32 -ml-96 flex space-x-4">
        <button
            type="button"
            class="w-64 h-64 rounded-lg text-gray-200 focus:outline-none bg-gray-800 hover:bg-gray-900"
            on:click={() => goto("/item")}>
            <div class="w-full h-4/5 rounded-t-lg px-12 py-6"><SvgItem w={40} h={40} /></div>
            <div class="w-full h-1/5 rounded-b-lg bg-gray-900 text-center text-3xl p-1 font-bold">Items</div>
        </button>
        <button
            type="button"
            class="w-64 h-64 rounded-lg text-gray-200 focus:outline-none bg-gray-800 hover:bg-gray-900"
            on:click={() => goto("/customer")}>
            <div class="w-full h-4/5 rounded-t-lg px-12 py-6"><SvgUser w={40} h={40} /></div>
            <div class="w-full h-1/5 rounded-b-lg bg-gray-900 text-center text-3xl p-1 font-bold">Customers</div>
        </button>
        <button
            type="button"
            class="w-64 h-64 rounded-lg text-gray-200 focus:outline-none bg-gray-800 hover:bg-gray-900"
            on:click={() => goto("/transaction")}>
            <div class="w-full h-4/5 rounded-t-lg px-12 py-6"><SvgTransaction w={40} h={40} /></div>
            <div class="w-full h-1/5 rounded-b-lg bg-gray-900 text-center text-3xl p-1 font-bold">Transactions</div>
        </button>
    </div>
</Base>

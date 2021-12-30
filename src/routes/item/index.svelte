<script lang="ts">
    import Base from "client/component/Base.svelte";
    import SvgPencil from "client/svg/Pencil.svelte";
    import SvgPlus from "client/svg/Plus.svelte";
    import SvgSearch from "client/svg/Search.svelte";
    import SvgTrashCan from "client/svg/TrashCan.svelte";
    import { writable } from "svelte/store";
    import { EditMode } from "client/util/EditMode";
    import Cookies from "js-cookie";
    import { onMount } from "svelte";

    let items = [];
    let filteredItems = [];
    let filter = "";

    onMount(() => {
        fetch("/item/all", {
            headers: { Authorization: Cookies.get("token") },
        }).then(async (res) => {
            items = await res.json();
            filteredItems = items;
        });
    });

    let showOverlay = false;
    let editMode = EditMode.CREATE;

    const editor: any = writable({
        id: 0,
        code: "",
        name: "",
        price: "",
    });

    const error = {
        code: false,
        name: false,
        price: false
    }

    function formatPrice(price: number): string {
        return ("" + price).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }

    function updateFilter() {
        filteredItems = items.filter((v) => filter === "" || v.name.toLowerCase().includes(filter.toLowerCase()));
    }

    function clear() {
        Object.keys(error).forEach((k) => (error[k] = false));

        editor.id = -1;
        editor.code = "";
        editor.name = "";
        editor.price = "";
    }

    function set(item) {
        Object.keys(error).forEach((k) => (error[k] = false));

        editor.id = item.id;
        editor.code = item.code;
        editor.name = item.name;
        editor.price = item.price;
    }

    function create() {
        clear();

        editMode = EditMode.CREATE;
        showOverlay = true;
    }

    function edit(item) {
        set(item);

        editMode = EditMode.EDIT;
        showOverlay = true;
    }

    function del(item) {
        set(item);

        editMode = EditMode.DELETE;
        showOverlay = true;
    }

    function submit() {
        error.code = editor.code.trim() === "";
        error.name = editor.name.trim() === "";
        error.price = editor.price == 0;

        if (Object.values(error).includes(true)) {
            return;
        }

        switch (editMode) {
            case EditMode.CREATE:
                fetch("/item/create", {
                    method: "POST",
                    headers: {
                        Authorization: Cookies.get("token"),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(editor),
                }).then(async (res) => {
                    const item = await res.json();
                    items = [...items, item];
                    updateFilter();
                });
                break;
            case EditMode.EDIT:
                fetch("/item/edit", {
                    method: "POST",
                    headers: {
                        Authorization: Cookies.get("token"),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(editor),
                }).then((res) => {
                    const item = items.find((v) => v.id == editor.id);
                    item.code = editor.code;
                    item.name = editor.name;
                    item.price = +editor.price;

                    items = items;
                    updateFilter();
                });
                break;
            case EditMode.DELETE:
                fetch("/item/delete", {
                    method: "DELETE",
                    headers: {
                        Authorization: Cookies.get("token"),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(editor),
                }).then((res) => {
                    items = items.filter((v) => v.id != editor.id);
                    updateFilter();
                });
                break;
        }

        showOverlay = false;
    }

    function cancel() {
        showOverlay = false;
    }
</script>

<Base pageName="Items">
    <div class="flex flex-col w-full">
        <!-- sticky header -->
        <div class="sticky top-0 pt-3 px-3 border-b-2 bg-gray-800 border-gray-900 text-gray-200">
            <div class="flex w-full space-x-2">
                <!-- searchbar -->
                <div class="relative text-gray-600 focus-within:text-gray-400">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                        <SvgSearch />
                    </span>
                    <input
                        name="q"
                        class="py-3 text-sm w-64 text-white bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-gray-200 focus:text-gray-900"
                        bind:value={filter}
                        on:input={updateFilter}
                        placeholder="Search..." />
                </div>
                <div class="flex-grow" />

                <!-- add button -->
                <button
                    class="w-30 p-2 rounded-lg w-12 grid place-items-center focus:outline-none transition-colors hover:bg-green-600 hover:text-gray-200"
                    on:click={create}><SvgPlus /></button>
            </div>

            <!-- table header -->
            <div class="flex w-full mt-1 font-bold text-center">
                <div class="w-20">Code</div>
                <div class="flex-grow">Name</div>
                <div class="w-1/5">Price</div>
                <div class="w-20">Controls</div>
            </div>
        </div>

        <!-- table -->
        <table class="table-fixed mx-3 mt-3 border-collapse">
            <tbody>
                {#each filteredItems as item, index}
                    <tr class="bg-gray-{index % 2 ? 400 : 300}">
                        <td class="p-2 w-20 border-r-2 border-gray-200 text-center font-mono">{item.code}</td>
                        <td class="p-2 w-auto border-r-2 border-gray-200">{item.name}</td>
                        <td class="p-2 w-1/5 border-r-2 border-gray-200 text-right">
                            <div class="flex">
                                Rp
                                <div class="flex-grow font-mono">{formatPrice(item.price)}</div>
                            </div>
                        </td>
                        <td class="p-2 w-20">
                            <div class="flex">
                                <!-- edit button -->
                                <button
                                    class="rounded-lg flex-grow grid place-items-center focus:outline-none transition-colors hover:text-blue-600"
                                    on:click={() => edit(item)}><SvgPencil /></button>

                                <!-- delete button -->
                                <button
                                    class="rounded-lg flex-grow grid place-items-center focus:outline-none transition-colors hover:text-red-600"
                                    on:click={() => del(item)}><SvgTrashCan /></button>
                            </div>
                        </td>
                    </tr>
                {/each}

                <!-- footer -->
                <tr class="bg-gray-{filteredItems.length % 2 ? 400 : 300}">
                    <td class="p-2 w-20 border-r-2 border-gray-200 text-center font-mono">
                        <div class="flex">
                            <button
                                class="rounded-lg flex-grow grid place-items-center focus:outline-none transition-colors hover:text-green-700"
                                on:click={create}><SvgPlus /></button>
                        </div>
                    </td>
                    <td class="p-2 w-auto border-r-2 border-gray-200">
                        <div class="flex">
                            <button
                                class="rounded-lg flex-grow grid place-items-center focus:outline-none transition-colors hover:text-green-700"
                                on:click={create}><SvgPlus /></button>
                        </div></td>
                    <td class="p-2 w-1/5 border-r-2 border-gray-200 text-right font-mono">
                        <div class="flex">
                            <button
                                class="rounded-lg flex-grow grid place-items-center focus:outline-none transition-colors hover:text-green-700"
                                on:click={create}><SvgPlus /></button>
                        </div>
                    </td>
                    <td class="p-2 w-20">
                        <div class="flex">
                            <button
                                class="rounded-lg flex-grow grid place-items-center focus:outline-none transition-colors hover:text-green-700"
                                on:click={create}><SvgPlus /></button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- crud overlay -->
    <div
        class="fixed inset-0 w-full h-full bg-black bg-opacity-75 flex flex-auto items-center justify-center fade-{showOverlay
            ? 'in'
            : 'out'}"
        class:invisible={!showOverlay}>
        <form class="w-96 p-10 bg-gray-300 rounded-lg flex flex-col">
            <div class="text-center text-xl font-bold">{editMode}</div>
            {#if editMode == EditMode.DELETE}
                <!-- delete confirmation -->
                <div class="text-base text-gray-800 text-center my-2">Delete "{editor.name}"?</div>
                <div class="flex justify-center space-x-2">
                    <button
                        class="bg-red-500 w-20 hover:bg-red-600 rounded-lg text-gray-50 py-2 px-4 font-bold focus:outline-none"
                        type="button"
                        on:click={submit}>
                        Delete
                    </button>
                    <button
                        class="bg-green-500 w-20 hover:bg-green-600 rounded-lg text-gray-50 py-2 px-4 font-bold focus:outline-none"
                        type="button"
                        on:click={cancel}>
                        Cancel
                    </button>
                </div>
            {:else}
                <!-- create/edit form -->
                <div class="text-xs pl-4 text-gray-800">Code</div>
                <input
                    class="bg-white border-2 mb-2 block w-full py-2 px-4 rounded-lg focus:outline-none focus:border-gray-900"
                    class:border-red-600={error.code}
                    placeholder="Code"
                    bind:value={editor.code} />

                <div class="text-xs pl-4 text-gray-800">Name</div>
                <input
                    class="bg-white border-2 mb-2 block w-full py-2 px-4 rounded-lg focus:outline-none focus:border-gray-900"
                    class:border-red-600={error.name}
                    placeholder="Name"
                    bind:value={editor.name} />

                <div class="text-xs pl-4 text-gray-800">Price</div>
                <input
                    class="bg-white border-2 mb-2 block w-full py-2 px-4 rounded-lg focus:outline-none focus:border-gray-900"
                    class:border-red-600={error.price}
                    type="number"
                    min="0"
                    placeholder="Price"
                    bind:value={editor.price} />
                    
                <div class="flex justify-end space-x-2">
                    <button
                        class="bg-green-500 w-20 ml-2 hover:bg-green-600 float-right rounded-lg text-gray-50 py-2 px-4 font-bold focus:outline-none"
                        type="button"
                        on:click={submit}>
                        Save
                    </button>
                    <button
                        class="bg-red-500 w-20 hover:bg-red-600 float-right rounded-lg text-gray-50 py-2 px-4 font-bold focus:outline-none"
                        type="button"
                        on:click={cancel}>
                        Cancel
                    </button>
                </div>
            {/if}
        </form>
    </div>
</Base>

<style>
    .fade-in {
        visibility: visible;
        opacity: 1;
        transition: opacity 200ms ease-in-out;
    }

    .fade-out {
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s 200ms ease-in-out, opacity 200ms ease-in-out;
    }
</style>

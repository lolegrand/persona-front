<script>
    // Imports
    import { Persona } from "../model/Persona.js";
    import PersonaCard from "../component/PersonaCard.svelte";
    import emptyGif from "$lib/empty.gif"
    import PersonaModal from "../component/PersonaModal.svelte";
    import {onMount} from "svelte";
    import { writable } from "svelte/store";

    // Datas
    let selectedPersona = null
    const personaArray = writable([])

    // Fetch
    onMount(async () => {
        const response = await fetch(`http://persona.lolegrand.fr/persona`)
        $personaArray = await response.json()
    })

    // Callbacks
    async function handleDeletePersona(event) {
        let id = event.detail.persona.id
        console.log(id)
        const response = await fetch(`http://persona.lolegrand.fr/persona/${id}`, {method: 'DELETE'})
        $personaArray = await response.json()
    }

    async function handleViewPersona(event) {
        selectedPersona = event.detail.persona
    }

    async function handleGeneratePersona() {
        let rawPersonaResponse = await fetch("https://randomuser.me/api/?results=1")
        let rawPersona = await rawPersonaResponse.json()
        let persona = Persona.toPersona(rawPersona)
        let data = {
            'firstname': persona.firstname,
            'lastname': persona.lastname,
            'email': persona.email,
            'phone': persona.phone,
            'mobile': persona.mobile,
            'street': persona.street,
            'city': persona.city,
            'state': persona.state,
            'country': persona.country,
            'latitude': persona.latitude,
            'longitude': persona.longitude,
            'dateOfBirth': persona.dateOfBirth,
            'thumbnail': persona.thumbnail
        }
        let response = await fetch(`http://persona.lolegrand.fr/persona`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(data)
        })
        $personaArray = await response.json()
    }
</script>

<PersonaModal bind:selectedPersona />

<div class="page-container">

    <div class="top-bar">
        <div class="title"> Person'app : </div>
        <button class="button-generate-persona" on:click={handleGeneratePersona}> Générer un persona </button>
    </div>


    {#if $personaArray.length === 0}
        <div class="empty-screen">
            Vous n'avez pas encore de persona :'(
            <iframe src="{emptyGif}" width="480" height="480" style="margin-top: 10px" title=""></iframe>
        </div>

    {:else}
        <div class="scroll-view">
            {#each $personaArray as persona}
                <PersonaCard persona="{persona}"
                             on:delete={handleDeletePersona}
                             on:view={handleViewPersona}/>
            {/each}
        </div>
    {/if}

</div>

<style>

    .page-container {
        display: block;
    }

    .top-bar {
        /* Container */
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #A8DEEA;

        /* Size and position */
        height: 5%;
        width: 100%;
        top: 0;
        position: fixed;
        border-width: 0 0 5px 0;
        border-style: solid;
        border-color: #FFFFFF;
        z-index: 1;

        padding: 10px;
    }

    .scroll-view {
        margin-top: 5%;
    }

    .empty-screen {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 15%;
        font-size: 50px;
        color: #A8DEEA;
    }

    .title {
        font-size: 50px;
        color: #FFFFFF;
    }

    .button-generate-persona {
        border-radius: 100px;
        font-size: 25px;
        color: #A8DEEA;
        background-color: #FFFFFF;
        padding: 10px;
        margin-left: 10px;
        cursor: pointer;
        border-width: 0;
        font-family: Roboto,serif;
    }

    :global(body) {
        margin: 0;
    }

</style>